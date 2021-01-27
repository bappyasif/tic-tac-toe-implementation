let gameBoard = (() => {
    let cubes = document.querySelectorAll(".grid-item");
    let tttgBoard = [];
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
        // console.log(JSON.stringify(tttgBoard.filter(el => typeof el === "number")))
        return tttgBoard.filter(el => typeof el === "number");
    }
    function emptySquares() {
        return Array.from(cubes).filter(el => !el.textContent);
    }
    function cleanSlate() {
        Array.from(cubes).forEach(cubes => {
            cubes.textContent = "";
            cubes.style.backgroundColor = "";
        });
    }
    function startGame() {
        tttgBoard = Array.from(Array(9).keys()); // so that our players input can be acknowledged and displayed
        for (let i = 0; i < cubes.length; i++) {
            cubes[i].style.backgroundColor = "";
            cubes[i].addEventListener("click", clickedCube, false);
        }
    }
    function clickedCube(evt) {
        if (typeof tttgBoard[evt.target.id] === "number") {
            eachTurn(evt.target.id, gamePlay.huPlayer.marker);
            // if (!checkingTie() && !checkingWin(tttgBoard, gamePlay.huPlayer.marker)) eachTurn(dummySpot(), gamePlay.aiPlayer.marker);
            if (!checkingTie() && !checkingWin(tttgBoard, gamePlay.huPlayer.marker)) eachTurn(bestMove(), gamePlay.aiPlayer.marker);
        }
    }
    function eachTurn(cubeID, playerMarker) {
        tttgBoard[cubeID] = playerMarker;
        console.log(cubeID);
        let cubeDiv = document.getElementById(cubeID);
        cubeDiv.innerHTML = playerMarker;
        let didWin = checkingWin(tttgBoard, playerMarker);
        // console.log(didWin);
        if (didWin) matchOver(didWin)
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
            gamePlay.matchTied();
            return true;
        }
        // declaringMatch("Match Tied!!");
        return false;
    }
    function matchOver(whoOwn) {
        for (let idx of winningMoves[whoOwn.index]) {
            document.getElementById(idx).style.backgroundColor =
                whoOwn.marking === gamePlay.huPlayer.marker ? "aqua" : "red";
        }
        for (let i = 0; i < cubes.length; i++) {
            cubes[i].removeEventListener("click", clickedCube, false);
        }
        let decideMatch = whoOwn.marking === gamePlay.huPlayer.marker ? "You Win!!" : "You Lose!!";
        declaringMatch(decideMatch);
        setTimeout(() => {
            gamePlay.matchOutCome(whoOwn);
        }, 2200)
    }
    function dummySpot() {
        return emptySlots()[0];
    }
    function bestMove() {
        return minimaxImplementation(tttgBoard, gamePlay.aiPlayer.marker).index;
        // return minimaxImplementation(tttgBoard, "X").index;
    }
    function declaringMatch(text) {
        let announceWinner = document.querySelector(".announceWinner");
        announceWinner.innerHTML = `<strong>${text}</strong>`;
    }
    function minimaxImplementation(newBoard, player) {
        // get all free available slots for AI to choose from
        let freeMoves = emptySlots();
        // return score of each probable move with maximizer, minimizer and tied scenario score of 10, -10, and 0 respectively
        if (checkingWin(newBoard, gamePlay.aiPlayer.marker)) {
            return { score: 10 };
        } else if (checkingWin(newBoard, gamePlay.huPlayer.marker)) {
            return { score: -10 };
        } else if (freeMoves.length === 0) {
            return { score: 0 };
        }
        // get all moves from available freeMoves solts on board
        let moves = [];
        for (let i = 0; i < freeMoves.length; i++) {
            // capture each indexed move
            let move = {};
            // get temporary move index
            move.index = newBoard[freeMoves[i]];
            // make a probable move
            newBoard[freeMoves[i]] = player;
            if (player === gamePlay.aiPlayer.marker) {
                // calculate score using minimax
                let result = minimaxImplementation(newBoard, gamePlay.huPlayer.marker);
                // store calculated score from that probable move into "move"'s score
                move.score = result.score;
            } else {
                // calculate score using minimax
                let result = minimaxImplementation(newBoard, gamePlay.aiPlayer.marker);
                // store calculated score from that probable move into "move"'s score
                move.score = result.score;
            }
            // undo that probable move
            newBoard[freeMoves[i]] = move.index;
            // pushes into moves array
            moves.push(move);
        }
        // find best possible move
        let bestMove;
        if(player === gamePlay.aiPlayer.marker) {
            // from AI maximizer's perspective
            let bestScore = -Infinity;
            // loop through each moves array to find best move from Maximizers perspective
            for(let i=0;i<moves.length;i++) {
                if(moves[i].score > bestScore) {
                    bestScore = moves[i].score; // update bestScore
                    bestMove = i; // update bestMove with that best Index
                }
            }
        } else {
            // from human Minimizer's perspective
            let bestScore = Infinity;
            // loop through each moves array to choose least favorable move so that it can maximizes AI's win probability
            for(let i=0;i<moves.length;i++) {
                if(moves[i].score < bestScore) {
                    bestScore = moves[i].score; // update bestScore
                    bestMove = i; // update least favvorable but most favorable for AI's win probable Index as bestMove
                }
            }
        }
        // once we have bestMove, we return to caller
        return moves[bestMove];
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
    let p1Marker = document.querySelector("#p1-marking");
    let p2Marker = document.querySelector("#p2-marking");
    let announceWinner = document.querySelector(".announceWinner");
    function startPlaying() {
        huPlayer = player("humanPlayer", "");
        aiPlayer = player("aiPlayer", "");
        playButton.style.display = "none";
        announceWinner.textContent = "Game Begins!! Have Fun!!";
        // currentPlayer();
        gameBoard.startGame();
        // gameBoard.clickedCube();
        console.log(huPlayer.marker, aiPlayer.marker);
        // currentPlayer();
        displayMarkers();
    }
    function displayMarkers() {
        p1Marker.textContent = huPlayer.marker;
        p2Marker.textContent = aiPlayer.marker;
    }
    function playAgain() {
        huPlayer.resetScore();
        aiPlayer.resetScore();
        p1Score.textContent = "00";
        p2Score.textContent = "00";
        startPlaying();
    }
    function readyMatch() {
        playButton.style.display = "block";
        playButton.addEventListener("click", startPlaying);
    }
    function matchTied() {
        setTimeout(() => makeReady(), 2200);
    }
    function makeReady() {
        let pa = prompt("Play Again?", "y/n");
        if (pa === "y") playAgain();
        if (pa === "n") readyMatch();
        gameBoard.cleanSlate();
    }
    function matchOutCome(whoOwn) {
        whoOwn.marking === huPlayer.marker
            ? huPlayer.victory()
            : aiPlayer.victory();
        // console.log(huPlayer.getScore(), aiPlayer.getScore());
        whoOwn.marking === huPlayer.marker
            ? p1Score.textContent = huPlayer.getScore()
            : p2Score.textContent = aiPlayer.getScore();
        setTimeout(() => {
            makeReady();
            // gameBoard.startGame():
        }, 200);
    }
    startPlaying();
    return {
        huPlayer, aiPlayer,
        // currentPlayer,
        startPlaying,
        playAgain,
        matchOutCome,
        matchTied
    }
})();

