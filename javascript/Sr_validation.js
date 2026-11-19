
const form = document.getElementById("registerForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();   // stops page reload on submit
    clearErrors();

    let name = document.getElementById("fullname");
    let studentId = document.getElementById("studentId");
    let email = document.getElementById("email");
    let department = document.getElementById("department");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");

    let valid = true;

    // Name validation
    if (name.value.trim() === "") {
        showError(name, "fullnameError", "Name is required.");
        valid = false;
    } else if (!/^[A-Za-z ]+$/.test(name.value.trim())) {
        showError(name, "fullnameError", "Only letters and spaces are allowed.");
        valid = false;
    } else if (name.value.trim().length < 3) {
        showError(name, "fullnameError", "Name must be at least 3 characters.");
        valid = false;
    } else {
        showSuccess(name);
    }

    // Student ID validation
    if (studentId.value.trim() === "") {
        showError(studentId, "studentIdError", "Student ID is required.");
        valid = false;
    } else if (!/^[0-9]{2}-[0-9]{5}-[0-9]$/.test(studentId.value.trim())) {
        showError(studentId, "studentIdError", "Enter a valid Student ID (Example: 23-12345-1).");
        valid = false;
    } else {
        showSuccess(studentId);
    }

    // Email validation
    if (email.value.trim() === "") {
        showError(email, "emailError", "Email is required.");
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showError(email, "emailError", "Invalid email address.");
        valid = false;
    } else {
        showSuccess(email);
    }

    // Department validation
    if (department.value === "") {
        showError(department, "departmentError", "Please select your department.");
        valid = false;
    } else {
        showSuccess(department);
    }

    // Password validation
    if (password.value === "") {
        showError(password, "passwordError", "Password is required.");
        valid = false;
    } else if (password.value.length < 8) {
        showError(password, "passwordError", "Password must be at least 8 characters.");
        valid = false;
    } else if (!/(?=.*[A-Za-z])(?=.*[0-9])/.test(password.value)) {
        showError(password, "passwordError", "Password must contain letters and numbers.");
        valid = false;
    } else {
        showSuccess(password);
    }

    // Confirm Password validation
    if (confirmPassword.value === "") {
        showError(confirmPassword, "confirmPasswordError", "Please confirm your password.");
        valid = false;
    } else if (confirmPassword.value !== password.value) {
        showError(confirmPassword, "confirmPasswordError", "Passwords do not match.");
        valid = false;
    } else {
        showSuccess(confirmPassword);
    }

    // Success
    if (valid) {
        let message = "Registration successful! Welcome, " +
                      name.value.trim() + ".";

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
