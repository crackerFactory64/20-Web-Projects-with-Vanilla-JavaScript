const searchBar = document.getElementById("search-bar");
const postsEl = document.getElementById("posts");
const loader = document.getElementById("loader");

let page = 1;

getPosts();

function getPosts() {
  fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
    .then((response) => response.json())
    .then((json) => {
      let output = "";
      json.forEach((post) => {
        output += `<div class="post">
          <p class="post__id">${post.id}</p>
          <h2 class="post__title">${post.title}</h2>
          <p class="post__body">
            ${post.body}
          </p>
        </div>`;
      });
      postsEl.innerHTML += output;
      page++;
    });
}

function updatePosts() {
  if (document.body.scrollHeight == window.scrollY + window.innerHeight) {
    loader.classList.add("main__loader--show");
    setTimeout(() => {
      loader.classList.remove("main__loader--show");
      getPosts();
    }, 1000);
  }
}

window.addEventListener("scroll", () => {
  updatePosts();
});
