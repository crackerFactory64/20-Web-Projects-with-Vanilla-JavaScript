const searchBar = document.getElementById("search-bar");
const postsEl = document.getElementById("posts");
const loader = document.getElementById("loader");

let page = 1;

getPosts();
showPosts();

async function getPosts() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`
  );
  const data = await response.json();
  return data;
}

async function showPosts() {
  const posts = await getPosts();
  let output = "";
  posts.forEach((post) => {
    output += `<div class="post">
          <p class="post__id">${post.id}</p>
          <h2 class="post__title">${post.title}</h2>
          <p class="post__body">
            ${post.body}
          </p>
        </div>`;
  });
  postsEl.innerHTML += output;
}

function updatePosts() {
  if (
    document.body.scrollHeight == window.scrollY + window.innerHeight &&
    page <= 20
  ) {
    loader.classList.add("main__loader--show");
    setTimeout(() => {
      loader.classList.remove("main__loader--show");
      page++;
      getPosts();
      showPosts();
    }, 1000);
  }
}

async function filterPosts() {
  const posts = document.querySelectorAll(".post");
  const search = searchBar.value.toLowerCase().trim();
  posts.forEach((post) => {
    const title = post
      .querySelector(".post__title")
      .innerHTML.toLowerCase()
      .trim();
    const body = post
      .querySelector(".post__body")
      .innerHTML.toLowerCase()
      .trim();
    if (title.indexOf(search) > -1 || body.indexOf(search) > -1) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });
}

window.addEventListener("scroll", () => {
  updatePosts();
});

searchBar.addEventListener("keyup", () => {
  filterPosts();
});
