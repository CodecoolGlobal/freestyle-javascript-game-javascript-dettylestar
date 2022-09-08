let hitWall = false;
let gameIsRunning = false


initGame();

function initGame() {

    if (gameIsRunning === false) {
        console.log('press Space')
        window.addEventListener('keypress', (start) => {
            if (start.key ===' ') {
                hitWall = false;
                gameIsRunning = true
                ballState.bally = 250
                ballState.ballx = 400
                ballInit();
            }
            else{
                return console.log('Press Space')
            }
        } )
    }

    // Your game can start here, but define separate functions, don't write everything in here :)

}
let wall = document.querySelector('.table').getBoundingClientRect();
console.log(wall.top)
let leftPlayerScore = 0;
let rightPlayerScore = 0;


function collisionDetection() {

    let ball = document.querySelector('.ball').getBoundingClientRect();
    let wall = document.querySelector('.table').getBoundingClientRect();
    let leftPlayer = document.querySelector('#left-player')
    let rightPlayer = document.querySelector('#right-player')
    let leftPlayerColl = playerBallCollision(leftPlayer.getBoundingClientRect(),ball);
    let rightPlayerColl = playerBallCollision(rightPlayer.getBoundingClientRect(),ball);
    if (ball.top <= wall.top) {
        return 'y'
    } else if (ball.bottom >= wall.bottom) {
        return 'y'
    } else if (leftPlayerColl && leftPlayer.dataset.stuck === 'false') {
        leftPlayer.dataset.stuck = 'true';
        setTimeout(()=>{leftPlayer.dataset.stuck = 'false'},1000)
        return leftPlayerColl
    }else if(rightPlayerColl && rightPlayer.dataset.stuck === 'false'){
        rightPlayer.dataset.stuck = 'true';
        setTimeout(()=>{rightPlayer.dataset.stuck = 'false'},1000)
        return rightPlayerColl

    } else if (wall.left >= ball.left) {
        rightPlayerScore += 1
        hitWall = true;
        gameIsRunning = false
        console.log(rightPlayerScore)
        return 'rightPLayer'
    } else if (wall.right <= ball.right) {
        leftPlayerScore += 1
        hitWall = true;
        gameIsRunning = false
        console.log(leftPlayerScore)
        return 'leftPlayer'
    }
    return true
}


function playerBallCollision(player,ball) {
    if (player.left <= ball.right
        && ball.top <= player.bottom
        && player.right >= ball.left
        && ball.bottom >= player.top) {
        let depthY;
        if (ball.top + ball.height / 2 > (player.top + player.height / 2)) {
            depthY = ball.bottom - player.top
        }else{
            depthY = player.bottom- ball.top
        }
        let depthX;
        if(ball.left + ball.width / 2 > (player.left + player.width / 2)) {
            depthX = player.right- ball.left
        }else{
            depthX = ball.right -player.left
        }
        if (depthX > depthY){
            return 'y'
        }else {
            return 'x'
        }
    }
    return null

}


const ballState = {
    prevX:0,
    prevY:0,
    ballx: 400,
    bally: 250,
    speedx: 3,
    speedy: 6,
};

const leftPlayer = {
    top: 0,
    left: 0,
    speed: 3,
    currentSpeedUp: 0,
    currentSpeedDown: 0
}

const player = {
    top: 0,
    left: 0,
    speed: 3,
    currentSpeedUp: 0,
    currentSpeedDown: 0,
}

const ui = {
    root: document.querySelector('.table'),
    header: document.querySelector('#score-bar')
};

const shield = document.createElement('img');
shield.setAttribute('src','static/gold_shield.png');
shield.setAttribute('height', '30px');
shield.setAttribute('width', '30px');

function ballInit () {
    let ball = document.querySelector('.ball')
    if (ball == null) {
        ball = document.createElement('div');
    }
    ball.className = 'ball';
    ball.style.width = '30px';
    ball.style.height = '30px';
    ball.appendChild(shield)
    //ball.style.borderRadius = '50%';
    //ball.style.backgroundColor = 'purple';
    ball.style.display = 'block';
    ball.style.position = 'absolute';
    ball.style.left = '400px';
    ball.style.top = '250px';

    ui.root.append(ball);
    ui['ball'] = ball;
    ballLoop()
}


function ballUpdate() {
    const collision = collisionDetection()
    if (collision === 'y') {
        ballState.ballx = ballState.prevX
        ballState.bally = ballState.prevY
        ballState.speedy *= (-1)
    } else if (collision === 'x') {
        ballState.ballx = ballState.prevX
        ballState.bally = ballState.prevY
        let randomx = Math.random() * -1 + -0.5
        ballState.speedx *= randomx
        let randomy = Math.random() < 0.5 ? 1 : -1;
        ballState.speedy *= randomy
    }else if (collision === 'y') {
        ballState.ballx = ballState.prevX
        ballState.bally = ballState.prevY
        let random = Math.random() < 0.5 ? 1 : -1;
        console.log(random)
        ballState.speedx *= random
    }
    ballState.prevX = ballState.ballx
    ballState.prevY = ballState.bally
    ballState.ballx += ballState.speedx;
    ballState.bally += ballState.speedy;
}

