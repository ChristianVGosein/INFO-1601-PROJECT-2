document.getElementById('recipeSearchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const ingredients = document.getElementById('ingredients').value;
    fetchRecipes(ingredients);
});

function fetchRecipes(ingredients) {
    const apiKey = '5a8502e9d43d4cb195b558221c7f0a67'; 
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=10&apiKey=${apiKey}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayRecipes(data);
    })
    .catch(error => {
        console.error('Error fetching recipes:', error);
        document.getElementById('recipeList').innerHTML = 'Error loading recipes.';
    });
}

function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '';  // Clear previous entries

    recipes.forEach(recipe => {
        // Create elements individually to avoid issues with innerHTML
        const elem = document.createElement('div');

        // Create and configure the image element
        const img = document.createElement('img');
        img.src = recipe.image;
        img.alt = recipe.title;
        img.style.height = '100px';  // Apply styles directly

        // Create and configure the paragraph element for the title
        const title = document.createElement('p');
        title.textContent = recipe.title;  // Use textContent for safe text insertion

        // Append elements to the container div
        elem.appendChild(img);
        elem.appendChild(title);

        // Append the container div to the recipe list
        recipeList.appendChild(elem);
    });
}

