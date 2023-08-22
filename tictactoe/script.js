var p1Input = "X";
var p2Input = "O";
var scoreP1 = 0;
var scoreP2 = 0;
var draws = 0;
var round = 1;
var checkNext = 0;
var turn = [];
var winner = "";
var victory = document.getElementById("victory");
var click = document.getElementById("click");
var clickHover = document.getElementById("click-hover");
var playerTurn = document.getElementById('player-turn');
playerTurn.innerHTML += '<h3>Player 1\'s Turn : X</h3>';
var r1c1 = document.getElementById('r1c1');
var r1c2 = document.getElementById('r1c2');
var r1c3 = document.getElementById('r1c3');
var r2c1 = document.getElementById('r2c1');
var r2c2 = document.getElementById('r2c2');
var r2c3 = document.getElementById('r2c3');
var r3c1 = document.getElementById('r3c1');
var r3c2 = document.getElementById('r3c2');
var r3c3 = document.getElementById('r3c3');

function check() {
    if (r1c1.innerHTML === "X" && r1c2.innerHTML === "X" && r1c3.innerHTML === "X" || r2c1.innerHTML === "X" && r2c2.innerHTML === "X" && r2c3.innerHTML === "X" || r3c1.innerHTML === "X" && r3c2.innerHTML === "X" && r3c3.innerHTML === "X" || r1c1.innerHTML === "X" && r2c1.innerHTML === "X" && r3c1.innerHTML === "X" || r1c2.innerHTML === "X" && r2c2.innerHTML === "X" && r3c2.innerHTML === "X" || r1c3.innerHTML === "X" && r2c3.innerHTML === "X" && r3c3.innerHTML === "X" || r1c3.innerHTML === "X" && r2c2.innerHTML === "X" && r3c1.innerHTML === "X" || r1c1.innerHTML === "X" && r2c2.innerHTML === "X" && r3c3.innerHTML === "X") {
        scoreP1++;
        document.getElementById('scoreP1').innerHTML = scoreP1;
        playerTurn.innerHTML = '<h3>The Winner is Player 1!</h3>';
        // alert('The Winner is Player 1!'); 
        winner = "p1";
        checkNext = 0;
        r1c1.classList.add("avoid-clicks");
        r1c2.classList.add("avoid-clicks");
        r1c3.classList.add("avoid-clicks");
        r2c1.classList.add("avoid-clicks");
        r2c2.classList.add("avoid-clicks");
        r2c3.classList.add("avoid-clicks");
        r3c1.classList.add("avoid-clicks");
        r3c2.classList.add("avoid-clicks");
        r3c3.classList.add("avoid-clicks");
        victory.currentTime = 0;
        victory.play();
    } else if (r1c1.innerHTML === "O" && r1c2.innerHTML === "O" && r1c3.innerHTML === "O" || r2c1.innerHTML === "O" && r2c2.innerHTML === "O" && r2c3.innerHTML === "O" || r3c1.innerHTML === "O" && r3c2.innerHTML === "O" && r3c3.innerHTML === "O" || r1c1.innerHTML === "O" && r2c1.innerHTML === "O" && r3c1.innerHTML === "O" || r1c2.innerHTML === "O" && r2c2.innerHTML === "O" && r3c2.innerHTML === "O" || r1c3.innerHTML === "O" && r2c3.innerHTML === "O" && r3c3.innerHTML === "O" || r1c3.innerHTML === "O" && r2c2.innerHTML === "O" && r3c1.innerHTML === "O" || r1c1.innerHTML === "O" && r2c2.innerHTML === "O" && r3c3.innerHTML === "O") {
        scoreP2++;
        document.getElementById('scoreP2').innerHTML = scoreP2;
        playerTurn.innerHTML = '<h3>The Winner is Player 2!</h3>';
        // alert('The Winner is Player 2!'); 
        winner = "p2";
        checkNext = 0;
        r1c1.classList.add("avoid-clicks");
        r1c2.classList.add("avoid-clicks");
        r1c3.classList.add("avoid-clicks");
        r2c1.classList.add("avoid-clicks");
        r2c2.classList.add("avoid-clicks");
        r2c3.classList.add("avoid-clicks");
        r3c1.classList.add("avoid-clicks");
        r3c2.classList.add("avoid-clicks");
        r3c3.classList.add("avoid-clicks");
        victory.currentTime = 0;
        victory.play();
    } else if (r1c1.innerHTML !== "+" && r1c2.innerHTML !== "+" && r1c3.innerHTML !== "+" && r2c1.innerHTML !== "+" && r2c2.innerHTML !== "+" && r2c3.innerHTML !== "+" && r3c1.innerHTML !== "+" && r3c2.innerHTML !== "+" && r3c3.innerHTML !== "+" && r1c1.innerHTML !== "+" && r2c1.innerHTML !== "+" && r3c1.innerHTML !== "+" && r1c2.innerHTML !== "+" && r2c3.innerHTML !== "+" && r3c2.innerHTML !== "+" && r1c1.innerHTML !== "+" && r2c2.innerHTML !== "+" && r3c3.innerHTML !== "+" && r1c3.innerHTML !== "+" && r2c2.innerHTML !== "+" && r3c1.innerHTML !== "+") {
        draws++;
        document.getElementById('draws').innerHTML = draws;
        playerTurn.innerHTML = '<h3>This is a Draw!</h3>';
        winner = "draw";
        checkNext = 0;
        victory.currentTime = 0;
        victory.play();
    }
}

