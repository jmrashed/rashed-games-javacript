var gameField = new Array();
var board = document.getElementById("game-table");
var currentCol;
var currentRow;
var currentPlayer;
var id = 1;

const music = [
  'assets/music/1.mp3',
  'assets/music/2.mp3',
  'assets/music/3.mp3',
  'assets/music/4.mp3',
  'assets/music/5.mp3'
];

var currentTrackIndex = Math.floor(Math.random() * music.length); // Generate a random index

var background = document.getElementById("background");
var autoPlay = document.getElementById("autoPlay");
var winMusic = document.getElementById("winMusic");
var loseMusic = document.getElementById("loseMusic");
var count = 0;

newgame();

function newgame() {
  prepareField();
  placeDisc(Math.floor(Math.random() * 2) + 1);
}

function checkForVictory(row, col) {
  if (getAdj(row, col, 0, 1) + getAdj(row, col, 0, -1) > 2) {
    return true;
  } else {
    if (getAdj(row, col, 1, 0) > 2) {
      return true;
    } else {
      if (getAdj(row, col, -1, 1) + getAdj(row, col, 1, -1) > 2) {
        return true;
      } else {
        if (getAdj(row, col, 1, 1) + getAdj(row, col, -1, -1) > 2) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
}

function getAdj(row, col, row_inc, col_inc) {
  if (cellVal(row, col) == cellVal(row + row_inc, col + col_inc)) {
    return 1 + getAdj(row + row_inc, col + col_inc, row_inc, col_inc);
  } else {
    return 0;
  }
}

function cellVal(row, col) {
  if (gameField[row] == undefined || gameField[row][col] == undefined) {
    return -1;
  } else {
    return gameField[row][col];
  }
}

function firstFreeRow(col, player) {
  for (var i = 0; i < 6; i++) {
    if (gameField[i][col] != 0) {
      break;
    }
  }
  gameField[i - 1][col] = player;
  return i - 1;
}

function possibleColumns() {
  var moves_array = new Array();
  for (var i = 0; i < 7; i++) {
    if (gameField[0][i] == 0) {
      moves_array.push(i);
    }
  }
  return moves_array;
}

function think() {
  var possibleMoves = possibleColumns();
  var aiMoves = new Array();
  var blocked;
  var bestBlocked = 0;
  var delay = 1000;

  for (var i = 0; i < possibleMoves.length; i++) {
    for (var j = 0; j < 6; j++) {
      if (gameField[j][possibleMoves[i]] != 0) {
        break;
      }
    }

    gameField[j - 1][possibleMoves[i]] = 1;
    blocked = getAdj(j - 1, possibleMoves[i], 0, 1) + getAdj(j - 1, possibleMoves[i], 0, -1);
    blocked = Math.max(blocked, getAdj(j - 1, possibleMoves[i], 1, 0));
    blocked = Math.max(blocked, getAdj(j - 1, possibleMoves[i], -1, 1));
    blocked = Math.max(blocked, getAdj(j - 1, possibleMoves[i], 1, 1) + getAdj(j - 1, possibleMoves[i], -1, -1));

    if (blocked >= bestBlocked) {
      if (blocked > bestBlocked) {
        bestBlocked = blocked;
        aiMoves = new Array();
      }
      aiMoves.push(possibleMoves[i]);
    }
    gameField[j - 1][possibleMoves[i]] = 0;
  }

  return aiMoves;
}

function Disc(player) {
  this.player = player;
  this.color = player == 1 ? 'red' : 'yellow';
  this.id = id.toString();
  id++;

  this.addToScene = function () {
    board.innerHTML += '<div id="d' + this.id + '" class="disc ' + this.color + '"></div>';
    if (currentPlayer == 2) {
      //computer move
      var possibleMoves = think();
      var cpuMove = Math.floor(Math.random() * possibleMoves.length);
      currentCol = possibleMoves[cpuMove];
      document.getElementById('d' + this.id).style.left = (14 + 60 * currentCol) + "px";
      dropDisc(this.id, currentPlayer);
    }
  }

  var $this = this;
  document.onmousemove = function (evt) {
    if (currentPlayer == 1) {
      currentCol = Math.floor((evt.clientX - board.offsetLeft) / 60);
      if (currentCol < 0) { currentCol = 0; }
      if (currentCol > 6) { currentCol = 6; }
      document.getElementById('d' + $this.id).style.left = (14 + 60 * currentCol) + "px";
      document.getElementById('d' + $this.id).style.top = "-55px";
    }
  }
  document.onload = function (evt) {
    if (currentPlayer == 1) {
      currentCol = Math.floor((evt.clientX - board.offsetLeft) / 60);
      if (currentCol < 0) { currentCol = 0; }
      if (currentCol > 6) { currentCol = 6; }
      document.getElementById('d' + $this.id).style.left = (14 + 60 * currentCol) + "px";
      document.getElementById('d' + $this.id).style.top = "-55px";
    }
  }

  document.onclick = function (evt) {
    if (currentPlayer == 1) {
      if (possibleColumns().indexOf(currentCol) != -1) {
        dropDisc($this.id, $this.player);
      }
    }
  }
}

function dropDisc(cid, player) {
  currentRow = firstFreeRow(currentCol, player);
  moveit(cid, (14 + currentRow * 60));
  currentPlayer = player;
  checkForMoveVictory();
}

function checkForMoveVictory() {
  if (!checkForVictory(currentRow, currentCol)) {
    placeDisc(3 - currentPlayer);
  } else {
    var savedName = sessionStorage.getItem("username");
    if (savedName) {
      document.getElementById("username").textContent = savedName;
    } else {
      savedName = "Player";
    }
    var ww = currentPlayer == 2 ? 'Computer' : savedName;
    placeDisc(3 - currentPlayer);


    addWinnerWithCurrentTimeAndUpdateSession(ww);
    if (ww == 'Computer') {
      winMusicPlay();

    } else {
      loseMusicPlay();
    }
    Swal.fire({
      title: ww + " wins!!",
      icon: "success",
      confirmButtonText: "Start Again !",
      position: "bottom"
    }).then((result) => {

      board.innerHTML = "";
      newgame();
      background.play();

    });
  }
}


function placeDisc(player) {
  currentPlayer = player;
  var disc = new Disc(player);
  disc.addToScene();
}

function prepareField() {
  gameField = new Array();
  for (var i = 0; i < 6; i++) {
    gameField[i] = new Array();
    for (var j = 0; j < 7; j++) {
      gameField[i].push(0);
    }
  }
}

function moveit(who, where) {
  document.getElementById('d' + who).style.top = where + 'px';
}



function addWinnerWithCurrentTimeAndUpdateSession(name) {

  const storedWinnersJSON = sessionStorage.getItem('winnersData');
  const storedWinners = JSON.parse(storedWinnersJSON) || [];
  const currentTime = new Date();
  const formattedTime = currentTime.toLocaleString(); // Format the current date and time

  storedWinners.push({ name: name, time: formattedTime });
  sessionStorage.setItem('winnersData', JSON.stringify(storedWinners));
  displayWinners();
}


function displayWinners() {
  const storedWinnersJSON = sessionStorage.getItem('winnersData');
  const storedWinners = JSON.parse(storedWinnersJSON) || [];
  const winnersList = document.getElementById('winnersList');

  winnersList.innerHTML = '';
  storedWinners.forEach((winner) => {
    const listItem = document.createElement('div');
    listItem.className = 'winner-item';
    listItem.textContent = `Winner: ${winner.name}, Time: ${winner.time}`;
    winnersList.appendChild(listItem);
  });
}



displayWinners();


function saveName() {
  var name = document.getElementById("name").value;
  if (name.trim() !== "") {
    sessionStorage.setItem("username", name);
    window.location.href = "play.html";
  } else {
    alert("Please enter a valid name.");
  }
}



var savedName = sessionStorage.getItem("username");
if (savedName) {
  document.getElementById("username").textContent = savedName;
}

background.volume = 0.5;
everyClick.volume = 0.8;


// Function to play the current background and move to the next track
function playNextTrack() {
  background.src = music[currentTrackIndex];
  background.currentTime = 0;
  background.play();
  currentTrackIndex = (currentTrackIndex + 1) % music.length; // Move to the next track
}

function playeveryClick() {
  everyClick.src = "m.mp3";
  everyClick.currentTime = 0;
  everyClick.play();
}

function winMusicPlay() {
  loseMusic.pause();
  background.pause();
  winMusic.src = "assets/music/win.mp3";
  winMusic.currentTime = 0;
  winMusic.play();
}
function loseMusicPlay() {
  background.pause();
  winMusic.pause();
  loseMusic.src = "assets/music/end.mp3";
  loseMusic.currentTime = 0;
  loseMusic.play();
}

// Call the playNextTrack function when the background ends
background.addEventListener("ended", playNextTrack);

autoPlay.addEventListener("click", function () {
  winMusic.pause();
  playeveryClick();
  if (count == 0) {
    playNextTrack();
    count++;
  }
});

