const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-button");
const resultsEl = document.getElementById("results");
const lyricsEl = document.getElementById("lyrics");

async function getResults(term) {
  const res = await fetch(`https://api.lyrics.ovh/suggest/${term}`);
  const data = await res.json();
  showResults(data, term);
  console.log(data);
}

function showResults(results, term) {
  const resultsList = document.createElement("ul");
  resultsList.classList.add("results__ul");
  results.data.forEach((result) => {
    let resultsItem = document.createElement("li");
    resultsItem.classList.add("results__li");
    resultsItem.onclick = () => {
      showLyrics(result.artist.name, result.title);
    };
    resultsItem.innerHTML = `
            <a href="#"><span class="results__artist">${result.artist.name}</span> - ${result.title}</a>           
        `;
    resultsList.appendChild(resultsItem);
  });
  resultsEl.innerHTML = `<h2>Results for: "${term}"</h2>`;
  resultsEl.appendChild(resultsList);
}

async function showLyrics(artist, title) {
  const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
  const data = await res.json();
  let lyrics = data.lyrics.replace(/\n/g, "<br>");
  const regex = new RegExp(`Paroles de la chanson ${title} par ${artist}`);
  lyrics = lyrics.replace(regex, "");
  resultsEl.innerHTML = `<button class="results__close button" onclick="getResults(searchBar.value)">Close</button>
    ${lyrics}
  `;
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchBar.value
    ? getResults(searchBar.value)
    : alert("Please enter a search term.");
});
