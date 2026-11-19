// UniCare - Faculty Member (basic version)

// ---------- Login ----------
function validateLogin() {
  var email = document.getElementById("email").value.trim();
  var pass = document.getElementById("password").value;
  var msg = document.getElementById("msg");

  if (email == "" || pass == "") {
    msg.innerHTML = "Please fill in all fields.";
    return false;
  }
  if (email.indexOf("@") == -1) {
    msg.innerHTML = "Enter a valid email.";
    return false;
  }
  window.location.href = "dashboard.html";   // go to faculty dashboard
  return false;
}

// ---------- Registration ----------
function validateRegister() {
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var dept = document.getElementById("dept").value;
  var pass = document.getElementById("password").value;
  var confirm = document.getElementById("confirm").value;
  var msg = document.getElementById("msg");

  if (name == "" || email == "" || dept == "") {
    msg.innerHTML = "Please fill in all fields.";
  } else if (email.indexOf("@") == -1) {
    msg.innerHTML = "Enter a valid email.";
  } else if (pass.length < 6) {
    msg.innerHTML = "Password must be at least 6 characters.";
  } else if (pass != confirm) {
    msg.innerHTML = "Passwords do not match.";
  } else {
    alert("Account created successfully!");
    window.location.href = "index.html";
  }
  return false;
}

// ---------- Reset password ----------
function resetPassword() {
  var email = document.getElementById("email").value.trim();
  var pass = document.getElementById("password").value;
  var confirm = document.getElementById("confirm").value;
  var msg = document.getElementById("msg");

  if (email == "" || pass == "") {
    msg.innerHTML = "Please fill in all fields.";
  } else if (pass.length < 6) {
    msg.innerHTML = "Password must be at least 6 characters.";
  } else if (pass != confirm) {
    msg.innerHTML = "Passwords do not match.";
  } else {
    alert("Password reset successfully!");
    window.location.href = "index.html";
  }
  return false;
}

// ---------- Logout ----------
function logout() {
  if (confirm("Do you want to logout?")) {
    window.location.href = "index.html";
  }
}

// ---------- View complaints: search + filter ----------
function filterComplaints() {
  var text = document.getElementById("search").value.toLowerCase();
  var status = document.getElementById("statusFilter").value;
  var rows = document.querySelectorAll("#complaintTable tbody tr");

  for (var i = 0; i < rows.length; i++) {
    var rowText = rows[i].innerText.toLowerCase();
    var rowStatus = rows[i].cells[4].innerText;
    var show = rowText.indexOf(text) != -1 && (status == "All" || rowStatus == status);
    rows[i].style.display = show ? "" : "none";
  }
}

// ---------- Provide updates ----------
function addUpdate() {
  var id = document.getElementById("complaintId").value;
  var text = document.getElementById("comment").value.trim();
  var msg = document.getElementById("msg");

  if (id == "" || text == "") {
    msg.className = "error";
    msg.innerHTML = "Select a complaint and write an update.";
    return false;
  }
  var list = document.getElementById("updates");
  var item = document.createElement("li");
  item.innerHTML = "<b>Complaint " + id + ":</b> " + text + " <i>(" + new Date().toLocaleString() + ")</i>";
  list.appendChild(item);

  document.getElementById("comment").value = "";
  msg.className = "success";
  msg.innerHTML = "Update added.";
  return false;
}

// ---------- Profile ----------
function previewPicture(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("pic").src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function saveProfile() {
  var name = document.getElementById("name").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var msg = document.getElementById("msg");

  if (name == "" || phone == "") {
    msg.className = "error";
    msg.innerHTML = "Name and phone are required.";
  } else {
    msg.className = "success";
    msg.innerHTML = "Profile updated successfully.";
  }
  return false;
}

function changePassword() {
  var oldPass = document.getElementById("oldPass").value;
  var newPass = document.getElementById("newPass").value;
  var confirm = document.getElementById("confirmPass").value;
  var msg = document.getElementById("passMsg");

  if (oldPass == "" || newPass == "") {
    msg.className = "error";
    msg.innerHTML = "Please fill in all fields.";
  } else if (newPass.length < 6) {
    msg.className = "error";
    msg.innerHTML = "New password must be at least 6 characters.";
  } else if (newPass != confirm) {
    msg.className = "error";
    msg.innerHTML = "Passwords do not match.";
  } else {
    msg.className = "success";
    msg.innerHTML = "Password changed successfully.";
  }
  return false;
}

function deleteAccount() {
  if (confirm("Are you sure you want to delete your account?")) {
    alert("Account deleted.");
    window.location.href = "register.html";
  }
}
