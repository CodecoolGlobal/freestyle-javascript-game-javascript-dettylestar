# God Of Pong
<img src="https://imgur.com/JU66Hi4.png" width="400px">

## About
---
This is our team project from the web-module we were on the 3rd week-pair and our task was to creat a freestyle javascript based game.
We decided to do a basic 2 player ping pong game with a God Of War inspired theme.
The base concept is 2 player at each side and 1 ball on the map 1 score is when a player miss the ball and the ball reach the wall behind that player.

## Setup
---
It is a basic javascript project so just open the *index.html* file in your browser. I recommend using **Chrome**.

## Instructions
---
The game is starting with the 'SPACE' button the first player control button is 'W' for upper move and 'S' for down move,
2nd player 'UP ARROW' for upper move and 'DOWN ARROW' for down move. The main goal is to reach 10 score the player who first reach the 10 score WIN.

There are 3 difficulty level which can be choosen by the icons at the middle of the name bar.

<img src="https://imgur.com/FaF3f4g.png" width="400px">

Green is easy, blue is medium, and red  is god.

At each level the speed of the ball is changed.

## Technologies
---
Mosty we used **Javascript** for the game logic and we also use html and css.
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## Difficulties
---
Hardest part was the collision detection that was my part, finally I came up an idea which is working almost properly.
Hardest part in the collision detection was that when the ball reached the wall it stucked into it and didn't bounced back the final solutin was
a dataset in the ball div.