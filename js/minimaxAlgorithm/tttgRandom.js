/**
 * this is IIFE module will have an AI based implemenation of a Tic Tac Toe Game
 * This will also have DOM operations for UI purposes for this game
 */
let tttg = (() => {
    let gameBoard = [];
    let player = "o";
    let computer = "x";
    let cubes = document.querySelectorAll(".grid-item");
    let annoneWinner = document.querySelector(".announceWinner");
    let startGame = document.querySelector(".start-game");
    let flag = true;
    let boardSnapshot = [];
    let winingMoves = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];
    function checkWinner() {
        let filterPlayer = gameBoard.filter(item => item.marking === player);
        let filterComputer = gameBoard.filter(item => item.marking === computer);
        // console.log(filterPlayer, filterComputer);
        let playerBoard = [];
        let computerBoard = [];
        filterPlayer.forEach(item => playerBoard.push(+item.cubeNum));
        filterComputer.forEach(item => computerBoard.push(+item.cubeNum));
        console.log(playerBoard, computerBoard);
        // let playerWin = winingMoves.find(moves => moves.every(cell => playerBoard.includes(cell)));
        // let computerWin = winingMoves.find(moves => moves.every(cell => computerBoard.includes(cell)));
        let playerWin = winingMoves.find(combos => combos.every(cell => playerBoard.includes(cell)));
        let computerWin = winingMoves.find(moves => moves.every(cell => computerBoard.includes(cell)));
        // console.log(playerWin, computerWin, winingMoves);
        if(playerWin) alert("You win!!");
        if(computerWin) alert ("you lose!!");
    }
    function displayMarkingOnBoard(cubeID, marking) {
        let divEl = document.querySelector(`#${cubeID}`);
        divEl.innerHTML = `<strong>${marking}<strong>`;
    }
    function humanPlayer(cube) {
        flag = false;
        // console.log("human", cube.target);
        let cubeID = cube.target.id;
        let cubeNum = cube.target.getAttribute("data-cube");
        displayMarkingOnBoard(cubeID, player)
        gameBoard.push({cube:cubeID, marking:player, cubeNum: cubeNum});
        computerPlayer();
    }
    function computerPlayer() {
        flag = true;
        // console.log("computer", cube.target);
        telematrixBoard();
        let cubeNew = randomizedSelector(boardSnapshot);
        // console.log("random cube:", cubeNew);
        let cubeID = cubeNew.id;
        let cubeNum = cubeNew.getAttribute("data-cube");
        displayMarkingOnBoard(cubeID, computer);
        gameBoard.push({cube:cubeID, marking:computer, cubeNum: cubeNum});
        // humanPlayer(cube);
    }
    function randomizedSelector(array) {
        // console.log(array);
        let rand = Math.floor(Math.random() * array.length);
        return array[rand];
    }
    function telematrixBoard() {
        let temp = [];
        Array.from(cubes).forEach(cube => {
            if(!cube.textContent) temp.push(cube);
        });
        boardSnapshot = temp;
        // console.log(boardSnapshot);
    }
    function flowControl() {
        Array.from(cubes).forEach(cube => {
            cube.addEventListener("mouseup", displayMarkingForWhom);
        });
    }
    function displayMarkingForWhom(cube) {
        // console.log(cube.target);
        if (!cube.target.textContent) {
            // flag === true ? humanPlayer(cube) : computerPlayer(cube);
            flag === true ? humanPlayer(cube) : false;
            // humanPlayer(cube);
            boardSnapshot.push(cube);
        } else {
            alert("it's taken");
        }
        if(gameBoard.length > 4) checkWinner();
    }
    flowControl();
    // turnControler();
})();


