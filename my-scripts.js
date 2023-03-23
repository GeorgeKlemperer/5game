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
const winningscore = 7

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
    if (p1score >= winningscore || p2score >= winningscore) {
        winningplayerdisplay()
    }
    else
    {

    intervalID = setTimeout(() => { //setTimeout calls a function after a number of milliseconds
        clearboard();
        drawcourt ();
        drawpaddles();
        moveball();
        drawball(ballX, ballY)
        checkcollision();
        nexttick() ;
    }, 10)
}};
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
    ballspeed = 2; // Change this to edit intial speed.
    if(Math.round(Math.random()) == 1){ //This will give us a random number between 0 and 1, if 1 move to the right, if not move to left.
        ballXdirection = 1;
    }
    else{
        ballXdirection = -1;
    }
    if(Math.round(Math.random()) == 1){
        ballYdirection = 1; // This will make ball always go diagonally
    }
    else{
        ballYdirection = -1; // This will make ball always go diagonally
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
    context.beginPath(); //This starts a new path everytick, stops line being drawn continuously.
    context.arc(ballX, ballY, ballradius, 0, 2 * Math.PI), // gives an x coordinate of ballX and a y coordinate of ballY. It then draws an arc from 0 radians to 2pi (a full cirle).
    context.stroke(); //The code then draws a border around the ball
    context.fill(); //Then fills it in
};
function checkcollision(){
    //Ball boounces off floor and ceiling.
    if (ballY <= 0 + ballradius) { //ball radius accounts for centre of ball being x an y coordinates
        ballYdirection *= -1;
        }
    if (ballY >= gameheight - ballradius) {
        ballYdirection *=-1;
    }
     //Ball scores on edges.
    if (ballX <= 0) {
        p2score += 1;
        updatescore();
        createball();
        return;
    }
    if (ballX >= gamewidth) {
        p1score += 1;
        updatescore();
        createball();
        return;
    }
    //Ball bounces off paddles.
    if (ballX <= (paddle1.x + paddle1.width + ballradius)){ // If ball's X coordinate hits paddle 1 line... (you add paddle width here as coordinate is for upper left corner)
            if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) { // and is inbetween paddle 1 y coordinate and height...
                ballX = (paddle1.x + paddle1.width) + ballradius; //(nb. this code stops ball getting stuck inside paddle)
                ballXdirection *= -1; //then bounce ball...
                ballspeed +=1; //and increase ball speed.
            }
    }
    if (ballX >= (paddle2.x - ballradius)){ // If ball's X coordinate hits paddle 2 line...
        if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) { // and is inbetween paddle 2 y coordinate and height...
            ballX = paddle2.x - ballradius; //(nb. this code stops ball getting stuck inside paddle)
            ballXdirection *= -1; //then bounce ball...
            ballspeed +=1; //and increase ball speed.
        }
}
    }
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
function updatescore(){
    score.textContent = `${p1score} : ${p2score}`; //Be sure to use ` ans not '
};
function resetgame(){ //resets scores to 0, resets paddle positions
     p1score = 0;
     p2score = 0;
    paddle1= {
        width: 25,
        height: 100,
        x: 5,
        y: 5,
    };
    paddle2= {
        width: 25,
        height: 100,
        x: gamearea.width - 30,
        y: gamearea.height - 105,
    };
    ballspeed = 0;
    ballX = 0;
    ballY = 0;
    ballXdirection = 0;
    ballYdirection = 0;
    updatescore();
    clearInterval(intervalID);
    begingame();
};
function controlsinfo() {
    alert("Use the 'W' and 'S' keys to move the left paddle up and down, and use the'J' and 'N' arrow keys to move the right paddle. The ball speed will increase with every paddle collision. First to 7 wins, have fun!");
  }

//Draw tenniscourt elements
function drawcourt () {
    context.beginPath();
    context.strokeStyle = '#d9d9d9';
    context.lineWidth = 2;
    context.moveTo(gamewidth/2, 0);
    context.lineTo(gamewidth/2, gameheight);
    context.stroke();

    context.moveTo(gamewidth/4, gameheight*(.125));
    context.lineTo(gamewidth/4, gameheight*(.875));
    context.stroke();

    context.moveTo(gamewidth/(4/3), gameheight*(.125));
    context.lineTo(gamewidth/(4/3), gameheight*(.875));
    context.stroke();

    context.moveTo(gamewidth/(4), gameheight/2);
    context.lineTo(gamewidth/(4/3), gameheight/2);
    context.stroke();

    context.moveTo(0, gameheight*(.125));
    context.lineTo(gamewidth, gameheight*(.125));
    context.stroke();

    context.moveTo(0, gameheight*(.875));
    context.lineTo(gamewidth, gameheight*(.875));
    context.stroke();

    context.moveTo(0, gameheight/2);
    context.lineTo(gamewidth/40, gameheight/2);
    context.stroke();

    context.moveTo(gamewidth, gameheight/2);
    context.lineTo(gamewidth/(40/39), gameheight/2);
    context.stroke();
  }

// show when winning player when winningscore is reached.
function winningplayerdisplay() {
    const winnerdisplayelement = document.getElementById('gameovertext');

    gameoover.style.display = "block";

    if (p1score >= winningscore) {
        winnerdisplayelement.innerHTML = `Player 1 Wins!`;
    }
    else {
        winnerdisplayelement.innerHTML = `Player 2 Wins!`;
    }
}

// function updateMovieCount() {
//     const movieCountElement = document.getElementById('movieCount');
//     const count = Object.keys(movieData).length;
//     movieCountElement.innerHTML = `The only ${count} movies you need to see (and counting).`;
//   }