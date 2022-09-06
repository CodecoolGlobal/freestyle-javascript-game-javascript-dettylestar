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
    console.log(collision)
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
    draw();
    requestAnimationFrame(ballLoop);
}

function draw () {
    ui.ball.style.left = `${ballState.ballx}px`;
    ui.ball.style.top = `${ballState.bally}px`;
}

// collisionDetection();
ballInit();