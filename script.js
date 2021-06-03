'use strict';

const score0div = document.querySelector('#score--0');
const score1div = document.querySelector('#score--1');
const dicediv = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const current0div = document.querySelector('#current--0');
const current1div = document.querySelector('#current--1');
const player0div = document.querySelector('.player--0');
const player1div = document.querySelector('.player--1');

const startingCondtion = function () {
  score0div.textContent = 0;
  score1div.textContent = 0;
  current0div.textContent = 0;
  current1div.textContent = 0;
  dicediv.classList.add('hidden');
};

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayers = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0div.classList.toggle('player--active');
  player1div.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    dicediv.classList.remove('hidden');
    dicediv.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayers();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      playing = false;
      dicediv.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayers();
    }
  }
});

btnNew.addEventListener('click', function () {
  // scores = [0, 0];
  startingCondtion();
  scores[0] = 0;
  scores[1] = 0;
  playing = true;
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  currentScore = 0;
  // document.querySelector('.current-score').textContent = 0;
});
