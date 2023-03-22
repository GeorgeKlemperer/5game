// Constants
const gamearea = document.querySelector("#gamearea");
const context = gamearea.getContext("2d");
const score = document.querySelector("#score");
const resetbuttoon = document.querySelector("#resetbuttoon");
const gamewidth = gamearea.width;
const gameheight = gamearea.height;
const pitchcolour = "#5fc400";
const paddle1colour = "orange";
const paddle2colour = "cyan";
const paddleborder = "black";
const ballcolour = "black";
const ballborder = "black";
const ballradius = 12.5;
const paddlespeed = 25; 

// Variables
let intervalID;
let ballspeed = 1;
let ballX = gamewidth/2
let ballY = gameheight/2
let ballXdirection = 0;
let ballYdirection = 0;
let p1score = 0;
let p2score = 0;
let paddle1= {
    width: 25,
    height: 100,
    x: 5,
    y: 5,
};
let paddle2= {
    width: 25,
    height: 100,
    x: gamearea.width - 30,
    y: gamearea.height - 105,
};

// Listener events for paddle direction change and reset button
window.addEventListener("keydown", changedirection);
// resetbuttoon.addEventListener("click", resetgame);

begingame();


//Game Functions
function begingame(){
    createball();
    nexttick();
};
function nexttick(){
    intervalID = setTimeout(() => { //setTimeout calls a function after a number of milliseconds
        clearboard();
        drawpaddles();
        moveball();
        drawball(ballX, ballY)
        checkcollision();
        nexttick() ;
    }, 10)
};
function clearboard(){
    context.fillStyle = pitchcolour;
    context.fillRect(0,0, gamewidth, gameheight);

};
function drawpaddles(){
    context.strokeStyle = paddleborder;

    context.fillStyle = paddle1colour;
    context.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height); //The arguments are the x and y coordinates of the upper left corner, then paddle width and height.
    context.strokeRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);
    context.fillStyle = paddle2colour;
    context.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
    context.strokeRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
};
function createball(){
    ballspeed = 1;
    if(Math.round(Math.random()) == 1){ //This will give us a random number between 0 and 1, if 1 move to the right, if noot move to left.
        ballXdirection = 1;
    }
    else{
        ballXdirection = -1;
    }
    if(Math.round(Math.random()) == 1){
        ballYdirection = 1;
    }
    else{
        ballYdirection = -1;
    }
    ballX = gamewidth / 2;
    ballY = gameheight / 2;
    drawball(ballX, ballY)
};
function moveball(){
    ballX += (ballspeed * ballXdirection)
    ballY += (ballspeed * ballYdirection)
};
function drawball(ballX, ballY){
    context.fillStyle = ballcolour;
    context.strokeStyle = ballborder;
    context.linewidth = 2;
    context.beginPath(); //This starts a new path everytick
    context.arc(ballX, ballY, ballradius, 0, 2 * Math.PI),
    context.stroke();
    context.fill(); 
};
function checkcollision(){};
function changedirection(event){
    const keypressed = event.keyCode;
    const paddle1up = 87;
    const paddle1down = 83;
    const paddle2up = 74;
    const paddle2down = 78;

    switch(keypressed) {//The switch statement selects on of many code blocks to be executed.
        case(paddle1up):
            if(paddle1.y > 5){
            paddle1.y -= paddlespeed; //The subtraction assignment ( -= ) operator subtracts the value of the right operand from a variable and assigns the result to the variable.
            }
            break;
        case(paddle1down):
        if(paddle1.y < gameheight - paddle1.height - 5){
            paddle1.y += paddlespeed;
        }
        break;
        case(paddle2up):
            if(paddle2.y > 5){
            paddle2.y -= paddlespeed; //The subtraction assignment ( -= ) operator subtracts the value of the right operand from a variable and assigns the result to the variable.
            }
            break;
        case(paddle2down):
        if(paddle2.y < gameheight - paddle2.height - 5){
            paddle2.y += paddlespeed;
        }
        break;
    };
}
function updatescore(){};
function resetgame(){};