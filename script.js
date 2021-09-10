console.log(`The JS works!`);


const memoryBoard = document.getElementById("memory-board");
const emojiArray = ['🏕', '💩', '👻', '👾', '🍕'];

//duplicate the emoji array 
const duplicateEmojiArray = emojiArray.concat(emojiArray);

const memoryCard = document.getElementsByClassName("memory-card");
const memoryCardBack = document.getElementsByClassName("memory-card--back");
const memoryCardFront = document.getElementsByClassName("memory-card--front");

const memoryEmoji = document.getElementsByClassName("memory-emoji");


const allOpenCards = document.getElementsByClassName("open");

const restartGameButton = document.getElementById("restartGame");

const scoreElement = document.getElementById("score");
const scorePairsElement = document.getElementById("score-pairs");
const highScoreElement = document.getElementById("highScore");

let emojiNumber = -1;
let score = 0;
let scorePairs = 0;
let highScore = 0;


//delay for closing the cards
const delayInMilliseconds = 1000;


//Event listeners
restartGameButton.addEventListener("click", function (e) {
    console.log('restartGameButton is clicked');
    e.preventDefault();
    restartGame();
});


//Create cards from the duplicates array
duplicateEmojiArray.forEach(function (emoji) {
    emojiNumber++;
    const template = document.createElement("div");
    template.classList = "col-6 col-md-2 memory-card";
    template.innerHTML = `
                        <div class="memory-card--back ">
                        <div class="memory-emoji">
                        ${duplicateEmojiArray[emojiNumber]}
                        </div>
                    </div>
                    <div class="memory-card--front">
                                        <div class="memory-emoji">
                            🙈
                        </div>
                    </div>

            `;
    memoryBoard.appendChild(template);
    console.log('card generated');
    shuffleCards();
});



//This function shuffles the cards, 
//https://stackoverflow.com/questions/7070054/javascript-shuffle-html-list-element-order
//based on the  Fisher–Yates shuffle
//and exploits the fact that when you append a node, it's moved from its old place.
function shuffleCards() {
    for (var i = memoryBoard.children.length; i >= 0; i--) {
        memoryBoard.appendChild(memoryBoard.children[Math.random() * i | 0]);
    }
    console.log('card shuffled');
};


let cardA = '0';
let cardB = '1';
let cardAIndex;
let cardBIndex;


//getting the index number of the clicked memoryCard
for (var i = 0; i < memoryCard.length; i++) {
    (function (index) {
        memoryCard[index].addEventListener("click", function () {

            memoryCardBack[index].classList.toggle("open");
            memoryCardBack[index].parentNode.classList.add("freeze");


            if (cardA === '0') {
                //add the inner html of the card to the card.
                cardA = memoryCardBack[index].firstElementChild.innerHTML;
                cardAIndex = [index];
                console.log(`card A is clicked`);

                // console.log(`cardA: ${cardA}`);
            } else if (cardA) {
                cardB = memoryCardBack[index].firstElementChild.innerHTML;
                cardBIndex = [index];
                const cardBMemoryCardIndex = memoryCardBack[index];
                console.log(`card B is clicked`);
            }

            checkIfThereAreTwoCardsOpen();
            score = score + 1;
            scoreElement.innerHTML = score;

        });
    })(i);
};

function removeCards(cardAIndex, cardBIndex) {
    console.log('remove cards');
    setTimeout(function () {
        memoryCard[cardAIndex].classList.add("hidden");
        memoryCard[cardBIndex].classList.add("hidden");
    }, delayInMilliseconds);
}

//Function that closes all cards, with a delay
function showAllHiddenCards() {
    for (var i = 0; i < memoryCard.length; i++) {
        memoryCard[i].classList.remove("hidden");
        console.log('test');
    };
};

function checkIfCardsArePair(cardA, cardB) {
    console.log(`compairing the two cards`);
    console.log(`CardA: ${cardA}`);
    console.log(`CardB: ${cardB}`);
    if (cardA === cardB) {
        console.log(`The cards are a pair!`);
        scorePairs = scorePairs + 1;
        scorePairsElement.innerHTML = scorePairs;


        // console.log(`reset cards: ${cardA} ${cardB}`);
        removeCards(cardAIndex, cardBIndex);
    } else {
        console.log(`The cards are NOT a pair`);
        return;
    }

}


//Freezing all cards if two cards are active
function freeze() {
    for (var i = 0; i < memoryCard.length; i++) {
        doIndex(i);
        function doIndex(i) {
            memoryCard[i].classList.add("freeze");
        };
    } (i);
};

//UnFreezing all cards if after some time
function unFreeze() {
    for (var i = 0; i < memoryCard.length; i++) {
        doIndex(i);
        function doIndex(i) {
            memoryCard[i].classList.remove("freeze");
        };
    } (i);
};


//function that checks how many cards are open
//if there are more than one open it triggers the closeAllCards function
function checkIfThereAreTwoCardsOpen() {
    if (allOpenCards.length > 1) {
        checkIfCardsArePair(cardA, cardB);
        freeze();
        closeAllCards();

        //reset cards to different value
        cardA = '0';
        cardB = '1';

        //this delays the unfreezing of the cards
        setTimeout(function () {
            unFreeze();
        }, delayInMilliseconds);

    };
};




//Function that closes all cards, with a delay
function closeAllCards() {
    setTimeout(function () {
        for (var i = 0; i < memoryCard.length; i++) {
            memoryCardBack[i].classList.remove('open');
        };
    }, delayInMilliseconds);
};




function toggleCardsVisibility() {
    for (var i = 0; i < memoryCard.length; i++) {
        doIndex(i);
        function doIndex(i) {
            memoryCard[i].classList.toggle("hide");
        };
    } (i);
};


function restartGame() {
    //reset the scores
    if (score >= highScore) {
        highScore = score;
        highScoreElement.innerHTML = highScore;
    };
    score = 0;
    scoreElement.innerHTML = score;
    scorePairs = 0;
    scorePairsElement.innerHTML = scorePairs;

    closeAllCards();
    toggleCardsVisibility();
    showAllHiddenCards();
    shuffleCards();
    setTimeout(function () {
        toggleCardsVisibility();
    }, 500);
};


document.addEventListener("DOMContentLoaded", function () {
    scoreElement.innerHTML = score;
    highScoreElement.innerHTML = highScore;
    scorePairsElement.innerHTML = scorePairs;
});