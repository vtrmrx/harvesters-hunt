<?php
    $defaultGameLang = "en";
    $browserLanguage = isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) ? $_SERVER['HTTP_ACCEPT_LANGUAGE'] : '';
    // Extract the primary language code from the header or use a default value if not available
    $primaryLanguage = strtok($browserLanguage ? $browserLanguage : $defaultGameLang, ',;');

    $userLang = $primaryLanguage;
    $contentFile = './content/short-texts.json';

    $contentRawData = file_get_contents($contentFile);
    $contentData = json_decode($contentRawData, true);

    if ($contentData === null) {
        // Decoding failed
        die("Error loading content");
    }

    // Get all the keys of the gameLangs array
    $languageKeys = array_keys($contentData['gameLangs']);

    $gameLang = $defaultGameLang;

    foreach ($languageKeys as $lang) {
        if (strpos($userLang, $lang) === 0) {
            $gameLang = $lang;
            break;
        }
    }

?>

<!DOCTYPE html>
<html lang="<?php echo $gameLang; ?>" data-bs-theme="dark">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?php echo $contentData['gameTitle'][$gameLang] ?></title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <link rel="stylesheet" href="./assets/css/style.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
    </head>
    <body style="display: none;">

        <nav id="navBar" class="navbar navbar-expand d-none">
            <div class="container-fluid">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a href="" class="nav-link">About</a>
                    </li>
                    <li class="nav-item">
                        <a href="" class="nav-link">Team</a>
                    </li>
                    <li class="nav-item">
                        <a href="" class="nav-link">Terms of use</a>
                    </li>
                </ul>
            </div>
        </nav>

        <div id="openingScreen" class="game-screen">
            <div class="container-fluid">
                <div class="row justify-content-start align-items-xl-center justify-content-md-center">
                    <div class="col-12 col-md-8 col-lg-5 order-1 order-lg-0">
                        <div class="opening-content">
                            <div class="opening-content__game-logo d-none">
                                <?php echo $contentData['gameTitle'][$gameLang] ?>
                            </div>
                            <h1 class="opening-content__heading">
                                <?php echo $contentData['openingHeading'][$gameLang] ?>
                            </h1>
                            <div class="opening-content__intro">
                                <?php echo $contentData['openingIntro'][$gameLang] ?>
                            </div>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalWarning">
                                <?php echo $contentData['goToGameButton'][$gameLang] ?>
                            </button>
                            <div class="logos">
                                <div class="logo-row">
                                    <img alt="CAPES logo" src="./assets/img/logo_capes_neg_hor.png" loading="lazy">
                                    <img alt="University of Exeter logo" src="./assets/img/logo_university_of_exeter_neg.png" loading="lazy">
                                </div>
                                <div class="logo-row">
                                    <img alt="USP logo" src="./assets/img/logo_usp_neg.png" loading="lazy">
                                    <img alt="FAPESP logo" src="./assets/img/fapesp_logo_branco.png" loading="lazy">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 col-lg-4 offset-lg-1 order-0 order-lg-1">
                        <div class="opening-bg">
                            <video autoplay loop muted playsinline>
                                <source data-src="https://nathaliaximenes.com/harvesters/assets/video/bg-home.mp4" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="surveyScreen" class="game-screen">
            <div class="container-fluid">
                <div class="d-flex justify-content-center">
                    <div id="surveyContainer"></div>
                </div>
            </div>
        </div>

        <div id="instructionsScreen" class="game-screen">
            <div class="container-fluid">
                <div class="row d-flex align-items-center justify-content-center">
                    <div class="col-12 col-md-7 col-lg-4">
                        <?php include './content/' . $gameLang . '/instructions.html'; ?>
                        <p style="text-align: left; margin-top: 32px;"><em>
                            <?php echo $contentData['startGameInteraction'][$gameLang] ?>
                        </em></p>
                    </div>
                    <div class="col-12 col-md-5 col-lg-6 col-xl-7">
                        <canvas id="searchImagesCanvas"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <div id="gameplayScreen" class="game-screen">
            <canvas id="gameCanvas" style="background-color: gray;"></canvas>
            <div id="slideCounter"></div>
        </div>

        <div id="resultsScreen" class="game-screen">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-lg-8 offset-lg-2">
                        <h2 class="h1" id="mainResult"></h2>
                        <div id="gameStats" class="py-4"></div>
                        <button type="button" class="btn btn-primary" id="backToStartButton">
                            <?php echo $contentData['backToStartButton'][$gameLang] ?></em>
                        </button>
                        <div class="results-footer">
                            <p><a href="https://nathalia-ximenes.github.io/" target="_blank">nathalia-ximenes.github.io</a></p>
                            <p><a href="https://www.visual-ecology.com/" target="_blank">visual-ecology.com</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade modal-md" id="modalWarning" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <!-- <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1> -->
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="padding: 0;">
                    <!-- <figure style="width: 100%; margin-bottom: 0;">
                        <img style="margin-bottom: 0; width: 100%; height: auto; display: block;" src="./assets/img/warning-figure-en.png" alt="">
                    </figure> -->
                </div>
                <div class="modal-footer">
                    <p><?php echo $contentData['modalFooter'][$gameLang] ?></p>
                    <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
                    <!-- <button type="button" class="btn btn-secondary"> -->
                        <?php // echo $contentData['learnMoreButton'][$gameLang] ?>
                    <!-- </button> -->
                    <button type="button" class="btn btn-primary" id="userConsentButton" data-bs-dismiss="modal">
                        <?php echo $contentData['userConsentButton'][$gameLang] ?>
                    </button>
                </div>
                </div>
            </div>
        </div>

        <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" as="script" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

        <link rel="preload" href="./app.js" as="script" crossorigin="anonymous">
        <script type="module" src="./app.js" crossorigin="anonymous"></script>

    </body>
</html>