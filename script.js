'use strict';

// selecting the elements
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');

let score0 = document.querySelector('#score--0');
let score1 = document.querySelector('#score--1');

let cur0 = document.querySelector('#current--0');
let cur1 = document.querySelector('#current--1');

let diceImg = document.querySelector('.dice');

let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');

//initial conditions

let score, curScore, activePlayer, playing;
const init = () => {
  score = [0, 0];
  curScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;

  cur0.textContent = 0;
  cur1.textContent = 0;

  diceImg.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();
//switching Player

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  curScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Rolling Dice

btnRoll.addEventListener('click', () => {
  if (playing) {
    const diceNum = Math.floor(Math.random() * 6) + 1;

    console.log(diceNum);

    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${diceNum}.png`;

    if (diceNum !== 1) {
      curScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        curScore;
    } else {
      switchPlayer();
    }
  }
});

//Hold the points

btnHold.addEventListener('click', () => {
  if (playing) {
    score[activePlayer] += curScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 20) {
      playing = false;
      diceImg.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//reseting points

btnNew.addEventListener('click', init);
