// ---------- Session guard ----------
const officer = JSON.parse(sessionStorage.getItem("unicare_officer") || "null");
if (!officer) {
    window.location.href = "officer-login.html";
}

document.getElementById("officerName").textContent = officer ? officer.name : "";

document.getElementById("logoutBtn").addEventListener("click", function () {
    sessionStorage.removeItem("unicare_officer");
    window.location.href = "officer-login.html";
});

const KEY = "unicare_complaints";
let currentId = null;

// Safe text (complaint text comes from other users)
function esc(text) {
    const d = document.createElement("div");
    d.textContent = text;
    return d.innerHTML;
}

function badge(value) {
    return '<span class="badge ' + esc(value).replace(" ", "-") + '">' + esc(value) + "</span>";
}

// ---------- Render list ----------
function render() {
    const all = UC.get(KEY);
    const q = document.getElementById("searchBox").value.trim().toLowerCase();
    const st = document.getElementById("statusFilter").value;
    const pr = document.getElementById("priorityFilter").value;

    // Stats
    document.getElementById("statTotal").textContent = all.length;
    document.getElementById("statPending").textContent = all.filter(c => c.status === "Pending").length;
    document.getElementById("statProgress").textContent = all.filter(c => c.status === "In Progress").length;
    document.getElementById("statResolved").textContent = all.filter(c => c.status === "Resolved").length;

    const list = all.filter(function (c) {
        const text = (c.id + " " + c.title + " " + c.studentName).toLowerCase();
        return (!q || text.includes(q)) && (!st || c.status === st) && (!pr || c.priority === pr);
    });

    document.getElementById("complaintBody").innerHTML = list.map(function (c) {
        return "<tr><td>" + esc(c.id) + "</td><td>" + esc(c.title) + "</td><td>" + esc(c.studentName) +
               "</td><td>" + esc(c.department) + "</td><td>" + badge(c.priority) + "</td><td>" + badge(c.status) +
               "</td><td>" + esc(c.date) + '</td><td><button class="manage-btn" data-id="' + esc(c.id) +
               '">Manage</button></td></tr>';
    }).join("");

    document.getElementById("emptyMsg").style.display = list.length ? "none" : "block";
}

["searchBox", "statusFilter", "priorityFilter"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", render);
});

document.getElementById("complaintBody").addEventListener("click", function (e) {
    if (e.target.classList.contains("manage-btn")) openModal(e.target.dataset.id);
});

// ---------- Modal ----------
function openModal(id) {
    const c = UC.get(KEY).find(x => x.id === id);
    if (!c) return;
    currentId = id;

    document.getElementById("mTitle").textContent = c.id + " - " + c.title;
    document.getElementById("mMeta").textContent =
        c.studentName + " (" + c.studentId + ") | " + c.department + " | " + c.category + " | " + c.date;
    document.getElementById("mDesc").textContent = c.description;
    document.getElementById("mStatus").value = c.status;
    document.getElementById("mPriority").value = c.priority;
    document.getElementById("mResponse").value = "";
    document.getElementById("mMessage").textContent = "";
    clearModalError();

    document.getElementById("mHistory").innerHTML = c.responses.length
        ? c.responses.map(r => "<p>" + esc(r.text) + "<small>" + esc(r.by) + " - " + esc(r.date) + "</small></p>").join("")
        : "<p>No responses yet.</p>";

    document.getElementById("modal").classList.add("open");
}

function closeModal() {
    document.getElementById("modal").classList.remove("open");
}
document.getElementById("closeModal").addEventListener("click", closeModal);
document.getElementById("modal").addEventListener("click", function (e) {
    if (e.target.id === "modal") closeModal();
});

function clearModalError() {
    document.getElementById("mResponse").classList.remove("errorBorder");
    document.getElementById("mResponseError").textContent = "";
}

// ---------- Save update ----------
document.getElementById("updateForm").addEventListener("submit", function (e) {
    e.preventDefault();
    clearModalError();

    const all = UC.get(KEY);
    const c = all.find(x => x.id === currentId);
    const newStatus = document.getElementById("mStatus").value;
    const newPriority = document.getElementById("mPriority").value;
    const text = document.getElementById("mResponse").value.trim();

    // Response is required when closing a complaint, and must be meaningful if given
    if ((newStatus === "Resolved" || newStatus === "Rejected") && text === "" ) {
        showResponseError("Please write a response before resolving or rejecting.");
        return;
    }
    if (text !== "" && text.length < 5) {
        showResponseError("Response must be at least 5 characters.");
        return;
    }
    if (text === "" && newStatus === c.status && newPriority === c.priority) {
        showResponseError("Nothing to update. Change a field or write a response.");
        return;
    }

    c.status = newStatus;
    c.priority = newPriority;
    if (text !== "") {
        c.responses.push({ by: officer.name, text: text, date: new Date().toISOString().slice(0, 10) });
    }
    UC.set(KEY, all);

    render();
    openModal(currentId);
    document.getElementById("mMessage").textContent = "Complaint updated successfully.";
});

function showResponseError(msg) {
    document.getElementById("mResponse").classList.add("errorBorder");
    document.getElementById("mResponseError").textContent = msg;
}

render();
