let allRecipes = []; // To store all recipes

fetch('https://dummyjson.com/recipes')
  .then(res => res.json())
  .then(data => {
    const recipes = data.recipes || [];
    allRecipes = recipes; // Store all recipes

    displayRecipes(recipes); // Initial display of recipes
  })
  .catch(error => console.error('Error fetching data:', error));

// Function to display recipes
function displayRecipes(recipes) {
  const cards = document.getElementById("recipe-cards");
  cards.innerHTML = ""; // Clear existing cards
  recipes.forEach(menu => {
    cards.innerHTML += `
      <div class="card rounded m-2" style="width: 18rem;">
        <img src="${menu.image}" class="card-img-top animate__animated recipe-cards" alt="...">
        <div class="card-body text-center animate_animated zoomUp">
          <h5 class="card-title">${menu.name}</h5>
          <p class="card-text">Cuisine: ${menu.cuisine}</p>
          <p class="card-text">Difficulty: ${menu.difficulty}</p>
          <a href="#" class="btn btn-color rounded-pill" onclick="newTab('${menu.name.replace(/\s+/g, '-')}.html', '${menu.ingredients.join(", ")}', '${menu.instructions.join(", ")}', '${menu.mealType.join(", ")}')">Click to see more..</a>
        </div>
      </div>`;
  });
}

// Search functionality
function searchRecipes() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filteredRecipes = allRecipes.filter(menu => 
    menu.name.toLowerCase().includes(query) || 
    menu.cuisine.toLowerCase().includes(query)
  );
  displayRecipes(filteredRecipes); // Display filtered recipes
}
// Search functionality on button click
document.getElementById("searchButton").addEventListener("click", searchRecipes);
// on enter key
document.getElementById("searchInput").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchRecipes(); // Call the search function on Enter key press
    event.preventDefault(); // Prevent form submission (if inside a form)
  }
});

// Function to open new tab for recipe details
function newTab(url, ingredients, instructions, mealType) {
  let tab = window.open(url, url, 'width=420,height=380,left=450,top=200');
  
  tab.document.write(`
      <html>
        <head>
          <title>${url.replace('-', ' ')}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; }
            .ingredients, .instructions, .meal-type { margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h1>${url.replace('-', ' ')}</h1>
          <div class="ingredients">
            <h2>Ingredients</h2>
            <p>${ingredients}</p>
          </div>
          <div class="instructions">
            <h2>Instructions</h2>
            <p>${instructions}</p>
          </div>
          <div class="meal-type">
            <h2>Meal Type</h2>
            <p>${mealType}</p>
          </div>
        </body>
      </html>
  `);
  
  tab.document.close();
}
