const games = [
    // The Master Project
    { title: "Time Reaper",
      category: "3D Game",
      engine: "Unity",
      platform: ["Windows", "Mac", "Linux"],
      genre: ["Action", "Adventure", "Narrative-Driven", "Indie", "Magic"],
      released: "TBD",
      tags: ["3D Game", "Unity"],
      link: "Project Pages/Time Reaper/Time Reaper-main.html",
      cover: "images/Projects/Game/Time Reaper/Cover Img.png",
    },
    // Dragon Slayer
    { title: "Dragon Slayer",
      category: "2D Game",
      engine: "Godot",
      platform: ["Windows", "Mac", "Linux"],
      genre: ["Action", "Adventure", "Platformer", "Indie"],
      released: "",
      tags: ["2D Game", "Godot"],
      link: "Projects/Dragon Slayer-Main.html",
      cover: "images/Projects/Game/Dragon Slayer/Cover Img.png",
    },
    // VoidTimer
    { title: "VoidTimer",
      category: "Website",
      engine: "",
      platform: ["Browser"],
      genre: [""],
      released: "",
      tags: ["Website"],
      link: "https://voidtimer.github.io/VoidTimer",
      cover: "images/Projects/Website/VoidTimer/Cover Image.png",
      btnText: "View Site",
      btnTarget: "_blank"
    },
    // GeoBlade
    { title: "GeoBlade",
      category: "Website",
      engine: "",
      platform: ["Browser"],
      genre: ["Table-Top"],
      released: "",
      tags: ["Website"],
      link: "https://geoblade.github.io",
      cover: "images/Projects/Website/GeoBlade/Cover Image.png",
      btnText: "View Site",
      btnTarget: "_blank"
    },
    // MysteryBox
    { title: "MysteryBox",
      category: "Website",
      engine: "",
      platform: ["Browser"],
      genre: ["Minigame Website"],
      released: "",
      tags: ["Website"],
      link: "https://mysteryboxminigame.github.io",
      cover: "images/Projects/Website/MysteryBox/Cover Image.png",
      btnText: "View Site",
      btnTarget: "_blank"
    },
    // Chub's Revenge
    { title: "Chub's Revenge",
      category: "3D Game",
      engine: "Unity",
      platform: ["Browser"],
      genre: ["Survival", "Indie"],
      released: "05/07/2024",
      tags: ["3D Game", "Unity"],
      link: "Projects/Project; Chub's Revenge.html",
      cover: "images/Projects/Game/Chubs Revenge/Cover Image.png",
    },
    // BuildABang
    { title: "BuildABang",
      category: "3D Game",
      engine: "Unity",
      platform: ["Windows", "Mac", "Linux"],
      genre: ["Survival", "Indie"],
      released: "05/07/2024",
      tags: ["3D Game", "Unity"],
      link: "Projects/Project; BuildABang.html",
      cover: "images/Projects/Game/BuildABang/Cover Image.png",
    },
    // Kades Last Stand
    { title: "Kades Last Stand",
      category: "3D Game",
      engine: "Unity",
      platform: ["Windows", "Mac", "Linux"],
      genre: ["Horror", "Indie", "Runner"],
      released: "04/10/2024",
      tags: ["3D Game", "Unity"],
      link: "Projects/Project; Kade's Last Stand.html",
      cover: "images/Projects/Game/Kades Last Stand/Cover Image.png",
   },
    // Risen from Hell
    { title: "Risen from Hell",
      platform: ["Windows"],
      category: "3D Game",
      engine: "Unity",
      genre: ["Horror", "Indie", "Runner"],
      released: "21/04/2024",
      tags: ["3D Game", "Unity"],
      link: "Projects/Project; Risen from Hell.html",
      cover: "images/Projects/Game/Risen from Hell/Cover Image.png",
    },
    // Wrap It Up
    { title: "Wrap It Up",
      platform: ["Windows"],
      category: "3D Game",
      engine: "Unity",
      genre: ["Simulation", "Indie", "Holiday"],
      released: "23/12/2023",
      tags: ["3D Game", "Unity"],
      link: "Projects/Project; Wrap It Up.html",
      cover: "images/Projects/Game/Wrap It Up/Cover Image.png",
    },
    // Neon Racer
    { title: "Neon Racer",
      category: "3D Game",
      engine: "Unity",
      platform: ["Windows", "Mobile", "VR"],
      genre: ["Racing", "Indie"],
      released: "27/10/2023",
      tags: ["3D Game", "Unity"],
      link: "Projects/Project; Neon Racer.html",
      cover: "images/Projects/Game/Neon Racer/Cover Img.gif",
    },
    // Realm Runner
    { title: "Realm Runner",
      category: "3D Game",
      engine: "Unity",
      platform: ["Windows", "Mac", "Linux"],
      genre: ["Action", "Adventure", "Platformer", "Indie"],
      released: "26/07/2023",
      tags: ["3D Game", "Unity"],
      link: "Projects/Project; Realm Runner.html",
      cover: "images/Projects/Game/Realm Runner/Cover Image.png",
    },
    // TBD
    /*{ title: "TBD",
      category: "3D Game",
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
            (!filter.category || game.category === filter.category) && (!filter.engine || game.engine === filter.engine);
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
        <a class="btn-card" href="${game.link || '#'}" target="${game.btnTarget || ''}">Learn More <span>↗</span></a>
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