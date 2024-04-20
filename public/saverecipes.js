function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '';  // Clear previous entries

    recipes.forEach(recipe => {
        const item = document.createElement('li');
        item.innerHTML = `
            <div>
                <strong>${recipe.title}</strong>
                <img src="${recipe.image}" alt="${recipe.title}" style="width:100px; height:100px;">
                <p>${recipe.summary.replace(/<[^>]+>/g, '')}</p>
                <button onclick="saveRecipe(${JSON.stringify(recipe).replace(/"/g, "&quot;")})">Save Recipe</button>
            </div>
        `;
        recipeList.appendChild(item);
    });
}


function saveRecipe(recipeId) {
    let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=5a8502e9d43d4cb195b558221c7f0a67`)
        .then(response => response.json())
        .then(data => {
            savedRecipes.push(data);
            localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
            alert('Recipe saved!');
        })
        .catch(error => {
            console.error('Error saving the recipe:', error);
            alert('Failed to save recipe.');
        });
}

function saveRecipe(recipe) {
    let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    savedRecipes.push(recipe); // Add the new recipe to the array
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes)); // Save back to local storage
    alert('Recipe saved successfully!');
}
