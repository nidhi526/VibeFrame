// ======================================
// VIBEFFrame 2.0 - MAIN JAVASCRIPT
// ======================================


// ======================================
// 1. GET HTML ELEMENTS
// ======================================

const moodButtons = document.querySelectorAll(".mood-btn");
const themeButtons = document.querySelectorAll(".theme-btn");
const moodObjects = document.querySelectorAll(".mood-object");

const vibeFrame = document.getElementById("vibeFrame");

const generateBtn = document.getElementById("generateBtn");
const randomBtn = document.getElementById("randomBtn");
const downloadBtn = document.getElementById("downloadBtn");

const nameInput = document.getElementById("nameInput");
const quoteInput = document.getElementById("quoteInput");

const quoteDisplay = document.getElementById("quoteDisplay");
const nameDisplay = document.getElementById("nameDisplay");
const dateDisplay = document.getElementById("dateDisplay");

const moodText = document.getElementById("moodText");
const moodEmoji = document.getElementById("moodEmoji");


// ======================================
// 2. CURRENT MOOD
// ======================================

let selectedMood = "Happy";
let selectedEmoji = "😊";


// ======================================
// 3. MOOD SELECTION
// ======================================

moodButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Remove active from all mood buttons
        moodButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Activate clicked mood button
        this.classList.add("active");

        // Get selected mood and emoji
        selectedMood = this.dataset.mood;
        selectedEmoji = this.dataset.emoji;


        // --------------------------------------
        // Hide all mood objects
        // --------------------------------------

        moodObjects.forEach(function (object) {
            object.classList.remove("active");
        });


        // --------------------------------------
        // Show selected mood object
        // --------------------------------------

        const objectClass =
            ".object-" + selectedMood.toLowerCase();

        const selectedObject =
            document.querySelector(objectClass);

        if (selectedObject) {
            selectedObject.classList.add("active");
        }


        // --------------------------------------
        // Change mood background
        // --------------------------------------

        if (vibeFrame) {

            vibeFrame.classList.remove(
                "mood-happy",
                "mood-calm",
                "mood-focused",
                "mood-energetic",
                "mood-chill",
                "mood-motivated"
            );

            vibeFrame.classList.add(
                "mood-" + selectedMood.toLowerCase()
            );

        }


        // --------------------------------------
        // Change mood text
        // --------------------------------------

        if (moodText) {
            moodText.innerText =
                selectedMood.toUpperCase();
        }


        // --------------------------------------
        // Change emoji
        // --------------------------------------

        if (moodEmoji) {
            moodEmoji.innerText =
                selectedEmoji;
        }

    });

});


// ======================================
// 4. THEME SELECTION
// ======================================

themeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Remove active from all theme buttons
        themeButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Activate clicked theme
        this.classList.add("active");


        // --------------------------------------
        // Remove old theme classes
        // --------------------------------------

        if (vibeFrame) {

            vibeFrame.classList.remove(
                "sunset",
                "ocean",
                "night",
                "candy"
            );


            // --------------------------------------
            // Get selected theme
            // --------------------------------------

            const selectedTheme =
                this.dataset.theme;


            // --------------------------------------
            // Apply selected theme
            // --------------------------------------

            if (selectedTheme) {

                vibeFrame.classList.add(
                    selectedTheme
                );

            }


            // Debug message
            console.log(
                "Theme changed to:",
                selectedTheme
            );

        }

    });

});


// ======================================
// 5. GENERATE VIBE
// ======================================

if (generateBtn) {

    generateBtn.addEventListener(
        "click",
        generateVibe
    );

}


function generateVibe() {

    // Make sure inputs exist
    if (!nameInput || !quoteInput) {
        return;
    }


    const name =
        nameInput.value.trim();

    const quote =
        quoteInput.value.trim();


    // --------------------------------------
    // Update name
    // --------------------------------------

    if (nameDisplay) {

        nameDisplay.innerText =
            name || "Your Name";

    }


    // --------------------------------------
    // Update quote
    // --------------------------------------

    if (quoteDisplay) {

        quoteDisplay.innerText =
            quote
                ? `"${quote}"`
                : `"Good vibes only."`;

    }


    // --------------------------------------
    // Restart animation
    // --------------------------------------

    if (vibeFrame) {

        vibeFrame.classList.remove(
            "animate"
        );

        void vibeFrame.offsetWidth;

        vibeFrame.classList.add(
            "animate"
        );

    }

}


