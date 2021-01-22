/**
* Implementation of this algorithm:
* function for scoring game: psuedocode:
* function score(game) {
*      game.win ? (player) return 10
*      : game.win ? (opponent) return -10
*      : return 0
* }
* simple enough, returns +10 if player wins or -10 when other player wins and for draw it's 0
* to even make it even smarter from earlier psuedocode: we're adding depth to it, that is number of turns or recursion from end game score, more turns lower score, fewer turns higher score:
* function score(game, depth) {
*      game.win ? (player) return 10 - depth
*      : game.win ? (opponent) return depth -10
*      : return 0
* }

* Describing it interms of Tic Tac Toe Board Cubes:
* we can see in miniMax algorithm two players are called maximizer and minimizer, where maximize tries to get highest score possible while minimizer tries to get lowest score possible
* every board state has a value associated with it, when maximizer has upper hand in that board tends to have a positive value, for minimize its tend to have some nagative value, values of board are heuristically assigned
* consider this board tree: 
*    (_)
*  L     R
* 3 5   2 9                        
* since this is a backtracking based algorithm, it tries all possible moves, then backtracks and makes an inform decision
* when Maximizers goes left: it is now minimizers turn and has choice between 3 and 5 and chooses least among those, and that is 3
* when Maximizers goes right: it is now minimizers turn and has choice between 2 and 9 and chooses least among them, and that is 2
* being maximizer you'd choose maximum from 2 and 3, and that is 3, thus you simplified optimal value for maximizers and go left(3) instead of right(2)
* now board looks like this:
*     (_)
*  L       R
*  3       2
* 3 5     2 9

* Psuedocode:
* function miniMax(board, player) {
*     if(player1) {
*         highestReturn = -2;
*         for each possible move on board {
*             board = makeMove(board)
*             reult = miniMax(board, player2)
*             highestReturn = max(highestReturn, result);
*         }
*         return highestReturn
*     } else if(player2) {
*         lowestReturn = 2
*         for each possible move on board {
*             board = makeMove(board)
*             result = miniMax(board, player1)
*             lowestReturn = min(lowestReturn, result)
*         }
*         return lowestReturn
*     }
* }
*/

