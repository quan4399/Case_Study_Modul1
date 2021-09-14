let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let dx = 5;
let dy = 2;

let ball = {
    x : 250,
    y : 200,
    radius : 10,
}

let bars = {
    width : 70,
    height: 10,
    x : 0,
    y : canvas.height - 10,
    speed : 5,

    isMovingLeft : false ,
    isMovingRight : false,
}

let brick = {
    offsetX : 25,
    offsetY : 25,
    margin : 25,
    width: 70,
    height: 20,
    row : 3 ,
    col : 5,
};

let brickList = [];

for (let i = 0; i < brick.row; i++) {
    for (let j = 0; j < brick.col; j++) {
        brickList.push({
            x: brick.offsetX + j * (brick.width + brick.margin),

            y: brick.offsetY + i * (brick.height + brick.margin),
            isBroken: false
        });
    }
}

let gameOver = false;
let score = 0;

function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y ,ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawBars() {
    ctx.beginPath();
    ctx.rect(bars.x, bars.y, bars.width, bars.height )
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    brickList.forEach(function (b) {
        if(!b.isBroken) {
            ctx.beginPath();
            ctx.rect(b.x, b.y, brick.width, brick.height);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.closePath();
        }
    });
}




document.addEventListener("keyup", function (event) {// ham goi su kiem tu ban phim

    console.log(event);
    if (event.keyCode === 37){
        bars.isMovingLeft = false;
    }else if(event.keyCode === 39){
        bars.isMovingRight = false;
    }

})

document.addEventListener("keydown", function (event) {// ham goi su kiem tu ban phim

    console.log(event);
    if (event.keyCode === 37){
        bars.isMovingLeft = true;
    }else if(event.keyCode === 39){
        bars.isMovingRight = true;
    }

})

function draw() {
    if (!gameOver) {
        clearScreen();
        drawBall();
        drawBars();
        drawBricks();

        collideBall();
        collideBars();
        collideBrick();

        isMovingBars();
        updateBall();
        updateBars();
        checkGameOver();
        requestAnimationFrame(draw);
    } else {
        alert("game over !!")
    }
}
draw();

function collideBall() {// Ham xu ly va cham ball voi bodẻrline
    if (ball.x < ball.radius || ball.x > canvas.width - ball.radius){
        dx = -dx;
    }
    if (ball.y < ball.radius ){
        dy = -dy;
    }
}

function collideBars() { //ham xu ly va cham ball voi bars
    if (ball.x + ball.radius >= bars.x &&
        ball.x + ball.radius <= bars.x + bars.width &&
        ball.y + ball.radius >= canvas.height - bars.height){
        dy = -dy;

    }
}

function collideBrick() {
    brickList.forEach(function(b) {
        if (!b.isBroken){
            if (ball.x >= b.x && ball.x <= b.x + brick.width &&
                ball.y + ball.radius >= b.y && ball.y - ball.radius <= b.y + brick.height) {
                dy = -dy;
                b.isBroken = true;
                score++;
                document.getElementById("result").innerHTML = score;
            }
        }
    });
}


function isMovingBars() {   //ham di chuyen thanh chan
    if (bars.isMovingLeft){
        bars.x = bars.x - bars.speed;
    }else if (bars.isMovingRight){
        bars.x = bars.x + bars.speed;
    }
}

function updateBall() {// cap nhat vi tri ball
    ball.x += dx;
    ball.y += dy;
}

function updateBars() { // cap nhat vi tri thanh chan
    if (bars.x < 0) {
        bars.x = 0;
    } else if (bars.x > canvas.width - bars.width) {
        bars.x = canvas.width - bars.width;
    }
}

function checkGameOver() {
    if (ball.y > canvas.height - ball.radius){
        gameOver = true;
    }
}

function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

