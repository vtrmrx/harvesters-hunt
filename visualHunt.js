/*  
  JavaScript library for creating interactive games that collect user input  
  as a proxy for visually oriented predators' hunting behavior.

  Originally developed for use in "Harvesters hunt" game, by Nathalia Ximenes,
  available at https://www.visual-ecology.com/harvesters

  Inspired by the Exeter Visual Ecology Research Group's games,  
  available at https://www.visual-ecology.com/games/.  

  Author: Vítor Marques de Faria (https://github.com/vtrmrx)  
*/

class VisualHunt {
    
    constructor(config) {

        this.requiredConfigParameters = [
            // 'debug', // boolean
            // 'content.defaultLang', // string
            // 'content.texts', // string (path to json) or object
            // 'theme.color.targetHit', // string (hex color code)
            // 'theme.color.targetMiss', // string (hex color code)
            // 'theme.sound.enable', // boolean
            // 'theme.sound.hit', // string (path to audio file)
            // 'theme.sound.miss', // string (path to audio file)
            'api.endpoints.post', // string (url)
            'opening.element', // string (element id)
            'userConsentButton',
            'survey.enable',
            // 'survey.config',
            // 'survey.element',
            // 'survey.formContainer',
            'instructions.enable',
            // 'instructions.element',
            // 'instructions.searchImages.enable',
            // 'instructions.searchImages.canvas.element',
            // 'instructions.searchImages.canvas.width',
            // 'instructions.searchImages.canvas.height',
            // 'instructions.searchImages.columns',
            'gameplay.element',
            'gameplay.startGameButton',
            'gameplay.backToStartButton',
            // 'gameplay.loadingScreen.enable',
            // 'gameplay.loadingScreen.element',
            // 'gameplay.preparationScreen.enable',
            'gameplay.config.matchGroups',
            'gameplay.config.slides.count',
            'gameplay.config.slides.durationSeconds',
            'gameplay.config.slides.preparationTimeSeconds',
            'gameplay.config.slides.showTargetPosition.enable',
            'gameplay.config.slides.showTargetPosition.timeSeconds',
            'gameplay.config.backgrounds.imagesDir',
            'gameplay.config.backgrounds.data',
            'gameplay.config.backgrounds.groupingField',
            // 'gameplay.config.backgrounds.allowDuplicates',
            'gameplay.config.targets.imagesDir',
            'gameplay.config.targets.data',
            'gameplay.config.targets.groupingField',
            'gameplay.config.targets.size',
            'gameplay.config.targets.detectionRadius',
            // 'gameplay.config.targets.allowDuplicates',
            'gameplay.canvas.element',
            'gameplay.canvas.width',
            'gameplay.canvas.height',
            'gameplay.slideCounter.enable',
            'gameplay.slideCounter.element',
            'results.element',
            'results.stats.element',
            'results.stats.mainResult.element',
            'results.stats.mainResult.path',
            'results.stats.slides.hitRatio',
            'results.stats.slides.totalTiming',
            'results.stats.hits.totalNumberRelative',
            'results.stats.hits.averageTiming',
            'results.stats.hits.fastestHit',
            'results.stats.backgrounds.smallestAverageHitTimingGroup',
            'results.stats.backgrounds.mostFoundGroup',
            'results.stats.targets.smallestAverageHitTimingGroup'
        ];

        let defaultConfig = {
            content: {
                defaultLang: "en",
                texts: {
                    gameLangs: {
                        en: "English"
                    },
                    gameTitle: {
                        en: "Game title"
                    },
                    openingHeading: {
                        en: "Game opening heading"
                    },
                    openingIntro: {
                        en: "<p>Game introductory text</p>",
                    },
                    goToGameButton: {
                        en: "Go to game"
                    },
                    surveySubmitButton: {
                        en: "Start game"
                    },
                    learnMoreButton: {
                        en: "Learn more"
                    },
                    userConsentButton: {
                        en: "I agree"
                    },
                    startGameInteraction: {
                        en: "Click to start the game."
                    },
                    modalFooter: {
                        en: "<p>By clicking “I agree” you're consenting to your click-data and device screen data (such as screen dimensions and orientation) being used for our research. No personal identifying data will be collected, and you're free to stop at any time.</p>"
                    },
                    backToStartButton: {
                        en: "Back to start"
                    },
                    loadingText: {
                        en: "Loading"
                    }
                }
            },
            theme: {
                color: {
                    targetHit: "#55ff00",
                    targetMiss: "#ffffff"
                },
                sound: {
                    enable: false
                }
            },
            survey: {
                enable: false,
            },
            instructions: {
                enable: false,
                element: "instructionsScreen",
                searchImages: {
                    enable: false,
                    canvas: {
                        width: 600,
                        height: "60vh"
                    },
                    columns: 6,
                }
            },
            gameplay: {
                element: "gameplayScreen",
                startGameButton: "searchImagesCanvas",
                backToStartButton: "backToStartButton",
                loadingScreen: {
                    enable: true
                },
                preparationScreen: {
                    enable: false
                },
                config: {
                    matchGroups: true,
                    slides: {
                        count: 42,
                        durationSeconds: 0.25,
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

        // const loadingScreenHtml = `
        //     <div id="loadingScreen" class="game-screen">
        //         <div class="loading-screen-content">
        //             <div class="loading-screen-icon"></div>
        //             <p>${defaultConfig.content.texts.loadingText[defaultConfig.content.defaultLang]}</p>
        //         </div>
        //     </div>
        // `;

        // // Create a temporary container to parse the HTML string
        // const tempContainer = document.createElement('div');
        // tempContainer.innerHTML = loadingScreenHtml;

        // defaultConfig.gameplay.loadingScreen.element = tempContainer.firstElementChild;

        // if (!config.loadingScreen?.element) {
        //     document.body.appendChild(defaultConfig.gameplay.loadingScreen.element);
        // }

        config = this.deepMerge(defaultConfig, config);

        this.config = config;

        // config = { ...defaultConfig, ...config };

        this.checkRequiredProps(config, this.requiredConfigParameters);

        // console.log("fetching data")

        document.addEventListener('DOMContentLoaded', function() {

            let dataToFetch = [
                config.gameplay.config.backgrounds.data,
                config.gameplay.config.targets.data
            ];

            let additionalDataIndex = dataToFetch.length - 1;

            this.survey = {};
            let contentIsString = typeof config.content.texts === "string";

            this.survey.enable = (config.survey.enable == true && typeof config.survey.config === "string");

            let textSourceIndex, surveySourceIndex;

            if (contentIsString) {
                additionalDataIndex++;
                dataToFetch.push(config.content.texts);
                textSourceIndex = additionalDataIndex;
            }

            if (this.survey.enable == true) {
                additionalDataIndex++;
                dataToFetch.push(config.survey.config);
                surveySourceIndex = additionalDataIndex;
            }

            // First, fetch data:
            fetchData(dataToFetch).then(async (data) => {
        
                const fetchedData = {
                    bgData: data[0],
                    tgData: data[1],
                    texts: (contentIsString) ? data[textSourceIndex] : config.content.texts,
                    surveyConfig: (this.survey.enable == true) ? data[surveySourceIndex] : null,
                }

                // data:
                this.texts = fetchedData.texts;
                this.surveyConfig = fetchedData.surveyConfig;
                this.bgData = fetchedData.bgData;
                this.tgData = fetchedData.tgData;

                this.bgImgDir = config.gameplay.config.backgrounds.imagesDir;
                this.tgImgDir = config.gameplay.config.targets.imagesDir;
                this.preloadedBackgrounds = null;
                this.preloadedForgrounds = null;
                this.tgGroupingField = config.gameplay.config.targets.groupingField;
                this.bgGroupingField = config.gameplay.config.backgrounds.groupingField;

                // manual config:
                this.slideCount = config.gameplay.config.slides.count;
                this.slideDurationSeconds = config.gameplay.config.slides.durationSeconds;
                this.enablePreparationScreen = config.gameplay.preparationScreen.enable;
                this.slidePreparationTimeSeconds = config.gameplay.config.slides.preparationTimeSeconds;
                this.targetHitDetectionRadius = config.gameplay.config.targets.detectionRadius;
                this.enableShowTargetPosition = config.gameplay.config.slides.showTargetPosition.enable;
                this.showTargetPositionTimeSeconds = config.gameplay.config.slides.showTargetPosition.timeSeconds;
                // PHP scripts paths:
                this.apiServicePath = config.api.endpoints.post;
                // session and state
                this.session = null;
                this.state = {
                    currentScreen: null,
                    currentSlideIndex: -1,
                    nextSlideIndex: 0,
                    currentTimerId: null,
                    currentSlideTimestamp: null,
                    enableSlideCounter: config.gameplay.slideCounter.enable,
                    device: {
                        orientation: null,
                        pixelDensity: null,
                        screenWidth: null,
                        screenHeight: null,
                        screenAspectRatio: null
                    }
                };

                // define language
                const browserLanguage = navigator.language || navigator.userLanguage;
                this.browserLang = browserLanguage;

                const languageKeys = Object.keys(this.texts.gameLangs);

                let gameLang = config.content.defaultLang;

                for (const lang of languageKeys) {
                    if (this.browserLang.startsWith(lang)) {
                        gameLang = lang;
                        break;
                    }
                }

                this.lang = gameLang;

                // render loading screen
                const loadingScreenHtml = `
                    <div id="loadingScreen" class="game-screen">
                        <div class="loading-screen-content">
                            <div class="loading-screen-icon"></div>
                            <p>${fetchedData.texts.loadingText[this.lang]}</p>
                        </div>
                    </div>
                `;

                // Create a temporary container to parse the HTML string
                const tempContainer = document.createElement('div');
                tempContainer.innerHTML = loadingScreenHtml;

                config.gameplay.loadingScreen.element = tempContainer.firstElementChild;

                if (!config.loadingScreen?.element) {
                    document.body.appendChild(config.gameplay.loadingScreen.element);
                }

                // relevant DOM elements:
                this.screens = {
                    openingScreen: document.getElementById(config.opening.element),
                    gameplayScreen: document.getElementById(config.gameplay.element),
                    resultsScreen: document.getElementById(config.results.element)
                };

                if (typeof config.gameplay.loadingScreen.element === "string") {
                    this.screens.loadingScreen = document.getElementById(config.gameplay.loadingScreen.element);
                } else if (typeof config.gameplay.loadingScreen.element === "object") {
                    this.screens.loadingScreen = config.gameplay.loadingScreen.element;
                }

                this.instructions = config.instructions;

                if (this.survey.enable == true) {
                    this.screens.surveyScreen = document.getElementById(config.survey.element);
                }

                if (this.instructions.enable == true) {
                    this.screens.instructionsScreen = document.getElementById(config.instructions.element);
                }

                // console.log(this.screens);

                this.gameCanvas = {
                    element: document.getElementById(config.gameplay.canvas.element),
                    originalWidth: config.gameplay.canvas.width,
                    originalHeight: config.gameplay.canvas.height,
                    actualWidth: null,
                    actualHeight: null,
                    resizedWidth: null,
                    resizedHeight: null,
                }
                this.slideCounterId = config.gameplay.slideCounter.element;

                this.gameCanvas.aspectRatio = this.gameCanvas.originalWidth / this.gameCanvas.originalHeight;

                if (this.instructions.enable == true) {
                    this.searchImagesCanvas = {
                        element: document.getElementById(config.instructions.searchImages.canvas.element),
                        dimensions: [config.instructions.searchImages.canvas.width, config.instructions.searchImages.canvas.height],
                        nColumns: config.instructions.searchImages.columns
                    }
                }

                this.gameStats = {
                    config: config.results.stats,
                    container: document.getElementById(config.results.stats.element),
                    mainResult: config.results.stats.mainResult.path,
                    mainResultElement: document.getElementById(config.results.stats.mainResult.element)
                }

                this.buttons = {
                    userConsentButton: document.getElementById(config.userConsentButton),
                    startGameButton: document.getElementById(config.gameplay.startGameButton),
                    backToStartButton: document.getElementById(config.gameplay.backToStartButton),
                };

                this.enableSound = config.theme.sound.enable;

                if (this.enableSound) {

                    this.hitSound = new Audio(config.theme.sound.hit);
                    this.hitSound.load();

                    this.missSound = new Audio(config.theme.sound.miss);
                    this.missSound.load();

                }

                this.targetHitColor = config.theme.color.targetHit;
                this.targetMissColor = config.theme.color.targetMiss;

                // Define a custom event
                this.surveySubmitEvent = new Event('surveySubmit');

                this.setData();

                console.log(this);

                if (this.survey.enable == true) {
                    // Survey object, instantiated by this Game object 
                    this.survey = new Survey({
                        config: this.surveyConfig,
                        session: this.session,
                        containerId: config.survey.formContainer,
                        submitEvent: this.surveySubmitEvent,
                        texts: this.texts,
                        lang: this.lang,
                        apiServicePath: this.apiServicePath
                    });
                }

                // Listen for user interaction and show opening screen:
                this.setupEventListeners();
                // this.showScreen('openingScreen');
                this.state.currentScreen = 'openingScreen';
                this.showScreen('openingScreen');

                document.body.style.display = "block";
        
            });
        
        }.bind(this));

    }

    // Utility function to check for required properties
    checkRequiredProps(obj, requiredProps) {
        for (const prop of requiredProps) {
            const keys = prop.split('.');
            let currentObj = obj;
            for (const key of keys) {
                if (!currentObj || !currentObj.hasOwnProperty(key)) {
                    throw new Error(`Missing required configuration: ${prop}`);
                }
                currentObj = currentObj[key];
            }
        }
    }

    deepMerge(target, source) {
        for (const key in source) {
            if (source[key] instanceof Object && key in target) {
                Object.assign(source[key], this.deepMerge(target[key], source[key]));
            }
        }
        // Join `target` and modified `source`
        Object.assign(target || {}, source);
        return target;
    }

    async preloadImagesAsync(imageUrls) {
        for (const url of imageUrls) {
            await new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = resolve;
                img.onerror = reject;
            });
        }
    }

    setData() {

        const randomBackgrounds = this.randomizeData(
            this.bgData,
            this.config.gameplay.config.slides.count,
            false,
            false,
            false,
            this.bgGroupingField,
            false,
            null
        );

        const randomTargets = this.randomizeData(
            this.tgData,
            this.config.gameplay.config.slides.count,
            true,
            false,
            true,
            this.tgGroupingField,
            randomBackgrounds,
            this.bgGroupingField
        );

        const tgGroups = this.tgData.map(function(tg) {
            return tg[this.tgGroupingField];
        }.bind(this));

        let uniqueTgGroups = [...new Set(tgGroups)];

        this.targetGroupsLength = uniqueTgGroups.length;

        // console.log("randomize search images");

        // console.log(randomTargets);

        const searchImages = this.randomizeData(
            randomTargets,
            this.targetGroupsLength,
            false,
            false,
            true,
            this.tgGroupingField,
            false,
            null
        );

        this.session = new Session({
            backgrounds: randomBackgrounds,
            targets: randomTargets,
            slideCount: this.config.gameplay.config.slides.count,
            searchImages: searchImages,
            tgGroupingField: this.tgGroupingField,
            bgGroupingField: this.bgGroupingField
        });

        this.measureScreen();
        this.computeGameDimensions();

        this.session.initialCanvasWidth = this.gameCanvas.resizedWidth;
        this.session.initialCanvasHeight = this.gameCanvas.resizedHeight;

        this.slideCounter = new SlideCounter({
            state: this.state,
            container: document.getElementById(this.slideCounterId),
            slideCount: this.config.gameplay.config.slides.count,
            slideDurationSeconds: this.slideDurationSeconds,
            canvas: this.gameCanvas,
            session: this.session
        });

        this.session.lang = this.lang;
        this.session.browserLang = this.browserLang;

        this.session.backgrounds.forEach(function(item, index){
            this.session.results[index].backgroundFilename = item.filename;
            this.session.results[index].backgroundIndex = item.originalIndex;
            this.session.results[index]["background_" + this.bgGroupingField] = item[this.bgGroupingField];

            if (this.lang == "pt" && item[this.bgGroupingField + "_pt"]) {
                this.session.results[index]["background_" + this.bgGroupingField + "_label"] = item[this.bgGroupingField + "_pt"];
            }

            if (this.lang == "en" && item[this.bgGroupingField + "_en"]) {
                this.session.results[index]["background_" + this.bgGroupingField + "_label"] = item[this.bgGroupingField + "_en"];
            }

        }.bind(this));

        this.session.targets.forEach(function(item, index){

            this.session.results[index].targetFilename = item.filename;
            this.session.results[index].targetIndex = item.originalIndex;
            this.session.results[index].originalTargetX = item.coordinates[0];
            this.session.results[index].originalTargetY = item.coordinates[1];
            this.session.results[index].targetRotation = item.rotation;
            this.session.results[index]["target_" + this.tgGroupingField] = item[this.tgGroupingField];

            if (this.lang == "pt" && item[this.tgGroupingField + "_pt"]) {
                this.session.results[index]["target_" + this.tgGroupingField + "_label"] = item[this.tgGroupingField + "_pt"];
            }

            if (this.lang == "en" && item[this.tgGroupingField + "_en"]) {
                this.session.results[index]["target_" + this.tgGroupingField + "_label"] = item[this.tgGroupingField + "_en"];
            }

        }.bind(this));

        this.searchImgSources = this.session.searchImages.map(function (img, i) {
            let imgPath = this.tgImgDir + "/" + this.session.searchImages[i].filename;
            return imgPath;
        }.bind(this));

        this.searchPromises = [];

    }

    async setupEventListeners() {

        this.buttons['userConsentButton'].addEventListener('click', async () => {

            if (this.survey.enable == false && this.instructions.enable == false) {
                // if survey and instructions is disabled, go straight to game
                this.startGamePlay();
            } else {
                    
                if (this.survey instanceof Survey) {
                    // if survey is enabled, instantiate it
                    // console.log(this.survey instanceof Survey);
                    this.showScreen('surveyScreen');
                    this.state.currentScreen = 'surveyScreen';
                }

                this.preloadedSearchImgs = await this.preloadImages(this.searchImgSources, this.searchPromises);
                console.log("preloaded search images");

                if (this.survey.enable == false && this.instructions.enable == true) {
                    // if survey is disabled, go straight to instructions screen
                    this.showScreen('loadingScreen');
                    this.showScreen('instructionsScreen');
                    this.state.currentScreen = 'instructionsScreen';
                    this.renderSearchImages();
                }

            }

        });

        this.buttons['startGameButton'].addEventListener('click', () => {
            if (this.state.currentScreen == 'instructionsScreen') {
                this.startGamePlay();
            }
        });

        this.buttons['backToStartButton'].addEventListener('click', () => {
            window.location.reload();
            // this.resetGame();
            // console.log(this);
        });

        this.gameCanvas.element.addEventListener('click', (event) => {
            this.handleCanvasClick(event);
        });

        // Orientation change
        window.addEventListener('orientationchange', () => {
            // console.log("changed orientation");
            this.measureScreen();
        });

        // resize with debouncing
        window.addEventListener("resize", this.debounce(function(e) {

            // console.log("end of resizing");
            this.measureScreen();

            this.computeGameDimensions();
            this.resizeGame();

            let eventObj = {
                session: this.session.id,
                timestamp: this.getFormattedDate(),
                resizedTargetX: null, 
                resizedTargetY: null,
                resizedCanvasWidth: this.gameCanvas.resizedWidth,            
                resizedCanvasHeight: this.gameCanvas.resizedHeight,
                clickX: null,
                clickY: null,
                slideIndex: this.state.currentSlideIndex || -1,
                type: "resize",
                hitTarget: null,
                screenWidth: this.state.device.screenWidth,
                screenHeight: this.state.device.screenHeight,
                pixelDensity: this.state.device.pixelDensity,
                screenOrientation: this.state.device.orientation
            }

            // push the event object
            this.session.events.push(eventObj);

            // console.log(this.state.device.screenWidth);

            // console.log(this.session.events);

        }.bind(this), 200));
    
        // Dark mode change
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            this.measureScreen();
        });

        // Forced colors change
        window.matchMedia('(forced-colors: active)').addEventListener('change', () => {
            this.measureScreen();
        });

        window.addEventListener("wheel", this.debounce(function(e) {

            if (e.ctrlKey) {
                // console.log(window.devicePixelRatio);
            }

        }.bind(this), 200));

        window.addEventListener('wheel', event => {
            const { ctrlKey } = event
            if (ctrlKey) {
               event.preventDefault();
               return
            }
        }, { passive: false });

        window.addEventListener('surveySubmit', async (event) => {

            // console.log('Custom event triggered:', event);

            if (this.instructions.enable == true) {
                this.showScreen('loadingScreen');
                this.preloadedSearchImgs = await this.preloadImages(this.searchImgSources, this.searchPromises);
                this.showScreen('instructionsScreen');
                this.state.currentScreen = 'instructionsScreen';
                this.renderSearchImages();
            } else {
                this.startGamePlay();
            }
        
        });

        // window.addEventListener('gestureend', function(e) {
        //     if (e.scale < 1.0) {
        //         console.log("deu zoom");
        //     } else if (e.scale > 1.0) {
        //         console.log("tirou zoom");
        //     }
        // }, false);

    }

