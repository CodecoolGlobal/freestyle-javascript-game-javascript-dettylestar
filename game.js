initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)

}
function collisionDetection() {
    let ball = document.querySelector('#ball').getBoundingClientRect();
    let wall = document.querySelector('.table').getBoundingClientRect();
    let leftPlayer = document.querySelector('#left-player').getBoundingClientRect();
    let rightPlayer = document.querySelector('#right-player').getBoundingClientRect();
    if (ball.top >= wall.top) {
        return 'y'
    } else if (ball.bottom >= wall.bottom) {
        return 'x'
    } else if ((leftPlayer.right >= ball.left && ball.top <= leftPlayer.bottom && ball.bottom >= leftPlayer.top)()) {


    }
}

collisionDetection();