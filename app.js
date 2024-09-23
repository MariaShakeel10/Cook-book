fetch('https://dummyjson.com/recipes')
  .then(res => res.json())
  .then(data => {
    const recipes = data.recipes || []; // Adjust based on the API response structure
    recipes.forEach(menu => {
      let cards = document.getElementById("recipe-cards");
      cards.innerHTML += `<div class="card rounded m-2" style="width: 18rem;">
        <img src="${menu.image}" class="card-img-top" alt="...">
        <div class="card-body text-center">
          <h5 class="card-title">${menu.name}</h5>
          <p class="card-text">Cuisine: ${menu.cuisine}</p>
          <p class="card-text">Difficulty: ${menu.difficulty}</p>
          <a href="#" class="btn btn-primary" onclick="newTab('${menu.name.replace(/\s+/g, '-')}.html', '${menu.ingredients.join(", ")}', '${menu.instructions.join(", ")}', '${menu.mealType.join(", ")}')">Go somewhere</a>
        </div>
      </div>`;
    });
  })
  .catch(error => console.error('Error fetching data:', error));

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
