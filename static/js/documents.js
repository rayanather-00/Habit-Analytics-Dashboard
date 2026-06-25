// Sidebar toggle
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
// DOCUMENT STORAGE
/////////////////////////////////////////////////

let docs = JSON.parse(
    localStorage.getItem("docs")
) || [];

renderDocs();

/////////////////////////////////////////////////
// ADD DOCUMENT
/////////////////////////////////////////////////

function addDocument() {

    let title =
        document.getElementById("docTitle").value;

    let content =
        document.getElementById("docContent").value;

    if (!title || !content) return;

    docs.push({
        title,
        content,
        date: new Date().toLocaleDateString()
    });

    saveDocs();
    renderDocs();

    document.getElementById("docTitle").value = "";
    document.getElementById("docContent").value = "";
}

/////////////////////////////////////////////////
// DELETE DOCUMENT
/////////////////////////////////////////////////

function deleteDocument(index) {

    docs.splice(index, 1); // remove item

    saveDocs();
    renderDocs();
}

/////////////////////////////////////////////////
// SAVE TO LOCALSTORAGE
/////////////////////////////////////////////////

function saveDocs() {
    localStorage.setItem(
        "docs",
        JSON.stringify(docs)
    );
}

/////////////////////////////////////////////////
// RENDER DOCUMENTS
/////////////////////////////////////////////////

function renderDocs() {

    let list =
        document.getElementById("docList");

    list.innerHTML = "";

    docs.forEach((doc, index) => {

        let div =
            document.createElement("div");

        div.className = "doc-item";

        div.innerHTML = `
            <h3>${doc.title}</h3>
            <small>${doc.date}</small>

            <button class="delete-btn"
                onclick="deleteDocument(${index})">
                🗑 Delete
            </button>
        `;

        div.onclick = (e) => {
            // prevent delete button from triggering alert
            if (e.target.classList.contains("delete-btn")) return;

            alert(doc.content);
        };

        list.appendChild(div);
    });
}