/**
 /**
 * this is IIFE module will have an AI based implemenation of a Tic Tac Toe Game
 * This will also have DOM operations for UI purposes for this game
 *
let tttg = (() => {
    let gameBoard = [];
    let player = "o";
    let computer = "x";
    let cubes = document.querySelectorAll(".grid-item");
    let annoneWinner = document.querySelector(".announceWinner");
    let startGame = document.querySelector(".start-game");
    let flag = true;
    let boardSnapshot = [];
    let winingMoves = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];
    function checkWinner() {
        let filterPlayer = gameBoard.filter(item => item.marking === player);
        let filterComputer = gameBoard.filter(item => item.marking === computer);
        // console.log(filterPlayer, filterComputer);
        let playerBoard = [];
        let computerBoard = [];
        filterPlayer.forEach(item => playerBoard.push(+item.cubeNum));
        filterComputer.forEach(item => computerBoard.push(+item.cubeNum));
        console.log(playerBoard, computerBoard);
        // let playerWin = winingMoves.find(moves => moves.every(cell => playerBoard.includes(cell)));
        // let computerWin = winingMoves.find(moves => moves.every(cell => computerBoard.includes(cell)));
        let playerWin = winingMoves.find(combos => combos.every(cell => playerBoard.includes(cell)));
        let computerWin = winingMoves.find(moves => moves.every(cell => computerBoard.includes(cell)));
        // console.log(playerWin, computerWin, winingMoves);
        if(playerWin) alert("You win!!");
        if(computerWin) alert ("you lose!!");
    }
    function displayMarkingOnBoard(cubeID, marking) {
        let divEl = document.querySelector(`#${cubeID}`);
        divEl.innerHTML = `<strong>${marking}<strong>`;
    }
    function humanPlayer(cube) {
        flag = false;
        // console.log("human", cube.target);
        let cubeID = cube.target.id;
        let cubeNum = cube.target.getAttribute("data-cube");
        displayMarkingOnBoard(cubeID, player)
        gameBoard.push({cube:cubeID, marking:player, cubeNum: cubeNum});
        computerPlayer();
    }
    function computerPlayer() {
        flag = true;
        // console.log("computer", cube.target);
        telematrixBoard();
        let cubeNew = randomizedSelector(boardSnapshot);
        // console.log("random cube:", cubeNew);
        let cubeID = cubeNew.id;
        let cubeNum = cubeNew.getAttribute("data-cube");
        displayMarkingOnBoard(cubeID, computer);
        gameBoard.push({cube:cubeID, marking:computer, cubeNum: cubeNum});
        // let cubeID = cube.target.id;
        // let cubeNum = cube.target.getAttribute("data-cube");
        // displayMarkingOnBoard(cubeID, computer);
        // gameBoard.push({cube:cubeID, marking:computer, cubeNum: cubeNum});
        // humanPlayer(cube);
    }
    function randomizedSelector(array) {

        console.log(array);
        let rand = Math.floor(Math.random() * array.length);
        // console.log(rand, array[rand]);
        // let test = array[rand];
        // test.textContent = "XX"
        // console.log(test.textContent);
        // if(!array[rand].textContent)
        return array[rand];
    }
    function telematrixBoard() {
        // Array.from(cubes).forEach(cube => boardSnapshot.push(cube.textContent));
        // Array.from(cubes).forEach(cube => boardSnapshot.push(cube));
        // Array.from(cubes).forEach(cube => {
        //     if(!cube.textContent) boardSnapshot.push(cube);
        // });
        let temp = [];
        Array.from(cubes).forEach(cube => {
            if(!cube.textContent) temp.push(cube);
        });
        boardSnapshot = temp;
        // console.log(boardSnapshot);
    }
    // function turnControler() {
    //     flag === true ? flowControl() : computerPlayer();
    // }
    function flowControl() {
        Array.from(cubes).forEach(cube => {
            cube.addEventListener("mouseup", displayMarkingForWhom);
        });
    }
    function displayMarkingForWhom(cube) {
        // console.log(cube.target);
        if (!cube.target.textContent) {
            // flag === true ? humanPlayer(cube) : computerPlayer(cube);
            flag === true ? humanPlayer(cube) : false;
            // humanPlayer(cube);
            boardSnapshot.push(cube);
        } else {
            alert("it's taken");
        }
        // boardSnapshot.push(cube.target);
        // if(boardSnapshot.length > 4) checkWinner();
        if(gameBoard.length > 4) checkWinner();
    }
    flowControl();
    // turnControler();
})();
 */