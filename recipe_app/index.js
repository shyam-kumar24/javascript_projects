const recipeListDiv = document.querySelector('.recipe-list-div');
const recipeDetailDiv = document.querySelector('.recipe-detail-div');

async function fetchRecipeList() {
    try {
        const response = await fetch("https://dummyjson.com/recipes");
        const data = await response.json();
        
        if (data.recipes && data.recipes.length) {
            recipeListDiv.classList.remove('hide');
            recipeDetailDiv.classList.add('hide-detail');
            displayRecipeList(data.recipes);
        }
    } catch (error) {
        console.error("Error fetching recipe list:", error);
    }
}

function displayRecipeList(recipeArray) {
    recipeListDiv.innerHTML = ""; // Clear previous content

    recipeArray.forEach((recipeItem) => {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');

        const image = document.createElement('img');
        image.src = recipeItem.image;
        image.classList.add('card-image');
        cardContainer.appendChild(image);

        const nameH1 = document.createElement('h1');
        nameH1.textContent = recipeItem.name;
        nameH1.classList.add('name-h1');
        cardContainer.appendChild(nameH1);

        const p = document.createElement('p');
        p.textContent = recipeItem.cuisine;
        p.classList.add('cuisine');
        cardContainer.appendChild(p);

        const ingredientPara = document.createElement('p');
        ingredientPara.textContent = recipeItem.ingredients.join(', ');
        ingredientPara.classList.add('ingredients-para');
        cardContainer.appendChild(ingredientPara);

        const mealType = document.createElement('h2');
        mealType.textContent = recipeItem.mealType;
        cardContainer.appendChild(mealType);

        const rating = document.createElement('p');
        rating.textContent = `Rating: ${recipeItem.rating}`;
        rating.classList.add('rating-p');
        cardContainer.appendChild(rating);

        const button = document.createElement('button');
        button.textContent = 'Recipe Details';
        button.classList.add('recipe-detail-btn');
        cardContainer.appendChild(button);

        button.addEventListener('click', () => fetchRecipeDetails(recipeItem.id));

        recipeListDiv.appendChild(cardContainer);
    });
}

async function fetchRecipeDetails(getId) {
    try {
        const response = await fetch(`https://dummyjson.com/recipes/${getId}`);
        const result = await response.json();
        displayIngredient(result);
    } catch (error) {
        console.error("Error fetching recipe details:", error);
    }
}

function displayIngredient(res) {
    recipeDetailDiv.innerHTML = "";

    recipeListDiv.classList.add('hide');
    recipeDetailDiv.classList.remove('hide-detail');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card-div');

    const caloriesPara = document.createElement('p');
    caloriesPara.textContent = `Calories per serving: ${res.caloriesPerServing}`;
    cardDiv.appendChild(caloriesPara);

    const cookTimePara = document.createElement('p');
    cookTimePara.textContent = `Cook time: ${res.cookTimeMinutes} minutes`;
    cardDiv.appendChild(cookTimePara);

    const instructionDiv = document.createElement('div');
    instructionDiv.classList.add('instruction-div');
    
    const h2 = document.createElement('h2')
    h2.textContent = res.name
    cardDiv.appendChild(h2);
    
    const h1 = document.createElement('h1');
    h1.textContent = '# Instructions';
    instructionDiv.appendChild(h1);

    const ul = document.createElement('ol');
    res.instructions.forEach((instn) => {
        const li = document.createElement('li');
        li.textContent = instn;
        ul.appendChild(li);
    });
    instructionDiv.appendChild(ul);

    cardDiv.appendChild(instructionDiv);
    recipeDetailDiv.appendChild(cardDiv);
}

window.addEventListener('click', (e) => {
    if (!recipeDetailDiv.contains(e.target) && !recipeListDiv.contains(e.target)) {
        recipeListDiv.classList.remove('hide');
        recipeDetailDiv.classList.add('hide-detail');
    }
});

fetchRecipeList();
