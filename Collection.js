const games = [
    // The Master Project
    { title: "Time Reaper",
      category: "Film",
      platform: ["Prime"],
      genre: ["Action", "Adventure"],
      released: "2026",
      tags: ["Film", "Prime"],
      cover: "images/Projects/Game/Time Reaper/Cover Img.png",
    }
];

function renderGames(filter = {}) {
  const grid = document.getElementById("gameGrid");
  grid.innerHTML = "";

    const filtered = games.filter(game => {
        return (!filter.search || game.title.toLowerCase().includes(filter.search)) &&
            (!filter.platform || game.platform.includes(filter.platform)) &&
            (!filter.genre || game.genre.includes(filter.genre)) &&
            (!filter.category || game.category === filter.category);
    });



  filtered.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
        <img src="${game.cover}" alt="${game.title}" />
        <div class="game-info">
            <h3><span class="gold">${game.title}</span></h3>
            <p><strong>Released:</strong> ${game.released || "TBD"}</p>
            <p><strong>Platform:</strong> ${game.platform.join(", ")}</p>

            <div class="tags">
              ${game.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div> 
        <br>
            
        </div>
        <a class="btn-card" href="${game.link || '#'}" target="${game.btnTarget || ''}">${game.btnText || 'Learn More'} <span>↗</span></a>
    `;

    grid.appendChild(card);
  });
}

document.querySelectorAll(".filters input, .filters select").forEach(el => {
  el.addEventListener("input", () => {
    renderGames({
      search: document.getElementById("search").value.toLowerCase(),
      category: document.getElementById("category").value,
      engine: document.getElementById("engine").value,
      platform: document.getElementById("platform").value,
      genre: document.getElementById("genre").value,
    });
  });
});

function renderStars(count) {
  const full = "★".repeat(count);
  const empty = "☆".repeat(5 - count);
  return `<span>${full}${empty}</span>`;
}

function getStatusClass(status) {
  const normalized = status.toLowerCase();
  if (normalized.includes("currently watching")) return "active";
  if (normalized.includes("watched")) return "completed";
  if (normalized.includes("queued")) return "queued";
  return "default";
}

renderGames();