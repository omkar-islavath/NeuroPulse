async function loadLeaderboard() {
  const container = document.getElementById("leaderboard-list");
  container.innerHTML =
    "<p style='color:var(--muted);text-align:center;font-family:Rajdhani,sans-serif'>Loading...</p>";

  try {
    const res = await fetch("/api/scores/leaderboard");
    const data = await res.json();

    container.innerHTML = "";

    if (!data.length) {
      container.innerHTML =
        "<p style='color:var(--muted);text-align:center;font-family:Rajdhani,sans-serif;padding:32px'>No scores yet. Be the first!</p>";
      return;
    }

    data.forEach(function (item, index) {
      const row = document.createElement("div");
      row.className = "leaderboard-row";

      let rankDisplay = index + 1;
      if (index === 0) rankDisplay = "🥇";
      else if (index === 1) rankDisplay = "🥈";
      else if (index === 2) rankDisplay = "🥉";

      row.innerHTML = `
        <div class="rank">${rankDisplay}</div>
        <div class="email">${item.email}</div>
        <div class="score">${item.score}</div>
      `;

      container.appendChild(row);
    });
  } catch (err) {
    container.innerHTML =
      "<p style='color:var(--red);text-align:center;font-family:Rajdhani,sans-serif;padding:32px'>Failed to load leaderboard.</p>";
  }
}
