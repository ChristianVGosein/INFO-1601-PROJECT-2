document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('recipeSearchForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const ingredients = document.getElementById('ingredients').value;
        fetchRecipes(ingredients);
    });
});

document.getElementById('recipeSearchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const ingredients = document.getElementById('ingredients').value;
    fetchRecipes(ingredients);
});


function displayRecipes(recipes) {
    const recipesList = document.getElementById('recipesList');
    recipesList.innerHTML = '';  

    recipes.forEach(recipe => {
        const elem = document.createElement('div');
        elem.classList.add('recipe-item');
        elem.setAttribute('data-id', recipe.id);  
        elem.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" style="width:100px; height:100px;">
            <p>${recipe.title}</p>
        `;
        recipesList.appendChild(elem);

        elem.addEventListener('click', function() {
            const recipeId = this.getAttribute('data-id');
            fetchRecipeDetails(recipeId);
        });
    });
}


function fetchRecipeDetails(recipeId) {
    const apiKey = 'ec253cb239a84cf183af31462e7e7411';
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayRecipeDetails(data);
    })
    .catch(error => {
        console.error('Error fetching recipe details:', error);
        document.getElementById('recipesList').innerHTML = 'Error loading recipe details.';
    });
}


function displayRecipeDetails(recipe) {
    const recipeDetails = document.getElementById('recipeDetails'); 
    recipeDetails.innerHTML = `
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}" style="width:200px; height:200px;">
        <p><strong>Instructions:</strong> ${recipe.instructions || 'No instructions provided.'}</p>
    `;
}


function fetchRecipes(ingredients) {
    const apiKey = 'ec253cb239a84cf183af31462e7e7411'; 
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=10&apiKey=${apiKey}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayRecipes(data);
    })
    .catch(error => {
        console.error('Error fetching recipes:', error);
        document.getElementById('recipesList').innerHTML = 'Error loading recipes.';
    });
}