/**
 * Human vs Unbeatable AI:
 let gameBoard = (() => {
    let cubes = document.querySelectorAll(".grid-item");
    let tttgBoard = [];
    // console.log(tttgBoard);
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
        });
    }
    function startGame() {
        tttgBoard = Array.from(Array(9).keys()); // so that our players input can be acknowledged and displayed
        for (let i = 0; i < cubes.length; i++) {
            cubes[i].style.backgroundColor = "";
            cubes[i].addEventListener("click", clickedCube, false);
        }
    }
    function clickedCube(evt) {
        if (typeof tttgBoard[evt.target.id] === "number") {
            eachTurn(evt.target.id, gamePlay.huPlayer.marker);
            // if (!checkingTie() && !checkingWin(tttgBoard, gamePlay.huPlayer.marker)) eachTurn(dummySpot(), gamePlay.aiPlayer.marker);
            if (!checkingTie() && !checkingWin(tttgBoard, gamePlay.huPlayer.marker)) eachTurn(bestMove(), gamePlay.aiPlayer.marker);
        }
    }
    function eachTurn(cubeID, playerMarker) {
        tttgBoard[cubeID] = playerMarker;
        console.log(cubeID);
        let cubeDiv = document.getElementById(cubeID);
        cubeDiv.innerHTML = playerMarker;
        let didWin = checkingWin(tttgBoard, playerMarker);
        // console.log(didWin);
        if (didWin) matchOver(didWin)
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
            gamePlay.matchTied();
            return true;
        }
        // declaringMatch("Match Tied!!");
        return false;
    }
    function matchOver(whoOwn) {
        for (let idx of winningMoves[whoOwn.index]) {
            document.getElementById(idx).style.backgroundColor =
                whoOwn.marking === gamePlay.huPlayer.marker ? "aqua" : "red";
        }
        for (let i = 0; i < cubes.length; i++) {
            cubes[i].removeEventListener("click", clickedCube, false);
        }
        let decideMatch = whoOwn.marking === gamePlay.huPlayer.marker ? "You Win!!" : "You Lose!!";
        declaringMatch(decideMatch);
        setTimeout(() => {
            gamePlay.matchOutCome(whoOwn);
        }, 2200)
    }
    function dummySpot() {
        return emptySlots()[0];
    }
    function bestMove() {
        return minimaxImplementation(tttgBoard, gamePlay.aiPlayer.marker).index;
        // return minimaxImplementation(tttgBoard, "X").index;
    }
    function declaringMatch(text) {
        let announceWinner = document.querySelector(".announceWinner");
        announceWinner.innerHTML = `<strong>${text}</strong>`;
    }
    function minimaxImplementation(newBoard, player) {
        let freeMoves = emptySlots();
        if (checkingWin(newBoard, gamePlay.huPlayer.marker)) {
            return { score: -10 };
        } else if (checkingWin(newBoard, gamePlay.aiPlayer.marker)) {
            return { score: 10 };
        } else if (freeMoves.length === 0) {
            return { score: 0 };
        }
        let moves = [];
        for (let i = 0; i < freeMoves.length; i++) {
            let move = {};
            move.index = newBoard[freeMoves[i]];
            // make that probable move
            newBoard[freeMoves[i]] = player;
            if (player === gamePlay.aiPlayer.marker) {
                let result
                    =
                    minimaxImplementation(newBoard, gamePlay.huPlayer.marker);
                move.score = result.score
            } else {
                let result
                    =
                    minimaxImplementation(newBoard, gamePlay.aiPlayer.marker);
                move.score = result.score;
            }
            // undo that probable move
            newBoard[freeMoves[i]] = move.index;
            // push onto moves array
            moves.push(move);
        }
        // finding best AI Move
        let bestMove;
        if (player === gamePlay.aiPlayer.marker) {
            // ai is maximizer here
            // let bestScore = -Infinity;
            let bestScore = -1000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    console.log(bestScore, moves[i].score);
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            // human is minimizer here
            // let bestScore = Infinity;
            let bestScore = 1000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        // out of all those probable moves array moves return best possible move which has index from all those freeMoves array
        return moves[bestMove];
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
    let p1Marker = document.querySelector("#p1-marking");
    let p2Marker = document.querySelector("#p2-marking");
    let announceWinner = document.querySelector(".announceWinner");
    function startPlaying() {
        huPlayer = player("humanPlayer", "");
        aiPlayer = player("aiPlayer", "");
        playButton.style.display = "none";
        announceWinner.textContent = "Game Begins!! Have Fun!!";
        // currentPlayer();
        gameBoard.startGame();
        // gameBoard.clickedCube();
        console.log(huPlayer.marker, aiPlayer.marker);
        currentPlayer();
        displayMarkers();
    }
    function displayMarkers() {
        p1Marker.textContent = huPlayer.marker;
        p2Marker.textContent = aiPlayer.marker;
    }
    function highlightPlayer(whosTurn) {
        let p1 = document.querySelector(".p1");
        let p2 = document.querySelector(".p2");
        if (whosTurn.marker === "O") {
            p2.classList.add(".active");
            p1.classList.remove(".active");
        } else if (whosTurn.marker === "X") {
            p1.classList.add(".active");
            p2.classList.remove(".active");
        }
    }
    let currentPlayer = () => {
        let check = gameBoard.emptySquares.length % 2 === 0;
        console.log(check);
        // gameBoard.startGame();
        check ? highlightPlayer(aiPlayer) : highlightPlayer(huPlayer);
        // return check ? aiPlayer : huPlayer;
        return check ? huPlayer : aiPlayer;
    }
    function playAgain() {
        huPlayer.resetScore();
        aiPlayer.resetScore();
        p1Score.textContent = "00";
        p2Score.textContent = "00";
        startPlaying();
    }
    function readyMatch() {
        playButton.style.display = "block";
        playButton.addEventListener("click", startPlaying);
    }
    function matchTied() {
        setTimeout(() => makeReady(), 2200);
    }
    function makeReady() {
        let pa = prompt("Play Again?", "y/n");
        if (pa === "y") playAgain();
        if (pa === "n") readyMatch();
        gameBoard.cleanSlate();
    }
    function matchOutCome(whoOwn) {
        whoOwn.marking === huPlayer.marker
            ? huPlayer.victory()
            : aiPlayer.victory();
        // console.log(huPlayer.getScore(), aiPlayer.getScore());
        whoOwn.marking === huPlayer.marker
            ? p1Score.textContent = huPlayer.getScore()
            : p2Score.textContent = aiPlayer.getScore();
        setTimeout(() => {
            makeReady();
            // gameBoard.startGame():
        }, 200);
    }
    startPlaying();
    return {
        huPlayer, aiPlayer,
        currentPlayer,
        startPlaying,
        playAgain,
        matchOutCome,
        matchTied
    }
})();

 * Human vs Dummy Computer:
 let gameBoard = (() => {
    let cubes = document.querySelectorAll(".grid-item");
    let tttgBoard = [];
    // let tttgBoard = Array.from(Array(9).keys());
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
            // tttgBoard = [];
        });
    }
    function startGame() {
        tttgBoard = Array.from(Array(9).keys()); // so that our players input can be acknowledged and displayed
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
            // tttgBoard = [];
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
    let p1Marker = document.querySelector("#p1-marking");
    let p2Marker = document.querySelector("#p2-marking");
    let announceWinner = document.querySelector(".announceWinner");
    function startPlaying() {
        huPlayer = player("humanPlayer", "");
        aiPlayer = player("aiPlayer", "");
        playButton.style.display = "none";
        announceWinner.textContent = "Game Begins!! Have Fun!!";
        // currentPlayer();
        gameBoard.startGame();
        // gameBoard.clickedCube();
        console.log(huPlayer.marker, aiPlayer.marker);
        currentPlayer();
        displayMarkers();
    }
    function displayMarkers() {
        p1Marker.textContent = huPlayer.marker;
        p2Marker.textContent = aiPlayer.marker;
    }
    function highlightPlayer(whosTurn) {
        let p1 = document.querySelector(".p1");
        let p2 = document.querySelector(".p2");
        if(whosTurn.marker === "O") {
            p2.classList.add(".active");
            p1.classList.remove(".active");
        } else if( whosTurn.marker === "X") {
            p1.classList.add(".active");
            p2.classList.remove(".active");
        }
        // if(whosTurn.marker === huPlayer.marker) {
        //     p2.classList.add(".active");
        //     p1.classList.remove(".active");
        // } else if( whosTurn.marker === aiPlayer.marker) {
        //     p1.classList.add(".active");
        //     p2.classList.remove(".active");
        // }
    }
    let currentPlayer = () => {
        let check = gameBoard.emptySquares.length % 2 === 0;
        console.log(check);
        // gameBoard.startGame();
        check ? highlightPlayer(aiPlayer) : highlightPlayer(huPlayer);
        // return check ? aiPlayer : huPlayer;
        return check ? huPlayer : aiPlayer;
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
 */