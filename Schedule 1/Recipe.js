const games = [
    // OG Kush
    { title: "OG Kush",
      totalCost: "$71",
      totalSell: "$173",
      totalProfit: "$",
      ingredients: [
        "Green Crack → $40",
        "Paracetamol → $3",
        "Banana → $2",
        "Gasoline → $5",
        "Cuke → $2",
        "Mega Bean → $7",
        "Battery → $8",
        "Banana → $2",
        "Cuke → $2"
      ],
    },
    // Sour Diesel
    { title: "Sour Diesel",
      totalCost: "$71",
      totalSell: "$173",
      totalProfit: "$",
      ingredients: [
        "Green Crack → $40",
        "Paracetamol → $3",
        "Banana → $2",
        "Gasoline → $5",
        "Cuke → $2",
        "Mega Bean → $7",
        "Battery → $8",
        "Banana → $2",
        "Cuke → $2"
      ],
    },
    // Green Crack
    { title: "Green Crack",
      totalCost: "$71",
      totalSell: "$173",
      totalProfit: "$",
      ingredients: [
        "Green Crack → $40",
        "Paracetamol → $3",
        "Banana → $2",
        "Gasoline → $5",
        "Cuke → $2",
        "Mega Bean → $7",
        "Battery → $8",
        "Banana → $2",
        "Cuke → $2"
      ],

    },
    // Grandaddy Purple
    { title: "Grandaddy Purple",
      totalCost: "$85",
      totalSell: "$172",
      totalProfit: "$87",
      ingredients: [
        "Grandaddy Purple → $45",
        "Cuke → $2",
        "Energy Drink → $6",
        "Paracetamol → $3",
        "Gasoline → $5",
        "Cuke → $2",
        "Battery → $8",
        "Mega Bean → $7",
        "Chili → $7"
      ],
    },
    // Methamphetamine
    { title: "Methamphetamine",
      totalCost: "$238",
      totalSell: "$353",
      totalProfit: "$119",
      ingredients: [
        "Premium Meth → $190",
        "Motor Oil → $6",
        "Banana → $2",
        "Cuke → $2",
        "Paracetamol → $3",
        "Gasoline → $5",
        "Cuke → $2",
        "Battery → $8",
        "Horse Semen → $9",
        "Mega Bean → $7"
      ],
    },
    // Shrooms
    { title: "Shrooms",
      totalCost: "$71",
      totalSell: "$173",
      totalProfit: "$",
      ingredients: [
        
      ],
    },
    // Cocaine
    { title: "Cocaine",
      totalCost: "$197",
      totalSell: "$735",
      totalProfit: "$538",
      ingredients: [
        "Cocaine → $155",
        "Motor Oil → $6",
        "Cuke → $2",
        "Paracetamol → $3",
        "Gasoline → $5",
        "Cuke → $2",
        "Battery → $8",
        "Horse Semen → $9",
        "Mega Bean → $7"
      ],
    },
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
        <div class="game-info">
            <h3><span class="gold">${game.title}</span></h3>
            <p><span class="gold">Cost: </span>${game.totalCost}</p>
            <p><span class="gold">Sell: </span>${game.totalSell}</p>
            <p><span class="gold">Profit: </span>${game.totalProfit}</p>

            <div class="project-list">
                <ul>
                    ${game.ingredients?.map(item => `<li>${item}</li>`).join("") || "<li>TBD</li>"}
                </ul>
            </div>
        <br>
            
        </div>
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