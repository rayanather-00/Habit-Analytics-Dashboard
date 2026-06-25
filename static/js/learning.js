function toggleSidebar() {

    document
        .getElementById("sidebar")
        .classList.toggle("active");

    document
        .getElementById("overlay")
        .classList.toggle("active");
}

document
    .getElementById("overlay")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("sidebar")
                .classList.remove("active");

            document
                .getElementById("overlay")
                .classList.remove("active");
        }
    );
/////////////////////////////////////////////////
// STORAGE
/////////////////////////////////////////////////

let courses =
    JSON.parse(localStorage.getItem("courses")) || [];

let revisions =
    JSON.parse(localStorage.getItem("revisions")) || [];

let completed =
    JSON.parse(localStorage.getItem("completed")) || [];

let goals =
    JSON.parse(localStorage.getItem("goals")) || [];

let resources =
    JSON.parse(localStorage.getItem("resources")) || [];

renderAll();

/////////////////////////////////////////////////
// ADD COURSE
/////////////////////////////////////////////////

document
    .getElementById("addCourseBtn")
    .addEventListener("click", addCourse);

function addCourse() {

    let name =
        document.getElementById("courseName")
            .value
            .trim();

    let hours =
        Number(
            document.getElementById(
                "courseHours"
            ).value
        );

    if (!name) {
        alert("Enter a course name.");
        return;
    }

    if (isNaN(hours) ||
        hours < 0) {
        alert(
            "Hours cannot be negative."
        );
        return;
    }

    courses.push({
        name,
        hours
    });

    saveCourses();
    renderCourses();

    document.getElementById("courseName").value = "";
    document.getElementById("courseHours").value = "";

    updateStats();
}

/////////////////////////////////////////////////
// RENDER COURSES
/////////////////////////////////////////////////

function renderCourses() {

    let list =
        document.getElementById("currentCoursesList");

    list.innerHTML = "";

    courses.forEach((course, index) => {

        let card =
            document.createElement("div");

        card.className = "course-card";

        card.innerHTML = `
            <div class="course-info">
                <h3>${course.name}</h3>
                <p>Hours Studied: ${course.hours}h</p>
            </div>

            <div class="course-buttons">

                <button
                    onclick="updateCourse(${index})">
                    Update Hours
                </button>

                <button
                    onclick="completeCourse(${index})">
                    Complete
                </button>

                <button
                    onclick="deleteCourse(${index})">
                    Delete
                </button>

            </div>
        `;

        list.appendChild(card);
    });
}
/////////////////////////////////////////////////
// UPDATE COURSE
/////////////////////////////////////////////////

function updateCourse(index) {

    let value =
        prompt("Enter total hours studied:");
    if (value === null || value < 0)
        return;
    value = Number(value);
    if (isNaN(value)) {
        alert(
            "Progress must be 0-100."
        );
        return;
    }
    courses[index].hours = value;

    saveCourses();
    renderCourses();
}

/////////////////////////////////////////////////
// COMPLETE COURSE
/////////////////////////////////////////////////

function completeCourse(index) {
    completed.push({
        name:
            courses[index].name,
        date:
            new Date().toLocaleDateString()
    });

    courses.splice(index, 1);

    saveCourses();
    saveCompleted();

    renderCourses();
    renderCompleted();

    updateStats();
}

/////////////////////////////////////////////////
// DELETE COURSE
/////////////////////////////////////////////////

function deleteCourse(index) {

    if (!confirm("Delete this course?")) return;
    courses.splice(index, 1);
    saveCourses();
    renderCourses();

    updateStats();
}

/////////////////////////////////////////////////
// REVISION
/////////////////////////////////////////////////

document
    .getElementById("addRevisionBtn")
    .addEventListener("click", addRevision);

function addRevision() {

    let topic =
        document
            .getElementById("revisionTopic")
            .value
            .trim();

    let priority =
        document
            .getElementById("revisionPriority")
            .value;

    if (!topic)
        return;

    revisions.push({
        topic,
        priority
    });

    saveRevisions();
    renderRevisions();

    document
        .getElementById("revisionTopic")
        .value = "";

    updateStats();
}

function renderRevisions() {

    let list =
        document.getElementById(
            "revisionList"
        );

    list.innerHTML = "";

    revisions.forEach((item, index) => {

        let card =
            document.createElement("div");

        card.className =
            "revision-card";

        card.innerHTML = `
            <div>
                <h3>${item.topic}</h3>
                <p>
                    Priority:
                    ${item.priority}
                </p>
            </div>

            <div class="course-buttons">

                <button
                    onclick="markRevised(${index})">
                    Mark Revised
                </button>

                <button
                    onclick="deleteRevision(${index})">
                    Delete
                </button>

            </div>
        `;

        list.appendChild(card);
    });
}

