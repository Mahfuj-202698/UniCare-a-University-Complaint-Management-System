const form = document.getElementById("loginForm");

// If already logged in, go straight to the dashboard
if (sessionStorage.getItem("unicare_officer")) {
    window.location.href = "officer-dashboard.html";
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    let userId = document.getElementById("userId");
    let password = document.getElementById("password");
    let valid = true;

    // Officer ID validation
    if (userId.value.trim() === "") {
        showError(userId, "userIdError", "Officer ID is required.");
        valid = false;
    } else if (!/^OFF-[0-9]{3,}$/i.test(userId.value.trim())) {
        showError(userId, "userIdError", "Enter a valid Officer ID (Example: OFF-001).");
        valid = false;
    } else {
        showSuccess(userId);
    }

    // Password validation
    if (password.value === "") {
        showError(password, "passwordError", "Password is required.");
        valid = false;
    } else {
        showSuccess(password);
    }

    if (!valid) return;

    // Check against officer accounts created by the Admin
    let officer = UC.get("unicare_officers").find(function (o) {
        return o.officerId.toUpperCase() === userId.value.trim().toUpperCase() &&
               o.password === password.value;
    });

    let message = document.getElementById("formMessage");

    if (!officer) {
        message.className = "error";
        message.innerHTML = "Invalid Officer ID or password.";
        return;
    }

    sessionStorage.setItem("unicare_officer", JSON.stringify({ officerId: officer.officerId, name: officer.name }));
    message.className = "";
    message.innerHTML = "Login successful! Redirecting...";
    setTimeout(function () { window.location.href = "officer-dashboard.html"; }, 600);
});


// ---------- Functions ----------

function showError(input, errorId, message) {
    input.classList.add("errorBorder");
    input.classList.remove("successBorder");
    document.getElementById(errorId).innerHTML = message;
}

function showSuccess(input) {
    input.classList.remove("errorBorder");
    input.classList.add("successBorder");
}

function clearErrors() {
    document.querySelectorAll(".form-group small").forEach(function (item) { item.innerHTML = ""; });
    document.querySelectorAll("input").forEach(function (f) {
        f.classList.remove("errorBorder");
        f.classList.remove("successBorder");
    });
    document.getElementById("formMessage").innerHTML = "";
}
