const doc = document;

const field = doc.querySelector(".game-field");

const cardsBackFaces = [
    "./images/card-1.png",
    "./images/card-2.png",
    "./images/card-3.png",
    "./images/card-4.png",
    "./images/card-5.png",
    "./images/card-6.png",
    "./images/card-7.png",
    "./images/card-8.png",
    "./images/card-9.png",
    "./images/card-10.png"
];

let sizeOfMatrix = 12;

let cardsSet = calculateSetOfPairs(field.querySelectorAll(".game-card").length, cardsBackFaces.length);
console.log(cardsSet);
let openedCards = [];

addCardsNumbers();

field.addEventListener('click', (e) => {
    if (e.target.classList.contains("card-face") && !e.target.parentNode.classList.contains("flipped")) {
    e.target.parentNode.classList.add("flipped");
    assingBackImage (e.target.parentNode);
    openedCards.push(e.target.parentNode);
    const cardFlip = new CustomEvent("cardFlip", {detail: e.target.parentNode.dataset.card_id });
    field.dispatchEvent(cardFlip);
    }
});

field.addEventListener("cardFlip", (e) => {
    if (openedCards.length % 2 === 0) {
        const   firstCard = openedCards.at(-2),
                secondCard = openedCards.at(-1);
        openedCards = [];   
        if (cardsSet[firstCard.dataset.card_id] !== cardsSet[secondCard.dataset.card_id]) {
            setTimeout (() => {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                setTimeout (() => {
                    firstCard.querySelector(".card-face-back").src = "#";
                    secondCard.querySelector(".card-face-back").src = "#";
                }, 500);
            }, 1000);

        }
    }
});


function addCardsNumbers () {
    doc.querySelectorAll(".game-card").forEach((card, i) => {
        card.setAttribute("data-card_id", i);
    });
}

function assingBackImage (card) {
    const backFace = card.querySelector(".card-face-back");
    backFace.src = cardsBackFaces[cardsSet[+card.dataset.card_id]];
}

function calculateSetOfPairs (sizeOfMatrix, numberOfDonors) {
    const matrixOfPairs = new Array(sizeOfMatrix).fill(-1);
    for (let i = 0; i < sizeOfMatrix / 2; i++) {
        const cardFaceNumber = Math.floor(Math.random() * (numberOfDonors - 1)),
        firstEntry = (sizeOfMatrix / 2) + Math.floor(Math.random() * (sizeOfMatrix / 2));
    let secondEntry = Math.floor(Math.random() * (sizeOfMatrix / 2));
        while (secondEntry == firstEntry) {
            secondEntry = Math.floor(Math.random() * (sizeOfMatrix / 2));
        }
        if (!matrixOfPairs.includes(cardFaceNumber) &&
            matrixOfPairs[firstEntry] === -1 &&
            matrixOfPairs[secondEntry] === -1) {
                matrixOfPairs[firstEntry] = matrixOfPairs[secondEntry] = cardFaceNumber;
            } else {
                i--;
            }
    }
    return matrixOfPairs;
}
