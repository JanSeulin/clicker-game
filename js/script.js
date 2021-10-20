'use strict';

// Elements
const gridItems = document.querySelectorAll('.grid-item');
const startGameBtn = document.querySelector('.start-game');
const gameInstructionEl = document.querySelector('.game-instruction');
const scoreEl = document.querySelector('.score');
const lifesEl = document.querySelector('.lifes');
const highscoreEl = document.querySelector('.highscore');
// Paragraphs
const scorePEl = document.querySelector('.score-text');
const lifesPEl = document.querySelector('.lifes-left-text');
const highscorePEl = document.querySelector('.highscore-text');
// Volume control
const volumeEl = document.querySelector('.volume-toggle');
const muteVol = document.querySelector('.volume-mute');
const turnOnVol = document.querySelector('.volume-on');
// Audio Files and settings
const pointAddedSong = new Audio('audio/success-click.wav');
const wrongClick = new Audio('audio/wrong-click.wav');
const gameOver = new Audio('audio/game-over.wav');
const gameMusic = new Audio('audio/Gigakoops-music.ogg');

pointAddedSong.preload = 'auto';
pointAddedSong.volume = 0.4;
wrongClick.preload = 'auto';
wrongClick.volume = 0.4;
gameOver.preload = 'auto';

// Initial game state
let score, lifes, timer, lastPos, currSeconds, highscore;

if (localStorage.length === 0) {
  highscore = 0;
} else {
  highscore = Number(localStorage.getItem('highscore'));
  highscoreEl.textContent = highscore;
}

let musicOn = true;
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

  highscorePEl.classList.remove('hidden');
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

// Check player screen width and height to decide if hide highscore or not
const width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
const height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

console.log(width, height);

// Handle music on/off
volumeEl.addEventListener('click', () => {
  muteVol.classList.toggle('hidden');
  turnOnVol.classList.toggle('hidden');
  musicOn = !musicOn;

  if (musicOn === false) {
    gameMusic.pause();
  } else {
    if (playing) {
      gameMusic.play();
    }
  }
});

// Handle Time counter
const resetTimer = () => {
  clearInterval(timer);
  currSeconds = 0;

  timer = setInterval(startIdletimer, 500);
};

const startIdletimer = () => {
  // Increment Timer
  if (playing) {
    currSeconds += 0.5;
    // console.log(`Current seconds: ${currSeconds}`);
  }
};

// Handle losing lives
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
        localStorage.setItem('highscore', String(highscore));
        highscoreEl.textContent = highscore;
      }
      lifesEl.textContent = 0;
      init();
    }
  }
};

// Handle when clicking right and wrong grid item
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

// Control layout difficulty according to score
const controlLayout = () => {
  if (playing) {
    let randomColor = generateRandomColor();
    let notActive = document.querySelectorAll('.grid-item--not-active');
    let gridItemActive = document.querySelector('.grid-item--active');

    // Layout where all non active items change to the same color
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
      if (score >= 70 && score < 85) {
        Array.from(notActive, (e) => (e.style.backgroundColor = `transparent`));
      } else if (score >= 85) {
        Array.from(
          notActive,
          (e) => (e.style.backgroundColor = `#${randomColor}`)
        );
        Array.from(notActive, (e) => (e.style.opacity = `0.5`));
      }
    }

    const setFixedColor = (color, color2, color3, color4, color5, item) => {
      document.body.style.backgroundColor = color;
      item.style.backgroundColor = color2;
      scorePEl.style.color = color3;
      highscorePEl.style.color = color4;
      lifesPEl.style.color = color5;
    };
    // Layout where the color is fixed or each non active item receive a random color
    gridItems.forEach((item) => {
      if (item.classList.contains('grid-item--not-active')) {
        if (score > 5 && score <= 10) {
          setFixedColor('white', 'black', 'black', 'black', 'black', item);
        } else if (score > 10 && score <= 20) {
          setFixedColor('#3f080d', '#EC979F', 'white', 'white', 'white', item);
        } else if (score > 20 && score <= 30) {
          setFixedColor(
            `#${randomColor}`,
            'black',
            'white',
            'white',
            'white',
            item
          );
        } else if (score > 100 && score <= 150) {
          gridItemActive.style.opacity = `1`;
          document.body.style.backgroundColor = `#${randomColor}`;
          item.style.backgroundColor = `transparent`;
          gridItemActive.style.boxShadow = `0 0 8px 8px black, inset 0 0 8px 8px white`;
          if (score > 125) {
            document.body.style.backgroundColor = `#${randomColor}`;
            gridItemActive.style.boxShadow = `inset 0 0 16px 16px white`;
            item.style.backgroundColor = `rgba(128,0,128, 0.6)`;
            item.style.boxShadow = `inset 0 0 8px 8px #${randomColor}`;
          }
        } else if (score > 150 && score <= 200) {
          document.body.style.backgroundColor = `#${randomColor}`;
          randomColor = generateRandomColor();
          item.style.backgroundColor = `#${randomColor}`;
          gridItemActive.style.boxShadow = 'inset 0 0 16px 16px white';
          document
            .querySelectorAll('.grid-item--not-active')
            .forEach((item) => (item.style.boxShadow = 'none'));
        } else if (score > 200) {
          document.body.style.backgroundColor = `#${randomColor}`;
          randomColor = generateRandomColor();
          item.style.backgroundColor = `#${randomColor}`;
          if (score > 215) {
            gridItemActive.style.boxShadow = 'inset 0 0 2px 2px white';
          } else {
            gridItemActive.style.boxShadow = 'inset 0 0 4px 4px white';
          }
          document
            .querySelectorAll('.grid-item--not-active')
            .forEach((item) => (item.style.boxShadow = 'none'));
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
      if (currSeconds > 2) {
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
    } else if (score > 100 && score <= 150) {
      if (currSeconds > 1) {
        handleLifeLoss();
      }
      controlLayout();
      setTimeout(shiftItem, 550);
    } else if (score > 150 && score <= 200) {
      if (currSeconds > 1) {
        handleLifeLoss();
      }
      controlLayout();
      setTimeout(shiftItem, 550);
    } else if (score > 200) {
      if (currSeconds >= 1) {
        handleLifeLoss();
      }
      controlLayout();
      setTimeout(shiftItem, 650);
    }
  }
};

const shiftItem = () => {
  if (playing) {
    let position = Math.trunc(Math.random() * 9 + 1);

    if (position === lastPos) {
      position = Math.trunc(Math.random() * 9 + 1);
    }

    lastPos = position;

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

    difficultyControl();
  }
};

// Start game
startGameBtn.addEventListener('click', () => {
  playing = true;
  resetTimer();

  if (playing) {
    if (musicOn) {
      gameMusic.play();
    }
    if (width < 500 || height < 500) {
      highscorePEl.classList.add('hidden');
    }
    startGameBtn.classList.add('hidden');
    gameInstructionEl.classList.add('hidden');
    shiftItem(score);
  }
});
