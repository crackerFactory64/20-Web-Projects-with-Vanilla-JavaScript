const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchError = document.getElementById("search-error");

const resultsContainer = document.querySelector(".results");
const searchTermEl = document.getElementById("search-term");
const resultsEl = document.getElementById("results");

const recipeTitleEl = document.getElementById("recipe-title");
const recipeImgEl = document.getElementById("recipe-img");
const recipeInsctructionsEl = document.getElementById("recipe-instructions");
const recipeIngredientsEl = document.getElementById("recipe-ingredients");

let searchTerm = "";
let results = [];

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getSearchTerm();
});

function getSearchTerm() {
  resultsContainer.style.display = "none";

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
}

function updateDOM() {
  let resultsOutput = "";
  results.forEach((meal) => {
    resultsOutput += `
        <div class="result">
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
