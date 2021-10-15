'use strict';

// Elements
const gridItems = document.querySelectorAll('.grid-item');
const startGameBtn = document.querySelector('.start-game');
const gameInstructionEl = document.querySelector('.game-instruction');
const scoreEl = document.querySelector('.score');
const lifesEl = document.querySelector('.lifes');
const highscoreEl = document.querySelector('.highscore');

const scorePEl = document.querySelector('.score-text');
const lifesPEl = document.querySelector('.lifes-left-text');
const highscorePEl = document.querySelector('.highscore-text');

// Audio
const pointAddedSong = new Audio('audio/success-click.wav');
const wrongClick = new Audio('audio/wrong-click.wav');
const gameOver = new Audio('audio/game-over.wav');
const gameMusic = new Audio('audio/Gigakoops-music.ogg');

pointAddedSong.preload = 'auto';
pointAddedSong.volume = 0.4;
wrongClick.preload = 'auto';
wrongClick.volume = 0.4;
gameOver.preload = 'auto';

// console.log(gridItems.length);

// Initial game state
let score, lifes, timer, lastPos, currSeconds;
let highscore = 0;

let playing = false;

const init = () => {
  playing = false;
  score = 0;
  lifes = 5;
  currSeconds = 0;
  scoreEl.textContent = 0;
  scorePEl.style.color = 'white';
  lifesEl.textContent = 5;
  lifesPEl.style.color = 'white';
  highscorePEl.style.color = 'white';

  gameInstructionEl.classList.remove('hidden');
  startGameBtn.classList.remove('hidden');

  for (let i = 0; i <= gridItems.length - 1; i++) {
    gridItems[i].classList.remove('grid-item--active');
    gridItems[i].classList.add('grid-item--not-active');
    // gridItems[i].attributeStyleMap.clear(); ----- Don't work on firefox
    gridItems[i].removeAttribute('style');
  }

  document.body.style.backgroundColor = '#222';

  gridItems[0].classList.remove('grid-item--not-active');
  gridItems[0].classList.add('grid-item--active');
  // document.querySelector('.grid-item').style.boxShadow = 'none';
};

init();

const resetTimer = () => {
  clearInterval(timer);
  currSeconds = 0;

  timer = setInterval(startIdletimer, 1000);
};

const startIdletimer = () => {
  // Increment Timer
  if (playing) {
    currSeconds++;
    // console.log(`Current seconds: ${currSeconds}`);
  }
};

const handleLifeLoss = () => {
  if (playing) {
    if (lifes > 1) {
      wrongClick.play();
      currSeconds = 0;
      lifes--;
      lifesEl.textContent = lifes;
    } else {
      playing = false;
      gameOver.play();
      gameMusic.pause();
      gameMusic.currentTime = 0;
      if (score > highscore) {
        highscore = score;
        highscoreEl.textContent = highscore;
      }
      lifesEl.textContent = 0;
      init();
    }
  }
};

const handleClick = (e) => {
  if (playing) {
    if (e.target.classList.contains('grid-item--active')) {
      currSeconds = 0;
      pointAddedSong.play();
      score++;
      scoreEl.textContent = score;
    } else if (e.target.classList.contains('grid-item--not-active')) {
      // console.log(lifes);
      handleLifeLoss();
    }
  }
};

const generateRandomColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};

const controlLayout = () => {
  if (playing) {
    let randomColor = generateRandomColor();

    let notActive = document.querySelectorAll('.grid-item--not-active');
    if (score > 30 && score <= 50) {
      Array.from(
        notActive,
        (e) => (e.style.backgroundColor = `#${randomColor}`)
      );
    }
    if (score > 50 && score <= 100) {
      Array.from(
        notActive,
        (e) => (e.style.backgroundColor = `#${randomColor}`)
      );
      randomColor = generateRandomColor();
      document.body.style.backgroundColor = `#${randomColor}`;
    }

    gridItems.forEach((item) => {
      if (item.classList.contains('grid-item--not-active')) {
        if (score > 5 && score <= 10) {
          document.body.style.backgroundColor = 'white';
          item.style.backgroundColor = 'black';
          scorePEl.style.color = 'black';
          highscorePEl.style.color = 'black';
          lifesPEl.style.color = 'black';
        } else if (score > 10 && score <= 20) {
          document.body.style.backgroundColor = '#3f080d';
          item.style.backgroundColor = '#EC979F';
          scorePEl.style.color = 'white';
          highscorePEl.style.color = 'white';
          lifesPEl.style.color = 'white';
        } else if (score > 20 && score <= 30) {
          document.body.style.backgroundColor = `#${randomColor}`;
          randomColor = generateRandomColor();
          item.style.backgroundColor = `black`;
          scorePEl.style.color = 'white';
          highscorePEl.style.color = 'white';
          lifesPEl.style.color = 'white';
        } else if (score > 100) {
          document.body.style.backgroundColor = `#${randomColor}`;
          randomColor = generateRandomColor();
          document.body.style.backgroundColor = `#${randomColor}`;
          item.style.backgroundColor = `transparent`;
          document.querySelector('.grid-item--active').style.boxShadow =
            '0 0 8px 8px black';
        }
      } else {
        item.style.backgroundColor = 'purple';
      }
    });
  }
};

const difficultyControl = () => {
  if (playing) {
    if (score <= 5) {
      if (currSeconds > 3) {
        handleLifeLoss();
      }
      setTimeout(shiftItem, 1500);
    } else if (score > 5 && score <= 10) {
      if (currSeconds > 3) {
        handleLifeLoss();
      }
      controlLayout();
      setTimeout(shiftItem, 1250);
    } else if (score > 10 && score <= 20) {
      if (currSeconds >= 2) {
        handleLifeLoss();
      }
      controlLayout();
      setTimeout(shiftItem, 1000);
    } else if (score > 20 && score <= 30) {
      if (currSeconds > 1) {
        handleLifeLoss();
      }
      controlLayout();
      setTimeout(shiftItem, 750);
    } else if (score > 30 && score <= 50) {
      if (currSeconds > 1) {
        handleLifeLoss();
      }
      controlLayout();
      setTimeout(shiftItem, 600);
    } else if (score > 50 && score <= 100) {
      if (currSeconds > 1) {
        handleLifeLoss();
      }
      controlLayout();
      setTimeout(shiftItem, 600);
    } else if (score > 100) {
      if (currSeconds > 1) {
        handleLifeLoss();
      }
      controlLayout();
      setTimeout(shiftItem, 500);
    }
  }
};

const shiftItem = () => {
  if (playing) {
    let position = Math.trunc(Math.random() * 9 + 1);

    if (position === lastPos) {
      position = Math.trunc(Math.random() * 9 + 1);
    }

    for (let i = 0; i <= gridItems.length - 1; i++) {
      gridItems[i].classList.remove('grid-item--active');
      gridItems[i].classList.add('grid-item--not-active');
    }

    document
      .querySelector(`.grid-item--${position}`)
      .classList.remove('grid-item--not-active');
    document
      .querySelector(`.grid-item--${position}`)
      .classList.add('grid-item--active');

    for (let i = 0; i <= gridItems.length - 1; i++) {
      gridItems[i].addEventListener('click', handleClick);
    }

    lastPos = position;
    difficultyControl();
  }
};

// Start game
startGameBtn.addEventListener('click', () => {
  playing = true;
  resetTimer();
  // If game is playing, apply game logic
  if (playing) {
    gameMusic.play();
    startGameBtn.classList.add('hidden');
    gameInstructionEl.classList.add('hidden');
    shiftItem(score);
  }
});