// ======================================
// 6. RANDOM VIBE
// ======================================

if (randomBtn) {

    randomBtn.addEventListener(
        "click",
        randomVibe
    );

}


function randomVibe() {

    // --------------------------------------
    // Random mood
    // --------------------------------------

    if (moodButtons.length > 0) {

        const randomMoodIndex =
            Math.floor(
                Math.random() *
                moodButtons.length
            );

        moodButtons[
            randomMoodIndex
        ].click();

    }


    // --------------------------------------
    // Random theme
    // --------------------------------------

    if (themeButtons.length > 0) {

        const randomThemeIndex =
            Math.floor(
                Math.random() *
                themeButtons.length
            );

        themeButtons[
            randomThemeIndex
        ].click();

    }


    // --------------------------------------
    // Random quote
    // --------------------------------------

    const randomQuotes = [

        "Small steps still move you forward.",

        "Make today count.",

        "Enjoy the little things.",

        "Your vibe creates your world.",

        "Keep going. You are doing great.",

        "Progress over perfection.",

        "Good things take time.",

        "Create your own sunshine.",

        "Stay true to your vibe."

    ];


    const randomQuote =
        randomQuotes[
            Math.floor(
                Math.random() *
                randomQuotes.length
            )
        ];


    if (quoteInput) {

        quoteInput.value =
            randomQuote;

    }


    // Generate frame
    generateVibe();

}


// ======================================
// 7. CURRENT DATE
// ======================================

if (dateDisplay) {

    const today =
        new Date();


    const formattedDate =
        today.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );


    dateDisplay.innerText =
        formattedDate;

}


// ======================================
// 8. DOWNLOAD FRAME
// ======================================

if (downloadBtn) {

    downloadBtn.addEventListener(
        "click",
        function () {

            const frame =
                document.getElementById(
                    "vibeFrame"
                );


            if (!frame) {

                alert(
                    "Frame could not be found."
                );

                return;

            }


            // Check html2canvas
            if (
                typeof html2canvas ===
                "undefined"
            ) {

                alert(
                    "Download library is still loading. Please try again."
                );

                return;

            }


            // Convert frame to image
            html2canvas(
                frame,
                {
                    scale: 2,
                    backgroundColor: null,
                    useCORS: true
                }
            )
            .then(function (canvas) {

                const link =
                    document.createElement("a");


                link.download =
                    "my-vibeframe.png";


                link.href =
                    canvas.toDataURL(
                        "image/png"
                    );


                link.click();

            })
            .catch(function (error) {

                console.error(
                    "Download error:",
                    error
                );

                alert(
                    "Unable to download the frame. Please try again."
                );

            });

        }
    );

}


// ======================================
// 9. 3D MOUSE INTERACTION
// ======================================

const moodScene =
    document.querySelector(
        ".mood-scene"
    );


if (moodScene) {

    moodScene.addEventListener(
        "mousemove",
        function (event) {

            const rect =
                moodScene.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                (centerY - y) / 12;


            const rotateY =
                (x - centerX) / 12;


            const activeObject =
                document.querySelector(
                    ".mood-object.active"
                );


            if (activeObject) {

                activeObject.style.transform =
                    `scale(1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            }

        }
    );


    moodScene.addEventListener(
        "mouseleave",
        function () {

            const activeObject =
                document.querySelector(
                    ".mood-object.active"
                );


            if (activeObject) {

                activeObject.style.transform =
                    "scale(1) rotateX(0deg) rotateY(0deg)";

            }

        }
    );

}


// ======================================
// 10. INITIAL STATE
// ======================================

// Show Happy object initially

const initialObject =
    document.querySelector(
        ".object-happy"
    );


if (initialObject) {

    initialObject.classList.add(
        "active"
    );

}


// Set Happy mood initially

if (vibeFrame) {

    vibeFrame.classList.add(
        "mood-happy"
    );

}


// Set Sunset initially

const initialTheme =
    document.querySelector(
        ".theme-btn.sunset"
    );


if (initialTheme) {

    initialTheme.classList.add(
        "active"
    );

}


// ======================================
// 11. CHECK JAVASCRIPT
// ======================================

console.log(
    "VibeFrame JavaScript loaded successfully."
);