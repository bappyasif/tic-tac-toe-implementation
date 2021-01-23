let gameBoard = (() => {
    let cubes = document.querySelectorAll(".grid-item");
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
            // cubes[i].addEventListener("click", eachTurn);
            // if(!cubes[i].textContent) cubes[i].addEventListener("click", eachTurn, false);
        }
    }
    // let checkTurn = () => emptyCubes.length % 2 === 0;
    let eachTurn = (evt) => {
        let cubeID = evt.target.id;
        // let checkTurn = emptyCubes.length % 2 === 0;
        // if(checkTurn) placeMarking(cubeID)
        if(!evt.target.textContent) placeMarking(cubeID);
    }
    // let currentPlayer = playGame.currentPlayer();
    function placeMarking(id) {
        let currentPlayer = playGame.currentPlayer();
        let cubeDiv = document.getElementById(id);
        cubeDiv.innerHTML = currentPlayer.marking;
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
    let gameStart = () => {
        player01 = player("humanPlayer", "", "PlayerOne");
        playerAi = player("PlayerAI", "", "PlayerComputer");
        gameBoard.cubeClicked(currentPlayer().marking);
        // gameBoard.eachTurn(currentPlayer().marking);
    }
    let currentPlayer = () => {
        // let check = gameBoard.checkTurn();
        let check = gameBoard.emptyCubes().length % 2 === 0;
        return check ? player01 : playerAi;
    }
    gameStart();
    // for(let i = 0; i < gameBoard)
    // gameBoard.cubeClicked(currentPlayer().marking);
    return {
        gameStart,
        currentPlayer
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
 */