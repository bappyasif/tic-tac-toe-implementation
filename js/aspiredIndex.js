let gameBoard = (() => {
    let cubes = document.querySelectorAll(".grid-item");
    let announceWinner = document.querySelector(".announceWinner");
    let tttgBoard = Array.from(Array(cubes).keys());
    let whosTurn = [];
    let winingMoves = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let emptyCubes = () => {
        return Array.from(cubes).filter(cube => !cube.textContent);
    }
    let emptyBoard = () => {
        for (let i = 0; i < cubes.length; i++) {
            cubes[i].textContent = "";
            cubes[i].innerHTML = "";
            document.getElementById(i).style.backgroundColor = "";
            cubes[i].removeEventListener("click", cubeClicked, false);
            // cubes[i].addEventListener("click", eachTurn, false);
        }
    }
    let cubeClicked = () => {
        for (let i = 0; i < cubes.length; i++) {
            cubes[i].addEventListener("click", eachTurn, false);
        }
    }
    let eachTurn = (evt) => {
        let cubeID = evt.target.id;
        // if (!evt.target.textContent) {
        //     // placeMarking(cubeID);
        //     // playersTurn(cubeID, humanPlayer);
        //     playersTurn(cubeID, "O");
        //     // playersTurn(cubeID, playGame.currentPlayer().marking);
        //     // if(!checkTie()) playersTurn(bestSpot(), aiPlayer);
        //     // if(!checkTie()) playersTurn(bestSpot(), "X");
        //     // if(!checkTie()) playersTurn(bestSpot(), "X");
        //     // playersTurn(bestSpot(), playGame.currentPlayer().marking)
        //     if(tttgBoard.length !== 9)playersTurn(bestSpot(), "X");
        // }
        console.log(tttgBoard, typeof tttgBoard[0]);
        if(typeof tttgBoard[evt.target.id] === "number") {
            playersTurn(cubeID, "O");
            if(tttgBoard.length !== 9)playersTurn(bestSpot(), "X");
        }
        else alert("cube's taken, choose another!!");
    }
    function bestSpot() {
        return tttgBoard.filter(el=> typeof el === "number")[0]
    }
    function playersTurn(id, marking) {
        placeMarking(id, marking)
    }
    function placeMarking(id, marking) {
        let currentPlayer = playGame.currentPlayer();
        whosTurn.push(currentPlayer);
        let cubeDiv = document.getElementById(id);
        cubeDiv.innerHTML = currentPlayer.marking;
        tttgBoard[id] = marking
        let didWin = checkWin(tttgBoard, marking);
        let check = emptyCubes().length === 0;
        if (didWin) declareWinner(didWin);
        if (didWin && check) declareWinner(didWin);
        // else if (check && !didWin) checkTie();
        else if (check && !didWin) declareTie();
    }
    // function placeMarking(id) {
    //     let currentPlayer = playGame.currentPlayer();
    //     whosTurn.push(currentPlayer);
    //     let cubeDiv = document.getElementById(id);
    //     cubeDiv.innerHTML = currentPlayer.marking;
    //     tttgBoard[id] = currentPlayer.marking;
    //     let didWin = checkWin(tttgBoard, currentPlayer.marking);
    //     let check = emptyCubes().length === 0;
    //     if (didWin) declareWinner(didWin);
    //     if (didWin && check) declareWinner(didWin);
    //     else if (check && !didWin) checkTie();
    // }
    function checkWin(board, playerMarking) {
        let moves = board.reduce((arr, el, idx) => el === playerMarking ? arr.concat(idx) : arr, []);
        let didWin = null;
        for (let [idx, win] of winingMoves.entries()) {
            if (win.every(cell => moves.includes(cell))) {
                didWin = { index: idx, marking: playerMarking };
                moves = [];
                playGame.gameOutcomes(whosTurn[whosTurn.length - 1]);
                break;
            }
        }
        whosTurn = [];
        return didWin;
    }
    function checkTie() {
        if (emptyCubes.length === 0) {
            for (let i = 0; i < cubes.length; i++) {
                cubes[i].style.backgroundColor = "green";
            }
        }
        // matchGreetings("Game Tied!!");
        // setTimeout(() => {
        //     emptyBoard();
        //     tttgBoard = [];
        //     announceWinner.innerHTML = "";
        //     playGame.roundComplete();
        // }, 2200);
    }
    function declareTie() {
        matchGreetings("Game Tied!!");
        setTimeout(() => {
            emptyBoard();
            tttgBoard = [];
            announceWinner.innerHTML = "";
            playGame.roundComplete();
        }, 2200);
    }
    function declareWinner(winObj) {
        for (let idx of winingMoves[winObj.index]) {
            document.getElementById(idx).style.backgroundColor =
                winObj.marking === "O" ? "aqua" : "red";
        }
        for (let i = 0; i < cubes.length; i++) {
            // cubes[i].removeEventListener("click", cubeClicked, false);
            cubes[i].removeEventListener("click", eachTurn, false);
        }
        let msg = winObj.marking === "O" ? "You Win!!" : "You Lose!!";
        matchGreetings(msg);
        setTimeout(() => {
            emptyBoard();
            tttgBoard = [];
            announceWinner.innerHTML = "";
            playGame.roundComplete();
        }, 2200);
    }
    function matchGreetings(text) {
        // let announceWinner = document.querySelector(".announceWinner");
        announceWinner.innerHTML = `<strong>${text}</strong>`;
    }
    return {
        emptyCubes,
        emptyBoard,
        cubeClicked,
        // checkTurn,
        eachTurn,
        placeMarking,
    }
})();

