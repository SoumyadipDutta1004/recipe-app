
const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";


const inputBox = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const recipeContainer = document.querySelector(".recipe-container");
const displayError = document.querySelector(".error-message");


function disableScroll() {
  document.body.style.overflow = "hidden";
}
function enableScroll() {
  document.body.style.overflow = "";
}

function showRecipe(recipes) {
  for (let recipe of recipes.meals) {

    const recipeBox = document.createElement("div");
    recipeBox.classList.add("recipe-box");
    recipeBox.title = recipe.strMeal;

    const mealText = document.createElement("div");
    mealText.classList.add("meal-text");

    const img = document.createElement("img");
    img.src = recipe.strMealThumb;
    img.alt = recipe.strMeal;

    const mealTitle = document.createElement("h3");
    mealTitle.textContent = recipe.strMeal;

    const mealDescription = document.createElement("p");
    mealDescription.textContent = recipe.strInstructions;

    mealText.appendChild(mealTitle);
    mealText.appendChild(mealDescription);
    recipeBox.appendChild(img);
    recipeBox.appendChild(mealText);
    recipeContainer.appendChild(recipeBox);
  }
}

function showFullRecipe() {
  const recipes1 = document.querySelectorAll(".recipe-box");

  for (let recipe of recipes1) {
    recipe.onclick = () => {
      let recipeData = recipe.closest(".recipe-box")
      const bgBlur = document.querySelector(".bg-blur");
      const showRecipe = document.querySelector(".show-recipe");
      showRecipe.innerHTML = '';

      const img = document.createElement("img");
      img.src = recipeData.firstElementChild.src;
      img.alt = recipeData.firstElementChild.alt;

      const textArea = document.createElement("div");
      textArea.classList.add("text-area");

      const mealTitle = document.createElement("h3");
      mealTitle.textContent = recipeData.title;
      const recipeTitle = document.createElement("h4");
      recipeTitle.textContent = "Recipe:";
      const mealRecipe = document.createElement("p");
      mealRecipe.textContent = recipeData.textContent;


      textArea.appendChild(mealTitle);
      textArea.appendChild(recipeTitle);
      textArea.appendChild(mealRecipe);
      showRecipe.appendChild(img);
      showRecipe.appendChild(textArea);

      showRecipe.classList.toggle("hidden")
      bgBlur.classList.toggle("hidden")
      disableScroll();

      bgBlur.onclick = () => {
        showRecipe.classList.toggle("hidden")
        bgBlur.classList.toggle("hidden")
        enableScroll();
      }
    }
  }
}

// fetch the recipe from api 
async function getRecipe() {
  try {
    let response = await fetch(`${URL}${inputBox.value}`);
    let result = await response.json();

    if (result.meals === null) {
      displayError.textContent = "Recipe not found.....";
    }
    else {
      showRecipe(result);
      showFullRecipe();
    }
  } catch (error) {
    displayError.textContent = error;
  }

}

searchBtn.onclick = () => {
  displayError.textContent = "";
  recipeContainer.innerHTML = '';
  getRecipe();
}

