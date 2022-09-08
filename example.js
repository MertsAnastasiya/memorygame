const memoryField = document.querySelector('.memory-field');
const resultField = document.querySelector('.memory-result');
const buttonStart = document.querySelector('.start-game');
let numberMove = 0;
let checkedPair = 0;
let sizeField = 12;
let isFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
let scores = [];

const allCards = [
  {
    name: 'akira',
    src: './assets/png/akira.png'
  },
  {
    name: 'akira',
    src: './assets/png/akira.png'
  },
  {
    name: 'ryuuji',
    src: './assets/png/ryuuji.png'
  },
  {
    name: 'ryuuji',
    src: './assets/png/ryuuji.png'
  },
  {
    name: 'morgana',
    src: './assets/png/morgana.png'
  },
  {
    name: 'morgana',
    src: './assets/png/morgana.png'
  },
  {
    name: 'ann',
    src: './assets/png/ann.png'
  },
  {
    name: 'ann',
    src: './assets/png/ann.png'
  },
  {
    name: 'yuusuke',
    src: './assets/png/yuusuke.png'
  },
  {
    name: 'yuusuke',
    src: './assets/png/yuusuke.png'
  },
  {
    name: 'makoto',
    src: './assets/png/makoto.png'
  },
  {
    name: 'makoto',
    src: './assets/png/makoto.png'
  },
  {
    name: 'joker',
    src: './assets/png/joker.png'
  },
  {
    name: 'joker',
    src: './assets/png/joker.png'
  },
  {
    name: 'haru',
    src: './assets/png/haru.png'
  },
  {
    name: 'haru',
    src: './assets/png/haru.png'
  },
  {
    name: 'futaba',
    src: './assets/png/futaba.png'
  },
  {
    name: 'futaba',
    src: './assets/png/futaba.png'
  },
  {
    name: 'akechi',
    src: './assets/png/akechi.png'
  },
  {
    name: 'akechi',
    src: './assets/png/akechi.png'
  }
];


const cardsSet = num => {
  if (Number(num) === 20) {
    memoryField.classList.add('big');
  }
  for (let i = 0; i < num; i++) {
    const div = document.createElement('div');
    div.classList.add('memory-card')
    const cardFront = document.createElement('img');
    cardFront.classList.add('front-face');
    cardFront.src = allCards[i].src;
    div.setAttribute("data-name", allCards[i].name);
    const cardBack = document.createElement('img');
    cardBack.classList.add('back-face')
    cardBack.src = "./assets/png/back-face.png";
    memoryField.append(div);
    div.append(cardFront);
    div.append(cardBack);
  }

};

if (localStorage.getItem('field')) {
  sizeField = localStorage.getItem('field');  
}

cardsSet(sizeField);

const cards = document.querySelectorAll('.memory-card');

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  
  if (!isFlipped) {
    isFlipped = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  
  numberMove += 1;
  checkForMatch();
  document.querySelectorAll('.number-move').forEach(move => move.innerHTML = numberMove);
}

function checkForMatch() {
    if (firstCard.dataset.name === secondCard.dataset.name) {
     disableCards();
     checkedPair += 1;
     if (checkedPair === sizeField / 2) {
      //setTimeout("alert('Ура, победа!');", 1000);
      resultField.classList.add('on');
      scores.push(numberMove);
      localStorage.setItem( 'score', JSON.stringify(scores));
    }
    return;
    }

    unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
    }, 1000);   
}

cards.forEach(card => card.addEventListener('click', flipCard));

(function shuffle() {
  cards.forEach(card => {
  let ramdomPos = Math.floor(Math.random() * sizeField);
  card.style.order = ramdomPos;
  });
})();


function resetBoard() {
  [isFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

const tableSet = num => {
  getLocalStorage()
  if (scores.length > 10) {
    while (scores.length > 10) {
      scores.splice(0, 1);
    }
  }

  for (let i = 0; i < scores.length; i++) {
    const div = document.createElement('div');
    div.classList.add('memory-result-table-item');
    div.innerHTML = `It had taken ${scores[i]} moves`;
    document.querySelector('.memory-result-table').append(div);
  }
};
tableSet();


function getLocalStorage() {
  if (localStorage.getItem('score')) {
      const result = localStorage.getItem('score');
      scores = JSON.parse(result);   
  }
}  

function setLocalStorage() {
  localStorage.setItem('score', JSON.stringify(scores));
}

window.addEventListener('load', getLocalStorage)  
window.addEventListener('beforeunload', setLocalStorage);

function changeFiled() {
  const element = document.getElementsByName('startgame');
  for (let i = 0; i < element.length; i++) {
    element[0].checked ? sizeField = 12 : sizeField = 20;
  }
  localStorage.setItem('field', sizeField);
  location.reload()
}

buttonStart.addEventListener('click', changeFiled);