/**
 * ::Iplementation Begins:: Tic Tac Toe AI based Implementation::
 * :: @author:: aBappy::
 */

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
    let playGame = document.querySelector(".start-game");
    let boardView = [];
    // boardView = Array.from(Array(9).values(" "));
    // boardView = Array.from(cubes.values(""));
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
    startGame();
    function fresheningUp() {
        playGame.style.display = "none";
        // document.querySelectorAll(".item").forEach(cube => cube.remove());
        // document.querySelector(".scores").remove();
        document.querySelector(".scores").style.display = "none";
        annoneWinner.innerHTML = "Game Is In Motion!!";
    }
    function startGame() {
        fresheningUp();
        // boardView = Array.from(Array(9).values(" "));
        boardView = Array.from(Array(9).keys());
        for (let i = 0; i < cubes.length; i++) {
            cubes[i].innerHTML = "";
            cubes[i].addEventListener("click", turnController, false);
            // cubes[i].style.backgroundColor = "";
            cubes[i].style.removeProperty("background-color");
        }
    }
    function turnController(cube) {
        let cubeData = +cube.target.getAttribute("data-cube");
        // console.log(cubeData);
        if (typeof cubeData === "number") {
            eachTurn(cube, player);
            // if (!checkTie()) computerTurn(testSpot(), computer);
            if (!checkWin(boardView, player) && !checkTie()) computerTurn(testSpot(), computer);
        }
    }
    function eachTurn(cube, whichPlayer) {
        // console.log(cube);
        let cubeID = cube.target.id;
        let getID = (+cubeID.replace(/[a-z]+/g, "")) - 1;
        // let getID = +cubeID.replace(/[a-z]+/g, "");
        boardView[getID] = whichPlayer;
        document.querySelector(`#${cubeID}`).innerHTML = whichPlayer;
        let didWin = checkWin(boardView, whichPlayer);
        if (didWin) gameOver(didWin);

    }
    function computerTurn(cubeID, marking) {
        let getID = (+cubeID.replace(/[a-z]+/g, "")) - 1;
        boardView[getID] = marking;
        document.querySelector(`#${cubeID}`).innerHTML = marking;
        let didWin = checkWin(boardView, computer);
        console.log(didWin);
        if (didWin) gameOver(didWin);
    }
    function emptyCubes() {
        let filtered = Array.from(cubes).filter(cube => !cube.textContent);
        // console.log(filtered);
        return filtered;
    }
    function testSpot() {
        // let rand = Math.floor(Math.random() * emptyCubes().length)
        // console.log(emptyCubes()[0], emptyCubes()[0].id);
        // return emptyCubes()[0];
        // return emptyCubes()[0].id;
        // minmax will return an object that will have an index where it will place it's move
        return minimaxRecusrion(boardView, computer).index;
        // return minimax(boardView, computer).index;
        // return minimaxRecusrion(boardView, computer);
    }
    function checkWin(board, whichMarker) {
        // console.log(board, whichMarker);
        let plays = board.reduce((arr, el, idx) => el === whichMarker ? arr.concat(idx) : arr, []);
        // console.log(plays);
        let gameOwn = null;
        for (let [index, moves] of winingMoves.entries()) {
            // console.log(index, moves);
            // if(moves.every(elem => plays.indexOf(elem) !== -1)) {
            //     gameOwn = {index: index, marker: whichMarker};
            //     break;
            // }
            if (moves.every(elem => plays.includes(elem))) {
                gameOwn = { index: index, marker: whichMarker };
                break;
            }
        }
        return gameOwn;
    }
    function checkTie() {
        if (emptyCubes().length === 0) {
            for (let i = 0; i < cubes.length; i++) {
                cubes[i].removeEventListener("click", turnController, false);
                cubes[i].style.setProperty({ "background-color": "green" });
            }
            declareWinner("Tie Game!!", "green");
            return true;
        }
        return false;
    }
    function gameOver(gameOwn) {
        let colorCode;
        for (let idx of winingMoves[gameOwn.index]) {
            // console.log(document.querySelector(`#cube${idx+1}`), idx)
            colorCode = gameOwn.marker === player ? "aqua" : "red";
            // console.log(colorCode);
            document.querySelector(`#cube${idx + 1}`).style.backgroundColor = colorCode;
        }
        for (let i = 0; i < cubes.length; i++) {
            cubes[i].removeEventListener("click", turnController, false);
        }
        let text = gameOwn.marker === player ? "You Win!!" : "You Lose!!";
        // console.log(colorCode, text);
        declareWinner(text, colorCode);
        setTimeout(() => playAgain(), 2200);
    }
    function declareWinner(writeUp, color) {
        annoneWinner.innerHTML = writeUp;
        annoneWinner.style.background = color;
        setTimeout(() => {
            annoneWinner.innerHTML = "Play Again!!";
            annoneWinner.style.background = "";
        }, 2200)
    }
    function playAgain() {
        for (let i = 0; i < cubes.length; i++) {
            cubes[i].textContent = "";
            cubes[i].style.removeProperty("background-color");
        }
        let resp = prompt("Play Again", "y/n");
        if (resp === "y") {
            startGame();
            annoneWinner.textContent = "Game Begins";
        }
        if (resp === "n") {
            annoneWinner.textContent = "Game Awaits";
            playGame.style.display = "block";
        }
        playGame.addEventListener("click", startGame);
    }
    /**
     * return a value if a terminal state is found(+10, 0, -10)
     * go through each available spots on board
     * call minimax function on each available spots recusrsively
     * evaluate returning values from function calls
     * and return best value
     * @param {*} board 
     * @param {*} aiPlayer 
     */
    function minimaxRecusrion(board, aiPlayer) {
        let freeSpots = emptyCubes();
        // console.log(freeSpots);
        if (checkWin(board, player)) {
            return { score: -10 };
        } else if (checkWin(board, computer)) {
            return { score: 20 };
        } else if (freeSpots.length === 0) {
            return { score: 0 };
        }
        // collect all scores from all processding recusrsive calls from each of thoses freeSpots
        let moves = [];
        for (let i = 0; i < freeSpots.length; i++) {
            // keep a track of those scores in an temporary object, named move
            let move = {};
            // setting empty spots index number into that temporary object, as an property named index
            move.index = board[freeSpots[i]];
            // setting this newly drawn board for our human player and then call our minimax function recursively
            board[freeSpots[i]] = aiPlayer; // play it with current player, that is ai player
            if (aiPlayer === computer) {
                // calculate value for playing against human player
                let result = minimaxRecusrion(board, player);
                // add returning score from that recusrsion call and save it to temporary move object
                move.score = result.score;
            } else {
                // calculate value for playing against ai player
                let result = minimaxRecusrion(board, computer);
                // add returning score from that recusrsion call and save it to temporary move object
                move.score = result.score;
            }
            // those recursion calls will continue until it reaches terminal state for each of them and return a score a single level up
            // then minimax resets to what it was previously before making those calls and restore board state as before, and pushes move to object to moves array
            board[freeSpots[i]] = move.index;
            moves.push(move);
        }
        // then minimax algorithm needs to have a track of best moves, by evaluating best moves with moves array
        // this section will check against if these calls are made from human player or ai player recusrively and acknowledge accordingly
        let bestMove;
        if (aiPlayer === computer) {
            // maximizer perspective
            let bestScore = -1000;
            // let's traverse moves array
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            // minimizer perspective
            let bestScore = 1000;
            // let's traverse moves array
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        // returning best possible move
        return moves[bestMove];
    }

    
    // minimaxRecusrion(boardView, computer);
})();



