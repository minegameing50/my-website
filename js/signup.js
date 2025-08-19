let generatedOTP = "";

function getOTP() {
    const mobile = document.getElementById("mobile").value.trim();

    // Validate mobile before generating OTP
    if (!/^\d{10}$/.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number first.");
        return;
    }

    // Generate random 4-digit OTP
    generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
    alert("Your OTP is: " + generatedOTP); // In real app, send via SMS

    // Disable button for 30 seconds
    const btn = document.getElementById("get-otp-btn");
    btn.disabled = true;
    let timeLeft = 30;
    btn.textContent = `Wait ${timeLeft}s`;

    const timer = setInterval(() => {
        timeLeft--;
        btn.textContent = `Wait ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            btn.disabled = false;
            btn.textContent = "Get OTP";
        }
    }, 1000);
}

function validateSignup(event) {
    event.preventDefault(); // Stop form from submitting

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
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Mobile
    if (!/^\d{10}$/.test(mobile)) {
        alert("Mobile number must be exactly 10 digits.");
        return false;
    }

    // OTP
    if (otp !== generatedOTP) {
        alert("Invalid OTP.");
        return false;
    }

    // Password
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    // ✅ Passed all validations
    alert("Signup successful!");
    window.location.href = "login.html"; // Change this to your redirect page
    return true;
            }

// Function to request OTP
async function sendOtp() {
    const mobile = document.getElementById("mobile").value;

    if (!/^\d{10}$/.test(mobile)) {
        alert("Enter a valid 10-digit mobile number.");
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
            alert("OTP sent to your mobile!");
        } else {
            alert("Failed to send OTP. Try again.");
        }
    } catch (err) {
        alert("Error contacting server.");
    }
}

// Function to verify OTP
async function verifyOtp() {
    const mobile = document.getElementById("mobile").value;
    const otp = document.getElementById("otp").value;

    try {
        const res = await fetch("https://977ce42d-9fda-4871-b54f-4ab1edba9dd4-00-2avyby4kt3esf.sisko.replit.dev/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mobile, otp })
        });

        const data = await res.json();
        if (data.success) {
            alert("OTP Verified Successfully!");
        } else {
            alert("Invalid OTP, please try again.");
        }
    } catch (err) {
        alert("Error contacting server.");
    }
}
