function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}
// clock
function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    document.getElementById("clock").textContent =
        `${hours}:${minutes}:${seconds}`;
}

function updateDay() {
    const now = new Date();

    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };

    document.getElementById("day").textContent =
        now.toLocaleDateString('en-US', options);
}
updateClock();
updateDay();
setInterval(updateClock, 1000);
setInterval(updateDay, 60000);
// greetings
function updateGreeting() {
    const hour = new Date().getHours();
    const greeting = document.getElementById("greeting");

    if (hour < 12) {
        greeting.textContent = "Good Morning Rayan";
    } 
    else if (hour < 18) {
        greeting.textContent = "Good Afternoon Rayan";
    } 
    else {
        greeting.textContent = "Have a good Sleep";
    }
}
updateGreeting();
// task 
const taskCard = document.querySelector('.task-card');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');

taskCard.addEventListener('click', () => {
    overlay.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
});
/////////////////////////////////////////////////
// OPEN SETTINGS
/////////////////////////////////////////////////

function openSettings(){

    document
        .getElementById(
            "settingsPopup"
        )
        .classList.add(
            "active"
        );

    document
        .getElementById(
            "overlay"
        )
        .classList.add(
            "active"
        );
}

/////////////////////////////////////////////////
// CLOSE SETTINGS
/////////////////////////////////////////////////

function closeSettings(){

    document
        .getElementById(
            "settingsPopup"
        )
        .classList.remove(
            "active"
        );

    document
        .getElementById(
            "overlay"
        )
        .classList.remove(
            "active"
        );
}

/////////////////////////////////////////////////
// CLOSE ON OUTSIDE CLICK
/////////////////////////////////////////////////

document
    .getElementById(
        "overlay"
    )
    .addEventListener(
        "click",
        closeSettings
    );

/////////////////////////////////////////////////
// DARK MODE
/////////////////////////////////////////////////

const toggle =
    document.getElementById(
        "themeToggle"
    );

if(
    localStorage.getItem(
        "theme"
    ) === "dark"
){
    document.body
        .classList.add(
            "dark-mode"
        );

    toggle.checked = true;
}

toggle.addEventListener(
    "change",
    function(){

        document.body
            .classList.toggle(
                "dark-mode"
            );

        if(this.checked){

            localStorage.setItem(
                "theme",
                "dark"
            );
        }
        else{

            localStorage.setItem(
                "theme",
                "light"
            );
        }
    }
);