/**
 let tttg = (() => {
    let gameBoard = [];
    let player = "o";
    let computer = "x";
    let cubes = document.querySelectorAll(".grid-item");
    let annoneWinner = document.querySelector(".announceWinner");
    let playGame = document.querySelector(".start-game");
    let boardView = [];
    // boardView = Array.from(Array(9).values(" "));
    // boardView = Array.from(cubes.values(""));
    let flag = true;
    let available = [];
    let boardSnapshot = [];
    let winingMoves = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]

        // [1, 2, 3],
        // [4, 5, 6],
        // [7, 8, 9],
        // [1, 4, 7],
        // [2, 5, 8],
        // [3, 6, 9],
        // [1, 5, 9],
        // [3, 5, 7]
    ];
    startGame();
    function fresheningUp() {
        playGame.style.display = "none";
        // document.querySelectorAll(".item").forEach(cube => cube.remove());
        document.querySelector(".scores").remove();
        annoneWinner.innerHTML = "Game Is In Motion!!";
    }
    function startGame() {
        fresheningUp();
        // boardView = Array.from(Array(9).values(" "));
        boardView = Array.from(Array(9).keys());
        for (let i = 0; i < cubes.length; i++) {
            cubes[i].innerHTML = "";
            cubes[i].addEventListener("click", turnController, false);
            // cubes[i].style.backgroundColor = "";
            cubes[i].style.removeProperty("background-color");
        }
    }
    function turnController(cube) {
        let cubeData = +cube.target.getAttribute("data-cube");
        // console.log(cubeData);
        if (typeof cubeData === "number") {
            eachTurn(cube, player);
            if (!checkTie()) computerTurn(testSpot(), computer);
            // if(!checkTie()) eachTurn(testSpot(), computer);
            // if(!checkTie()) eachTurn(cube.target.id, computer);
        }
    }
    function eachTurn(cube, whichPlayer) {
        // console.log(cube);
        let cubeID = cube.target.id;
        let getID = (+cubeID.replace(/[a-z]+/g, "")) - 1;
        // let getID = +cubeID.replace(/[a-z]+/g, "");
        // console.log(cubeID, getID);
        // boardView[cubeID] = whichPlayer;
        boardView[getID] = whichPlayer;
        document.querySelector(`#${cubeID}`).innerHTML = whichPlayer;
        let didWin = checkWin(boardView, whichPlayer);
        if (didWin) gameOver(didWin);

    }
    function computerTurn(cubeID, marking) {
        let getID = (+cubeID.replace(/[a-z]+/g, "")) - 1;
        boardView[getID] = marking;
        document.querySelector(`#${cubeID}`).innerHTML = marking;
        let didWin = checkWin(boardView, computer);
        console.log(didWin);
        if (didWin) gameOver(didWin);
    }
    function emptyCubes() {
        // // let filtered = boardView.filter(cube => typeof cube === "number");
        // console.log(filtered);
        let filtered = Array.from(cubes).filter(cube => !cube.textContent);
        // console.log(filtered);
        return filtered;
    }
    function testSpot() {
        // let rand = Math.floor(Math.random() * emptyCubes().length)
        // console.log(emptyCubes()[0], emptyCubes()[0].id);
        // return emptyCubes()[0];
        return emptyCubes()[0].id;
    }
    function checkWin(board, whichMarker) {
        // console.log(board, whichMarker);
        let plays = board.reduce((arr, el, idx) => el === whichMarker ? arr.concat(idx) : arr, []);
        console.log(plays);
        let gameOwn = null;
        for (let [index, moves] of winingMoves.entries()) {
            // console.log(index, moves);
            // if(moves.every(elem => plays.indexOf(elem) !== -1)) {
            //     gameOwn = {index: index, marker: whichMarker};
            //     break;
            // }
            if (moves.every(elem => plays.includes(elem))) {
                gameOwn = { index: index, marker: whichMarker };
                break;
            }
        }
        return gameOwn;
    }
    function checkTie() {
        if (emptyCubes().length === 0) {
            for (let i = 0; i < cubes.length; i++) {
                cubes[i].removeEventListener("click", turnController, false);
            }
            return true;
        }
        return false;
    }
    function gameOver(gameOwn) {
        let colorCode;
        for (let idx of winingMoves[gameOwn.index]) {
            // console.log(document.querySelector(`#cube${idx+1}`), idx)
            colorCode = gameOwn.marker === player ? "aqua" : "red";
            // console.log(colorCode);
            document.querySelector(`#cube${idx + 1}`).style.backgroundColor = colorCode;
        }
        for (let i = 0; i < cubes.length; i++) {
            cubes[i].removeEventListener("click", turnController, false);
        }
        let text = gameOwn.marker === player ? "You Win!!" : "You Lose!!";
        // console.log(colorCode, text);
        declareWinner(text, colorCode);
        setTimeout(() => playAgain(), 2200);
    }
    function declareWinner(writeUp, color) {
        annoneWinner.innerHTML = writeUp;
        annoneWinner.style.background = color;
        setTimeout(() => {
            annoneWinner.innerHTML = "Play Again!!";
            annoneWinner.style.background = "";
        }, 2200)
    }
    function playAgain() {
        for (let i = 0; i < cubes.length; i++) {
            cubes[i].textContent = "";
            cubes[i].style.removeProperty("background-color");
        }
        let resp = prompt("Play Again", "y/n");
        if (resp === "y") {
            startGame();
            annoneWinner.textContent = "Game Begins";
        }
        if( resp === "n") {
            annoneWinner.textContent = "Game Awaits";
            playGame.style.display = "block";
        }
        playGame.addEventListener("click", startGame);
    }

    function minimax(newBoard, whichPlayer) {
        var availSpots = emptyCubes();

        if (checkWin(newBoard, player)) {
            return { score: -10 };
        } else if (checkWin(newBoard, computer)) {
            return { score: 10 };
        } else if (availSpots.length === 0) {
            return { score: 0 };
        }
        var moves = [];
        for (var i = 0; i < availSpots.length; i++) {
            var move = {};
            move.index = newBoard[availSpots[i]];
            newBoard[availSpots[i]] = player;

            if (whichPlayer == computer) {
                var result = minimax(newBoard, player);
                move.score = result.score;
            } else {
                var result = minimax(newBoard, computer);
                move.score = result.score;
            }

            newBoard[availSpots[i]] = move.index;

            moves.push(move);
        }

        var bestMove;
        if (whichPlayer === computer) {
            var bestScore = -10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            var bestScore = 10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        return moves[bestMove];
    }
})();
 */