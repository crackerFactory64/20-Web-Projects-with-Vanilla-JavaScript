const customise = document.getElementById("toggle");
const close = document.getElementById("close");
const voice = document.getElementById("voice");
const customText = document.getElementById("custom");
const read = document.getElementById("read");
const openCustom = document.getElementById("custom-button");
const cards = document.getElementById("cards");

const info = [
  { text: "I'm thirsty", img: "images/drink.jpg" },
  { text: "I'm hungry", img: "images/food.jpg" },
  { text: "I'm tired", img: "images/tired.jpg" },
  { text: "I'm happy", img: "images/happy.jpg" },
  { text: "I'm hurt", img: "images/hurt.jpg" },
  { text: "I'm scared", img: "images/scared.jpg" },
  { text: "I want to go home", img: "images/home.jpg" },
  { text: "I want to go outside", img: "images/outside.jpg" },
  { text: "I want to go to school", img: "images/school.jpg" },
  { text: "I want Grandma", img: "images/grandma.jpg" },
];

generateCards();

function generateCards() {
  let output = "";
  info.forEach((set) => {
    output += `
            <div class="card">
                <div class="card__img-container">
                    <img 
                        src="${set.img}"
                        alt="${set.text}"
                        class="card__img"
                    />
            </div>
            <h2 class="card__title">"${set.text}"</h2>
            </div>
        `;
  });
  cards.innerHTML = output;
}

function showHide() {
  customise.classList.toggle("toggle--open");
}

openCustom.addEventListener("click", () => {
  showHide();
});

close.addEventListener("click", () => {
  showHide();
});