let player = (playerName, playerMark, playerNumber) => {
    let name = playerName;
    let marking = checkMarking() || playerMark;
    let number = playerNumber;
    let score = 0;
    function placeMarking(marking) {
        // gameBoard.cubeClicked(marking);
        gameBoard.cubeClicked(marking);
    }
    function checkMarking() {
        // return number === "humanPlayer" ? "X" : "O";
        return name === "humanPlayer" ? "O" : "X";
        // return name === "humanPlayer" ? "OO" : "XX";
    }
    let resetScore = () => score = 0;
    let roundVictory = () => score++;
    let getScore = () => score;
    return {
        name, marking, number,
        roundVictory, getScore, checkMarking, placeMarking, resetScore
    };
}

let playGame = (() => {
    let player01, player02, playerAi, rounds;
    let p1Marking = document.getElementById("p1-marking");
    let p1Score = document.querySelector(".playerOne");
    let p2Marking = document.getElementById("p2-marking");
    let p2Score = document.querySelector(".playerTwo");
    let clickStart = document.querySelector(".start-game");
    let announceWinner = document.querySelector(".announceWinner");
    let gameStart = () => {
        clickStart.style.display = "none";
        announceWinner.innerHTML =
            `<strong>Game Begins!! Have Fun!!</strong>`;
        player01 = player("humanPlayer", "O", "PlayerOne");
        playerAi = player("PlayerAI", "X", "PlayerComputer");
        player01.resetScore();
        playerAi.resetScore();
        // gameBoard.cubeClicked(currentPlayer().marking);
        // gameBoard.cubeClicked(currentPlayer());
        gameBoard.cubeClicked();
        // let currPLayer = currentPlayer();        
        document.querySelector(".p2").classList.add("active");
        document.querySelector(".p1").classList.remove("active");
        showMarkers();
    }
    let currentPlayer = () => {
        let check = gameBoard.emptyCubes().length % 2 === 0;
        console.log(check, gameBoard.emptyCubes().length);
        check ? highlightPlayer(player01) : highlightPlayer(playerAi);
        // check ? gameBoard.cubeClicked(player01) : gameBoard.cubeClicked(playerAi)
        // check ? player01.placeMarking(player01.marking) : playerAi.placeMarking(playerAi.marking)
        return check ? player01 : playerAi;
    }
    function highlightPlayer(whos) {
        let p1 = document.querySelector(".p1");
        let p2 = document.querySelector(".p2");
        if (whos.marking === "O") {
            p1.classList.remove("active");
            p2.classList.add("active");
        } else if (whos.marking === "X") {
            p2.classList.remove("active");
            p1.classList.add("active");
        }
    }
    function showMarkers() {
        console.log(player01, player02, playerAi);
        p1Marking.textContent = player01.marking;
        // p2Marking.textContent = player02.marking;
        p2Marking.textContent = playerAi.marking;
    }
    function gameOutcomes(whoOwn) {
        whoOwn.roundVictory();
        whoOwn.marking === "O"
            ? p1Score.textContent = whoOwn.getScore()
            : p2Score.textContent = whoOwn.getScore()
    }
    function roundComplete() {
        let p1 = document.querySelector(".p1");
        let p2 = document.querySelector(".p2");
        p1.classList.remove("active");
        p2.classList.remove("active");
        // gameStart();
        playAgain();
        // if(rounds === 0) playAgain();
        // else raceToMultipleGames();
    }
    function playAgain() {
        let round = prompt("Another round?");
        if (round === "y") gameStart();
        else {
            clickStart.style.display = "block";
            gameBoard.emptyBoard();
            clickStart.addEventListener("click", gameStart);
            announceWinner.innerHTML =
                `<strong>Click Start!! To Play!!</strong>`;
        }
        p1Score.textContent = "00";
        p2Score.textContent = "00";
    }
    // function raceToMultipleGames() {
    //     rounds = +prompt("how many rounds you want play?");
    //     if (rounds > 0) {
    //         gameStart();
    //     }
    // }
    gameStart();
    // raceToMultipleGames();
    return {
        gameStart,
        currentPlayer,
        gameOutcomes,
        highlightPlayer,
        roundComplete
    }
})();


