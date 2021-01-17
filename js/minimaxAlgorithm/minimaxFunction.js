/**
 * an utility function to see if there is/are any availables moves is/are left to choose from, when found return true else return false
 * this will take tic tac toe board snapshot as a parameter, from which moves availablity will be checked and returned accordingly
 */
function isAnyMovesLeft(board) {
    // returns true when there are moves available on board, 
    // and returns false, if there is no more moves to left to choose from passed in board
    for(let row = 0; row < 3; row++) {
        for(let col = 0; col < 3; col++) {
            // console.time(board[row][col]);
            if(board[row][col] === "_") {
                // console.timeEnd(board[row][col]);
                return true;
            }
        }
    }
    // console.timeEnd(board[row][col]);
    return false;
}
let tttg = [["x", "_", "o"], ["_", "x", "o"], ["_", "_", "x"]];
let value = isAnyMovesLeft(tttg);
console.log(value);

/**
 * here is minimax algorithm implementation for this tic tac toe game
 * it considers all possible ways any game can go and returns value of board, from which algorithm decides which nodes to choose from
 * this function will take a board, depth, and isMaximizer as list of parameters
 * this function will also use our isAnyMoveLeft(..), evaluateWinningMove(..) utility functions and Math.max() as well
 */
function minimaxAlgorithmFunctionImplementation(board, depth, isMaximizer) {
    let score = evaluateWinningMove(board);
    console.log("Score: ", score);
    // if maximizer has won then return score will be 10
    if(score === 10) return score;
    // if minimizer has won then return score will be -10
    if(score === -10) return score;
    // if no moves are left then declare a tie by returning 0
    if(isAnyMovesLeft(board) === false) return 0;
    // if this maximizer's move
    if(isMaximizer) {
        // let bestValue = -Infinity;
        let bestValue = -1000;
        // traverse all board cells
        for(let row = 0; row < 3; row++) {
            for(let col = 0; col < 3; col++) {
                // when empty cell found, use that cell as a move and recursively look for best move using this minimax function
                if(board[row][col] === "_") {
                    // making this /?temporary/ move
                    // board[row][col] = "XX";
                    board[row][col] = player;
                    // calling minimax recursively and choose maximum value from them
                    bestValue = Math.max
                    (
                        bestValue, 
                        minimaxAlgorithmFunctionImplementation(board, depth+1, !isMaximizer)
                    );
                    // undo previously made move
                    board[row][col] = "_";
                }
            }
        }
        return bestValue;
    } else {
        // if this minimizer's move
        // let bestVal = +Infinity;
        let bestVal = 1000;
        // traverse all board cells
        for(let row = 0; row < 3; row++) {
            for(let col = 0; col < 3; col++) {
                // when an empty cell is found
                if(board[row][col] === "_") {
                    // make that temporary move
                    // board[row][col] = "OO";
                    board[row][col] = opponent;
                    // calling minimax algorithm reccursively and choosing minimum value
                    bestVal = Math.min(
                        bestVal, 
                        minimaxAlgorithmFunctionImplementation(board, depth+1, !isMaximizer)
                    );
                    // undo that temporary move
                    board[row][col] = "_";
                }
            }
        }
        return bestVal;
    }
}

// will be used by findBestPossibleMove(..) to save best move's cell cordination
let move = {
    row:"",
    col:""
};

// defining marking for Player and Opponent
let player = "x";
let opponent = "o";

/**
 * this function will return best possible move for player, so that no prolong game flow is chosen by AI
 * this function will use minimax algorithm to find out which move is actually best move for any board snapshot
 * @param { board }
 * this will also use Move object to save cell coordination
 */
function findBestPossibleMove(board) {
    // let bestValue = -Infinity;
    let bestValue = -1000;
    move.row = -1;
    move.col = -1;
    // traverse all board cell, evaluate minimax function for all Empty Cells
    // and return cel with optimal value (e.g. value - depth)
    for(let row = 0; row < 3; row++) {
        for(let col = 0; col < 3; col++) {
            // when an empty cell is found
            if(board[row][col] === "_") {
                // make move for Player
                // board[row][col] = "XX";
                board[row][col] = player;
                // compute evaluation for that above move
                let computedValue = minimaxAlgorithmFunctionImplementation
                (board, 0, false);
                // undo that Player move
                board[row][col] = "_";
                // if value of currently computed move is grater than bestValue then update bestValue with current computed value
                if(computedValue > bestValue) {
                    move.row = row;
                    move.col = col;
                    bestValue = computedValue;
                }
            }
        }
    }
    console.log("Best value : ", bestValue);
    return [move.row, move.col];
}

/**
 * returns a value based on who is wining in this passed in board parameter scenario
 * board is a tic tac toe game board with all moves available at that snapshot of play
 */
function evaluateWinningMove(board) {
    // checking for Rows X or O's victory
    for(let row = 0; row < 3; row++) {
        if(board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
            // if(board[row][0] === "x") return 10;
            // else if(board[row][0] === "o") return -10;
            if(board[row][0] === player) return 10;
            else if(board[row][0] === opponent) return -10;
        }
    }
    // checking for Columns X or O's victory
    for(let col = 0; col < 3; col++) {
        if(board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            // if(board[0][col] === "x") return 10;
            // else if(board[0][col] === "o") return -10;
            if(board[0][col] === player) return 10;
            else if(board[0][col] === opponent) return -10;
        }
    }
    // cheecking for Digonals X or O's victory
    if(board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        // if(board[0][0] === "x") return 10;
        // else if(board[0][0] === "o") return -10;
        if(board[0][0] === player) return 10;
        else if(board[0][0] === opponent) return -10;
    }
    if(board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
        // if(board[2][0] === "x") return 10;
        // else if(board[2][0] === "o") return -10;
        if(board[2][0] === player) return 10;
        else if(board[2][0] === opponent) return -10;
    }
    // else none of them has own return 0
    return 0;
}

// tttg = [["x", "_", "o"], ["_", "x", "o"], ["_", "_", "x"]];
tttg = [["x", "o", "x"], ["o", "o", "x"], ["_", "_", "_"]];
let [row, col] = [...findBestPossibleMove(tttg)];
// findBestPossibleMove(tttg);
console.log("Best Possible Move At, Row: "+row+" Col: "+col);
// console.log("Best Possible Move At, Row: "+move.row+" Col: "+move.col);