function ballLoop () {
    ballUpdate();
    drawBall();
    leftPlayerUpdate();
    rightPlayerUpdate();
    playerDraw();
    if (hitWall === true) {
        return 'score'

    } else {
        requestAnimationFrame(ballLoop);
    }
}

function drawBall () {
    ui.ball.style.left = `${ballState.ballx}px`;
    ui.ball.style.top = `${ballState.bally}px`;
}


document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (keyName === 's') {
      leftPlayer.currentSpeedDown = 1
  }else if (keyName === 'w') {
      leftPlayer.currentSpeedUp = -1
  }else if (keyName === 'ArrowUp') {
      player.currentSpeedUp = -1
  }else if (keyName === 'ArrowDown') {
      player.currentSpeedDown = 1
  }
});

document.addEventListener('keyup', (event) => {
  const keyName = event.key;
  if (keyName === 's') {
      leftPlayer.currentSpeedDown = 0
  }else if (keyName === 'w') {
      leftPlayer.currentSpeedUp = 0
  }else if (keyName === 'ArrowUp') {
      player.currentSpeedUp = 0
  }else if (keyName === 'ArrowDown') {
      player.currentSpeedDown = 0
  }
});

function leftPlayerUpdate() {
    if (document.querySelector('#left-player').getBoundingClientRect().top <= wall.top && leftPlayer.currentSpeedUp<0){
        leftPlayer.top += leftPlayer.speed * 0
    }else if (document.querySelector('#left-player').getBoundingClientRect().bottom >= wall.bottom && leftPlayer.currentSpeedDown>0){
        leftPlayer.top += leftPlayer.speed * 0
    }else{
        leftPlayer.top += leftPlayer.speed * (leftPlayer.currentSpeedUp + leftPlayer.currentSpeedDown)
    }


}

function rightPlayerUpdate(){
    if (document.querySelector('#right-player').getBoundingClientRect().top <= wall.top && player.currentSpeedUp<0){
        player.top += player.speed * 0
    }else if (document.querySelector('#right-player').getBoundingClientRect().bottom >= wall.bottom && player.currentSpeedDown>0){
        player.top += player.speed * 0
    }else{
        player.top += player.speed * (player.currentSpeedUp + player.currentSpeedDown)
    }

}

function playerDraw() {
    document.querySelector('#left-player').style.top = leftPlayer.top + 'px'
    document.querySelector('#right-player').style.top = player.top + 'px'
}

let easyimage = document.createElement("img")
easyimage.src = 'static/rune.png'
easyimage.style.maxWidth = '100%'
easyimage.style.maxHeight = '100%'
easyimage.style.display = 'block'
let mediumimage = document.createElement("img")
mediumimage.src = 'static/runeM.png'
mediumimage.style.maxWidth = '100%'
mediumimage.style.maxHeight = '100%'
mediumimage.style.display = 'block'
let hardimage = document.createElement('img')
hardimage.src = 'static/runeH.png'
hardimage.style.maxWidth = '100%'
hardimage.style.maxHeight = '100%'
hardimage.style.display = 'block'
let easyButton = document.createElement('button')
let mediumButton = document.createElement('button')
let hardButton = document.createElement('button')
easyButton.style.position = 'relative'
easyButton.style.order = "2"
easyButton.style.backgroundColor = 'green'
easyButton.style.borderRadius = '20%'
mediumButton.style.position = 'relative'
mediumButton.style.order = "3"
mediumButton.style.backgroundColor = 'blue'
mediumButton.style.borderRadius = '20%'
hardButton.style.position = 'relative'
hardButton.style.order = "4"
hardButton.style.backgroundColor = 'red'
hardButton.style.borderRadius = '20%'
ui.header.append(easyButton,mediumButton,hardButton)
easyButton.appendChild(easyimage)
mediumButton.appendChild(mediumimage)
hardButton.appendChild(hardimage)

easyButton.addEventListener('click',() =>{
    ballState.speedx = 3
    ballState.speedy = 6
    leftPlayer.speed = 4
    player.speed = 4
})


mediumButton.addEventListener('click',() =>{
    ballState.speedx = 6
    ballState.speedy = 12
    leftPlayer.speed = 6
    player.speed = 6
})

hardButton.addEventListener('click',() =>{
    ballState.speedx = 9
    ballState.speedy = 15
    leftPlayer.speed = 15
    player.speed = 15
})