function markRevised(index) {

    revisions.splice(index, 1);

    saveRevisions();
    renderRevisions();

    updateStats();
}

function deleteRevision(index) {

    revisions.splice(index, 1);

    saveRevisions();
    renderRevisions();

    updateStats();
}

/////////////////////////////////////////////////
// COMPLETED
/////////////////////////////////////////////////

function renderCompleted() {

    let list =
        document
            .getElementById("completedList");

    list.innerHTML = "";

    completed.forEach(
        (item, index) => {

            let card =
                document.createElement("div");

            card.className =
                "completed-card";

            card.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>
                    Completed:
                    ${item.date}
                </p>
            </div>

            <button
                onclick="deleteCompleted(${index})">
                Delete
            </button>
        `;

            list.appendChild(card);
        });
}

function deleteCompleted(index) {

    completed.splice(index, 1);

    saveCompleted();
    renderCompleted();

    updateStats();
}

/////////////////////////////////////////////////
// GOALS
/////////////////////////////////////////////////

document
    .getElementById("addGoalBtn")
    .addEventListener("click",
        addGoal);

function addGoal() {

    let text =
        document
            .getElementById("goalInput")
            .value
            .trim();

    if (!text)
        return;

    goals.push(text);

    saveGoals();
    renderGoals();

    document
        .getElementById("goalInput")
        .value = "";
}

function renderGoals() {

    let list =
        document
            .getElementById("goalList");

    list.innerHTML = "";

    goals.forEach(
        (goal, index) => {

            let li =
                document.createElement("li");

            li.innerHTML = `
            ${goal}

            <button
                onclick="deleteGoal(${index})"
                style="
                    float:right;
                    margin-top:-5px;
                ">
                Delete
            </button>
        `;

            list.appendChild(li);
        });
}

function deleteGoal(index) {

    goals.splice(index, 1);

    saveGoals();
    renderGoals();
}

/////////////////////////////////////////////////
// RESOURCES
/////////////////////////////////////////////////

document
    .getElementById("addResourceBtn")
    .addEventListener("click",
        addResource);

function addResource() {

    let name =
        document
            .getElementById("resourceName")
            .value
            .trim();

    let link =
        document
            .getElementById("resourceLink")
            .value
            .trim();

    if (!name || !link)
        return;

    resources.push({
        name,
        link
    });

    saveResources();
    renderResources();

    document
        .getElementById("resourceName")
        .value = "";

    document
        .getElementById("resourceLink")
        .value = "";
}

function renderResources() {

    let list =
        document
            .getElementById("resourceList");

    list.innerHTML = "";

    resources.forEach(
        (item, index) => {

            let card =
                document.createElement("div");

            card.className =
                "resource-card";

            card.innerHTML = `
            <h3>${item.name}</h3>

            <a
                href="${item.link}"
                target="_blank">
                Visit Resource
            </a>

            <br><br>

            <button
                onclick="deleteResource(${index})">
                Delete
            </button>
        `;

            list.appendChild(card);
        });
}

function deleteResource(index) {

    resources.splice(index, 1);

    saveResources();
    renderResources();
}

/////////////////////////////////////////////////
// STATS
/////////////////////////////////////////////////

function updateStats() {

    document
        .getElementById(
            "completedCourses"
        ).textContent =
        completed.length;

    document
        .getElementById(
            "currentCourses"
        ).textContent =
        courses.length;

    document
        .getElementById(
            "revisionTopics"
        ).textContent =
        revisions.length;

    let totalHours = courses.reduce((sum, course) => sum + course.hours, 0);

    document.getElementById("studyHours").textContent = totalHours + "h";
}

/////////////////////////////////////////////////
// SAVE
/////////////////////////////////////////////////

function saveCourses() {
    localStorage.setItem(
        "courses",
        JSON.stringify(courses)
    );
}

function saveRevisions() {
    localStorage.setItem(
        "revisions",
        JSON.stringify(revisions)
    );
}

function saveCompleted() {
    localStorage.setItem(
        "completed",
        JSON.stringify(completed)
    );
}

function saveGoals() {
    localStorage.setItem(
        "goals",
        JSON.stringify(goals)
    );
}

function saveResources() {
    localStorage.setItem(
        "resources",
        JSON.stringify(resources)
    );
}

/////////////////////////////////////////////////
// INITIAL RENDER
/////////////////////////////////////////////////

function renderAll() {

    renderCourses();
    renderRevisions();
    renderCompleted();
    renderGoals();
    renderResources();
    updateStats();
}