async function recipeApi() {
    try {
        let getRecipe = await fetch('https://dummyjson.com/recipes')
        let recipeJson = await getRecipe.json()
        let cards = document.getElementById("recipe-cards")
        for (let i = 0; i < recipeJson.length; i++) {
            console.log(recipeJson[i]);
            cards.innerHTML += `<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`

        }
    }
    catch (error) {
        console.error("error fetching data", error)
    }
}
recipeApi()