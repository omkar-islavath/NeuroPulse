async function resetPassword() {
  const email = document.getElementById("email").value;
  const newPassword = document.getElementById("newPassword").value;

  const res = await fetch("/api/auth/reset-password", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
      newPassword,
    }),
  });

  const data = await res.json();

  const status = document.getElementById("status");

  if (res.ok) {
    status.style.color = "lightgreen";
    status.textContent = "Password updated";
  } else {
    status.style.color = "red";
    status.textContent = data.message;
  }
}