/**
 let gameBoard = (() => {
    let cubes = document.querySelectorAll(".grid-item");
    // let humanPlayer = "o";
    // let playerAi = "x";
    // let humanPlayer = playGame.currentPlayer();
    // let playerAi = "x";
    let emptyCubes = () => {
        return Array.from(cubes).filter(cube => !cube.textContent);
    }
    let emptyBoard = () => {
        for(let i = 0; i < cubes.length; i++) {
            cubes[i].textContent = "";
            cubes[i].removeEventListener("click", cubeClicked, true);
        }
    }
    let cubeClicked = () => {
        for(let i = 0; i < cubes.length; i++) {
            cubes[i].addEventListener("click", eachTurn, false);
            // if(!cubes[i].textContent) cubes[i].addEventListener("click", eachTurn, false);
        }
    }
    // let checkTurn = () => emptyCubes.length % 2 === 0;
    let eachTurn = (evt) => {
        let cubeID = evt.target.id;
        let checkTurn = emptyCubes.length % 2 === 0

        // if(checkTurn) playingTurns(cubeID, humanPlayer)
        // else playingTurns(cubeID, playerAi)
        if(checkTurn) placeMarking(cubeID)
    }
    // let currentPlayer = playGame.currentPlayer();
    function placeMarking(id) {
        let currentPlayer = playGame.currentPlayer();
        let cubeDiv = document.getElementById(id);
        cubeDiv.innerHTML = currentPlayer.marking;
    }
    let playingTurns = (cubeID, whichPlayer) => {
        let cubeDiv = document.getElementById(cubeID);
        cubeDiv.innerHTML = whichPlayer;
    }
    return {
        emptyCubes,
        emptyBoard,
        cubeClicked,
        // checkTurn,
        placeMarking
    }
})();

let player = (playerName, playerMark, playerNumber) => {
    let name = playerName;
    let marking = checkMarking() || playerMark;
    let number = playerNumber;
    let score = 0;
    function checkName(name) {
        // return number === "PlayerOne" ? "PlayerOne" : "PlayerAi";
        return number === "humanPlayer" ? "humanPlayer" : "PlayerAi";
    }
    function placeMarking(marking) {
        // gameBoard.cubeClicked(marking);
        gameBoard.cubeClicked(marking);
    }
    function checkMarking() {
        // return number === "humanPlayer" ? "X" : "O";
        return name === "humanPlayer" ? "X" : "O";
    }
    let roundVictory = () => score++;
    let getScore = () => score;
    console.log(marking, name);
    return {
        name, marking, number,
        roundVictory, getScore, checkMarking, placeMarking};
}

let playGame = (() => {
    let player01, player02, playerAi;
    // let p1 = prompt("select marking human player", "O");
    // let p2 = prompt("select marking player 02", "OO");
    // let ai = "X";
    let gameStart = () => {
        player01 = player("humanPlayer", "", "PlayerOne");
        playerAi = player("PlayerAI", "", "PlayerComputer");
        gameBoard.cubeClicked(currentPlayer().marking);
    }
    let currentPlayer = () => {
        // let check = gameBoard.checkTurn();
        let check = gameBoard.emptyCubes().length % 2 === 0;
        return check ? player01 : playerAi;
    }
    gameStart();
    // gameBoard.cubeClicked(currentPlayer().marking);
    // console.log(currentPlayer());
    // console.log(player01, playerAi, currentPlayer());
    return {
        gameStart,
        currentPlayer
    }
})();


// Two Players
let gameBoard = (() => {
    let cubes = document.querySelectorAll(".grid-item");
    let announceWinner = document.querySelector(".announceWinner");
    let tttgBoard = Array.from(Array(cubes).keys());
    let whosTurn = [];
    let winingMoves = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let emptyCubes = () => {
        return Array.from(cubes).filter(cube => !cube.textContent);
    }
    let emptyBoard = () => {
        // announceWinner.innerHTML = "Game Continues..";
        for (let i = 0; i < cubes.length; i++) {
            cubes[i].textContent = "";
            cubes[i].innerHTML = "";
            // cubes[i].style.backgroundColor = "";
            document.getElementById(i).style.backgroundColor = "";
            cubes[i].removeEventListener("click", cubeClicked, false);
            // cubes[i].addEventListener("click", eachTurn, false);
        }
    }
    let cubeClicked = () => {
        // announceWinner.innerHTML = "Game Continues..";
        for (let i = 0; i < cubes.length; i++) {
            cubes[i].addEventListener("click", eachTurn, false);
            // let player = playGame.currentPlayer();
            // playGame.highlightPlayer(player);
        }
    }
    // let checkTurn = () => emptyCubes.length % 2 === 0;
    let eachTurn = (evt) => {
        let player = playGame.currentPlayer();
        playGame.highlightPlayer(player);

        let cubeID = evt.target.id;
        if (!evt.target.textContent) placeMarking(cubeID);
        else alert("cube's taken, choose another!!");
    }
    // let currentPlayer = playGame.currentPlayer();
    function placeMarking(id) {
        // let whosTurn = [];
        let currentPlayer = playGame.currentPlayer();
        whosTurn.push(currentPlayer);
        let cubeDiv = document.getElementById(id);
        cubeDiv.innerHTML = currentPlayer.marking;
        tttgBoard[id] = currentPlayer.marking;
        let didWin = checkWin(tttgBoard, currentPlayer.marking);
        // if(didWin) decalreWin(didWin, currentPlayer);
        let check = emptyCubes().length === 0;
        if (didWin) declareWinner(didWin);
        if (didWin && check) declareWinner(didWin);
        else if (check && !didWin) checkTie();
    }
    function checkWin(board, playerMarking) {
        let moves = board.reduce((arr, el, idx) => el === playerMarking ? arr.concat(idx) : arr, []);
        // console.log(moves);
        let didWin = null;
        for (let [idx, win] of winingMoves.entries()) {
            if (win.every(cell => moves.includes(cell))) {
                didWin = { index: idx, marking: playerMarking };
                moves = [];
                playGame.gameOutcomes(whosTurn[whosTurn.length - 1]);
                break;
            }
        }
        whosTurn = [];
        return didWin;
    }
    function checkTie() {
        if (emptyCubes.length === 0) {
            for (let i = 0; i < cubes.length; i++) {
                cubes[i].style.backgroundColor = "green";
            }
        }
        matchGreetings("Game Tied!!");
        setTimeout(() => {
            emptyBoard();
            tttgBoard = [];
            announceWinner.innerHTML = "";
        }, 2200);
        return;
    }
    function declareWinner(winObj) {
        for (let idx of winingMoves[winObj.index]) {
            document.getElementById(idx).style.backgroundColor =
                winObj.marking === "O" ? "aqua" : "red";
        }
        for (let i = 0; i < cubes.length; i++) {
            cubes[i].removeEventListener("click", cubeClicked, false);
        }
        let msg = winObj.marking === "O" ? "You Win!!" : "You Lose!!";
        matchGreetings(msg);
        setTimeout(() => {
            emptyBoard();
            tttgBoard = [];
            announceWinner.innerHTML = "";
        }, 2200);
    }
    function matchGreetings(text) {
        // let announceWinner = document.querySelector(".announceWinner");
        announceWinner.innerHTML = `<strong>${text}</strong>`;
    }
    return {
        emptyCubes,
        emptyBoard,
        cubeClicked,
        // checkTurn,
        eachTurn,
        placeMarking,
    }
})();

let player = (playerName, playerMark, playerNumber) => {
    let name = playerName;
    let marking = checkMarking() || playerMark;
    let number = playerNumber;
    let score = 0;
    function placeMarking(marking) {
        // gameBoard.cubeClicked(marking);
        gameBoard.cubeClicked(marking);
        // gameBoard.eachTurn;
    }
    function checkMarking() {
        // return number === "humanPlayer" ? "X" : "O";
        return name === "humanPlayer" ? "O" : "X";
    }
    let roundVictory = () => score++;
    let getScore = () => score;
    // console.log(marking, name);
    return {
        name, marking, number,
        roundVictory, getScore, checkMarking, placeMarking
    };
}

let playGame = (() => {
    let player01, player02, playerAi, rounds;
    let p1Marking = document.getElementById("p1-marking");
    let p1Score = document.querySelector(".playerOne");
    let p2Marking = document.getElementById("p2-marking");
    let p2Score = document.querySelector(".playerTwo");
    let gameStart = () => {
        player01 = player("humanPlayer", "", "PlayerOne");
        playerAi = player("PlayerAI", "", "PlayerComputer");
        gameBoard.cubeClicked(currentPlayer().marking);
        // highlightPlayer(currentPlayer());
        document.querySelector(".p1").classList.add("active");
    }
    let currentPlayer = () => {
        let check = gameBoard.emptyCubes().length % 2 === 0;
        return check ? player01 : playerAi;
    }
    function highlightPlayer(whos) {
        let p1 = document.querySelector(".p1");
        let p2 = document.querySelector(".p2");
        // let whos = currentPlayer();
        // p1.classList.add("active");
        if (whos.marking === "O") {
            // p1.classList.remove("active");
            // p2.classList.add("active");
            p2.classList.remove("active");
            p1.classList.add("active");
        } else if (whos.marking === "X") {
            // p2.classList.remove("active");
            // p1.classList.add("active");
            p1.classList.remove("active");
            p2.classList.add("active");
        }
    }
    gameStart();
    function gameOutcomes(whoOwn) {
        whoOwn.roundVictory();
        // p1Score.textContent = whoOwn.getScore();
        // console.log(whoOwn.getScore());
        whoOwn.marking === "O"
            ? p1Score.textContent = whoOwn.getScore()
            : p2Score.textContent = whoOwn.getScore()
    }
    return {
        gameStart,
        currentPlayer,
        gameOutcomes,
        highlightPlayer
    }
})();


// Two players with play again feature
let gameBoard = (() => {
    let cubes = document.querySelectorAll(".grid-item");
    let announceWinner = document.querySelector(".announceWinner");
    let tttgBoard = Array.from(Array(cubes).keys());
    let whosTurn = [];
    let winingMoves = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let emptyCubes = () => {
        return Array.from(cubes).filter(cube => !cube.textContent);
    }
    let emptyBoard = () => {
        for (let i = 0; i < cubes.length; i++) {
            cubes[i].textContent = "";
            cubes[i].innerHTML = "";
            document.getElementById(i).style.backgroundColor = "";
            cubes[i].removeEventListener("click", cubeClicked, false);
            // cubes[i].addEventListener("click", eachTurn, false);
        }
    }
    let cubeClicked = () => {
        for (let i = 0; i < cubes.length; i++) {
            cubes[i].addEventListener("click", eachTurn, false);
        }
    }
    let eachTurn = (evt) => {
        let cubeID = evt.target.id;
        if (!evt.target.textContent) placeMarking(cubeID);
        else alert("cube's taken, choose another!!");
    }
    function placeMarking(id) {
        let currentPlayer = playGame.currentPlayer();
        whosTurn.push(currentPlayer);

        // playGame.highlightPlayer(whosTurn[whosTurn.length - 1]);

        let cubeDiv = document.getElementById(id);
        cubeDiv.innerHTML = currentPlayer.marking;
        tttgBoard[id] = currentPlayer.marking;
        let didWin = checkWin(tttgBoard, currentPlayer.marking);
        let check = emptyCubes().length === 0;
        if (didWin) declareWinner(didWin);
        if (didWin && check) declareWinner(didWin);
        else if (check && !didWin) checkTie();
    }
    function checkWin(board, playerMarking) {
        let moves = board.reduce((arr, el, idx) => el === playerMarking ? arr.concat(idx) : arr, []);
        let didWin = null;
        for (let [idx, win] of winingMoves.entries()) {
            if (win.every(cell => moves.includes(cell))) {
                didWin = { index: idx, marking: playerMarking };
                moves = [];
                playGame.gameOutcomes(whosTurn[whosTurn.length - 1]);
                break;
            }
        }
        whosTurn = [];
        return didWin;
    }
    function checkTie() {
        if (emptyCubes.length === 0) {
            for (let i = 0; i < cubes.length; i++) {
                cubes[i].style.backgroundColor = "green";
            }
        }
        matchGreetings("Game Tied!!");
        setTimeout(() => {
            emptyBoard();
            tttgBoard = [];
            announceWinner.innerHTML = "";
        }, 2200);
        return;
    }
    function declareWinner(winObj) {
        for (let idx of winingMoves[winObj.index]) {
            document.getElementById(idx).style.backgroundColor =
                winObj.marking === "O" ? "aqua" : "red";
        }
        for (let i = 0; i < cubes.length; i++) {
            // cubes[i].removeEventListener("click", cubeClicked, false);
            cubes[i].removeEventListener("click", eachTurn, false);
        }
        let msg = winObj.marking === "O" ? "You Win!!" : "You Lose!!";
        matchGreetings(msg);
        setTimeout(() => {
            emptyBoard();
            tttgBoard = [];
            announceWinner.innerHTML = "";
            playGame.roundComplete();
        }, 2200);
    }
    function matchGreetings(text) {
        // let announceWinner = document.querySelector(".announceWinner");
        announceWinner.innerHTML = `<strong>${text}</strong>`;
    }
    return {
        emptyCubes,
        emptyBoard,
        cubeClicked,
        // checkTurn,
        eachTurn,
        placeMarking,
    }
})();

let player = (playerName, playerMark, playerNumber) => {
    let name = playerName;
    let marking = checkMarking() || playerMark;
    let number = playerNumber;
    let score = 0;
    function placeMarking(marking) {
        // gameBoard.cubeClicked(marking);
        gameBoard.cubeClicked(marking);
    }
    function checkMarking() {
        // return number === "humanPlayer" ? "X" : "O";
        return name === "humanPlayer" ? "O" : "X";
    }
    let resetScore = () => score = 0;
    let roundVictory = () => score++;
    let getScore = () => score;
    return {
        name, marking, number,
        roundVictory, getScore, checkMarking, placeMarking, resetScore
    };
}

let playGame = (() => {
    let player01, player02, playerAi, rounds;
    let p1Marking = document.getElementById("p1-marking");
    let p1Score = document.querySelector(".playerOne");
    let p2Marking = document.getElementById("p2-marking");
    let p2Score = document.querySelector(".playerTwo");
    let clickStart = document.querySelector(".start-game");
    let announceWinner = document.querySelector(".announceWinner");
    let gameStart = () => {
        clickStart.style.display = "none";
        announceWinner.innerHTML =
            `<strong>Game Begins!! Have Fun!!</strong>`;
        player01 = player("humanPlayer", "", "PlayerOne");
        playerAi = player("PlayerAI", "", "PlayerComputer");
        player01.resetScore();
        playerAi.resetScore();
        // highlightPlayer(currentPlayer());
        // highlightPlayer(gameBoard);
        gameBoard.cubeClicked(currentPlayer().marking);
        document.querySelector(".p2").classList.add("active");
        document.querySelector(".p1").classList.remove("active");

        showMarkers();
    }
    let currentPlayer = () => {
        let check = gameBoard.emptyCubes().length % 2 === 0;
        console.log(check, gameBoard.emptyCubes().length);
        check ? highlightPlayer(player01) : highlightPlayer(playerAi);
        return check ? player01 : playerAi;
    }
    function highlightPlayer(whos) {
        let p1 = document.querySelector(".p1");
        let p2 = document.querySelector(".p2");
        if (whos.marking === "O") {
            p1.classList.remove("active");
            p2.classList.add("active");
        } else if (whos.marking === "X") {
            p2.classList.remove("active");
            p1.classList.add("active");
        }
    }
    function showMarkers() {
        console.log(player01, player02, playerAi);
        p1Marking.textContent = player01.marking;
        // p2Marking.textContent = player02.marking;
        p2Marking.textContent = playerAi.marking;
    }
    function gameOutcomes(whoOwn) {
        whoOwn.roundVictory();
        whoOwn.marking === "O"
            ? p1Score.textContent = whoOwn.getScore()
            : p2Score.textContent = whoOwn.getScore()
    }
    function roundComplete() {
        let p1 = document.querySelector(".p1");
        let p2 = document.querySelector(".p2");
        p1.classList.remove("active");
        p2.classList.remove("active");
        // gameStart();
        playAgain();
    }
    function playAgain() {
        rounds = prompt("Another round?");
        if (rounds === "y") gameStart();
        else {
            clickStart.style.display = "block";
            gameBoard.emptyBoard();
            clickStart.addEventListener("click", gameStart);
            announceWinner.innerHTML =
                `<strong>Click Start!! To Play!!</strong>`;
        }
        p1Score.textContent = "00";
        p2Score.textContent = "00";
    }
    gameStart();
    return {
        gameStart,
        currentPlayer,
        gameOutcomes,
        highlightPlayer,
        roundComplete
    }
})();
 */