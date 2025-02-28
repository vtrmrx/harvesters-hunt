<?php

    class ApiService {

        private $logFile;
        private $dataDirectory;

        public function __construct($logFile, $dataDirectory) {
            $this->logFile = $logFile;
            $this->dataDirectory = $dataDirectory;
        }

        private function logMessage($message, $scope = "") {
            $scopeText = $scope ? " (processing $scope): " : "";
            $messageText = is_array($message) ? json_encode($message) : $message;
            $logLine = date('Y-m-d H:i:s') . " $scopeText" . $messageText . PHP_EOL;
            file_put_contents($this->logFile, $logLine, FILE_APPEND | LOCK_EX);
        }

        public function handleRequest() {

            try {
                if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                    throw new Exception('Invalid request method');
                }

                $rawInput = file_get_contents('php://input');
                $request = json_decode($rawInput, true);

                if ($request === null) {
                    throw new Exception('Invalid JSON received');
                }

                // Log incoming request
                // $this->logMessage("POST request received");
                // Log raw input
                // $this->logMessage("Raw input: " . file_get_contents('php://input'));
                // Log decoded JSON
                // $this->logMessage("Decoded request: " . json_encode($request));

                // Extract "type" and "data"
                $type = $request['type'] ?? null;
                $newData = $request['data'] ?? null;

                if (empty($type) || empty($newData)) {
                    throw new Exception('Missing required fields: type or data');
                }

                $csvPath = $this->getCsvFilePath($type);

                if (!$csvPath) {
                    throw new Exception('Invalid data type');
                }

                $responseText = $this->storeData($newData, $csvPath, $type);

                $this->sendResponse(['status' => 'success', 'message' => $responseText]);

            } catch (Exception $e) {

                // $this->logMessage("Error: " . $e->getMessage());
                // $this->sendResponse(['status' => 'error', 'message' => $e->getMessage()]);
                
            }
        }
        
        private function getCsvFilePath($type) {
            $allowedTypes = ['events', 'results', 'survey', 'session', 'search-images'];
            if (!in_array($type, $allowedTypes)) {
                return null;
            }
            return $this->dataDirectory . $type . '.csv';
        }

        private function storeData($newData, $csvFilePath, $type) {

            // $this->logMessage("original data: " . json_encode($newData), $type);

            // Create a deep copy of the new data
            $sanitizedNewData = json_decode(json_encode($newData), true);

            // $this->logMessage("copied data: " . json_encode($sanitizedNewData), $type);

            // Sanitize the copied data
            foreach ($sanitizedNewData as &$newItem) {
                foreach ($newItem as $key => $value) {
                    if (strpos($value, '=') === 0 || strpos($value, '+') === 0 || strpos($value, '-') === 0 || strpos($value, '@') === 0) {
                        $value = "'" . $value; // Prepend a single quote to neutralize formula injection
                    }
                    $value = str_replace(['"', "'", "\n", "\r"], '', $value); // Remove potentially dangerous characters
                    $newItem[$key] = $value; // Assign sanitized value back to the copy
                }
            }

            // $this->logMessage("data right after sanitization: " . json_encode($sanitizedNewData), $type);
        
            // $this->logMessage("Processing data", $type);
        
            // Attempt to open the CSV file with write access
            if ($csvHandle = fopen($csvFilePath, 'c+')) { // 'c+' opens for reading and writing; creates the file if it does not exist
                // Attempt to lock the file
                if (flock($csvHandle, LOCK_EX)) { // Acquire an exclusive lock

                    // $this->logMessage("Creating Lock file " . LOCK_EX, $type);

                    // Simulate processing delay of 30 seconds
                    // sleep(30000);

                    // $start = time();
                    // while (time() - $start < 30) { // Delay for 10 seconds
                    //     // Simulate processing or delay
                    // }

                    // Load pre-existing data and columns
                    $columns = [];
                    $data = [];

                    // Read existing data if file is not empty
                    if (filesize($csvFilePath) > 0) {
                        rewind($csvHandle);
                        $csvData = array_map('str_getcsv', file($csvFilePath));
                        $columns = $csvData[0];
                        $data = array_slice($csvData, 1);
                    }

                    // Process each new array item
                    foreach ($sanitizedNewData as $newReferenceItem) {
                        $newItemCopy = json_decode(json_encode($newReferenceItem), true);

                        // Add new columns if they don't exist
                        foreach ($newItemCopy as $key => $value) {
                            if (!in_array($key, $columns)) {
                                $columns[] = $key;
                            }
                        }

                        // Prepare the new row
                        $newRow = [];
                        foreach ($columns as $column) {
                            $newRow[$column] = $newItemCopy[$column] ?? 'null'; // Default for missing columns
                        }

                        $data[] = $newRow;
                    }

                    // Truncate the file before writing the updated content
                    ftruncate($csvHandle, 0);
                    rewind($csvHandle);

                    // Write the headers and data back to the file
                    fputcsv($csvHandle, $columns);
                    foreach ($data as $row) {
                        fputcsv($csvHandle, $row);
                    }

                    // Release the lock
                    // flock($csvHandle, LOCK_UN);
                    // Return a success message
                    return 'Form submitted successfully';

                } else {
                    // Handle the error if the lock couldn't be acquired
                    $this->logMessage("Could not lock the file: $csvFilePath", $type);
                    return "Could not lock database";
                }

                // Close the file handle
                fclose($csvHandle);
                
            } else {
                // Handle the error if the file couldn't be opened
                $this->logMessage("Could not open the file for writing: $csvFilePath", $type);
                return "Could not access database";

            }
        }        

        private function sendResponse($response) {
            header('Content-Type: application/json');
            echo json_encode($response);
            exit;
        }

    }

    // Configuration values
    $logFile = './debug.log';
    $dataDirectory = '../data/output/';

    $apiService = new ApiService($logFile, $dataDirectory);
    $apiService->handleRequest();

?>
