const games = [
    // 4 Mini Godot Projects
    { title: "Household Mayhem",
      category: ["2D Game", "Tower Defense"],
      engine: "Unity",
      platform: ["Browser", "Windows", "Mac", "Linux"],
      genre: ["Action", "Adventure", "Narrative-Driven", "Indie", "Magic"],
      released: "TBD",
      tags: ["2D Game", "Unity"],
      link: "Project Pages/Game Projects/Household Mayhem/Household Mayhem.html",
      cover: "Project Pages/Game Projects/Household Mayhem/images/Banner Img.png",
    },
    // 4 Mini Godot Projects
    { title: "4 Mini Godot Projects",
      category: ["3D Game", "2D Game"],
      engine: "Godot",
      platform: ["Windows", "Mac", "Linux"],
      genre: ["Action", "Adventure", "Narrative-Driven", "Indie", "Magic"],
      released: "Educational Project",
      tags: ["2D Game", "Godot"],
      link: "Project Pages/Game Projects/4 Mini Godot Projects/4 Mini Godot Projects-Main.html",
      cover: "Project Pages/Game Projects/4 Mini Godot Projects/images/Banner Img.png",
    },
    // Dragon Slayer
    { title: "Dragon Slayer 2D",
      category: ["2D Game"],
      engine: "Godot",
      platform: ["Windows", "Mac", "Linux"],
      genre: ["Action", "Adventure", "Platformer", "Indie"],
      released: "In-Development",
      tags: ["2D Game", "Godot"],
      link: "Project Pages/Game Projects/Dragon Slayer/Dragon Slayer-Main.html",
      cover: "Project Pages/Game Projects/Dragon Slayer/images/Banner Img.png",
    },
    // Chub's Revenge
    { title: "Chub's Revenge",
      category: ["3D Game", "Game Jam"],
      engine: "Unity",
      platform: ["Browser"],
      genre: ["Survival", "Indie"],
      released: "05/07/2024",
      tags: ["3D Game", "Unity"],
      link: "Project Pages/Game Projects/Chub's Revenge/Chub's Revenge-Main.html",
      cover: "Project Pages/Game Projects/Chub's Revenge/images/Banner Img.png",
    },
    // BuildABang
    { title: "BuildABang",
      category: ["3D Game"],
      engine: "Unity",
      platform: ["Windows", "Mac", "Linux"],
      genre: ["Survival", "Indie"],
      released: "05/07/2024",
      tags: ["3D Game", "Unity"],
      link: "Project Pages/Game Projects/BuildABang/BuildABang-Main.html",
      cover: "Project Pages/Game Projects/BuildABang/images/Banner Img.png",
    },
    // Kades Last Stand
    { title: "Kades Last Stand",
      category: ["3D Game", "Game Jam"],
      engine: "Unity",
      platform: ["Windows", "Mac", "Linux"],
      genre: ["Horror", "Indie", "Runner"],
      released: "04/10/2024",
      tags: ["3D Game", "Unity"],
      link: "Project Pages/Game Projects/Kade's Last Stand/Kade's Last Stand-Main.html",
      cover: "Project Pages/Game Projects/Kade's Last Stand/images/Banner Img.png",
   },
    // Risen from Hell
    { title: "Risen from Hell",
      platform: ["Windows"],
      category: ["3D Game", "Game Jam"],
      engine: "Unity",
      genre: ["Horror", "Indie", "Runner"],
      released: "21/04/2024",
      tags: ["3D Game", "Unity"],
      link: "Project Pages/Game Projects/Risen From Hell/Risen From Hell-Main.html",
      cover: "Project Pages/Game Projects/Risen From Hell/images/Banner Img.png",
    },
    // Wrap It Up
    { title: "Wrap It Up",
      platform: ["Windows"],
      category: ["3D Game", "Game Jam"],
      engine: "Unity",
      genre: ["Simulation", "Indie", "Holiday"],
      released: "23/12/2023",
      tags: ["3D Game", "Unity"],
      link: "Project Pages/Game Projects/Wrap It Up/Wrap It Up-Main.html",
      cover: "Project Pages/Game Projects/Wrap It Up/images/Banner Img.png",
    },
    // Neon Racer
    { title: "Neon Racer",
      category: ["3D Game"],
      engine: "Unity",
      platform: ["Windows", "Mobile", "VR"],
      genre: ["Racing", "Indie"],
      released: "27/10/2023",
      tags: ["3D Game", "Unity"],
      link: "Project Pages/Game Projects/Neon Racer/Neon Racer-Main.html",
      cover: "Project Pages/Game Projects/Neon Racer/images/Banner Img.gif",
    },
    // Realm Runner
    { title: "Realm Runner",
      category: ["3D Game"],
      engine: "Unity",
      platform: ["Windows", "Mac", "Linux"],
      genre: ["Action", "Adventure", "Platformer", "Indie"],
      released: "26/07/2023",
      tags: ["3D Game", "Unity"],
      link: "Project Pages/Game Projects/Realm Runner/Realm Runner-Main.html",
      cover: "Project Pages/Game Projects/Realm Runner/images/Banner Img.png",
    },

    // TBD
    /*{ title: "TBD",
      category: ["3D Game", "Game Jam"],
      engine: "Unity",
      platform: ["Windows", "Mac", "Linux", "Xbox", "PlayStation", "Switch"],
      genre: ["Indie", "Simulation"],
      released: "",
      tags: ["3D Game", "Unity"],
      link: "",
      cover: "",
    },*/
];

function renderGames(filter = {}) {
  const grid = document.getElementById("gameGrid");
  grid.innerHTML = "";

    const filtered = games.filter(game => {
        return (!filter.search || game.title.toLowerCase().includes(filter.search)) &&
            (!filter.platform || game.platform.includes(filter.platform)) &&
            (!filter.genre || game.genre.includes(filter.genre)) &&
            (!filter.category || game.category.includes(filter.category)) && (!filter.engine || game.engine === filter.engine);
    });



  filtered.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
        <a href="${game.link || '#'}"><img src="${game.cover}" alt="${game.title}" /></a>
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