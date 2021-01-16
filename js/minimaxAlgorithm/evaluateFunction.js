/**
 * returns a value based on who is wining in this passed in board parameter scenario
 * board is a tic tac toe game board with all moves available at that snapshot of play
 */
function evaluateWinningMove(board) {
    // checking for Rows X or O's victory
    for(let row = 0; row < 3; row++) {
        if(board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
            if(board[row][0] === "x") return 10;
            else if(board[row][0] === "o") return -10;
        }
    }
    // checking for Columns X or O's victory
    for(let col = 0; col < 3; col++) {
        if(board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            if(board[0][col] === "x") return 10;
            else if(board[0][col] === "o") return -10;
        }
    }
    // cheecking for Digonals X or O's victory
    if(board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        if(board[0][0] === "x") return 10;
        else if(board[0][0] === "o") return -10;
    }
    if(board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
        if(board[2][0] === "x") return 10;
        else if(board[2][0] === "o") return -10;
    }
    // else none of them has own return 0
    return 0;
}
let tttg = [["x", "_", "o"], ["_", "x", "o"], ["_", "_", "x"]];
let value = evaluateWinningMove(tttg);
console.log(value);


/**
 function evaluateWinningMove(board) {
    // checking for Rows X or O's victory
    for(let row = 0; row < 3; row++) {
        if(board[row][0] === board[row][1] === board[row][2]) {
            if(board[row][0] === "x") return 10;
            else if(board[row][0] === "o") return -10;
        }
    }
    // checking for Columns X or O's victory
    for(let col = 0; col < 3; col++) {
        // if(board[col][0] === board[col][2] === board[col][3])
        if(board[0][col] === board[1][col] === board[2][col]) {
            if(board[0][col] === "x") return 10;
            else if(board[0][col] === "o") return -10;
        }
    }
    // cheecking for Digonals X or O's victory
    if(board[0][0] === board[1][1] === board[2][2]) {
        if(board[0][0] === "x") return 10;
        else if(board[0][0] === "o") return -10;
    }
    if(board[2][0] === board[1][1] === board[0][2]) {
        if(board[2][0] === "x") return 10;
        else if(board[2][0] === "o") return -10;
    }
    // else none of them has own return 0
    return 0;
}
let tttg = [["x", "_", "o"], ["_", "x", "o"], ["_", "_", "x"]];
let value = evaluateWinningMove(tttg);
console.log(value);
 */