    measureScreen() {
        this.state.device.orientation = (window.screen.orientation) ? window.screen.orientation.type : 'unknown';
        this.state.device.pixelDensity = window.devicePixelRatio || 1;
        this.state.device.screenWidth = window.innerWidth;
        this.state.device.screenHeight = window.innerHeight;
        this.state.device.screenAspectRatio = this.state.device.screenWidth / this.state.device.screenHeight;
    }

    showScreen(screenId) {
        Object.values(this.screens).forEach(screen => screen.classList.remove('active'));
        this.screens[screenId].classList.add('active');
    }

    computeGameDimensions() {

        if (this.gameCanvas.aspectRatio >= this.state.device.screenAspectRatio) {
            //console.log("screen is taller than canvas, fill screen width: " + this.state.device.screenWidth);
            this.gameCanvas.resizedWidth     = this.state.device.screenWidth;
            this.gameCanvas.resizedHeight    = this.gameCanvas.resizedWidth / this.gameCanvas.aspectRatio;
        }

        if (this.gameCanvas.aspectRatio < this.state.device.screenAspectRatio) {
            //console.log("screen is wider than canvas, fill screen height: " + this.state.device.screenHeight);
            this.gameCanvas.resizedHeight   = this.state.device.screenHeight - 32;
            this.gameCanvas.resizedWidth    = this.gameCanvas.resizedHeight * this.gameCanvas.aspectRatio;
        }

        this.resizedTargetHitDetectionRadius = this.remapToRange(
            this.targetHitDetectionRadius,
            0, this.gameCanvas.originalHeight,
            0, this.gameCanvas.resizedHeight
        );

        this.gameCanvas.actualWidth = this.gameCanvas.resizedWidth * this.state.device.pixelDensity;
        this.gameCanvas.actualHeight = this.gameCanvas.resizedHeight * this.state.device.pixelDensity;

        // console.log("game actual size:");
        // console.log(this.gameCanvas.actualWidth, this.gameCanvas.actualHeight);

    }

