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
        // console.log("current",board);
        array = array.flat();
        console.log("current",board);
        // let playerX = array.filter(cell => cell === player);
        let playerX = array.filter(cell => cell === computer);
        // let playerX = array.filter(cell => cell === "oo");
        let playerCords = [];
        for (let i = 0; i < array.length; i++) {
            // if (array[i].indexOf("x") !== -1) playerCords.push(i + 1);
            // if (array[i].indexOf(player) !== -1) playerCords.push(i + 1);
            if (array[i].indexOf(computer) !== -1) playerCords.push(i + 1);
        }
        // console.log("cords :",playerCords);
        let winningMoves = [].concat(winningRows, winningCols, winingDiagonals);
        let didWin = winningMoves.find(item => item.every(cell => playerCords.includes(cell)));
        console.log("cords :",playerCords);
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
    /**
     * this will have coordinates for best move possible
     */
    let bestMove = { row: null, col: null }
    /**
     * this function will evaluates exhaustively every possible moves and decides which move is best move
     * and save those coordinates in bestMove.row and bestMove.col respectively for row and cols
     * @param {*} board 
     */
    function findingBestPossibleMove(board) {
        let bestValue = -1000;
        bestMove.row = -1;
        bestMove.col = -1;
        board.map((row, rIdx) => {
            row.map((col, cIdx) => {
                if (col === "") {
                    // make move for player
                    // board[rIdx][cIdx] = player;
                    board[rIdx][cIdx] = computer;
                    // compute value for that specefic move
                    let computedValue = minimaxEvaluation(board, 0, false);
                    // let computedValue = minimaxEvaluation(board, 0, false);
                    // let computedValue = minimaxEvaluation(board, cIdx, false);
                    console.log(computedValue);
                    // undo that previous move
                    board[rIdx][cIdx] = "";
                    // if computed value is greater than that of bestValue then update it's value with computedValue
                    if (computedValue > bestValue) {
                        bestMove.row = rIdx;
                        bestMove.col = cIdx;
                        bestValue = computedValue;
                    }
                }
            });
        });
        console.log("Best Value :" + bestValue);
        return [bestMove.row, bestMove.col];
    }
    /**
     * this function is implementation for minimax algorithm, where it looks for every possible moves available within a given board
     * and returns a score of 10, -10, 0 respectively for maximizer, minnimizer, draw
     * @param {*} board 
     * @param {*} depth 
     * @param {*} isMaximizer 
     */
    function minimaxEvaluation(board, depth, isMaximizer) {
        // when maximizer's/minimizer's win a value of 10, -10 will be returned respectively and for draw 0 will be returned
        let score = evaluateMovesWhenWinning(board);
        if (score === 10) return score;
        if (score === -10) return score;
        if (isAnyMovesLeft(board) === false) return 0;
        // if this maximizer's move
        if (isMaximizer) {
            let bestValue = -1000;
            // traverse all board cells
            board.map((row, rIdx) => {
                row.map((col, cIdx) => {
                    // when an empty cell is found
                    if (board[rIdx][cIdx] === "") {
                        // console.log("<>",rIdx, cIdx);
                        // make move for maximizer
                        board[rIdx][cIdx] = player;
                        // calling minimaxEvaluation recursively to choose maximum
                        bestValue = Math.max(
                            bestValue,
                            minimaxEvaluation(board, depth + 1, !isMaximizer)
                        );
                        // undo previously made move
                        board[rIdx][cIdx] = "";
                    }
                });
            });
            return bestValue;
        } else {
            // when it's minimizer's move
            let bestValue = 1000;
            // traversing through board cells
            board.map((row, rIdx) => {
                row.map((col, cIdx) => {
                    // when an empty cell is found
                    if (board[rIdx][cIdx] === "") {
                        // make move for opponent
                        board[rIdx][cIdx] = computer;
                        // calling minimaxEvluation recursively to choose minimum
                        bestValue = Math.min(
                            bestValue,
                            minimaxEvaluation(board, depth + 1, !isMaximizer)
                        );
                        // undo previously made move
                        board[rIdx][cIdx] = "";
                    }
                });
            });
            return bestValue;
        }
    }
    let flag = true;
    function humanPlayer() {
        flag = false;
        player = "xx";
        // return player;
        return [player, 1];
    }
    function computerPlayer() {
        flag = true;
        opponent = "oo";
        // return opponent;
        return [opponent, 2];
    }
    function eachPlayer() {
        let cubes = document.querySelectorAll(".grid-item");
        Array.from(cubes).forEach(cube => {
            cube.addEventListener("click", () => {
                if (!cube.textContent) {
                    // console.log(cube.id);
                    let cubeNum = cube.getAttribute("data-cube");
                    let cubeID = cube.id;
                    let marking, playerNum;
                    // console.log(cubeNum, cubeID);
                    flag ? [marking, playerNum] = [...humanPlayer()] : [marking, playerNum] = [...computerPlayer()];
                    // console.log(player, opponent, playerNum);
                    readyBoard(cubeNum,cubeID,playerNum,marking);
                } else {
                    alert("this cube taken already");
                }
            });
        });
    }
    function readyBoard(num,id,player,marking) {
        // console.log(num,id,player,marking);
        gameBoard.push({cubeNum:num,cubeID:id,playerNum:player,playerMarking:marking});
        displayBoard(player, marking, id);
        // console.log(convertBoardInto2D(gameBoard,3));
        // let matrixfiedBoard = convertBoardInto2D(gameBoard,3);
        // let bestMove = findingBestPossibleMove(matrixfiedBoard);
        let plainBoard = [];
        document.querySelectorAll(".grid-item").forEach(grid => {
            // if(!grid.textContent) plainBoard.push("");
            if(!grid.textContent) plainBoard.push(0);
            else plainBoard.push(marking);
        });
        // let matrixifiedBoard = convertBoardInto2D(plainBoard,3);
        // let matrixifiedBoard = convertBoardInto2D(plainBoard,3);
        let matrixifiedBoard = [];
        // for(let i = 0; i < plainBoard.length; i+=3) matrixifiedBoard.push(plainBoard.slice(i,i+3));
        matrixifiedBoard = plainBoard.slice(0,3);
        console.log("matrix:"+matrixifiedBoard, plainBoard, plainBoard.slice(0,3));
        // let bestMove = findingBestPossibleMove(matrixifiedBoard);
        // console.log(bestMove);
        // displayBoard(player, marking, id);
    }
    function displayBoard(player, marking, cubeID) {
        let cubeDiv = document.querySelector(`#${cubeID}`);
        // cubeDiv.innerHTML = `<pre>Player:${player === 1 ? "Human" : "Computer"} ${"\n"} Marking: ${player === 1 ? marking : marking} </pre>`;
        cubeDiv.innerHTML = `<pre>${player === 1 ? marking : marking} </pre>`;
    }
    
    function convertBoardInto2D(board,size) {
        let temp = [];
        let i = 0, n = board.length;
        while(i < n) {
            temp.push(board.slice(i,i+=size));
        }
        console.log("??"+temp);
        return temp;
        
        // let tmp = [];
        // // let tmp = board;
        // for(let i = 0; i < board.length; i+=size) {
        //     // if(!board[i].playerMarking) {board[i]}
        //     tmp.push(board.slice(i, i+size));
        //     // tmp[i] = board.slice(0,size);
        // }
        // console.log(tmp);
        // return tmp;

        // let temp = (board,size) => board.reduce((acc, e, i) => 
        // (i%size ? acc[acc.length -1].push(e) : acc.push([e]), acc), []);
        // return temp;
    }
    eachPlayer();
    // console.log(findingBestPossibleMove([["x", "o", "o"], ["", "x", "o"], ["x", "x", "o"]]));
    // console.log(evaluateMovesWhenWinning([["x", "o", "o"], ["x", "x", "o"], ["x", "", "x"]]));
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
    /**
     * this will have coordinates for best move possible

    let bestMove = { row: null, col: null }
    /**
     * this function will evaluates exhaustively every possible moves and decides which move is best move
     * and save those coordinates in bestMove.row and bestMove.col respectively for row and cols

    function findingBestPossibleMove(board) {
        let bestValue = -1000;
        bestMove.row = -1;
        bestMove.col = -1;
        board.map((row, rIdx) => {
            row.map((col, cIdx) => {
                if (col === "") {
                    // make move for player
                    board[rIdx][cIdx] = player;
                    // compute value for that specefic move
                    let computedValue = minimaxEvaluation(board, 0, false)
                    // undo that previous move
                    board[rIdx][cIdx] = "";
                    // if computed value is greater than that of bestValue then update it's value with computedValue
                    if (computedValue > bestValue) {
                        bestMove.row = rIdx;
                        bestMove.col = cIdx;
                        bestValue = computedValue;
                    }
                }
            });
        });
        console.log("Best Value :" + bestValue);
        return [bestMove.row, bestMove.col];
    }
    /**
     * this function is implementation for minimax algorithm, where it looks for every possible moves available within a given board
     * and returns a score of 10, -10, 0 respectively for maximizer, minnimizer, draw

    function minimaxEvaluation(board, depth, isMaximizer) {
        // when maximizer's/minimizer's win a value of 10, -10 will be returned respectively and for draw 0 will be returned
        let score = evaluateMovesWhenWinning(board);
        if (score === 10) return score;
        if (score === -10) return score;
        if (isAnyMovesLeft(board) === false) return 0;
        // if this maximizer's move
        if (isMaximizer) {
            let bestValue = -1000;
            // traverse all board cells
            board.map((row, rIdx) => {
                row.map((col, cIdx) => {
                    // when an empty cell is found
                    if (board[row][col] === "") {
                        // console.log("<>",rIdx, cIdx);
                        // make move for maximizer
                        board[row][col] = player;
                        // calling minimaxEvaluation recursively to choose maximum
                        bestValue = Math.max(
                            bestValue,
                            minimaxEvaluation(board, depth+1, !isMaximizer)
                        );
                        // undo previously made move
                        board[row][col] = "";
                    }
                });
            });
            return bestValue;
        } else {
            // when it's minimizer's move
            let bestValue = 1000;
            // traversing through board cells
            board.map((row,rIdx) => {
                row.map((col,cIdx) => {
                    // when an empty cell is found
                    if(board[row][col] === "") {
                        // make move for opponent
                        board[row][col] = opponent;
                        // calling minimaxEvluation recursively to choose minimum
                        bestValue = Math.min(
                            bestValue,
                            minimaxEvaluation(board, depth+1, !isMaximizer)
                        );
                        // undo previously made move
                        board[row][col] = "";
                    }
                });
            });
            return bestValue;
        }
    }
    console.log(findingBestPossibleMove([["x", "o", "o"], ["", "x", "o"], ["x", "x", "o"]]));
    console.log(evaluateMovesWhenWinning([["x", "o", "o"], ["x", "x", "o"], ["x", "", "x"]]));
    // evaluateMovesWhenWinning([["x", "o", "o"], ["x", "x", "o"], ["x", "", "x"]]);
    // let tttg = [["x", "0", "o"], ["x", "x", "o"], ["", "x", "x"]];
    // let value = isAnyMovesLeft(tttg);
    // console.log(value);

})();
 */