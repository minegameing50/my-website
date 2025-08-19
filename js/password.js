function validateNewPassword(event) {
  if (event) event.preventDefault(); // stop form from submitting

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Check minimum length
  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return false;
  }

  if (confirmPassword.length < 6) {
    alert("Confirm password must be at least 6 characters long.");
    return false;
  }

  // Check if both match
  if (password !== confirmPassword) {
    alert("Passwords do not match please try again later");
    return false;
  }

  // ✅ Passed
  alert("Password successfully created!");
  window.location.href = "login.html";
  return true;
}
