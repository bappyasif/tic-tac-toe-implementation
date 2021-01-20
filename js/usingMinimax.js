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
    }
    function computerPlayer(cube) {
        flag = true;
        // console.log("computer", cube.target);
        let cubeID = cube.target.id;
        let cubeNum = cube.target.getAttribute("data-cube");
        displayMarkingOnBoard(cubeID, computer);
        gameBoard.push({cube:cubeID, marking:computer, cubeNum: cubeNum});
    }
    function telematrixBoard() {
        Array.from(cubes).forEach(cube => boardSnapshot.push(cube.textContent));
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
            flag === true ? humanPlayer(cube) : computerPlayer(cube);
        } else {
            alert("it's taken");
        }
        // if(boardSnapshot.length > 4) checkWinner();
        if(gameBoard.length > 4) checkWinner();
    }
    flowControl();
})();