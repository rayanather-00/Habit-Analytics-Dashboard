function toggleSidebar() {
    document.getElementById("sidebar")
        .classList.toggle("active");

    document.getElementById("overlay")
        .classList.toggle("active");
}

document.getElementById("overlay")
    .addEventListener("click", () => {
        document.getElementById("sidebar")
            .classList.remove("active");

        document.getElementById("overlay")
            .classList.remove("active");
    });

/////////////////////////////////////////////////
// LINKS SYSTEM
/////////////////////////////////////////////////

let links = JSON.parse(
    localStorage.getItem("links")
) || [];

renderLinks();

/////////////////////////////////////////////////
// URL VALIDATION
/////////////////////////////////////////////////

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/////////////////////////////////////////////////
// ADD LINK (FIXED)
/////////////////////////////////////////////////

function addLink() {

    let title =
        document.getElementById("linkTitle").value;

    let url =
        document.getElementById("linkURL").value;

    if (!title || !url) return;

    // validation
    if (!isValidURL(url)) {
        alert("❌ Please enter a valid URL (include https://)");
        return;
    }

    links.push({ title, url });

    saveLinks();
    renderLinks();

    document.getElementById("linkTitle").value = "";
    document.getElementById("linkURL").value = "";
}

/////////////////////////////////////////////////
// DELETE LINK
/////////////////////////////////////////////////

function deleteLink(index) {
    links.splice(index, 1);
    saveLinks();
    renderLinks();
}

/////////////////////////////////////////////////
// SAVE
/////////////////////////////////////////////////

function saveLinks() {
    localStorage.setItem(
        "links",
        JSON.stringify(links)
    );
}

/////////////////////////////////////////////////
// RENDER
/////////////////////////////////////////////////

function renderLinks() {

    let list =
        document.getElementById("linkList");

    list.innerHTML = "";

    links.forEach((link, index) => {

        let div =
            document.createElement("div");

        div.className = "link-item";

        div.innerHTML = `
            <div>
                <strong>${link.title}</strong><br>
                <a href="${link.url}" target="_blank">
                    ${link.url}
                </a>
            </div>

            <div class="link-actions">
                <button class="delete-btn"
                    onclick="deleteLink(${index})">
                    🗑
                </button>
            </div>
        `;

        list.appendChild(div);
    });
}