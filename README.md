# Clicker game!

[Live Demo](https://janseulin.github.io/clicker-game/)

This is a simple game created for programming practice purposes (and fun) where your objective is to click in the purple rectangle. You earn points by doing so and the game gets progressively harder the more points you have.

# Features

- Sound effects
- Progressive Difficulty (Speed and layout)
- You start with 5 lives, you lose them either by clicking in the wrong square or by not clicking anything for a specific amount of time (points dependent)

## To do

- Add option to mute music / effects
- Add option to restart / stop during a game without losing all lives
- Add high-score to local storage
- Refactor/clean the code

## Known bugs

- Sometimes a second (and occasionally a third) purple rectangle pops up, but it's not a valid/clickable rectangle and therefore you'll lose a live if you click it. This happens specially after 50+ points where the speed increases significantly.
- Sound effects don't play when the time between the same action is too low