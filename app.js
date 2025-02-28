import VisualHunt from './visualHunt.js';

const configFull = {
    debug: true,
    content: {
        defaultLang: "en",
        texts: "./content/short-texts.json"
    },
    theme: {
        color: {
            targetHit: "#55ff00",
            targetMiss: "#ffffff"
        },
        sound: {
            enable: true,
            hit: "./assets/audio/hitSound.wav",
            miss: "./assets/audio/missSound.wav"
        }
    },
    api: {
        endpoints: {
            post: "./api/apiService.php"
        }
    },
    userConsentButton: "userConsentButton",
    survey: {
        enable: true,
        element: "surveyScreen",
        config: "./content/multilang-survey.json",
        formContainer: "surveyContainer",
    },
    instructions: {
        enable: true,
        element: "instructionsScreen",
        searchImages: {
            enable: true,
            canvas: {
                element: "searchImagesCanvas",
                width: 600,
                height: "60vh"
            },
            columns: 6,
        }
    },
    opening: {
        element: "openingScreen"
    },
    gameplay: {
        element: "gameplayScreen",
        startGameButton: "searchImagesCanvas",
        backToStartButton: "backToStartButton",
        loadingScreen: {
            enable: true,
            element: "loadingScreen",
        },
        preparationScreen: {
            enable: false
        },
        config: {
            matchGroups: true,
            slides: {
                count: 42,
                durationSeconds: 10,
                preparationTimeSeconds: 1,
                showTargetPosition: {
                    enable: true,
                    timeSeconds: 0.75
                }
            },
            backgrounds: {
                imagesDir: "./assets/img/background",
                data: "./data/input/background.csv",
                groupingField: "type",
                allowDuplicates: false
            },
            targets: {
                imagesDir: "./assets/img/target",
                data: "./data/input/target.csv",
                groupingField: "species",
                size: 75,
                detectionRadius: 37.5,
                allowDuplicates: false
            }
        },
        canvas: {
            element: "gameCanvas",
            width: 960,
            height: 540,
        },
        slideCounter: {
            enable: true,
            element: "slideCounter"
        }
    },
    results: {
        element: "resultsScreen",
        stats: {
            element: "gameStats",
            mainResult: {
                element: "mainResult",
                path: [
                    "slides",
                    "hitRatio"
                ]
            },
            slides: {
                hitRatio: true,
                totalTiming: true
            },
            hits: {
                totalNumberRelative: true,
                averageTiming: true,
                fastestHit: true
            },
            backgrounds: {
                smallestAverageHitTimingGroup: true,
                mostFoundGroup: false,
            },
            targets: {
                smallestAverageHitTimingGroup: true,
            }
        }
    }
};

// lazy load videos
document.addEventListener('DOMContentLoaded', function() {
    let videoSources = document.querySelectorAll('video source');
    videoSources.forEach(source => {
        source.src = source.dataset.src;
        // Access the parent <video> element and load the new source
        source.parentElement.load();
    });
});

new VisualHunt(configFull);

// config with less properties, making use of default values within the method
const config = {
    content: {
        defaultLang: "en",
        texts: "./content/short-texts.json"
    },
    api: {
        endpoints: {
            post: "./api/apiService.php"
        }
    },
    userConsentButton: "userConsentButton",
    gameplay: {
        element: "gameplayScreen",
        startGameButton: "searchImagesCanvas",
        backToStartButton: "backToStartButton",
        config: {
            matchGroups: true,
            slides: {
                count: 42,
                durationSeconds: 10,
                preparationTimeSeconds: 0,
                showTargetPosition: {
                    enable: true,
                    timeSeconds: 0.75
                }
            },
            backgrounds: {
                imagesDir: "./assets/img/background",
                data: "./data/input/background.csv",
                groupingField: "type",
                allowDuplicates: false
            },
            targets: {
                imagesDir: "./assets/img/target",
                data: "./data/input/target.csv",
                groupingField: "species",
                size: 75,
                detectionRadius: 37.5,
                allowDuplicates: false
            }
        },
        canvas: {
            element: "gameCanvas",
            width: 960,
            height: 540,
        },
        slideCounter: {
            enable: true,
            element: "slideCounter"
        }
    },
    results: {
        element: "resultsScreen",
        stats: {
            element: "gameStats",
            mainResult: {
                element: "mainResult",
                path: [
                    "slides",
                    "hitRatio"
                ]
            },
            slides: {
                hitRatio: true,
                totalTiming: true
            },
            hits: {
                totalNumberRelative: true,
                averageTiming: true,
                fastestHit: true
            },
            backgrounds: {
                smallestAverageHitTimingGroup: true,
                mostFoundGroup: false,
            },
            targets: {
                smallestAverageHitTimingGroup: true,
            }
        }
    }
};


// Custom Game Class (to be continued)

class CustomGame extends VisualHunt {
    constructor(config, customMethods) {

        super(config);

        for (const method in customMethods) {
            if (customMethods.hasOwnProperty(method)) {
                this[method] = customMethods[method].bind(this);
            }
        }
    }
}

// const customMethods = { 
//     printResults: function() {
//         // to do: bring here custom printResults() method
//     }
// }

// new CustomGame(
//     config, 
//     customMethods
// );