//names of symbols
// these> {} are called curly brackets
//these> [] are normal brackets
// ; is a semicolon, it is a statement terminator that indicates the end of a logical entity(eg function, define var e = 0;)
//these> () are called parenthesis, you can call them whatever u would like
//parenthesis are used for function calls and function parameters   
//board

var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize *5;// a space is not required while doing basic math
var snakeY = blockSize *5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false


window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    PlaceFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/10);
}

function update() {
    if (gameOver) {
        return;
    }
     
    
    context.fillStyle="black"; 
    context.fillRect(0, 0, board.width, board.height);
    


    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        PlaceFood();
    } 

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    //snake update
    context.fillStyle="lime";
    
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize; // oh okei
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i =0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
        //^ where i left off

    }

    //game over
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        window.location.reload();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            window.location.reload();
        }   

    }
    //food update
    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
}





// function to change the direction the snake is moving in
function changeDirection(e){ //
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }// worst code to do this xddddddddddddddd
    // at least u got the fucking indentation right
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}




//place food function
function PlaceFood() {
    //o-1 *cols -> (0-19.9999) this is a note and not needed in the code
    foodX = Math.floor(Math.random() * cols) * blockSize;// cols = 20
    foodY = Math.floor(Math.random() * rows) * blockSize;// rows = 20
}




