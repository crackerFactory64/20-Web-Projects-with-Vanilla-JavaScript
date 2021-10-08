const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchError = document.getElementById("search-error");

const resultsContainer = document.querySelector(".results");
const searchTermEl = document.getElementById("search-term");
const resultsEl = document.getElementById("results");

const recipe = document.getElementById("recipe");

let searchTerm = "";
let results = [];
let resultElArr = []; //to be populated with the generated result html elements

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getSearchTerm();
});

function getSearchTerm() {
  resultsContainer.style.display = "none";
  recipe.style.display = "none";

  if (searchInput.value !== "") {
    searchTerm = searchInput.value;
    searchError.innerHTML = "";
    searchTermEl.innerHTML = `"${searchTerm}"`;
    getResults(searchTerm);
  } else {
    searchError.innerHTML = "Please enter a search term.";
  }
}

async function getResults(search) {
  results = [];
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + search
  );
  const data = await res.json();
  if (data.meals) {
    data.meals.forEach((meal) => {
      results.push(meal);
    });
    updateDOM();
  } else {
    searchError.innerHTML = "No results found.";
  }
  resultsArr = document.querySelectorAll(".result"); //populates resultsArr

  //adds event listener to each result element that triggers selectMeal on click
  resultsArr.forEach((result) => {
    result.addEventListener("click", () => {
      for (let i = 0; i < results.length; i++) {
        if (result.id === results[i].idMeal) {
          selectMeal(results[i]);
        }
      }
    });
  });
}

function updateDOM() {
  let resultsOutput = "";
  results.forEach((meal) => {
    resultsOutput += `
        <div class="result" id="${meal.idMeal}">
              <div class="result__overlay">
                <h2 class="result__name" id="result-name">${meal.strMeal}</h2>
              </div>
              <img
                src="${meal.strMealThumb}"
                alt="${meal.strMeal}"
                class="result__img"
                id="result-img"
              />
         </div>
        `;
  });
  resultsContainer.style.display = "block";
  resultsEl.innerHTML = resultsOutput;
}

function selectMeal(meal) {
  recipe.innerHTML = `
        <h2 class="recipe__title">${meal.strMeal}</h2>
          <img
            src="${meal.strMealThumb}"
            alt="${meal.strMeal}"
            class="recipe__img"
           
          />
          <div class="recipe__info">
            <p class="recipe__category">${meal.strCategory}</p>
            <br />
            <p class="recipe__cuisine">${meal.strArea}</p>
          </div>
          <p class="recipe__instructions">
          ${meal.strInstructions}
          </p>
          <h2 class="recipe__title">Ingredients</h2>
          <ul class="recipe__ingredients">
            <li class="recipe__ingredient">${meal.strIngredient1}</li>
            <li class="recipe__ingredient">${meal.strIngredient2}</li>
            <li class="recipe__ingredient">${meal.strIngredient3}</li>
            <li class="recipe__ingredient">${meal.strIngredient4}</li>
          </ul>
    `;
  recipe.style.display = "block";
  window.location.replace("#recipe");
}
