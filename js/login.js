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

async function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("https://977ce42d-9fda-4871-b54f-4ab1edba9dd4-00-2avyby4kt3esf.sisko.replit.dev/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (data.success) {
            alert("Login Successful!");
            window.location.href = "welcome.html"; // redirect after login
        } else {
            alert("Invalid Credentials");
        }
    } catch (err) {
        alert("Server error. Please try again later.");
    }
        }
