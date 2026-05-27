async function signupUser() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const status = document.getElementById("auth-status");

  if (!email || !password) {
    status.style.color = "var(--red)";
    status.textContent = "Please fill in all fields.";
    return;
  }

  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  status.style.color = res.ok ? "var(--green)" : "var(--red)";
  status.textContent = data.message;
}

async function loginUser() {
  const loader = document.getElementById("loader");
  const btnText = document.getElementById("btn-text");
  const loginBtn = document.getElementById("login-btn");
  const status = document.getElementById("auth-status");

  if (loader) loader.style.display = "inline-block";
  if (btnText) btnText.textContent = "Logging in...";
  if (loginBtn) loginBtn.disabled = true;

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      status.style.color = "var(--green)";
      status.textContent = "Login successful!";
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("email", email);
      setTimeout(() => {
        window.location.href = "game.html";
      }, 800);
    } else {
      status.style.color = "var(--red)";
      status.textContent = data.message || "Login failed";
    }
  } catch (err) {
    status.style.color = "var(--red)";
    status.textContent = "Network error. Please try again.";
  }

  if (loader) loader.style.display = "none";
  if (btnText) btnText.textContent = "LOGIN";
  if (loginBtn) loginBtn.disabled = false;
}

function getUserId() {
  return localStorage.getItem("userId");
}