    resizeGame() {
        
        if (this.preloadedBackgrounds !== null) {
            this.resizeCanvas();
            this.renderImages();
            this.slideCounter.resize();
        }

        if (this.state.currentScreen == 'instructionsScreen') {
            this.renderSearchImages();   
        }

    }

    resizeCanvas() {

        const canvasContext = this.gameCanvas.element.getContext('2d');

        this.gameCanvas.element.style.width = this.gameCanvas.resizedWidth + "px";
        this.gameCanvas.element.style.height = this.gameCanvas.resizedHeight + "px";

        canvasContext.scale(this.state.device.pixelDensity, this.state.device.pixelDensity);

        this.gameCanvas.element.width = this.gameCanvas.actualWidth;
        this.gameCanvas.element.height = this.gameCanvas.actualHeight;

    }

    startGamePlay() {

        (async () => {

            this.state.currentScreen = 'loadingScreen';

            this.showScreen('loadingScreen');

            // this.preloadedBackgrounds = await this.preloadImages(bgSources);
            // this.preloadedTargets = await this.preloadImages(tgSources, this.tgPromises);

            // this.resizeGame();

            this.resizeCanvas();
            this.slideCounter.resize();

            this.slideCounter.render();

            // this.showScreen('gameplayScreen');

            this.state.currentSlideIndex = 0;

            this.prepareNextSlide();

        })();

    }

