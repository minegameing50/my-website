function validateLogin(event) {
    event.preventDefault(); // stop default form submit

    let password = document.getElementById("password").value;
    let errorMsg = document.getElementById("error-msg");

    if (password.length < 6) {
        errorMsg.textContent = "Password must be at least 6 characters.";
        errorMsg.style.color = "red";
        return false; // stop form submit
    } else {
        errorMsg.textContent = "";
        // Fast redirect
        window.location.href = "wellcome.html";
        return true;
    }
}

function fastRedirect(url) {
    window.location.href = url;
}
