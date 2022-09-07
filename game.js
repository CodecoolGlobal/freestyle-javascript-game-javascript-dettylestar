initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)

}
function collisionDetection() {
    let ball = document.querySelector('.ball').getBoundingClientRect();
    let wall = document.querySelector('.table').getBoundingClientRect();
    let leftPlayer = document.querySelector('#left-player').getBoundingClientRect();
    let rightPlayer = document.querySelector('#right-player').getBoundingClientRect();
    if (ball.top <= wall.top) {
        return 'top'
    } else if (ball.bottom >= wall.bottom) {
        return 'bottom'
    } else if (leftPlayer.right >= ball.left && ball.top <= leftPlayer.bottom && ball.bottom >= leftPlayer.top) {
        return 'left'
    }else if(rightPlayer.left <= ball.right && ball.top <= leftPlayer.bottom && ball.bottom >= leftPlayer.top){
        return 'right'
    }
    return true
}

const ballState = {
    ballx: 400,
    bally: 250,
    speedx: 0,
    speedy: 6,
    speed: 1,
};

const leftPlayer = {
    top: 0,
    left: 0,
    speed: 3,
    currentSpeedUp: 0,
    currentSpeedDown: 0
}

const rightPlayer = {
    top: 0,
    left: 0,
    speed: 3,
    currentSpeedUp: 0,
    currentSpeedDown: 0,
}

const ui = {
    root: document.querySelector('.table')
};


function ballInit () {
    ball = document.createElement('div');
    ball.className = 'ball';
    ball.style.width = '30px';
    ball.style.height = '30px';
    ball.style.borderRadius = '50%';
    ball.style.backgroundColor = 'purple';
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
    if (collision === 'top' || collision === 'bottom') {
        ballState.speedy *= (-1)
    } else if (collision === 'left' || collision === 'right') {
        ballState.speedx *= (-1)
    }
    ballState.ballx += ballState.speedx;
    ballState.bally += ballState.speedy;
}

function ballLoop () {
    ballUpdate();
    drawBall();
    playerUpdate();
    playerDraw();
    requestAnimationFrame(ballLoop);
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
      rightPlayer.currentSpeedUp = -1
  }else if (keyName === 'ArrowDown') {
      rightPlayer.currentSpeedDown = 1
  }
});

document.addEventListener('keyup', (event) => {
  const keyName = event.key;
  if (keyName === 's') {
      leftPlayer.currentSpeedDown = 0
  }else if (keyName === 'w') {
      leftPlayer.currentSpeedUp = 0
  }else if (keyName === 'ArrowUp') {
      rightPlayer.currentSpeedUp = 0
  }else if (keyName === 'ArrowDown') {
      rightPlayer.currentSpeedDown = 0
  }
});

function playerUpdate() {
    leftPlayer.top += leftPlayer.speed * (leftPlayer.currentSpeedUp + leftPlayer.currentSpeedDown)
    rightPlayer.top += rightPlayer.speed * (rightPlayer.currentSpeedUp + rightPlayer.currentSpeedDown)
}

function playerDraw() {
    document.querySelector('#left-player').style.top = leftPlayer.top + 'px'
    document.querySelector('#right-player').style.top = rightPlayer.top + 'px'
}


ballInit();