    debounce(func, wait) {
        let timer;
        return function(event) {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => func(event), wait);
        };
    }      

    groupArray(inputArray, groupBy) {
        return inputArray.reduce((acc, item, index) => {
            // Access the group property dynamically using item[groupBy]
            const group = item[groupBy];

            const existingType = acc.find(type => type.group === group);
            const itemWithIndex = { ...item, originalIndex: index };
    
            if (existingType) {
                existingType.items.push(itemWithIndex);
            } else {
                let obj = {
                    group: group,
                    items: [itemWithIndex]
                };

                if (item[groupBy + "_" + this.lang]) {
                    obj["label"] = item[groupBy + "_" + this.lang];
                }

                acc.push(obj);
            }
            return acc;
        }, []);
    }    

    divideWithRemainder(dividend, divisor) {
        const quotient = Math.floor(dividend / divisor);
        const remainder = dividend % divisor;
        return { quotient, remainder };
    }

    randomizeData(
        data, 
        sampleSize, 
        randomizeCoordinates, 
        customCoordinatesDomain, 
        randomizeRotation, 
        groupingField,
        dataToMatch, 
        groupingFieldToMatch) {

        // console.log("---");
        // console.log(data);
        // console.log(customCoordinatesDomain !== false);

        let domainSize = data.length;
        let randomizedData;

        // grouping feature is active
        if (groupingField !== null && groupingField !== undefined && (typeof groupingField === 'string' || groupingField instanceof String)) {

            // group dataset based on specified grouping field
            let groups = this.groupArray(data, groupingField);

            // get number of groups
            let groupCount = groups.length;

            // calculate sample (integer) size per group, and store remainder for later use
            let sampleDivisionWithRemainder = this.divideWithRemainder(sampleSize, groupCount);

            // base sample size per group, dismissing the division remainder
            let groupSampleSize = sampleDivisionWithRemainder.quotient;

            // randomly determine which groups samples get to be incremented by 1, due to the presence of a remainder in sample distribution among data groups
            let adjustedGroupsIndices = this.createShuffledArray(groupCount, sampleDivisionWithRemainder.remainder);

            let maxSampleSize = (sampleDivisionWithRemainder.remainder > 0) ? groupSampleSize + 1 : groupSampleSize;

            let groupedRandomItems = groups.map(function(group, index) {

                if(group.items.length < maxSampleSize) {
                    alert("Dataset in " + group["group"] + " group is not large enough. The group was supposed to be at least " + maxSampleSize + " items long.");
                    console.log("Dataset in " + group["group"] + " group is not large enough. The group was supposed to be at least " + maxSampleSize + " items long.");
                }

                let groupLength = group.items.length;
                let adjustedGroupSampleSize = (adjustedGroupsIndices.includes(index)) ? groupSampleSize + 1 : groupSampleSize;
                // console.log(group["group"] + ": " + adjustedGroupSampleSize)
                let randomGroupIndices = this.createShuffledArray(groupLength, adjustedGroupSampleSize);
                let randomObjects = randomGroupIndices.map(function(index) {

                    let extraProperties = {};

                    if (randomizeCoordinates) {

                        // randomize coordinates preventing placing the object partially outside the canvas
                        if (customCoordinatesDomain !== false) {
                            extraProperties.coordinates = [
                                Math.floor(Math.random() * (customCoordinatesDomain[0] - 2 * this.targetHitDetectionRadius)) + this.targetHitDetectionRadius,
                                Math.floor(Math.random() * (customCoordinatesDomain[1] - 2 * this.targetHitDetectionRadius)) + this.targetHitDetectionRadius
                            ];
                        } else {
                            extraProperties.coordinates = [
                                Math.floor(Math.random() * (this.gameCanvas.originalWidth - 2 * this.targetHitDetectionRadius)) + this.targetHitDetectionRadius,
                                Math.floor(Math.random() * (this.gameCanvas.originalHeight - 2 * this.targetHitDetectionRadius)) + this.targetHitDetectionRadius
                            ];
                        }
                    }

                    if (randomizeRotation) {
                        extraProperties.rotation = Math.floor(Math.random() * 360) + 1;
                    }
                    
                    return {
                        ...group.items[index],
                        ...extraProperties
                    };
                }.bind(this));
                return randomObjects;
            }.bind(this));

            let groupedDataToMatch;
            let minimumSampleSize;
            
            if (dataToMatch) {
                groupedDataToMatch = this.groupArray(dataToMatch, groupingFieldToMatch);
                minimumSampleSize = groupedDataToMatch.length * groupedRandomItems.length;
            }

            // only match data if dataToMatch setting is on and sample size is large enough
            if (!dataToMatch || (sampleSize < minimumSampleSize)) {

                if ((sampleSize < minimumSampleSize) && dataToMatch) {
                    console.log("sample size is not large enough to match targets and background groups");
                }

                randomizedData = groupedRandomItems.flat().map(function(item){

                    let extraProperties = {};

                    if (randomizeCoordinates) {
                        // randomize coordinates preventing placing the object partially outside the canvas
                        if (customCoordinatesDomain !== false) {
                            extraProperties.coordinates = [
                                Math.floor(Math.random() * (customCoordinatesDomain[0] - 2 * this.targetHitDetectionRadius)) + this.targetHitDetectionRadius,
                                Math.floor(Math.random() * (customCoordinatesDomain[1] - 2 * this.targetHitDetectionRadius)) + this.targetHitDetectionRadius
                            ];
                        } else {
                            extraProperties.coordinates = [
                                Math.floor(Math.random() * (this.gameCanvas.originalWidth - 2 * this.targetHitDetectionRadius)) + this.targetHitDetectionRadius,
                                Math.floor(Math.random() * (this.gameCanvas.originalHeight - 2 * this.targetHitDetectionRadius)) + this.targetHitDetectionRadius
                            ];
                        }
                    }

                    if (randomizeRotation) {
                        extraProperties.rotation = Math.floor(Math.random() * 360) + 1;
                    }

                    return {
                        ...item,
                        ...extraProperties
                    }
                }.bind(this));

                randomizedData = this.shuffleArray(randomizedData);
                
            } else {

                // console.log("implement balancing logic;");

                // console.log("dataToMatch:");
                // console.log(dataToMatch);

                // console.log("groupingFieldToMatch:");
                // console.log(groupingFieldToMatch);

                // console.log("groupedDataToMatch:");
                // console.log(groupedDataToMatch);

                // console.log("dataToGroup:");
                // console.log(groups);

                let randomlyMatchedData = [];

                groupedDataToMatch.map(function(groupToMatch) {
                    
                    let groupToMatchLength = groupToMatch.items.length;
                    let groupMirror = [];
                    let reorderingIndices = [];

                    for (let index = 0; index < groupToMatchLength; index++) {

                        let groupLength = groups[index].items.length;

                        // Check if the range is valid
                        if (typeof groupLength !== 'number' || groupLength <= 0) {
                            console.log("group " + groupingField + " must have at least 1 item");
                        } else {
                            // Generate a random number within the range
                            const randomIndex = Math.floor(Math.random() * groupLength);
                            let itemToCatalog = { ...groups[index].items[randomIndex] };

                            reorderingIndices.push(groupToMatch.items[index].originalIndex);
                            groupMirror.push(itemToCatalog);

                            groups[index].items.splice(randomIndex, 1)
                        }
                    }

                    let shuffledGroupMirror = this.shuffleArray(groupMirror);
                    let shuffledReorderingIndices = this.shuffleArray(reorderingIndices);

                    shuffledGroupMirror.forEach(function(item, i) {
                        item.reorderingIndex = shuffledReorderingIndices[i];
                    })

                    randomlyMatchedData.push(...shuffledGroupMirror);

                }.bind(this));

                let reorderedRandomlyMatchedData = [];

                for (let i = 0; i < randomlyMatchedData.length; i++) {
                    let nextItemInQueue = randomlyMatchedData.filter(function(item){
                        return item.reorderingIndex == i;
                    })[0];
                    delete nextItemInQueue.reorderingIndex;

                    nextItemInQueue.coordinates = [
                        Math.floor(Math.random() * (this.gameCanvas.originalWidth - 2 * this.targetHitDetectionRadius)) + this.targetHitDetectionRadius,
                        Math.floor(Math.random() * (this.gameCanvas.originalHeight - 2 * this.targetHitDetectionRadius)) + this.targetHitDetectionRadius
                    ];

                    nextItemInQueue.rotation = Math.floor(Math.random() * 360) + 1;

                    reorderedRandomlyMatchedData.push(nextItemInQueue);
                }

                randomizedData = reorderedRandomlyMatchedData;

            }

        } else {

            const shuffledIndices = this.createShuffledArray(domainSize, sampleSize);

            randomizedData = shuffledIndices.map(function(randomizedIndex) {

                // randomize coordinates preventing placing the object partially outside the canvas
                const coordinates = [
                    Math.floor(Math.random() * (this.gameCanvas.originalWidth - 2 * this.targetHitDetectionRadius)) + this.targetHitDetectionRadius,
                    Math.floor(Math.random() * (this.gameCanvas.originalHeight - 2 * this.targetHitDetectionRadius)) + this.targetHitDetectionRadius
                ];

                const rotation = Math.floor(Math.random() * 360) + 1;
            
                return {
                    ...data[randomizedIndex],
                    randomizedIndex: randomizedIndex,
                    coordinates: coordinates,
                    rotation: rotation
                };
            }.bind(this));

            randomizedData = this.shuffleArray(randomizedData);

        }

        return randomizedData;

    }

    createShuffledArray(length, slideCount) {
        // Create an array with numbers from 0 to length-1
        const numbers = Array.from({ length }, (_, i) => i);
    
        // Shuffle the array using the Fisher-Yates algorithm
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
    
        // Slice the shuffled array to the desired slideCount
        const shuffledArray = numbers.slice(0, slideCount);
        
        return shuffledArray;
    }

    shuffleArray(array) {
        // console.log(array);
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    renderSearchImages() {

        const searchImagesCanvasContext = this.searchImagesCanvas.element.getContext('2d');

        // this.searchImagesCanvas.element.style.width = this.searchImagesCanvas.dimensions[0] + "px";
        this.searchImagesCanvas.element.style.width = "100%";
        this.searchImagesCanvas.element.style.height = this.searchImagesCanvas.dimensions[1];

        let canvasWidth = this.searchImagesCanvas.element.getBoundingClientRect().width;
        let canvasHeight = this.searchImagesCanvas.element.getBoundingClientRect().height;

        // Calculate actual width according to screen density
        // this.searchImagesCanvas.actualWidth = this.searchImagesCanvas.dimensions[0] * this.state.device.pixelDensity;
        this.searchImagesCanvas.actualWidth = canvasWidth * this.state.device.pixelDensity;
        this.searchImagesCanvas.actualHeight = canvasHeight * this.state.device.pixelDensity;

        // Set the canvas size taking into account the device pixel ratio
        this.searchImagesCanvas.element.width = this.searchImagesCanvas.actualWidth;
        this.searchImagesCanvas.element.height = this.searchImagesCanvas.actualHeight;

        // Scale the canvas drawing surface to match the device pixel ratio
        searchImagesCanvasContext.scale(this.state.device.pixelDensity, this.state.device.pixelDensity);

        let nRows = Math.ceil(this.targetGroupsLength / this.searchImagesCanvas.nColumns);

        // Grid of search images
        let searchImagesHorSpacing = canvasWidth / this.searchImagesCanvas.nColumns;
        let searchImagesVerSpacing = canvasHeight / nRows;

        let searchImagesPositions = [];
        let currentSearchImage = 0;
        let rowIndex = 0;

        while (currentSearchImage < this.targetGroupsLength) {
            for (let colIndex = 0; colIndex < this.searchImagesCanvas.nColumns; colIndex++) {
                if (currentSearchImage >= this.targetGroupsLength) {
                    break;
                }
                let item = [
                    Math.ceil((colIndex * searchImagesHorSpacing) + (searchImagesHorSpacing / 2)),
                    Math.ceil((rowIndex * searchImagesVerSpacing) + (searchImagesVerSpacing / 2))
                ];
                searchImagesPositions.push(item);
                currentSearchImage++;
            }
            rowIndex++;
        }

        this.preloadedSearchImgs.forEach(function (img, i) {
            // Save the current state of the canvas
            searchImagesCanvasContext.save();

            // Translate to the center of the square
            searchImagesCanvasContext.translate(
                searchImagesPositions[i][0],
                searchImagesPositions[i][1]
            );

            const angleInRadians = this.session.searchImages[i].rotation * Math.PI / 180;

            // Rotate the canvas
            searchImagesCanvasContext.rotate(angleInRadians);

            searchImagesCanvasContext.drawImage(
                img,
                -this.resizedTargetHitDetectionRadius,
                -this.resizedTargetHitDetectionRadius,
                this.resizedTargetHitDetectionRadius * 2,
                this.resizedTargetHitDetectionRadius * 2
            );

            // Restore the canvas state
            searchImagesCanvasContext.restore();
        }.bind(this));

        // preload everything in advance

        const bgData = this.bgData;
        const tgData = this.tgData;
        const bgImgDir = this.bgImgDir;
        const tgImgDir = this.tgImgDir;

        const bgSources = this.session.backgrounds.map(function(bg) {
            let bgPath = bgImgDir + "/" + bgData[bg.originalIndex].filename;
            return bgPath;
        });

        this.bgSources = bgSources;

        const tgSources = this.session.targets.map(function(tg) {
            let tgPath = tgImgDir + "/" + tgData[tg.originalIndex].filename;
            return tgPath;
        });

        this.tgSources = tgSources;

        this.tgPromises = Array(this.tgSources.length).fill(null).map(() => this.createPendingPromise());
        this.bgPromises = Array(this.bgSources.length).fill(null).map(() => this.createPendingPromise());

        this.preloadedBackgrounds = [];
        this.preloadedTargets = [];

        this.backgroundPreloadImages(this.bgSources, this.bgPromises);
        this.backgroundPreloadImages(this.tgSources, this.tgPromises);

        console.log("started preloading the ingame images");

    }

    async showTargetPosition() {

        this.state.currentScreen = 'showingTargetPosition';

        let targetX = this.remapToRange(
            this.session.results[this.state.currentSlideIndex].originalTargetX,
            0, this.gameCanvas.originalWidth,
            0, this.gameCanvas.resizedWidth
        );

        let targetY = this.remapToRange(
            this.session.results[this.state.currentSlideIndex].originalTargetY,
            0, this.gameCanvas.originalWidth,
            0, this.gameCanvas.resizedWidth
        );

        // console.log("show target position:");
        // console.log(this.session.results[this.state.currentSlideIndex]);
        // console.log(targetX * this.state.device.pixelDensity, targetY  * this.state.device.pixelDensity);
        // console.log(this.resizedTargetHitDetectionRadius);

        const canvasContext = this.gameCanvas.element.getContext('2d');

        canvasContext.save();

        canvasContext.translate(targetX * this.state.device.pixelDensity, targetY * this.state.device.pixelDensity);

        canvasContext.lineWidth = 2; // You can adjust the line width as needed


        canvasContext.strokeStyle = (this.session.results[this.state.currentSlideIndex].hitTarget) ? this.targetHitColor : this.targetMissColor;
        
        if (this.enableSound && this.session.results[this.state.currentSlideIndex].hitTarget) {
            this.hitSound.play();
        }

        // Draw the outlined circle
        canvasContext.beginPath();
        canvasContext.arc(
            0, // x-coordinate of the center
            0, // y-coordinate of the center
            this.resizedTargetHitDetectionRadius * this.state.device.pixelDensity, // radius
            0, // start angle
            2 * Math.PI // end angle
        );
        canvasContext.stroke();

        canvasContext.restore();

        await new Promise(resolve => setTimeout(resolve, this.showTargetPositionTimeSeconds * 1000));

    }

    async prepareNextSlide() {
        
        this.state.currentScreen = 'slidePreparation';
    
        const startTime = performance.now();  // Start timing

        // // console.log("---");
        // // console.log("Getting ready to slide number " + (this.state.nextSlideIndex + 1));

        // const canvasContext = this.gameCanvas.element.getContext('2d');
        // canvasContext.clearRect(0, 0, this.gameCanvas.originalWidth, this.gameCanvas.originalHeight);
        // canvasContext.fillStyle = 'black';
        // canvasContext.fillRect(0+10, 0+10, this.gameCanvas.originalWidth-20, this.gameCanvas.originalHeight-20);

        // // Set the text properties
        // const text = "Get ready to slide number " + (this.state.nextSlideIndex + 1);
        // const fontSize = 32;
        // const fontFamily = '"Skolar Sans Latin", system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"';
        // const textColor = 'white';

        // // Calculate the center coordinates of the canvas
        // const centerX = this.gameCanvas.originalWidth / 2;
        // const centerY = this.gameCanvas.originalHeight / 2;

        // // Set text alignment to center
        // canvasContext.textAlign = 'center';
        // canvasContext.textBaseline = 'middle';

        // // Set the font
        // canvasContext.font = `${fontSize}px ${fontFamily}`;

        // // Set the fill color
        // canvasContext.fillStyle = textColor;

        // // Render the text in the middle of the canvas
        // canvasContext.fillText(text, centerX, centerY);

        // console.log(this.bgPromises[this.state.nextSlideIndex].promise);

        const bgPromiseObject = this.bgPromises[this.state.nextSlideIndex];
        const bgPromiseState = bgPromiseObject.getState();

        const tgPromiseObject = this.tgPromises[this.state.nextSlideIndex];
        const tgPromiseState = tgPromiseObject.getState();

        // const promiseState = this.checkPromiseState(this.bgPromises[this.state.nextSlideIndex]);
        // console.log(`Promise state for slide ${this.state.nextSlideIndex}:`, promiseState);

        let nextBg;
        let nextTg;

        if (tgPromiseState === "fulfilled") {
            nextTg = await tgPromiseObject.promise;
            // console.log(nextBg);
        } else if (tgPromiseState === "pending") {
            console.log("Target image still not loaded. Waiting...");
            try {
                nextTg = await tgPromiseObject.promise;
                console.log("img finally loaded");
            } catch (error) {
                console.error("Failed to load image:", error);
                nextTg = null;
            }
        }

        if (bgPromiseState === "fulfilled") {
            nextBg = await bgPromiseObject.promise;
            // console.log(nextBg);
        } else if (bgPromiseState === "pending") {
            console.log("img not loaded, waiting...");
            try {
                nextBg = await bgPromiseObject.promise;
                console.log("img finally loaded");
            } catch (error) {
                console.error("Failed to load image:", error);
                nextBg = null;
            }
        }
        // let nextBg = await this.preloadImage(this.bgSources[this.state.nextSlideIndex]);
        // let nextTg = await this.preloadImage(this.tgSources[this.state.nextSlideIndex]);
    
        const endTime = performance.now();  // End timing
        const elapsedTime = endTime - startTime;  // Calculate the elapsed time
    
        this.preloadedBackgrounds.push(nextBg);
        this.preloadedTargets.push(nextTg);
    
        // console.log(this.preloadedBackgrounds);
        // console.log(nextTg);
    
        const preparationTimeMs = this.slidePreparationTimeSeconds * 1000;
        const remainingTime = Math.max(preparationTimeMs - elapsedTime, 0);  // Calculate remaining time
    
        if (this.enablePreparationScreen) {
            setTimeout(() => {
                this.renderNextSlide();
            }, remainingTime);  // Set timeout to the remaining time
        } else {
            this.renderNextSlide();
        }
    }    

    async renderNextSlide() {

        if (this.state.nextSlideIndex == 0) {
            this.showScreen('gameplayScreen');
        }

        // update state
        this.state.currentScreen = 'slide';
        this.state.currentSlideTimestamp = Date.now();

        if (this.preloadedBackgrounds[this.state.nextSlideIndex] !== null 
            && this.preloadedBackgrounds[this.state.nextSlideIndex] !== undefined
            && this.preloadedTargets[this.state.nextSlideIndex] !== null 
            && this.preloadedTargets[this.state.nextSlideIndex] !== undefined) {
            this.renderImages();
            // save slide start timestamp
            this.session.results[this.state.currentSlideIndex].startTimestamp = this.getFormattedDate();
        } else {
            // save slide start timestamp
            this.session.results[this.state.currentSlideIndex].startTimestamp = null;
            this.clearSlide();
        }

        // update canvas and counter
        this.slideCounter.update();

        this.state.currentTimerId = setTimeout(async () => {

            if (this.preloadedBackgrounds[this.state.nextSlideIndex] !== null 
                && this.preloadedBackgrounds[this.state.nextSlideIndex] !== undefined
                && this.preloadedTargets[this.state.nextSlideIndex] !== null 
                && this.preloadedTargets[this.state.nextSlideIndex] !== undefined)
            {
                // save maximum time as slide end time
                this.session.results[this.state.currentSlideIndex].timing = this.slideDurationSeconds * 1000;
                this.session.results[this.state.currentSlideIndex].endTimestamp = this.getFormattedDate();
                await this.showTargetPosition();
            } else {
                this.session.results[this.state.currentSlideIndex].timing = null;
                this.session.results[this.state.currentSlideIndex].endTimestamp = null;
            }

            // update slide count
            this.state.currentSlideIndex = this.state.currentSlideIndex + 1;
            this.state.nextSlideIndex = this.state.nextSlideIndex + 1;

            // go to results or next slide, depending on current slide index
            if (this.state.nextSlideIndex >= this.config.gameplay.config.slides.count) {
                this.finishGame();
            } else {
                this.prepareNextSlide();
            }
        }, this.slideDurationSeconds * 1000);

    }


    preloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = (error) => reject(error);
            img.src = url;
        });
    }

    createPendingPromise() {
        let resolvePromise, rejectPromise;
    
        // Initialize the state as 'pending'
        let state = 'pending';
    
        const promise = new Promise((resolve, reject) => {
            resolvePromise = (value) => {
                state = 'fulfilled';  // Update state to 'fulfilled'
                resolve(value);
            };
            rejectPromise = (reason) => {
                state = 'failed';  // Update state to 'rejected'
                reject(reason);
            };
        });
    
        // Return the promise along with resolve, reject, and a getState function
        return { promise, resolvePromise, rejectPromise, getState: () => state };
    }

    async backgroundPreloadImages(imageUrls, promisesArray) {

        for (let i = 0; i < imageUrls.length; i++) {
            const url = imageUrls[i];
    
            try {
                // Preload the image
                const image = await this.preloadImage(url);
    
                // Resolve the existing pending promise
                promisesArray[i].resolvePromise(image);
            } catch (error) {
                console.error(`Error loading image ${url}:`, error);
    
                // Reject the existing pending promise
                promisesArray[i].rejectPromise('failed');
            }
        }
    }

    async preloadImages(imageUrls, promisesArray) {
        try {
            promisesArray = imageUrls.map(url => this.preloadImage(url));
            return await Promise.all(promisesArray);
        } catch (error) {
            console.error('Error loading images:', error);
        }
    }
    
    // to load images in series
    // async preloadImages(imageUrls) {
    //     const images = [];
    //     for (const url of imageUrls) {
    //         try {
    //             const img = await this.preloadImage(url);
    //             images.push(img);
    //         } catch (error) {
    //             console.error(`Error loading image ${url}:`, error);
    //         }
    //     }
    //     return images;
    // }

    clearSlide() {
        const canvasElement = this.gameCanvas.element;
        const canvasContext = canvasElement.getContext('2d');
        canvasContext.clearRect(0, 0, this.gameCanvas.actualWidth, this.gameCanvas.actualHeight);
    }

    renderImages() {

        const slideIndex = this.state.nextSlideIndex;
        const imgBackground = this.preloadedBackgrounds[slideIndex];
        const imgTarget = this.preloadedTargets[slideIndex];

        const canvasElement = this.gameCanvas.element;
        const session = this.session;

        const canvasContext = canvasElement.getContext('2d');

        canvasContext.clearRect(0, 0, this.gameCanvas.actualWidth, this.gameCanvas.actualHeight);

        canvasContext.drawImage(
            imgBackground, 
            0, 
            0, 
            canvasElement.width, 
            canvasElement.height
        );

        const angleInDegrees = session.targets[slideIndex].rotation;
        const angleInRadians = angleInDegrees * Math.PI / 180;
        const nextTargetCoordinates = session.targets[slideIndex].coordinates;

        // Save the current state of the canvas
        canvasContext.save();

        let remappedCoordinates = [
            this.remapToRange(
                nextTargetCoordinates[0], 
                0, this.gameCanvas.originalWidth, 
                0, this.gameCanvas.actualWidth
            ),
            this.remapToRange(
                nextTargetCoordinates[1], 
                0, this.gameCanvas.originalHeight, 
                0, this.gameCanvas.actualHeight
            )
        ];

        // console.log("canvas original size:");
        // console.log([this.gameCanvas.originalWidth, this.gameCanvas.originalHeight]);

        // console.log("intended target coordinates:");
        // console.log(nextTargetCoordinates);

        // console.log("canvas actual size:");
        // console.log([this.gameCanvas.actualWidth, this.gameCanvas.actualHeight]);

        // console.log("remapped target coordinates:");
        // console.log(remappedCoordinates);

        // console.log("target resized coordinates:");
        // console.log(remappedCoordinates[0] / this.state.device.pixelDensity, remappedCoordinates[1] / this.state.device.pixelDensity);

        // Translate to the center of the square
        canvasContext.translate(remappedCoordinates[0], remappedCoordinates[1]);

        // Rotate the canvas
        canvasContext.rotate(angleInRadians);

        // Draw the square
        const squareSize = this.resizedTargetHitDetectionRadius * 2;

        // console.log(this.resizedTargetHitDetectionRadius);

        // console.log(this.gameCanvas.originalWidth, this.targetHitDetectionRadius, this.gameCanvas.originalWidth/this.targetHitDetectionRadius);
        // console.log(this.gameCanvas.resizedWidth, this.resizedTargetHitDetectionRadius, this.gameCanvas.resizedWidth/this.resizedTargetHitDetectionRadius);

        // console.log("remapped square size:");
        // console.log(squareSize);

        canvasContext.drawImage(
            imgTarget, 
            -this.resizedTargetHitDetectionRadius * this.state.device.pixelDensity,
            -this.resizedTargetHitDetectionRadius * this.state.device.pixelDensity,
            squareSize * this.state.device.pixelDensity,
            squareSize * this.state.device.pixelDensity
        );

        // Restore the canvas state
        canvasContext.restore();
    
    }

    async handleCanvasClick(event) {

        const canvasPosition = this.gameCanvas.element.getBoundingClientRect();
        const canvasOriginX = canvasPosition.left;
        const canvasOriginY = canvasPosition.top;

        // if canvas is clicked during a slide, an event is necessarily registered
        if (this.state.currentScreen == "slide") {

            // get current click timing
            this.session.results[this.state.currentSlideIndex].timing = Date.now() - this.state.currentSlideTimestamp;

            // get current click coordinates
            let clickX = event.clientX - canvasOriginX;
            let clickY = event.clientY - canvasOriginY;

            // console.log("game intended size:");
            // console.log(this.gameCanvas.originalWidth, this.gameCanvas.originalHeight);

            // console.log("game actual size:");
            // console.log(this.gameCanvas.actualWidth, this.gameCanvas.actualHeight);

            // console.log("game resized size:");
            // console.log(this.gameCanvas.resizedWidth, this.gameCanvas.resizedHeight);

            // console.log("click:");
            // console.log(clickX, clickY);

            // get current target center coordinates
            let originalTargetCoordinates = this.session.targets[this.state.currentSlideIndex].coordinates;

            // console.log("target intended coordinates:");
            // console.log(originalTargetCoordinates[0], originalTargetCoordinates[1]);

            let resizedTargetX = this.remapToRange(
                originalTargetCoordinates[0],
                0, this.gameCanvas.originalWidth,
                0, this.gameCanvas.resizedWidth
            );
            let resizedTargetY = this.remapToRange(
                originalTargetCoordinates[1],
                0, this.gameCanvas.originalHeight,
                0, this.gameCanvas.resizedHeight
            );

            // console.log("target resized coordinates:");
            // console.log(resizedTargetX, resizedTargetY);
            
            let distanceToTargetCenter = this.calculateDistance(clickX, clickY, resizedTargetX, resizedTargetY);

            // Check if target was hit
            let hitTarget = (distanceToTargetCenter < this.resizedTargetHitDetectionRadius) ? true : false;

            let eventObj = {
                session: this.session.id,
                timestamp: this.getFormattedDate(),
                resizedTargetX: resizedTargetX, 
                resizedTargetY: resizedTargetY,
                resizedCanvasWidth: this.gameCanvas.resizedWidth,                
                resizedCanvasHeight: this.gameCanvas.resizedHeight,
                clickX: clickX,
                clickY: clickY,
                slideIndex: this.state.currentSlideIndex,
                type: "click",
                hitTarget: hitTarget,
                screenWidth: this.state.device.screenWidth,
                screenHeight: this.state.device.screenHeight,
                pixelDensity: this.state.device.pixelDensity,
                screenOrientation: this.state.device.orientation
            }

            // push the event object
            this.session.events.push(eventObj);

            // if user hits target, update corresponding result object and stop timer
            if (hitTarget) {

                this.session.results[this.state.currentSlideIndex].hitTarget = true;
                this.session.results[this.state.currentSlideIndex].endTimestamp = this.getFormattedDate();

                clearTimeout(this.state.currentTimerId);

                await this.showTargetPosition();

                this.state.currentSlideIndex = this.state.currentSlideIndex + 1;
                this.state.nextSlideIndex = this.state.nextSlideIndex + 1;
            }

            if (this.enableSound && !hitTarget) {
                if (this.missSound.paused) {
                    this.missSound.play();
                } else {
                    this.missSound.currentTime = 0
                }
            }

            // Check if is last slide
            let isLastSlide = (this.state.nextSlideIndex >= this.config.gameplay.config.slides.count) ? true : false;

            // if user hits target but it was not the last, go to next slide
            if (hitTarget && !isLastSlide) {
                this.prepareNextSlide();
            }

            // if user hits last target, finish game
            if (hitTarget && isLastSlide) {
                this.finishGame();
            }
            
        }

    }

    remapToRange(value, domainMin, domainMax, rangeMin, rangeMax) {
        return rangeMin + (value - domainMin) * (rangeMax - rangeMin) / (domainMax - domainMin);
    }

    calculateDistance(x1, y1, x2, y2) {
        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        return distance;
    }

    computeTotalTiming() {
        this.session.totalTiming = this.session.results.reduce((total, slide) => total + slide.timing, 0);
    }

    getFormattedDate() {
        const now = new Date();
        
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JS
        const day = String(now.getDate()).padStart(2, '0');
        
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    convertSecondsToMinutes(inputSeconds, toString) {
        let seconds = Math.floor(inputSeconds);
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;

        if (toString) {
            let minutesString = (minutes > 0) ? `${minutes}m` : "";
            let secondsString = (remainingSeconds > 0) ? `${remainingSeconds}s` : "";
            return minutesString + secondsString;
        }

        return [minutes, remainingSeconds];
    }

    preProcessData(data) {
        if (Array.isArray(data)) {
            return data.map(item => this.preProcessData(item));
        } else if (data !== null && typeof data === 'object') {
            return Object.keys(data).reduce((acc, key) => {
                acc[key] = this.preProcessData(data[key]);
                return acc;
            }, {});
        } else {
            if (data === null) {
                return 'null';
            } else if (data === false) {
                return 'false';
            } else if (data === '') {
                return '';
            } else if (data === true) {
                return 'true';
            } else {
                return data;
            }
        }
    }

    evaluateObjectProperties(obj) {
        const result = {};
    
        function checkProperty(value) {
            if (typeof value !== 'object' || value === null) {
                return value === true;
            }
    
            for (const key in value) {
                if (value.hasOwnProperty(key)) {
                    if (checkProperty(value[key])) {
                        return true;
                    }
                }
            }
            return false;
        }
    
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = checkProperty(obj[key]);
            }
        }
    
        return result;
    }

    finishGame() {

        // sum all timings
        this.computeTotalTiming();

        // build objects to submit
        const eventsRequest = {
            "type": "events",
            "data": this.preProcessData(this.session.events)
        }

        // console.log(JSON.stringify(eventsRequest));

        const resultsRequest = {
            "type": "results",
            "data": this.preProcessData(this.session.results)
        }

        let searchImagesData = this.session.searchImages.map(function(item){

            let itemCopy = {...item};
            itemCopy.session = this.session.id;
            delete itemCopy.coordinates;

            return itemCopy;

        }.bind(this));

        const searchImagesRequest = {
            "type": "search-images",
            "data": this.preProcessData(searchImagesData)
        }

        let sessionData = [{...this.session.device}];
        sessionData[0].id = this.session.id;
        sessionData[0].gameLang = this.session.lang;
        sessionData[0].browserLang = this.session.browserLang;
        sessionData[0].initialCanvasWidth = this.session.initialCanvasWidth;
        sessionData[0].initialCanvasHeight = this.session.initialCanvasHeight;

        for (let key in this.session) {
            if (this.session.hasOwnProperty(key) && key.startsWith('survey_')) {
                sessionData[0][key] = this.session[key];
            }
        }

        const sessionRequest = {
            "type": "session",
            "data": this.preProcessData(sessionData)
        }

        // Submit objects:
        // events:
        this.submitArray(
            eventsRequest, 
            this.apiServicePath
        );

        // results:
        this.submitArray(
            resultsRequest, 
            this.apiServicePath
        );

        // search images:
        this.submitArray(
            searchImagesRequest, 
            this.apiServicePath
        );

        // session:
        this.submitArray(
            sessionRequest, 
            this.apiServicePath
        );

        // After all, show results:
        this.printResults();

        window.scrollTo(0, 0);
          
        this.showScreen('resultsScreen');
        this.state.currentScreen = 'resultsScreen';

        // console.log(this);
    }

    printResults() {

        let gameStatsPropsStatus = this.evaluateObjectProperties(this.gameStats.config);
        let hitObjects = this.session.results.filter(result => result.hitTarget == true);
        let mainResult = this.gameStats.mainResult;

        if (gameStatsPropsStatus.slides) {

            let totalTimingSeconds;

            if (this.gameStats.config.slides.totalTiming == true) {

                let totalTimingMilli = this.session.totalTiming;
                totalTimingSeconds = parseFloat((totalTimingMilli / 1000).toFixed(1));

            }

            if (this.gameStats.config.slides.hitRatio == true) {

                let hitNumber = hitObjects.length;

                let isMainResult = (mainResult[0] == "slides" && mainResult[1] == "hitRatio");

                let resultContainer = isMainResult ? this.gameStats.mainResultElement : this.gameStats.container;
                let resultHTMLTag = isMainResult ? "span" : "p";

                let tgSffx = (hitNumber > 1) ? "s" : "";
                let opilioesSffx = (hitNumber > 1) ? "ões" : "ão";
                // let timeSffx = (totalTimingSeconds >= 2) ? "s" : "";

                let totalTimingMinutes = this.convertSecondsToMinutes(totalTimingSeconds, true);

                let resultElement = document.createElement(resultHTMLTag);
                let resultText;

                let resultWrapper = document.createElement("div");
                resultWrapper.classList.add("result-item");

                let figureWrapper = document.createElement("figure");
                figureWrapper.classList.add("result-item__figure");

                resultWrapper.appendChild(figureWrapper);

                let parentElement = isMainResult ? resultContainer : resultWrapper;
                parentElement.appendChild(resultElement);
                
                if (this.session.lang == "pt") {
                    resultText = `Você encontrou ${hitNumber} opili${opilioesSffx} (de ${this.config.gameplay.config.slides.count}) em ${totalTimingMinutes}.`;
                } else {
                    resultText = `You've spotted ${hitNumber} harvester${tgSffx} (out of ${this.config.gameplay.config.slides.count}) in ${totalTimingMinutes}.`
                }

                resultElement.textContent = resultText;

                if (!isMainResult) {
                    resultContainer.appendChild(parentElement);
                }
                
            }


        }

        if (gameStatsPropsStatus.hits) {

            const totalTiming = hitObjects.reduce((accumulator, item) => {
                return accumulator += item.timing;
            }, 0);

            if (hitObjects.length > 0 && this.gameStats.config.hits.fastestHit == true) {

                const fastestHit = hitObjects.reduce(function (fastestHit, item) {
                    return fastestHit = (item.timing < fastestHit.timing) ? item : fastestHit;
                }.bind(this), hitObjects[0]);

                const fastestHitSeconds = fastestHit.timing / 1000;

                let isMainResult = (mainResult[0] == "hits" && mainResult[1] == "fastestTiming");

                let resultContainer = isMainResult ? this.gameStats.mainResultElement : this.gameStats.container;
                let resultHTMLTag = isMainResult ? "span" : "p";

                let timeSffx = (fastestHitSeconds >= 2) ? "s" : "";

                let resultElement = document.createElement(resultHTMLTag);
                let resultText;

                let resultWrapper = document.createElement("div");
                resultWrapper.classList.add("result-item");

                let figureWrapper = document.createElement("figure");
                figureWrapper.classList.add("result-item__figure");

                let targetImage = document.createElement("img");
                let targetImageUrl = this.tgImgDir + "/" + fastestHit.targetFilename;
                targetImage.setAttribute("src", targetImageUrl);

                figureWrapper.appendChild(targetImage);
                resultWrapper.appendChild(figureWrapper);

                let parentElement = isMainResult ? resultContainer : resultWrapper;
                parentElement.appendChild(resultElement);
                
                if (this.session.lang == "pt") {
                    resultText = `Seu acerto mais rápido levou ${parseFloat(fastestHitSeconds.toFixed(1))} segundo${timeSffx}.`;
                } else {
                    resultText = `Your fastest hit took ${parseFloat(fastestHitSeconds.toFixed(1))} second${timeSffx}.`
                }

                resultElement.textContent = resultText;

                if (!isMainResult) {
                    resultContainer.appendChild(parentElement);
                }

            }

            if (hitObjects.length > 0 && this.gameStats.config.hits.averageTiming == true) {
                let averageTimingSeconds = totalTiming / hitObjects.length / 1000;

                let isMainResult = (mainResult[0] == "hits" && mainResult[1] == "averageTiming");

                let resultContainer = isMainResult ? this.gameStats.mainResultElement : this.gameStats.container;
                let resultHTMLTag = isMainResult ? "span" : "p";

                let timeSffx = (averageTimingSeconds >= 2) ? "s" : "";

                let resultElement = document.createElement(resultHTMLTag);
                let resultText;

                let resultWrapper = document.createElement("div");
                resultWrapper.classList.add("result-item");

                let parentElement = isMainResult ? resultContainer : resultWrapper;
                parentElement.appendChild(resultElement);
                
                if (this.session.lang == "pt") {
                    resultText = `Você levou em média ${parseFloat(averageTimingSeconds.toFixed(1))} segundo${timeSffx} para acertar cada alvo.`;
                } else {
                    resultText = `You took an average of ${parseFloat(averageTimingSeconds.toFixed(1))} second${timeSffx} to hit each target.`
                }

                resultElement.textContent = resultText;

                if (!isMainResult) {
                    resultContainer.appendChild(parentElement);
                }

            }

            if (hitObjects.length > 0 && this.gameStats.config.hits.totalNumberRelative == true) {
            }

        }

        if (gameStatsPropsStatus.backgrounds) {

            const bgGroupField = "background_" + this.bgGroupingField;
            const hitsGroupedByBackground = this.groupArray(hitObjects, bgGroupField);

            if (hitsGroupedByBackground.length > 0) {

                if (this.gameStats.config.backgrounds.mostFoundGroup == true) {

                    const mostFoundGroup = hitsGroupedByBackground.reduce(function(mostFoundGroup, group){
                        return mostFoundGroup = (group.items.length > mostFoundGroup.items.length) ? group : mostFoundGroup;
                    }, hitsGroupedByBackground[0]);

                    let isMainResult = (mainResult[0] == "backgrounds" && mainResult[1] == "mostFoundGroup");
    
                    let resultContainer = isMainResult ? this.gameStats.mainResultElement : this.gameStats.container;
                    let resultHTMLTag = isMainResult ? "span" : "p";

                    let groupName = (mostFoundGroup.label) ? mostFoundGroup.label : mostFoundGroup.group;

                    let hitsSffx = (mostFoundGroup.items.length > 1) ? "s" : "";

                    let resultElement = document.createElement(resultHTMLTag);
                    let resultText;

                    let resultWrapper = document.createElement("div");
                    resultWrapper.classList.add("result-item");

                    let figureWrapper = document.createElement("figure");
                    figureWrapper.classList.add("result-item__figure");

                    let groupImage = document.createElement("img");
                    let groupImageUrl = this.bgImgDir + "/" + mostFoundGroup.group + ".png";
                    groupImage.setAttribute("src", groupImageUrl);

                    figureWrapper.appendChild(groupImage);
                    resultWrapper.appendChild(figureWrapper);

                    let parentElement = isMainResult ? resultContainer : resultWrapper;
                    parentElement.appendChild(resultElement);
                    
                    if (this.session.lang == "pt") {
                        resultText = `O tipo de fundo mais encontrado foi o de ${groupName} (${mostFoundGroup.items.length} acerto${hitsSffx}).`;
                    } else {
                        resultElement = `The most found background type was ${groupName} (${mostFoundGroup.items.length} hit${hitsSffx}).`
                    }

                    resultElement.textContent = resultText;

                    if (!isMainResult) {
                        resultContainer.appendChild(parentElement);
                    }
    
                }
    
                if (this.gameStats.config.backgrounds.smallestAverageHitTimingGroup == true) {
    
                    const averageGroupTimings = hitsGroupedByBackground.map(function(group){
    
                        const groupTotalTiming = group.items.reduce((accumulator, item) => {
                            return accumulator += item.timing;
                        }, 0);

                        let obj = {
                            group: group.group,
                            averageTimingSeconds: groupTotalTiming / group.items.length / 1000
                        };

                        // console.log(group.items[0]);

                        if (group.items[0]["background_type_label"]) {
                            obj["label"] = group.items[0]["background_type_label"];
                        }
    
                        return obj;
    
                    });
    
                    const smallestAverageHitTimingGroup = averageGroupTimings.reduce(function (fastestGroup, group) {
                        return fastestGroup = (group.averageTiming < fastestGroup.averageTiming) ? group : fastestGroup;
                    }.bind(this), averageGroupTimings[0]);

                    let isMainResult = (mainResult[0] == "backgrounds" && mainResult[1] == "smallestAverageHitTimingGroup");
    
                    let resultContainer = isMainResult ? this.gameStats.mainResultElement : this.gameStats.container;
                    let resultHTMLTag = isMainResult ? "span" : "p";

                    let groupName = (smallestAverageHitTimingGroup.label) ? smallestAverageHitTimingGroup.label : smallestAverageHitTimingGroup.group;

                    let timeSffx = (smallestAverageHitTimingGroup.averageTimingSeconds >= 2) ? "s" : "";

                    let resultElement = document.createElement(resultHTMLTag);
                    let resultText;

                    let resultWrapper = document.createElement("div");
                    resultWrapper.classList.add("result-item");

                    let figureWrapper = document.createElement("figure");
                    figureWrapper.classList.add("result-item__figure");

                    let groupImage = document.createElement("img");
                    let groupImageUrl = this.bgImgDir + "/" + smallestAverageHitTimingGroup.group + ".png";
                    groupImage.setAttribute("src", groupImageUrl);

                    figureWrapper.appendChild(groupImage);  
                    resultWrapper.appendChild(figureWrapper);

                    let parentElement = isMainResult ? resultContainer : resultWrapper;
                    parentElement.appendChild(resultElement);
                    
                    if (this.session.lang == "pt") {
                        resultText = `O tipo de fundo com o menor tempo médio de acerto foi o de ${groupName} (${parseFloat(smallestAverageHitTimingGroup.averageTimingSeconds.toFixed(1))} segundo${timeSffx}).`;
                    } else {
                        resultText = `The background type with smallest average hit time was ${groupName} (${parseFloat(smallestAverageHitTimingGroup.averageTimingSeconds.toFixed(1))} second${timeSffx}).`;
                    }

                    resultElement.textContent = resultText;

                    if (!isMainResult) {
                        resultContainer.appendChild(parentElement);
                    }
    
                }

            }

        }

        if (gameStatsPropsStatus.targets) {

            let tgGroupField = "target_" + this.tgGroupingField;

            if (this.gameStats.config.targets.smallestAverageHitTimingGroup == true) {

                let hitsGroupedByTarget = this.groupArray(hitObjects, tgGroupField);
                // console.log(hitsGroupedByTarget);

            }

        }

        let hitTargets = this.session.results.filter(function(result){
            return result.hitTarget == true;
        });
        
    }

    async submitArray(array, apiServicePath) {
        try {

            const stringfiedArray = JSON.stringify(array);
    
            // console.log("submitting array:");
            // console.log(array);  // Log the array of objects
    
            // Send the events array as JSON
            const response = await fetch(apiServicePath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: stringfiedArray
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit array');
            } else {
                const responseData = await response.text();  // Parse the response as JSON
                console.log(response);
            }
    
            // Handle successful submission (if needed)
        } catch (error) {
            console.error('Error submitting array:', error);
        }
    }

    resetGame() {

        // reset data
        this.setData();

        // reset survey
        this.survey = new Survey({
            config: this.surveyConfig,
            session: this.session,
            containerId: surveyContainerId,
            submitEvent: this.surveySubmitEvent,
            texts: this.texts,
            lang: this.lang,
            apiServicePath: this.apiServicePath
        });

        this.state.currentSlideIndex = -1;

        //reset state
        this.state.nextSlideIndex = 0;
        this.state.currentTimerId = null;
        this.state.currentSlideTimestamp = null;

        // console.log(this.gameStats.container);
        // console.log(this.gameStats.mainResult);

        //reset results
        this.gameStats.container.innerHTML = "";
        this.gameStats.mainResultElement.innerHTML = "";

        // go to opening screen
        // this.showScreen('openingScreen');
        this.state.currentScreen = 'openingScreen';
    }

}