function mark(event) {
    winner = 0;
    click.currentTime = 0;
    click.play();
    var target = event.target.id;
    var boxId = document.getElementById(target);
    boxId.classList.add("avoid-clicks");
    if (turn[0] === undefined || turn[turn.length - 1] === "O") {
        playerTurn.innerHTML = '<h3>Player 2\'s Turn : O</h3>';
        boxId.innerHTML = p1Input;
        turn.push(p1Input);
        check();
    } else {
        playerTurn.innerHTML = '<h3>Player 1\'s Turn : X</h3>';
        boxId.innerHTML = p2Input;
        turn.push(p2Input);
        check();
    }
}

function reset() {
    r1c1.innerHTML = "+";
    r1c2.innerHTML = "+";
    r1c3.innerHTML = "+";
    r2c1.innerHTML = "+";
    r2c2.innerHTML = "+";
    r2c3.innerHTML = "+";
    r3c1.innerHTML = "+";
    r3c2.innerHTML = "+";
    r3c3.innerHTML = "+";
    r1c1.classList.remove("avoid-clicks");
    r1c2.classList.remove("avoid-clicks");
    r1c3.classList.remove("avoid-clicks");
    r2c1.classList.remove("avoid-clicks");
    r2c2.classList.remove("avoid-clicks");
    r2c3.classList.remove("avoid-clicks");
    r3c1.classList.remove("avoid-clicks");
    r3c2.classList.remove("avoid-clicks");
    r3c3.classList.remove("avoid-clicks");
    turn.length = 0;
    scoreP1 = 0;
    scoreP2 = 0;
    draws = 0;
    round = 1;
    winner = 0;
    document.getElementById('round').innerHTML = round;
    document.getElementById('scoreP1').innerHTML = scoreP1;
    document.getElementById('scoreP2').innerHTML = scoreP2;
    document.getElementById('draws').innerHTML = draws;
    document.getElementById('result').innerHTML = '';
    playerTurn.innerHTML = '<h3>Player 1\'s Turn : X</h3>';
}

function nextRound() {
    if (winner === "p1" && checkNext === 0 || winner === "p2" && checkNext === 0 || winner === "draw" && checkNext === 0) {
        r1c1.innerHTML = "+";
        r1c2.innerHTML = "+";
        r1c3.innerHTML = "+";
        r2c1.innerHTML = "+";
        r2c2.innerHTML = "+";
        r2c3.innerHTML = "+";
        r3c1.innerHTML = "+";
        r3c2.innerHTML = "+";
        r3c3.innerHTML = "+";
        r1c1.classList.remove("avoid-clicks");
        r1c2.classList.remove("avoid-clicks");
        r1c3.classList.remove("avoid-clicks");
        r2c1.classList.remove("avoid-clicks");
        r2c2.classList.remove("avoid-clicks");
        r2c3.classList.remove("avoid-clicks");
        r3c1.classList.remove("avoid-clicks");
        r3c2.classList.remove("avoid-clicks");
        r3c3.classList.remove("avoid-clicks");
        turn.length = 0;
        checkNext = 1;
        round++;
        document.getElementById('round').innerHTML = round;
        document.getElementById('result').innerHTML = '';
        playerTurn.innerHTML = '<h3>Player 1\'s Turn : X</h3>';
    } else {
        return;
    }
}

function playSound() {
    clickHover.currentTime = 0;
    //clickHover.play();
}