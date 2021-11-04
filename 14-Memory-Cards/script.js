const newCard = document.getElementById("new-card");
const closeNewCard = document.getElementById("close");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addNewBtn = document.getElementById("add-new");
const openNewCard = document.getElementById("open-add");
const cards = document.getElementById("cards");
const prevCard = document.getElementById("prev");
const currentCard = document.getElementById("number");
const nextCard = document.getElementById("next");
const clearCards = document.getElementById("clear");

const localStorageCardsArr = JSON.parse(localStorage.getItem("cards"));

localStorageCardsArr ? cardsArr = localStorageCardsArr : cardsArr = [];

let cardsElArr = [];
let currentCardIndex = 0;
let leftRight = "right";

populateCardsEl();

function populateCardsEl() {
    let output = "";
    cardsArr.forEach(card => {
        output +=
            `
            <div class="card">
                <button class="card__button button" onclick="flipCard()">
                    <i class="fas fa-undo"></i>Flip
                </button>
                <div class="card__front card__front--show">
                    <p class="card__body">${card.q}</p>
                </div>
                <div class="card__back">
                    <p class="card__body">${card.a}</p>
                </div>
            </div>
        `

    })
    cards.innerHTML = output;
    cardsElArr = document.querySelectorAll(".card");
    updateDOM();
}

function changeCard(direction) {
    if (cardsElArr.length > 1) {
        cardsElArr.forEach(card => {
            card.classList.remove("card--right");
            card.classList.remove("card--left");
        })

        if (direction == next) {
            currentCardIndex++;
            leftRight = "right";
        } else if (direction == prev) {
            currentCardIndex--;
            leftRight = "left";
        }

        if (currentCardIndex + 1 > cardsElArr.length) {
            currentCardIndex = 0;
        }

        if (currentCardIndex < 0) {
            currentCardIndex = cardsElArr.length - 1;
        }

        cardsElArr.forEach(card => {
            card.classList.remove("card--active");
            card.querySelector(".card__front").classList.add("card__front--show");
        })

        leftRight == "right" ? cardsElArr[currentCardIndex].classList.add("card--right") : cardsElArr[currentCardIndex].classList.add("card--left");

        updateDOM();
    }
}

function flipCard() {
    cardsElArr.forEach(card => {
        if (card.classList.contains("card--active")) {
            card.querySelector(".card__front").classList.toggle("card__front--show");
        }
    })
}

function addNewCard() {
    const question = questionEl.value;
    const answer = answerEl.value;
    questionEl.value = "";
    answerEl.value = "";

    cardsArr.push({ "q": question, "a": answer });

    localStorage.setItem("cards", JSON.stringify(cardsArr));

    populateCardsEl();
}

function openCloseAdd() {
    newCard.classList.toggle("new-card--show");
}

function updateDOM() {
    if (cardsElArr.length > 0) {
        cardsElArr[currentCardIndex].classList.add("card--active");
        currentCard.innerHTML = `${currentCardIndex + 1}/${cardsArr.length}`;
    } else {
        currentCard.innerHTML = `${currentCardIndex}/${cardsArr.length}`;
    }
}

openNewCard.addEventListener("click", () => {
    openCloseAdd();
})

addNewBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addNewCard();
    openCloseAdd();
})

closeNewCard.addEventListener("click", () => {
    openCloseAdd();
})

nextCard.addEventListener("click", () => {
    changeCard(next);
})

prevCard.addEventListener("click", () => {
    changeCard(prev);
})

clearCards.addEventListener("click", () => {
    cardsArr = [];
    localStorage.clear();
    populateCardsEl();
})