class SlideCounter {
    constructor({
        state,
        container,
        slideCount,
        slideDurationSeconds,
        canvas,
        session
    }) {
        this.state = state;
        this.container = container;
        this.enabled = state.enableSlideCounter;
        this.slideCount = slideCount;
        this.canvas = canvas;
        this.slideDurationSeconds = slideDurationSeconds;
        this.session = session;

        if (this.enabled == false) {
            this.container.style.display = "none";
        }
    }

    resize() {
        // console.log(this.canvas.actualWidth);
        this.container.style.width = this.canvas.actualWidth / this.state.device.pixelDensity + "px";
    }

    render() {

        this.clear();
        this.renderItems();
        this.container.style.width = this.canvas.actualWidth / this.state.device.pixelDensity + "px";
        this.container.style.setProperty('--slide-duration', this.slideDurationSeconds + 's');
    }

    clear() {
        this.container.innerHTML = ""
    }

    renderItems() {

        this.content = Array.from({ length: this.slideCount }, (_, i) => {
            const element = document.createElement('div');
            element.className = "marker";
            element.innerHTML = "";
            element.dataset["slideIndex"] = i + 1;
            return element;
        });

        this.container.append(...this.content);

    }

    update() {

        let currentSlideCounter = this.container.querySelector(`[data-slide-index="${this.state.currentSlideIndex + 1}"]`)

        this.container.querySelectorAll(".active").forEach(function(marker){
            marker.classList.remove("active");
        })
        currentSlideCounter.classList.add("active");

    }
}

