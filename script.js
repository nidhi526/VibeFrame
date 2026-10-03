// ======================================
// VibeFrame - JavaScript
// ======================================


// Current selected mood

let selectedMood = "Happy";
let selectedEmoji = "😊";


// ======================================
// MOOD SELECTION
// ======================================

const moodButtons =
    document.querySelectorAll(".mood-btn");


moodButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Remove active state
        moodButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active state
        this.classList.add("active");

        // Store selected mood
        selectedMood =
            this.dataset.mood;

        selectedEmoji =
            this.dataset.emoji;

    });

});


// ======================================
// THEME SELECTION
// ======================================

const themeButtons =
    document.querySelectorAll(".theme-btn");

const vibeFrame =
    document.getElementById("vibeFrame");


themeButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Remove previous themes

        vibeFrame.classList.remove(
            "sunset",
            "ocean",
            "night",
            "candy"
        );

        // Add selected theme

        vibeFrame.classList.add(
            this.dataset.theme
        );


        // Active theme button

        themeButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

    });

});


// ======================================
// GENERATE VIBE
// ======================================

const generateBtn =
    document.getElementById("generateBtn");


generateBtn.addEventListener("click", generateVibe);


function generateVibe() {

    const name =
        document.getElementById("nameInput").value.trim();

    const quote =
        document.getElementById("quoteInput").value.trim();


    // Update emoji

    document.getElementById("moodEmoji")
        .innerText = selectedEmoji;


    // Update mood

    document.getElementById("moodText")
        .innerText =
        selectedMood.toUpperCase();


    // Update name

    document.getElementById("nameDisplay")
        .innerText =
        name || "Your Name";


    // Update quote

    document.getElementById("quoteDisplay")
        .innerText =
        quote
        ? `"${quote}"`
        : `"Good vibes only."`;


    // Animation

    vibeFrame.classList.remove("animate");

    void vibeFrame.offsetWidth;

    vibeFrame.classList.add("animate");

}


// ======================================
// RANDOM VIBE
// ======================================

const randomBtn =
    document.getElementById("randomBtn");


const randomQuotes = [

    "Small steps still move you forward.",

    "Make today count.",

    "Enjoy the little things.",

    "Your vibe creates your world.",

    "Keep going. You are doing great.",

    "Progress over perfection.",

    "Good things take time."

];


randomBtn.addEventListener("click", function () {


    // Random mood

    const randomMood =
        Math.floor(
            Math.random() * moodButtons.length
        );


    moodButtons[randomMood].click();


    // Random theme

    const randomTheme =
        Math.floor(
            Math.random() * themeButtons.length
        );


    themeButtons[randomTheme].click();


    // Random quote

    const randomQuote =
        randomQuotes[
            Math.floor(
                Math.random() * randomQuotes.length
            )
        ];


    document.getElementById("quoteInput")
        .value = randomQuote;


    // Generate

    generateVibe();

});


// ======================================
// CURRENT DATE
// ======================================

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


document.getElementById("dateDisplay")
    .innerText = formattedDate;

// ======================================
// DOWNLOAD FRAME
// ======================================

const downloadBtn =
    document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", function () {

    const frame =
        document.getElementById("vibeFrame");

    html2canvas(frame, {
        scale: 2,
        backgroundColor: null
    }).then(function (canvas) {

        const link =
            document.createElement("a");

        link.download = "my-vibeframe.png";

        link.href =
            canvas.toDataURL("image/png");

        link.click();

    });

});