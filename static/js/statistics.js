function toggleSidebar() { //sidebar j.s
    const sidebar = document.getElementById("sidebar");
    const overlay =
        document.getElementById("overlay");
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
}
document
    .getElementById("overlay")
    .addEventListener("click", () => {

        document
            .getElementById("sidebar")
            .classList.remove("active");

        document
            .getElementById("overlay")
            .classList.remove("active");
    });
// Last 7 days data
let weekData = JSON.parse(
    localStorage.getItem("weekData")
) || [];

// Today's date
const today = new Date()
    .toISOString()
    .split("T")[0];

// Example:
// "2026-06-23"

/////////////////////////////////////////////////
// If today doesn't exist, create it
/////////////////////////////////////////////////

let todayEntry = weekData.find(
    entry => entry.date === today
);

if (!todayEntry) {

    weekData.push({
        date: today,
        hours: 0
    });

    // Keep only last 7 days
    if (weekData.length > 7) {
        weekData.shift();
    }

    localStorage.setItem(
        "weekData",
        JSON.stringify(weekData)
    );
}

/////////////////////////////////////////////////
// FUNCTIONS
/////////////////////////////////////////////////

function calculateTotalHours() {

    return weekData.reduce(
        (sum, day) =>
            sum + day.hours,
        0
    );
}

function calculateBestDay() {

    if (weekData.length === 0)
        return "None";

    let best = weekData[0];

    weekData.forEach(day => {

        if (day.hours > best.hours) {
            best = day;
        }

    });

    return new Date(best.date)
        .toLocaleDateString(
            "en-US",
            {
                weekday: "long"
            }
        );
}

function calculateStreak() {

    let streak = 0;

    for (
        let i = weekData.length - 1;
        i >= 0;
        i--
    ) {

        if (weekData[i].hours > 0) {
            streak++;
        }
        else {
            break;
        }

    }

    return streak;
}

function calculateProductivity() {

    const target = 35;

    const total =
        calculateTotalHours();

    let percent =
        (total / target) * 100;

    percent = Math.min(
        Math.round(percent),
        100
    );

    return percent;
}

/////////////////////////////////////////////////
// UPDATE CARDS
/////////////////////////////////////////////////

document.getElementById(
    "studyHours"
).textContent =
    calculateTotalHours() + "h";

document.getElementById(
    "streak"
).textContent =
    calculateStreak() + " Days";

document.getElementById(
    "productivity"
).textContent =
    calculateProductivity() + "%";

document.getElementById(
    "bestDay"
).textContent =
    calculateBestDay();

/////////////////////////////////////////////////
// BUILD GRAPH
/////////////////////////////////////////////////

const graph =
    document.querySelector(".graph");

graph.innerHTML = "";

weekData.forEach(day => {

    const box =
        document.createElement("div");

    box.classList.add(
        "bar-box"
    );

    const bar =
        document.createElement("div");

    bar.classList.add("bar");

    bar.style.height =
        (day.hours * 20) + "%";

    const label =
        document.createElement("span");

    label.textContent =
        new Date(day.date)
            .toLocaleDateString(
                "en-US",
                {
                    weekday: "short"
                }
            );

    box.appendChild(bar);
    box.appendChild(label);

    graph.appendChild(box);

});
weekData[weekData.length - 1].hours += 1;

localStorage.setItem(
    "weekData",
    JSON.stringify(weekData)
);