class Session {
    constructor({
        backgrounds,
        targets,
        slideCount,
        searchImages,
        tgGroupingField,
        bgGroupingField
    }) {
        
        this.id = Date.now() + '-' + Math.floor(Math.random() * 10000);
        this.events = [];
        this.totalTiming = null;
        this.backgrounds = backgrounds;
        this.targets = targets;
        this.searchImages = searchImages;
        this.device = {
            colorDepth: screen.colorDepth,
            forcedColors: window.matchMedia('(forced-colors: active)').matches,
            isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
            IsTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
            initialOrientation: (window.screen.orientation) ? window.screen.orientation.type : 'unknown',
            initialPixelDensity: window.devicePixelRatio || 1,
            initialScreenWidth: window.innerWidth,
            initialScreenHeight: window.innerHeight,
            userAgent: navigator.userAgent
        };
        this.results = Array.from({ length: slideCount }, (_, index) => ({
            session: this.id,
            slideIndex: index,
            backgroundFilename: null,
            [`background_${bgGroupingField}`]: null,
            backgroundIndex: null,
            targetFilename: null,
            [`target_${tgGroupingField}`]: null,
            targetIndex: null,
            originalTargetX: null,
            originalTargetY: null,
            targetRotation: null,
            startTimestamp: null,
            endTimestamp: null,
            timing: null,
            hitTarget: false
        }));

        this.device.initialScreenAspectRatio = this.device.initialScreenWidth / this.device.initialScreenHeight;

    }

}

