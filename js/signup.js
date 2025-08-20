let generatedOTP = "";

// ✅ Request OTP from backend (Fast2SMS)
async function getOTP() {
    const mobile = document.getElementById("mobile").value.trim();

    // Validate mobile before sending request
    if (!/^\d{10}$/.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    try {
        const res = await fetch("https://977ce42d-9fda-4871-b54f-4ab1edba9dd4-00-2avyby4kt3esf.sisko.replit.dev/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mobile })
        });

        const data = await res.json();
        if (data.success) {
            generatedOTP = data.otp; // keep in memory for verification (for now)
            alert("OTP sent to your mobile number!");
        } else {
            alert("Failed to send OTP.");
        }
    } catch (err) {
        console.error(err);
        alert("Error contacting server.");
    }
}

// ✅ Validate signup form (includes OTP check)
async function validateSignup(event) {
    event.preventDefault(); // Stop form submission

    const fullName = document.getElementById("fullname").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const otp = document.getElementById("otp").value.trim();
    const password = document.getElementById("password").value;

    // Full name
    if (fullName === "") {
        alert("Full name is required.");
        return false;
    }

    // Username
    if (username === "") {
        alert("Username is required.");
        return false;
    }

    // Email
    const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Mobile
    if (!/^\\d{10}$/.test(mobile)) {
        alert("Mobile number must be exactly 10 digits.");
        return false;
    }

    // OTP check
    if (otp !== generatedOTP) {
        alert("Invalid OTP.");
        return false;
    }

    // Password
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    // ✅ Call backend signup API
    try {
        const res = await fetch("https://977ce42d-9fda-4871-b54f-4ab1edba9dd4-00-2avyby4kt3esf.sisko.replit.dev/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullname: fullName, username, email, mobile, password })
        });

        const data = await res.json();
        if (data.success) {
            alert("Signup successful!");
            window.location.href = "login.html";
        } else {
            alert("Signup failed: " + data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Server error. Please try again.");
    }

    return true;
        }
