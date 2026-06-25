
// =========================
// SIDEBAR
// =========================

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

document.getElementById("overlay").addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
});


// =========================
// STORAGE
// =========================

let feed = JSON.parse(localStorage.getItem("feed")) || [];

renderAll();


// =========================
// ADD ENTRY
// =========================

function addEntry() {

    let type = document.getElementById("type").value;
    let title = document.getElementById("title").value;

    let file = document.getElementById("coverFile").files[0];

    let character = clampRating(document.getElementById("character").value);
    let pacing = clampRating(document.getElementById("pacing").value);
    let world = clampRating(document.getElementById("world").value);

    if (!title) return;

    // convert image to base64
    if (file) {

        let reader = new FileReader();

        reader.onload = function (e) {

            createEntry(e.target.result);
        };

        reader.readAsDataURL(file);

    } else {
        createEntry("https://via.placeholder.com/150");
    }

    function createEntry(image) {

        let overall = calculateOverall(character, pacing, world);

        let entry = {
            type,
            title,
            cover: image,
            ratings: {
                character,
                pacing,
                world,
                overall
            }
        };

        feed.push(entry);

        save();
        renderAll();
        clearInputs();
    }
}


// =========================
// RATING HELPERS
// =========================

function clampRating(value) {

    value = Number(value);

    if (isNaN(value)) return 0;

    // HARD LIMITS
    if (value < 0) return 0;
    if (value > 5) return 5;

    return value;
}
function calculateOverall(c, p, w) {
    return Math.round(((c + p + w) / 3) * 10) / 10;
}


// =========================
// DELETE ENTRY
// =========================

function deleteEntry(index) {

    feed.splice(index, 1);

    save();
    renderAll();
}


// =========================
// SAVE
// =========================

function save() {
    localStorage.setItem("feed", JSON.stringify(feed));
}


// =========================
// RENDER ALL
// =========================

function renderAll() {
    renderWatched();
    renderWatchlist();
    renderTop3();
}


// =========================
// WATCHED
// =========================

function renderWatched() {

    let box = document.getElementById("watchedList");
    box.innerHTML = "";

    feed.forEach((item, index) => {

        if (item.type === "watched") {
            box.innerHTML += createCard(item, index);
        }
    });
}


// =========================
// TO WATCH
// =========================

function renderWatchlist() {

    let box = document.getElementById("watchList");
    box.innerHTML = "";

    feed.forEach((item, index) => {

        if (item.type === "watchlist") {
            box.innerHTML += createCard(item, index);
        }
    });
}


// =========================
// TOP 3 (GLOBAL BEST)
// =========================

function renderTop3() {

    let box = document.getElementById("top3");
    box.innerHTML = "";

    let watched = feed.filter(item => item.type === "watched");

    let top = watched
        .sort((a, b) => b.ratings.overall - a.ratings.overall)
        .slice(0, 3);

    top.forEach(item => {

        box.innerHTML += `
        <div class="top-card">
            <img src="${item.cover}">
            <h4>${item.title}</h4>
            <p>⭐ ${item.ratings.overall}</p>
        </div>
        `;
    });
}


// =========================
// CARD TEMPLATE
// =========================

function createCard(item, index) {

    return `
    <div class="entry-card">

        <img src="${item.cover}">

        <div class="entry-info">

            <h3>${item.title}</h3>

            <p>⭐ Overall: ${item.ratings.overall}</p>
            <p>👤 Character: ${item.ratings.character}</p>
            <p>⚡ Pacing: ${item.ratings.pacing}</p>
            <p>🌍 World: ${item.ratings.world}</p>

            <button class="delete-btn" onclick="deleteEntry(${index})">
                🗑 Delete
            </button>

        </div>

    </div>
    `;
}


// =========================
// CLEAR INPUTS
// =========================

function clearInputs() {

    document.getElementById("title").value = "";
    document.getElementById("coverFile").value = "";

    document.getElementById("character").value = "";
    document.getElementById("pacing").value = "";
    document.getElementById("world").value = "";
}

// =========================
// STRICT 0–5 INPUT CONTROL
// =========================

function attachStrictRating(id) {

    let input = document.getElementById(id);

    input.addEventListener("input", () => {

        // remove non-numbers except dot
        input.value = input.value.replace(/[^0-9.]/g, "");

        let val = Number(input.value);

        if (val > 5) input.value = "5";
        if (val < 0) input.value = "0";
    });

    // block paste junk
    input.addEventListener("paste", (e) => {

        let paste = (e.clipboardData || window.clipboardData)
            .getData("text");

        if (!/^[0-9.]+$/.test(paste)) {
            e.preventDefault();
        }
    });

    // block invalid keys
    input.addEventListener("keydown", (e) => {

        let allowed = [
            "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"
        ];

        if (allowed.includes(e.key)) return;

        if (!/^[0-9.]$/.test(e.key)) {
            e.preventDefault();
        }
    });
}

// activate
attachStrictRating("character");
attachStrictRating("pacing");
attachStrictRating("world");