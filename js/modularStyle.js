let gameBoard = (() => {
    let cubes = document.querySelectorAll(".grid-item");
    let tttgBoard = Array.from(Array(9).keys());
    console.log(tttgBoard);
    let winningMoves = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    function emptySlots() {
        console.log(JSON.stringify(tttgBoard.filter(el => typeof el === "number")))
        return tttgBoard.filter(el => typeof el === "number");
    }
    function emptySquares() {
        return Array.from(cubes).filter(el => !el.textContent);
    }
    function cleanSlate() {
        Array.from(cubes).forEach(cubes => {
            cubes.textContent = "";
            cubes.style.backgroundColor = "";
            tttgBoard = [];
        });
    }
    function startGame() {
        for (let i = 0; i < cubes.length; i++) {
            cubes[i].style.backgroundColor = "";
            // console.log(cubes[i]);
            cubes[i].addEventListener("click", clickedCube, false);
        }
    }
    function clickedCube(evt) {
        if (typeof tttgBoard[evt.target.id] === "number") {
            eachTurn(evt.target.id, gamePlay.huPlayer.marker);
            // eachTurn(dummySpot(), gamePlay.aiPlayer.marker);
            if (!checkingTie() && !checkingWin(tttgBoard, gamePlay.huPlayer.marker)) eachTurn(dummySpot(), gamePlay.aiPlayer.marker);
            // if(!checkingTie()) eachTurn(dummySpot(), gamePlay.aiPlayer.marker);
            // if(!checkingTie() && !checkingWin(tttgBoard,"O")) eachTurn(dummySpot(), gamePlay.aiPlayer.marker);
            // eachTurn(evt.target.id, "O");
            // eachTurn(dummySpot(), "X");
        }
    }
    function eachTurn(cubeID, playerMarker) {
        tttgBoard[cubeID] = playerMarker;
        console.log(cubeID);
        let cubeDiv = document.getElementById(cubeID);
        cubeDiv.innerHTML = playerMarker;
        let didWin = checkingWin(tttgBoard, playerMarker);
        console.log(didWin);
        // if(didWin) matchOver(didWin)
        if (didWin) {
            // didWin.marking === gamePlay.huPlayer.marker 
            // ? gamePlay.huPlayer.victory()
            // : gamePlay.aiPlayer.victory();
            matchOver(didWin);
            // gamePlay.playAgain(didWin);
            // gamePlay.matchOutCome(didWin);
            // tttgBoard = [];
        }
    }
    function checkingWin(board, playerMarker) {
        let playerMoves = board.reduce((arr, el, idx) => el === playerMarker ? arr.concat(idx) : arr, []);
        let matchWon = null;
        for (let [idx, moves] of winningMoves.entries()) {
            if (moves.every(el => playerMoves.includes(el))) {
                matchWon = { index: idx, marking: playerMarker };
                playerMoves = [];
                break;
            }
        }
        return matchWon;
    }
    function checkingTie() {
        if (emptySquares().length === 0) {
            for (let i = 0; i < cubes.length; i++) {
                cubes[i].style.backgroundColor = "green";
            }
            declaringMatch("Match Tied!!");
            // return true;
        }
        // declaringMatch("Match Tied!!");
        // return false;
    }
    function matchOver(whoOwn) {
        for (let idx of winningMoves[whoOwn.index]) {
            document.getElementById(idx).style.backgroundColor =
                whoOwn.marking === gamePlay.huPlayer.marker ? "aqua" : "red";
            // whoOwn.marking === gamePlay.huPlayer.marker 
            // ? gamePlay.huPlayer.victory()
            // : gamePlay.aiPlayer.victory();
        }
        for (let i = 0; i < cubes.length; i++) {
            // cubes[i].removeEventListener("click", clickedCube);
            cubes[i].removeEventListener("click", clickedCube, false);
            // cubes[i].removeEventListener("click", eachTurn, false);
        }
        // whoOwn.marking === gamePlay.huPlayer.marker 
        //     ? gamePlay.huPlayer.victory()
        //     : gamePlay.aiPlayer.victory();
        let decideMatch = whoOwn.marking === gamePlay.huPlayer.marker ? "You Win!!" : "You Lose!!";
        declaringMatch(decideMatch);
        // gamePlay.matchOutCome(whoOwn);
        setTimeout(() => {
            gamePlay.matchOutCome(whoOwn);
            tttgBoard = [];
            // startGame();
        },2200)
    }
    function dummySpot() {
        return emptySlots()[0];
    }
    function declaringMatch(text) {
        let announceWinner = document.querySelector(".announceWinner");
        announceWinner.innerHTML = `<strong>${text}</strong>`;
    }
    // startGame();
    return {
        emptySlots,
        emptySquares,
        clickedCube,
        startGame,
        // checkingWin,
        cleanSlate
    }
})();
let player = (player, marking) => {
    let name = player;
    let marker = marking || settingMarker(name);
    let score = 0;
    let victory = () => score++;
    let getScore = () => score;
    let resetScore = () => score = 0;
    function settingMarker(name) {
        return name === "humanPlayer" ? "O" : "X";
    }
    console.log(name, marker);
    return {
        name, marker,
        victory, getScore, resetScore
    }
}
let gamePlay = (() => {
    let huPlayer, aiPlayer;
    let playButton = document.querySelector(".start-game");
    let p1Score = document.querySelector(".playerOne");
    let p2Score = document.querySelector(".playerTwo");
    let announceWinner = document.querySelector(".announceWinner");
    function startPlaying() {
        huPlayer = player("humanPlayer", "");
        aiPlayer = player("aiPlayer", "");
        playButton.style.display = "none";
        announceWinner.textContent = "Game Begins!! Have Fun!!";
        // currentPlayer();
        gameBoard.startGame();
        // gameBoard.clickedCube();
        console.log(huPlayer.marker, aiPlayer.marker)
    }
    let currentPlayer = () => {
        let check = gameBoard.emptySquares.length % 2 === 0;
        console.log(check);
        // gameBoard.startGame();
        return check ? aiPlayer : huPlayer;
    }
    function playAgain() {
        huPlayer.resetScore();
        aiPlayer.resetScore();
        p1Score.textContent = "00";
        p2Score.textContent = "00";
        // playButton.style.display = "block";
        // gameBoard.cleanSlate();
        // gameBoard.startGame();
        startPlaying();
        
        // console.log(gameBoard.checkingWin());
        // console.log(whoOwn);
        // whoOwn.marking === huPlayer.marker 
        // ? p1Score = huPlayer.getScore() 
        // : p2Score = aiPlayer.getScore();
    }
    function readyMatch() {
        playButton.style.display = "block";
        playButton.addEventListener("click", startPlaying);
    }
    function matchOutCome(whoOwn) {
        whoOwn.marking === huPlayer.marker
            ? huPlayer.victory()
            : aiPlayer.victory();

        console.log(huPlayer.getScore(), aiPlayer.getScore());
        // let pa = prompt("Play Again?", "y/n");
        // if(pa === "y")playAgain();

        whoOwn.marking === huPlayer.marker
            ? p1Score.textContent = huPlayer.getScore()
            : p2Score.textContent = aiPlayer.getScore();

        setTimeout(() => {
            let pa = prompt("Play Again?", "y/n");
            if (pa === "y") playAgain();
            if(pa === "n") readyMatch();
            gameBoard.cleanSlate();
            // gameBoard.startGame():
        },200);
    }
    startPlaying();
    return {
        huPlayer, aiPlayer,
        currentPlayer,
        startPlaying,
        playAgain,
        matchOutCome
    }
})();