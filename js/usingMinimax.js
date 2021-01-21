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
    // let startGame = document.querySelector(".start-game");
    let boardView = [];
    // boardView = Array.from(Array(9).values(" "));
    // boardView = Array.from(cubes.values(""));
    let flag = true;
    let available = [];
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
    startGame();
    function startGame() {
        // boardView = Array.from(Array(9).values(" "));
        boardView = Array.from(Array(9).keys());
        for(let i=0;i<cubes.length;i++) {
            cubes[i].innerHTML = "";
            cubes[i].addEventListener("click", turnController, false);
        }
    }
    function turnController(cube) {
        let cubeData = +cube.target.getAttribute("data-cube");
        // console.log(cubeData);
        if(typeof cubeData === "number") {
            eachTurn(cube, player);
            if(!checkTie()) computerTurn(testSpot(), computer);
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
    }
    function computerTurn(cubeID, marking) {
        let getID = (+cubeID.replace(/[a-z]+/g, "")) - 1;
        boardView[getID] = marking;
        document.querySelector(`#${cubeID}`).innerHTML = marking;
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
    function checkTie() {
        if(emptyCubes().length === 0) {
            for(let i = 0; i < cubes.length; i++) {
                cubes[i].removeEventListener("click", turnController, false);
            }
            return true;
        }
        return false;
    }
})();