class Survey {

    constructor({
        config,
        session,
        containerId,
        submitEvent,
        texts,
        lang,
        apiServicePath
    }) {

        this.config = config;
        this.session = session;
        this.container = document.getElementById(containerId);
        this.texts = texts;
        this.lang = lang;
        this.formElement = null;
        this.apiServicePath = apiServicePath;
        this.submitEvent = submitEvent;
        this.formFields = [];

        this.buildForm();
        this.appendForm();

        if (this.config.requireConfirmation) {
            this.appendSubmitButton();   
        } else {
            this.watchFormCompletion();
        }

    }

    buildForm() {
        // Criar o elemento form
        this.formElement = document.createElement('form');

        // Iterar sobre os campos no JSON e adicionar elementos correspondentes ao formulário
        this.config.fields.forEach(field => {

            const fieldDiv = document.createElement('div');
            fieldDiv.classList.add('survey-field');

            const fieldDescription = document.createElement('legend');
            fieldDescription.textContent = field.description[this.lang];
            fieldDescription.classList.add('h2');
            fieldDiv.appendChild(fieldDescription);

            if (field.type === 'radio') {

                field.options.forEach(option => {

                    const fieldContainer = document.createElement('div');
                    fieldContainer.classList.add('form-check');

                    const optionDiv = document.createElement('div');
                    optionDiv.classList.add('form-check');

                    const radioInput = document.createElement('input');
                    radioInput.classList.add('form-check-input');
                    radioInput.type = 'radio';
                    radioInput.name = field.id;
                    radioInput.value = option.value;

                    const radioLabel = document.createElement('label');
                    radioLabel.classList.add('form-check-label');
                    radioLabel.htmlFor = field.id;
                    radioLabel.textContent = option.label[[this.lang]]; // Use English text for option label

                    fieldContainer.appendChild(radioInput);
                    fieldContainer.appendChild(radioLabel);

                    fieldDiv.appendChild(fieldContainer);

                    this.formFields.push(radioInput);

                });

            }

            if (field.type === 'radio-button') {

                field.options.forEach(option => {

                    const fieldContainer = document.createElement('div');
                    fieldContainer.classList.add('form-check');
                    fieldContainer.classList.add('form-radio-button-check');

                    const optionDiv = document.createElement('div');
                    optionDiv.classList.add('form-check');

                    const radioInput = document.createElement('input');
                    radioInput.classList.add('form-check-input');
                    radioInput.classList.add('radio-button');
                    radioInput.type = 'radio';
                    radioInput.name = field.id;
                    radioInput.value = option.value;

                    const radioLabel = document.createElement('label');
                    radioLabel.classList.add('form-check-label');
                    radioLabel.htmlFor = field.id;
                    radioLabel.textContent = option.label[[this.lang]]; // Use English text for option label

                    fieldContainer.appendChild(radioInput);
                    fieldContainer.appendChild(radioLabel);

                    fieldDiv.appendChild(fieldContainer);

                    this.formFields.push(radioInput);

                });

            }

            this.formElement.appendChild(fieldDiv);

        });

    }

