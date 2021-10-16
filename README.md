# Purple Ballad - Reflex based browser mini-game!

[Live Demo](https://janseulin.github.io/purple-ballad--minigame/)

**⚠️ Warning: the game contains bright, flashing colors and can potentially trigger seizures for people with photosensitive epilepsy ⚠️**

This is a simple reflex based game created to practice programming (and for fun) using only vanilla javascript, html and css. Your objective is to click in the purple rectangle. You earn points by doing so and the game gets progressively harder the more points you have.

# Features

- Sound effects
- Progressive Difficulty (Speed and layout)
- You start with 5 lives, you lose them either by clicking in the wrong rectangle or by not clicking anything for a specific amount of time (points dependent)
- Responsive to different devices sizes (needs more testing)

## To do

- ~~Add option to mute/turn on music~~
- ~~Add high-score to local storage~~
- Add more variety in the difficulty/layout progression between scores 50-100, 100-150 and 150-200.
- Add option to restart / stop during a game without losing all lives
- Refactor/clean the code

## Known bugs

- Sometimes a second (and occasionally a third) purple rectangle pops up, but it's not a valid/clickable rectangle and therefore you'll lose a live if you click it. This happens specially after 50+ points where the speed increases significantly.
- Sound effects don't play when the same action is executed twice in a very short time

### Music

Adam Sandler and the Chipmunks (Hollywood is Doomed) by [Gigakoops](https://gigakoops.bandcamp.com/) is licensed under a Attribution-NonCommercial-ShareAlike 4.0 International License.
