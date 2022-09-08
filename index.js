const cards = document.querySelectorAll('.card');
const congratulation = document.querySelector('.congrat');
const divCards = document.querySelector('.cards');
const newGame = document.querySelector('.new-game');

// const divMove = document.querySelector('.move');
const spanCountMove = document.querySelector('.countMove');
const divHistory = document.querySelector('.history');

let hasFlipped = false;
let firstCard, secondCard;
let lockCards = false;
let countPairs = 0;
let countMove = 0;
let countWin = 0;
// let arrayWin = [];

function flipCard() {
    if(lockCards) return;

    if(this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlipped) {
        hasFlipped = true;
        firstCard = this;
    } else {
        countMove++;
        spanCountMove.innerHTML = countMove;
        secondCard = this;
        hasFlipped = false;
        secondCard.dataset.name
        check();
    }
}

const check = () => {
    firstCard.dataset.name === secondCard.dataset.name ? disableCard() : unflipCard();
    checkWin();
}

const checkWin = () => {
    if (countPairs === 6) {
        countWin++;
        localStorage.setItem(`move ${countWin}`, countMove);
        console.log('ffff' + countWin + '   ' + countMove);
        let p = document.createElement('p');
        divHistory.appendChild(p);
        p.innerHTML = countWin + '. ' + localStorage.getItem(`move ${countWin}`);
        divCards.style.opacity = '0.1';
        cards.forEach(item => {
            item.style.pointerEvents = 'none';
        });
        congratulation.style.visibility = 'visible';
        congratulation.style.opacity = '1';
        newGame.style.visibility = 'visible';
        newGame.style.opacity = '1';
    }
}

const disableCard = () => {
    countPairs++;

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

const unflipCard = () => {
    lockCards = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

const resetBoard = () => {
    [hasFlipped, lockCards] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(shuffle = () => {
    cards.forEach(card => {
        let randomOrder = Math.floor(Math.random() * 12);
        card.style.order = randomOrder;
    });
})();

cards.forEach(item => item.addEventListener('click', flipCard));

const startNewGame = () => {
    console.log('new game');
    divCards.style.opacity = '1';
    countMove = 0;
    countPairs = 0;
    spanCountMove.innerHTML = countMove;
    cards.forEach(item => {
        item.style.pointerEvents = 'auto';
        item.addEventListener('click', flipCard)
        item.hasFlipped = false;
        item.classList.remove('flip');
        resetBoard();
    });
    congratulation.style.visibility = 'hidden';
    congratulation.style.opacity = '0';
    divCards.style.opacity = '1';
    newGame.style.visibility = 'hidden';
    newGame.style.opacity = '0';

 }

 newGame.addEventListener('click', startNewGame);