    appendForm() {
        this.container.innerHTML = "";
        this.container.appendChild(this.formElement);
        this.data = new FormData(this.formElement);
    }

    appendSubmitButton() {

        this.submitButton = document.createElement('button');
        this.submitButton.setAttribute('id', 'surveySubmitButton');
        this.submitButton.classList.add('btn');
        this.submitButton.classList.add('btn-primary');
        this.submitButton.classList.add('align-self-start');
        this.submitButton.textContent = this.texts['surveySubmitButton'][this.lang];

        this.container.appendChild(this.submitButton);

        this.submitButton.addEventListener('click', () => {
            this.submit(this.apiServicePath);
            window.dispatchEvent(this.submitEvent);
        });

    }

    async watchFormCompletion() {

        const fieldNames = new Set();
        
        let allFilled = false;

        this.formFields.forEach(field => {

            if (field.name) {
                fieldNames.add(field.name);
            }

            field.addEventListener('change', function(e) {

                allFilled = true;

                fieldNames.forEach(fieldName => {

                    const matchingElements = this.formFields.filter(element => element.name === fieldName);
                    
                    let fieldFilled = false;
            
                    matchingElements.forEach(element => {
                      if (element.type === 'radio') {
                        if (element.checked) {
                          fieldFilled = true;
                        }
                      } else if (element.type !== 'radio' && element.value.trim() !== '') {
                        fieldFilled = true;
                      }
                    });
            
                    if (!fieldFilled) {
                      allFilled = false;
                    }

                });

                if (allFilled) {
                    this.formFields.forEach(field => {
                        field.style.pointerEvents = "none";
                    });
                    setTimeout(() => {
                        this.submit(this.apiServicePath);
                        window.dispatchEvent(this.submitEvent);
                    }, 500);
                }

            }.bind(this));
        });

    }

    updateData() {
        // Iterate over the form fields and append their values to the FormData object
        this.formElement.querySelectorAll('input, select, textarea').forEach(field => {
            if (field.type === 'radio') {
                // Check if the radio button is selected
                if (field.checked) {
                    // Append the selected radio button value to the FormData object
                    this.data.append(field.name, field.value);
                }
            } else {
                // For other field types (e.g., text input, select), append their values directly
                this.data.append(field.name, field.value);
            }
        });
        
    }

    getFormattedDate() {
        const now = new Date();
        
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JS
        const day = String(now.getDate()).padStart(2, '0');
        
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    async submit(apiServicePath) {

        this.updateData();

        // console.log("submitting survey data:");
        
        const formDataArray = Array.from(this.data.entries()).map(([key, value]) => ({ key: key, value: value }));

        const formDataFlatArray = [formDataArray.reduce((acc, current) => {
            acc[current.key] = current.value;
            return acc;
        }, {})];

        for (let key in formDataFlatArray[0]) {
            if (formDataFlatArray[0].hasOwnProperty(key)) {
                this.session["survey_" + key] = formDataFlatArray[0][key];
            }
        }
        
        formDataFlatArray[0]["timestamp"] = this.getFormattedDate();
        formDataFlatArray[0]["session"] = this.session.id;

        const surveyRequest = {
            "type": "survey",
            "data": this.preProcessData(formDataFlatArray)
        }

        const stringfiedRequest = JSON.stringify(surveyRequest);

        // console.log(stringfiedRequest);

        try {

            // let response1 = fetch(apiServicePath, {
            //     method: 'POST',
            //     body: stringfiedRequest
            // });
            
            const response = await fetch(apiServicePath, {
                method: 'POST',
                body: stringfiedRequest
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit survey');
            } else {
                console.log(response);  // Print the response data
                const responseData = await response.json(); // Use .json() if the response is JSON
                console.log(responseData);
            }
    
            // Handle successful submission (if needed)
        } catch (error) {
            console.error('Error submitting survey:', error);
        }

    }

    preProcessData(data) {
        if (Array.isArray(data)) {
            return data.map(item => this.preProcessData(item));
        } else if (data !== null && typeof data === 'object') {
            return Object.keys(data).reduce((acc, key) => {
                acc[key] = this.preProcessData(data[key]);
                return acc;
            }, {});
        } else {
            if (data === null) {
                return 'null';
            } else if (data === false) {
                return 'false';
            } else if (data === '') {
                return '';
            } else {
                return data;
            }
        }
    }

}

async function fetchData(filePaths) {

    try {
        // Create an array of fetch promises for each file path
        const fetchPromises = filePaths.map(async (filePath) => {
            const response = await fetch(filePath, {
                headers: {
                  'Cache-Control': 'no-cache'
                }
            });

            if (!response.ok) {
                throw new Error(`Error fetching json file: ${filePath}`);
            }

            if (filePath.endsWith('.json')) {
                return response.json();
            }

            if (filePath.endsWith('.csv')) {
                const csvContent = await response.text();
                return csvToJson(csvContent);
            }

        });

        // Wait for all fetch promises to resolve
        const allData = await Promise.all(fetchPromises);
        
        // Return the array of all resolved data
        return allData;

    } catch (error) {
        console.error('Error fetching one or more files', error);
        throw error; // Re-throw the error to allow further handling if needed
    }
}

function csvToJson(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(header => header.trim().replace(/^"|"$/g, ''));
    const result = lines.slice(1).map(line => {
        let values = [];
        let value = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            let char = line[i];

            if (char === '"' && !inQuotes) {
                inQuotes = true;
            } else if (char === '"' && inQuotes) {
                // Check for double quotes in a quoted value
                if (i + 1 < line.length && line[i + 1] === '"') {
                    value += '"';
                    i++; // Skip the next quote
                } else {
                    inQuotes = false;
                }
            } else if (char === ',' && !inQuotes) {
                values.push(value.trim().replace(/^"|"$/g, ''));
                value = '';
            } else {
                value += char;
            }
        }
        values.push(value.trim().replace(/^"|"$/g, ''));

        return headers.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
        }, {});
    });
    return result;
}

export default VisualHunt;