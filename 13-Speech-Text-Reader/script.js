const customise = document.getElementById("toggle");
const close = document.getElementById("close");
const voice = document.getElementById("voice");
const customText = document.getElementById("custom");
const read = document.getElementById("read");
const openCustom = document.getElementById("custom-button");
const cards = document.getElementById("cards");

const info = [
    { text: "I am thirsty", img: "images/drink.jpg" },
    { text: "I am hungry", img: "images/food.jpg" },
    { text: "I am tired", img: "images/tired.jpg" },
    { text: "I am happy", img: "images/happy.jpg" },
    { text: "I am hurt", img: "images/hurt.jpg" },
    { text: "I am scared", img: "images/scared.jpg" },
    { text: "I want to go home", img: "images/home.jpg" },
    { text: "I want to go outside", img: "images/outside.jpg" },
    { text: "I want to go to school", img: "images/school.jpg" },
    { text: "I want Grandma", img: "images/grandma.jpg" },
];

let words = new SpeechSynthesisUtterance();

const synth = window.speechSynthesis;

generateCards();

function generateCards() {
    let output = "";
    info.forEach((set) => {
        output += `
            <div class="card" onclick="speak('${set.text}')">
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

function speak(words) {
    words = new SpeechSynthesisUtterance(words);
    synth.speak(words);
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

