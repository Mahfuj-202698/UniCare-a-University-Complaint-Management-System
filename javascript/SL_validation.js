
const form = document.getElementById("loginForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();   // stops page reload on submit
    clearErrors();

    let studentId = document.getElementById("studentId");
    let password = document.getElementById("password");

    let valid = true;

    // Student ID validation
    if (studentId.value.trim() === "") {
        showError(studentId, "studentIdError", "Student ID is required.");
        valid = false;
    } else if (!/^[0-9]{2}-[0-9]{5}-[0-9]$/.test(studentId.value.trim())) {
        showError(studentId, "studentIdError", "Enter a valid Student ID.");
        valid = false;
    } else {
        showSuccess(studentId);
    }

    // Password validation
    if (password.value === "") {
        showError(password, "passwordError", "Password is required.");
        valid = false;
    } else {
        showSuccess(password);
    }

    // Success
    if (valid) {
        let message = "Input validation successful!";

        form.reset();
        clearErrors();

        document.getElementById("formMessage").innerHTML = message;
    }
});


// ---------- Functions ----------

// Show error
function showError(input, errorId, message) {
    input.classList.add("errorBorder");
    input.classList.remove("successBorder");
    document.getElementById(errorId).innerHTML = message;
}

// Show success
function showSuccess(input) {
    input.classList.remove("errorBorder");
    input.classList.add("successBorder");
}

// Clear all errors
function clearErrors() {
    let errors = document.querySelectorAll(".form-group small");

    errors.forEach(function (item) {
        item.innerHTML = "";
    });

    let fields = document.querySelectorAll("input, select, textarea");

    fields.forEach(function (field) {
        field.classList.remove("errorBorder");
        field.classList.remove("successBorder");
    });

    document.getElementById("formMessage").innerHTML = "";
}
