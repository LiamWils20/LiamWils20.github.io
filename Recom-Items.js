// Exchange rates from GBP (updated periodically)
const exchangeRates = {
  "USD": 1.35,  // GBP to USD
  "EUR": 1.14,  // GBP to EUR
  "JPY": 209.24, // GBP to JPY
  "AUD": 1.91,  // GBP to AUD
  "CAD": 1.85,  // GBP to CAD
  "CHF": 1.05,  // GBP to CHF
  "CNY": 9.31,  // GBP to CNY
  "INR": 122.30, // GBP to INR
  "MXN": 23.57,  // GBP to MXN
  "SGD": 1.71,  // GBP to SGD
  "GBP": 1.0,   // GBP to GBP
};

// Store the currently selected currency
let selectedCurrency = null;

const games = [
    // Speed Nissan Skyline
    { title: "Lego Speed Nissan Skyline",
      category: "Toy",
      subCategory: "Lego Speed",
      priceGBP: 19.99,
      link: "https://amzn.to/4rwO35y",
      cover: "images/Recommended/Lego Speed Skyline (76917).png",
    },
    // Speed Dodge Charger
    { title: "Lego Speed Dodge Charger",
      category: "Toy",
      subCategory: "Lego Speed",
      priceGBP: 64.18,
      link: "https://amzn.to/4av3XY7",
      cover: "images/Recommended/Lego Speed Charger (76912).png",
    },
    // Technic Skyline Charger
    { title: "Lego Technic Nissan Skyline",
      category: "Toy",
      subCategory: "Lego Technic",
      priceGBP: 129.99,
      link: "https://amzn.to/3Ot4LUU",
      cover: "images/Recommended/Lego Technic Skyline (42210).png", 
    },
    // Technic Dodge Charger
    { title: "Lego Technic Dodge Charger",
      category: "Toy",
      subCategory: "Lego Technic",
      priceGBP: 210.92,
      link: "https://amzn.to/3Ot1SmS",
      cover: "images/Recommended/Lego Technic Charger (42111).png",
    },


];

// Mapping of categories to their sub-categories
const categorySubcategoryMap = {
  "Toy": ["Lego", "Lego Speed", "Lego Technic"],
  "Game": ["Video Games", "Board Game", "Mobile Games"],
};

// Get user's locale and currency
function getUserCurrency() {
  try {
    const locale = navigator.language || navigator.userLanguage;
    const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' });
    const parts = formatter.formatToParts(1);
    const currencyPart = parts.find(p => p.type === 'currency');
    
    // Try to get the actual currency code for the user's region
    const regionLocales = {
      'en-GB': 'GBP',
      'en-US': 'USD',
      'en-AU': 'AUD',
      'en-CA': 'CAD',
      'en-SG': 'SGD',
      'en-NZ': 'NZD',
      'en-IN': 'INR',
      'en-MX': 'MXN',
      'de-DE': 'EUR',
      'de-AT': 'EUR',
      'de-CH': 'CHF',
      'fr-FR': 'EUR',
      'it-IT': 'EUR',
      'es-ES': 'EUR',
      'ja-JP': 'JPY',
      'zh-CN': 'CNY',
    };
    
    // Check if locale matches our map
    for (const [loc, curr] of Object.entries(regionLocales)) {
      if (locale.startsWith(loc.split('-')[0])) {
        return { code: curr, locale: locale };
      }
    }
    
    // Default to USD if we can't determine
    return { code: 'USD', locale: 'en-US' };
  } catch (e) {
    return { code: 'USD', locale: 'en-US' };
  }
}

