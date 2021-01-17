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
    let player = "x";
    let computer = "o";
    /**
     * this utility function will check whether there is any empty board left to place any moves
     * @param {*} board 
     */
    function isAnyMovesLeft(board) {
        return board.some(array => array.some(cell => cell === "" ? true : false));
    }
    /**
     * this utility function will check if there is any winning sequence presents from players
     * this will return 10 when computer wins and -10 when player wins
     * @param {*} board 
     */
    function evaluateMovesWhenWinning(board) {
        let array = [];
        board.forEach(item => array.push(item));
        array = array.flat();
        let playerX = array.filter(cell => cell === "x");
        let playerCords = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i].indexOf("x") !== -1) playerCords.push(i + 1);
        }
        let winningMoves = [].concat(winningRows, winningCols, winingDiagonals);
        let didWin = winningMoves.find(item => item.every(cell => playerCords.includes(cell)));
        if (didWin && playerX[0] === computer) return 10;
        if (didWin && playerX[0] === player) return -10;
    }
    // these are winning sequences
    let winningRows = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    let winningCols = [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9]
    ];
    let winingDiagonals = [
        [1, 5, 9],
        [3, 5, 7]
    ];
    console.log(evaluateMovesWhenWinning([["x", "o", "o"], ["x", "x", "o"], ["x", "", "x"]]));
    // evaluateMovesWhenWinning([["x", "o", "o"], ["x", "x", "o"], ["x", "", "x"]]);
    // let tttg = [["x", "0", "o"], ["x", "x", "o"], ["", "x", "x"]];
    // let value = isAnyMovesLeft(tttg);
    // console.log(value);
})();


/**
 * let tttg = (() => {
    let gameBoard = [];
    let player = "x";
    let computer = "o";
    function isAnyMovesLeft(board) {
        // return board.map(cell => cell === null ? true : false)
        // return board.some(array => array.some(cell => cell === null ? true : false));
        return board.some(array => array.some(cell => cell === "" ? true : false));
    }
    function evaluateMovesWhenWinning(board) {
        // let array = [].concat([...board]);
        let array = [];
        board.forEach(item => array.push(item));
        // console.log(array, array.flat());
        array = array.flat();
        let playerX = array.filter(cell => cell === "x");
        // let playerCords = array.filter(cell => cell.indexOf("x"));
        // console.log(array, playerX);
        // let playerCords = array.map(cell => cell.indexOf("x"));
        let playerCords = [];
        for (let i = 0; i < array.length; i++) {
            // if(array[i].indexOf("x") !== -1) playerCords.push(i);
            if (array[i].indexOf("x") !== -1) playerCords.push(i + 1);
        }
        // console.log(array,playerX, playerCords);
        let winningMoves = [].concat(winningRows, winningCols, winingDiagonals);
        // let didWin = winningMoves.find(item => item.every(cell => {
        //     console.log(cell);
        //     // playerCords.includes(cell);
        // }))
        let didWin = winningMoves.find(item => item.every(cell => playerCords.includes(cell)));
        // console.log(winningMoves,didWin, playerCords);
        // console.log(playerCords[0], playerX);
        if (didWin && playerX[0] === computer) return 10;
        if (didWin && playerX[0] === player) return -10;
    }
    let winningRows = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    let winningCols = [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9]
    ];
    let winingDiagonals = [
        [1, 5, 9],
        [3, 5, 7]
    ];
    console.log(evaluateMovesWhenWinning([["x", "o", "o"], ["x", "x", "o"], ["x", "", "x"]]));
    // evaluateMovesWhenWinning([["x", "o", "o"], ["x", "x", "o"], ["x", "", "x"]]);
    // let tttg = [["x", "0", "o"], ["x", "x", "o"], ["", "x", "x"]];
    // let value = isAnyMovesLeft(tttg);
    // console.log(value);

})();
 */