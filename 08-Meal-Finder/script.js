const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const randomButton = document.getElementById("random-button");
const searchError = document.getElementById("search-error");

const resultsContainer = document.querySelector(".results");
const searchTermEl = document.getElementById("search-term");
const resultsEl = document.getElementById("results");

const recipe = document.getElementById("recipe");

let searchTerm = "";
let results = [];
let resultElArr = []; //to be populated with the generated .result html elements

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getSearchTerm();
});

randomButton.addEventListener("click", (e) => {
  e.preventDefault();
  getRandomMeal();
});

function getSearchTerm() {
  //resets the page
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
    updateResults();
  } else {
    searchError.innerHTML = "No results found.";
  }

  //populates resultsArr
  resultsArr = document.querySelectorAll(".result");

  //adds event listener to each .result element that triggers selectMeal on click
  resultsArr.forEach((result) => {
    result.addEventListener("click", () => {
      for (let i = 0; i < results.length; i++) {
        if (result.id === results[i].idMeal) {
          selectMeal(results[i]);
          window.location.replace("#recipe");
        }
      }
    });
  });
}

function updateResults() {
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

async function getRandomMeal() {
  searchError.innerHTML = "";
  resultsContainer.style.display = "none";
  searchInput.value = "";

  const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");

  const data = await res.json();

  const meal = data.meals[0];

  selectMeal(meal);
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
           ${getIngredients(meal)}
          </ul>
    `;
  recipe.style.display = "block";
}

function getIngredients(meal) {
  let ingredientsArr = [
    meal.strIngredient1,
    meal.strIngredient2,
    meal.strIngredient3,
    meal.strIngredient4,
    meal.strIngredient5,
    meal.strIngredient7,
    meal.strIngredient8,
    meal.strIngredient9,
    meal.strIngredient10,
    meal.strIngredient11,
    meal.strIngredient12,
    meal.strIngredient13,
    meal.strIngredient14,
    meal.strIngredient15,
    meal.strIngredient16,
    meal.strIngredient17,
    meal.strIngredient18,
    meal.strIngredient19,
    meal.strIngredient20,
  ];

  let measureArr = [
    meal.strMeasure1,
    meal.strMeasure2,
    meal.strMeasure3,
    meal.strMeasure4,
    meal.strMeasure5,
    meal.strMeasure7,
    meal.strMeasure8,
    meal.strMeasure9,
    meal.strMeasure10,
    meal.strMeasure11,
    meal.strMeasure12,
    meal.strMeasure13,
    meal.strMeasure14,
    meal.strMeasure15,
    meal.strMeasure16,
    meal.strMeasure17,
    meal.strMeasure18,
    meal.strMeasure19,
    meal.strMeasure20,
  ];

  ingredients = "";

  for (let i = 0; i < ingredientsArr.length; i++) {
    if (ingredientsArr[i]) {
      ingredients += `<li class="recipe__ingredient">${ingredientsArr[i]} - ${measureArr[i]}</li>`;
    }
  }

  return ingredients;
}