// Convert GBP price to user's local currency
function convertPrice(priceGBP) {
  let userCurrency;
  
  // Use manually selected currency if available, otherwise auto-detect
  if (selectedCurrency) {
    const localeMap = {
      'USD': 'en-US',
      'GBP': 'en-GB',
      'EUR': 'de-DE',
      'JPY': 'ja-JP',
      'AUD': 'en-AU',
      'CAD': 'en-CA',
      'CHF': 'de-CH',
      'CNY': 'zh-CN',
      'INR': 'en-IN',
      'MXN': 'es-MX',
      'SGD': 'en-SG'
    };
    userCurrency = { code: selectedCurrency, locale: localeMap[selectedCurrency] || 'en-US' };
  } else {
    userCurrency = getUserCurrency();
  }
  
  let convertedPrice = priceGBP;
  
  if (userCurrency.code !== 'GBP' && exchangeRates[userCurrency.code]) {
    convertedPrice = priceGBP * exchangeRates[userCurrency.code];
  }
  
  // Format the price in user's local currency
  try {
    return new Intl.NumberFormat(userCurrency.locale, {
      style: 'currency',
      currency: userCurrency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(convertedPrice);
  } catch (e) {
    // Fallback to GBP if currency formatting fails
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(priceGBP);
  }
}

// Test function - call from browser console: testCurrency('USD')
window.testCurrency = function(currencyCode) {
  const localeMap = {
    'USD': 'en-US',
    'GBP': 'en-GB',
    'EUR': 'de-DE',
    'JPY': 'ja-JP',
    'AUD': 'en-AU',
    'CAD': 'en-CA',
    'CNY': 'zh-CN',
    'INR': 'en-IN',
    'MXN': 'es-MX'
  };
  
  const locale = localeMap[currencyCode] || 'en-US';
  const testPrice = 19.99; // Testing with first game price in GBP
  
  let converted = testPrice;
  if (currencyCode !== 'GBP' && exchangeRates[currencyCode]) {
    converted = testPrice * exchangeRates[currencyCode];
  }
  
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(converted);
  
  console.log(`Testing: £${testPrice} GBP = ${formatted} (${currencyCode})`);
  console.log(`Exchange rate GBP to ${currencyCode}:`, exchangeRates[currencyCode] || 'N/A');
  return formatted;
};

// Function to update sub-category dropdown based on selected category
function updateSubcategories() {
  const categorySelect = document.getElementById("category");
  const subcategorySelect = document.getElementById("subCategory");
  const selectedCategory = categorySelect.value;

  // Clear existing options except the first one
  subcategorySelect.innerHTML = '<option value="">Sub-Category</option>';
  
  if (selectedCategory && categorySubcategoryMap[selectedCategory]) {
    // Add options for the selected category
    categorySubcategoryMap[selectedCategory].forEach(subcat => {
      const option = document.createElement("option");
      option.value = subcat;
      option.textContent = subcat;
      subcategorySelect.appendChild(option);
    });
  }
}

function renderGames(filter = {}) {
  const grid = document.getElementById("gameGrid");
  grid.innerHTML = "";

    const filtered = games.filter(game => {
        // If subCategory is selected, it takes priority over category
        const categoryMatch = filter.subCategory 
            ? game.subCategory === filter.subCategory 
            : (!filter.category || game.category === filter.category);
        
        return (!filter.search || game.title.toLowerCase().includes(filter.search)) &&
            categoryMatch;
    });



  filtered.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";
    const convertedPrice = convertPrice(game.priceGBP);
    card.innerHTML = `
        <img src="${game.cover}" alt="${game.title}" />
        <div class="game-info">
            <h3><span class="gold">${game.title}</span></h3>
            <p><span class="green">${convertedPrice}</span></p>
            
        </div>
        <a class="btn-card" href="${game.link || '#'}" target="_blank">View Item<span>↗</span></a>
    `;

    grid.appendChild(card);
  });
}

document.querySelectorAll(".filters input, .filters select").forEach(el => {
  el.addEventListener("input", () => {
    renderGames({
      search: document.getElementById("search").value.toLowerCase(),
      category: document.getElementById("category").value,
      subCategory: document.getElementById("subCategory").value,
    });
  });
});

// Add event listener specifically for category dropdown to update subcategories
document.getElementById("category").addEventListener("change", () => {
  updateSubcategories();
  // Also trigger the filter update
  renderGames({
    search: document.getElementById("search").value.toLowerCase(),
    category: document.getElementById("category").value,
    subCategory: document.getElementById("subCategory").value,
  });
});

// Add event listener for currency dropdown
document.getElementById("currency").addEventListener("change", (e) => {
  selectedCurrency = e.target.value;
  // Re-render games with the new currency
  renderGames({
    search: document.getElementById("search").value.toLowerCase(),
    category: document.getElementById("category").value,
    subCategory: document.getElementById("subCategory").value,
  });
});

// Initialize the page
function initializePage() {
  // Set initial currency to auto-detected value
  const userCurrency = getUserCurrency();
  selectedCurrency = userCurrency.code;
  
  // Update the dropdown to reflect the auto-detected currency
  const currencySelect = document.getElementById("currency");
  if (currencySelect.querySelector(`option[value="${userCurrency.code}"]`)) {
    currencySelect.value = userCurrency.code;
  }
  
  // Render games with the initial currency
  renderGames();
}

// Call initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage);
} else {
  initializePage();
}

function getStatusClass(status) {
  const normalized = status.toLowerCase();
  if (normalized.includes("currently watching")) return "active";
  if (normalized.includes("watched")) return "completed";
  if (normalized.includes("queued")) return "queued";
  return "default";
}