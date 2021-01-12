let gameTTT = (() => {
    let gameBoard = [];
    let grid = window.getComputedStyle(document.querySelector(".gameBoard"));
    let numCols = grid.getPropertyValue("--colNum");
    let rowNums = grid.getPropertyValue("--rowNum");
    console.log(numCols, rowNums, typeof numCols);
    let boardArray = (new Array(+rowNums)).fill().map(() => new Array(+numCols).fill(0));
    let gameCount = 0;
    let anotherBoard = (new Array(+rowNums)).fill().map(() => new Array(+numCols).fill(0));
    function showBoard() {
        gameBoard.forEach(item => {
            // placeMoves(item.marker || null, item.cube || "");
            placeMoves(item.marker, item.cube);
        });
        startLookingForWinner();
    }
    function placeMoves(marker, cube) {
        console.log(marker, cube);
        let cubeDisplay = document.querySelector(`#${cube}`);
        cubeDisplay.textContent = marker;
        // startLookingForWinner();
    }
    function displayController(marker, cube) {
        if (marker && cube) {
            gameBoard.push({ marker, cube });
            // gameBoard.push([marker, cube]);
            showBoard();
            // if (gameBoard.length > 2) {
            //     // let check = checkDiagonals() || checkRows(boardArray) || checkCols();
            //     let check = checkRows(boardArray) || checkCols() || checkDiagonals();
            //     console.log(check);
            //     checkMoves(check);
            // }
        }
    }
    function startLookingForWinner() {
        if (gameBoard.length > 2) {
            // let check = checkDiagonals() || checkRows(boardArray) || checkCols();
            // let check = checkRows(boardArray) || checkCols() || checkDiagonals();
            // console.log(check);
            // checkMoves(check);
            // checkBoardForMoves(boardArray) || checkDiagonally();
            // return checkDiagonally() || checkBoardForMoves(boardArray);
            checkBoardForMoves(boardArray);
            // forCols(boardArray);
            // checkBoardForMoves(anotherBoard);
            // checkCols();
        }
        // if(gameBoard.length === 3) checkBoardForMoves(anotherBoard);
    }

    function checkDiagonally(array) {
        for(let i = 0; i < 3; i++) {
            for(let j = 2; j >= 0; j--) {
                if(boardArray[i][j] === "x") roundWinner();
            }
        }
    }
    
    function checkBoardForMoves(array) {
        array.every(item => {
            item.every(val => {
                if(val === "x") roundWinner();
                else if(val === "o") roundWinner();
            });
        });
        // for(let i = 0; i < 3; i++) {
        //     for(let j = 2; j >= 0; j--) {
        //         if(array[i][j] === "x") roundWinner();
        //     }
        // }
        // checkDiagonally(array)
        // let newArray = [];
        // // newArray = newArray.concat(...array);
        // array.forEach(item => {
        //     item.forEach(val => {
        //         // if(val) newArray.push(val);
        //         if(val) newArray.push(val-1);
        //         else return
        //     });
        // });

        // let checkArray = flatArray(winningRows);
        // console.log(newArray, checkArray, newArray.includes(checkArray));
        // console.log(newArray, winningRows.includes(newArray));
    }

    function roundWinner() {
        console.log("winner!!", boardArray);
        gameCount++;
        if (gameCount === 3) { gameWinner(); gameCount = 0; }
        if (gameCount < 3) {
            let playerOne = document.querySelector(".playerOne");
            playerOne.textContent = gameCount;
            console.log("game count: " + gameCount);
            return resetBoard();
        }
    }
    function gameWinner() {
        console.log("Game Winner!!", gameCount);
        let gameWinner = document.querySelector(".announceWinner");
        gameWinner.textContent = "Oh Yeah!!" + gameCount;
    }
    function resetBoard() {
        setTimeout(() => { boardLayout(); }, 2200);
    }
    function boardLayout() {
        let cubes = document.querySelectorAll(".grid-item");
        Array.from(cubes).forEach(item => item.textContent = "");
        // boardArray = [];
        gameBoard = [];
    }
    function playerMove() {
        let cubes = document.querySelectorAll(".grid-item");
        Array.from(cubes).forEach(item => {
            item.addEventListener("click", () => {
                if (!item.textContent) {
                    let playerMarker = prompt("choose marker 'X/O/x/o'");
                    // let playerMarker = prompt("choose marker 'X/O/x/o'").toLowerCase();
                    let cubeID = item.id;
                    // displayController(playerMarker, cubeID);
                    let cubeNum = item.getAttribute("data-cube");
                    console.log("cube :", cubeNum, typeof cubeNum, playerMarker);
                    for (let i = 0; i < numCols; i++) {
                        for (let j = 0; j < rowNums; j++) {
                            if (boardArray !== null) {
                                let newI = boardArrayRowsLogic(+cubeNum - 1);
                                let newJ = boardArrayColsLogic(+cubeNum - 1);
                                // let newJ = boardArrayRowsLogic(+cubeNum - 1);
                                // let newI = boardArrayColsLogic(+cubeNum - 1);
                                if (i == newI && j == newJ) {
                                    console.log(newI, newJ);
                                    // anotherBoard[i][j] = cubeNum - 1;
                                    anotherBoard[i][j] = cubeNum;
                                    boardArray[i][j] = playerMarker;
                                    displayController(playerMarker, cubeID);
                                }
                            }
                        }
                    }
                } else {
                    alert("Spot already been marked");
                }
            });
        });
    }
    function boardArrayRowsLogic(cube) {
        switch (cube) {
            case 0:
            case 1:
            case 2:
                return 0;
            case 3:
            case 4:
            case 5:
                return 1;
            case 6:
            case 7:
            case 8:
                return 2;
        }
    }
    function boardArrayColsLogic(cube) {
        switch (cube) {
            case 0:
            case 3:
            case 6:
                return 0;
            case 1:
            case 4:
            case 7:
                return 1;
            case 2:
            case 5:
            case 8:
                return 2;
        }
    }
    playerMove();
})();

/**
 function checkMoves(chk) {
        switch (chk) {
            case 1:
                console.log("??");
                // return roundWinner();
                roundWinner();
                return;
            case 2:
                console.log("!!");
                // return roundWinner();
                roundWinner();
                return;
            case 3:
                console.log("##");
                // return roundWinner();
                roundWinner();
                return;
            default: return;
        }
    }
    function checkRows(array) {
        array.forEach(item => {
            console.log(item, "rows");
            let count = 0;
            // item.forEach(val => {
            //     if (val === "x" && val !== "o" || val === "o" && val !== "x") { count++ }
            // });
            item.forEach(val => {
                console.log("val:" + val);
                if (val === "X" || val === "x") {
                    // console.log("val:"+val);
                    count++;
                }
                // if (val.toUpperCase() === "X" || val === "x" || val === "X") {
                //     console.log("val:"+val);
                //     count++;
                // }
            });
            if (count === 3) {
                count = 0;
                // return 1;
            }
            return 1;
        });
    }
    function checkCols() {
        let temp2D = boardArray;
        for (let i = 0; i < temp2D.length; i++) {
            for (let j = 0; j < i; j++) {
                let tmp = temp2D[i][j];
                temp2D[i][j] = temp2D[j][i];
                temp2D[j][i] = tmp;
            }
        }
        checkBoardForMoves(temp2D);
        // temp2D.forEach(item => {
        //     console.log(item, "cols");
        //     let count = 0;
        //     item.forEach(val => {
        //         val === "X" || val === "x" ? count++ : false;
        //     });
        //     if(count === 3) {
        //         count = 0;
        //         // return 2;
        //     }
        // });
        // return 2;
    }
    function checkDiagonals() {
        for (let i = 0; i < 3; i++) {
            for (let j = 2; j >= 0; j--) {
                if (boardArray[i][j] === "x") {
                    // return roundWinner();
                    return 3;
                }
                // else if (boardArray[i][j] === "o") {
                //     roundWinner();
                //     // break;
                //     return;
                // }
            }
        }
    }

function displayController(marker, cube) {
        if (marker && cube) {
            gameBoard.push({ marker, cube });
            // gameBoard.push([marker, cube]);
            showBoard();
            // if (gameBoard.length > 2) {
            //     // let check = checkDiagonals() || checkRows(boardArray) || checkCols();
            //     let check = checkRows(boardArray) || checkCols() || checkDiagonals();
            //     console.log(check);
            //     checkMoves(check);
            // }
        }
    }
    function startLookingForWinner() {
        if (gameBoard.length > 2) {
            // let check = checkDiagonals() || checkRows(boardArray) || checkCols();
            // let check = checkRows(boardArray) || checkCols() || checkDiagonals();
            // console.log(check);
            // checkMoves(check);
            checkBoardForMoves(boardArray);
            // checkCols();
        }
    }
    function checkBoardForMoves(array) {
        let count = 0;
        for(let i = 0; i < numCols; i++) {
            console.log(array[i]);
            // if(array[i] === "x") count++;
            return array[i].every(val => {
                console.log(val, "<>");
                if(val === "x") {roundWinner()}
                else return false;
                // console.log(count);
                // if(count === 1) return roundWinner();
            });
            // return array[i].every(val => {
            //     console.log(val, "<>");
            //     if(val === "x") {count++;}
            //     else return false;
            //     console.log(count);
            //     if(count === 1) return roundWinner();
            // });
            // return array[i].forEach(val => {
            //     console.log(val, "<>")
            //     if(val === "x") count++;
            //     // if(count === 3) roundWinner();
            // })
        }
        // if(count === 3) roundWinner();

        // array.some(rows => rows.every(cell => {
        //     if(cell === "x") roundWinner();
        //     else if(cell === "o") roundWinner();
        // }));

        // array.every(row => {
        //     row.every(cell => {
        //         if(cell === "x") {
        //             // count++;
        //             return roundWinner();
        //         } else if(cell === "o") {
        //             // count++;
        //             roundWinner();
        //         }
        //         // if(count === 3) roundWinner();
        //     })
        // });
        // console.log(count);
        // if(count === 3) roundWinner();

        // for (let i = 0; i < array.length; i++) {
        //     for (let j = 0; j < array[i].length; j++) {
        //         if (array[i][j] === "x") count++;
        //         else if (array[i][j] === "o") count++;
        //         // return;
        //         // if (array[i][j] === "x" || array[i][j] === "o") count++;
        //         if (count === 3) {
        //             roundWinner();
        //             return;
        //         }
        //     }
        // }
        // if(count === 3) roundWinner();
        // return;

        // for(let i = 0; i < numCols; i++) {
        //     for(let j = 0; j < rowNums; j++) {
        //         if(array[i][j] === "x") count++;
        //         else if(array[i][j] === "o") count++;
        //     }
        // }
        // if(count === 3) roundWinner();

        // array.forEach(item => {
        //     let count = 0;
        //     item.forEach(val => {
        //         if(val === "x") count++;
        //     });
        //     if(count === 3) roundWinner();
        // });
        // array.forEach(item => {
        //     let count = 0;
        //     item.forEach(val => {
        //         if(val === "o") count++;
        //     });
        //     if(count === 3) roundWinner();
        // });

    }

// for(let i = 0; i < array.length; i++) {
        //     array.every(val => {
        //         console.log(val);
        //         if(val !== 0) {
        //             newArray = newArray.concat(val);
        //         }
        //     })
            // if(array[i]!== 0) {
            //     newArray = newArray.concat(array[i]);
            // }
            // for(let j = 0; j < array[i].length; j++) {
            //     // if(array[i][j] !== 0) {
            //     //     newArray = newArray.concat(array[i]);
            //     // }
            // }
            // newArray = newArray.concat(array[i]);
        }
        console.log(newArray, winningRows.includes(newArray));
        // array.map(item => {
        //     // console.log(typeof item);
        //     // let tmp = [];
        //     if(typeof item === "object") {
        //         let tmp = [];
        //         item.every(val=>tmp.push(val));
        //         console.log(tmp, winningRows.includes(tmp));
        //     }
        //     // console.log(tmp, winningRows.includes(tmp));
        // });
        // let newArray = array.map(item => {
        //     console.log(typeof item);
        // })
        // console.log(winningRows.includes(array));
        // array.every(item => {
        //     console.log(item === [0,1,2], [0,1,2].includes(item), item.includes([0,1,2]), winningRows.includes([0,1,2]));
        //     // console.log(item, winningRows.indexOf(item), winningRows.indexOf([0,1,2]), winningRows.includes([0,1,2]), [0,1,2].includes(winningRows));
        //     // console.log(winningRows.includes(item))
        //     // console.log(winningRows.indexOf(item), winningCols.indexOf(item), item, winningCols);
        //     // winningRows.includes(item) ? roundWinner() : winningCols.includes(item) ? roundWinner() : winingDiagonals.includes(item) ? roundWinner() : false;
        //     // winningRows.includes(item) ? roundWinner() : false;
            
        // });

        // return array.every(row => {
        //     row.every(cell => {
        //         if(cell === "x") {
        //             return roundWinner();
        //         } else if(cell === "o") {
        //              return roundWinner();
        //         }
        //     });
        // });

        // for(let i = 0; i < numCols; i++) {
        //     console.log(array[i]);
        //     // if(array[i] === "x") count++;
        //     let checkRow = array[i].every(val => {
        //         return val === "x";
        //         // console.log(count);
        //         // if(count === 1) return roundWinner();
        //     });
        //     if(checkRow) return roundWinner();
        // let count = 0;
        // return array[i].every(val => {
        //     console.log(val, "<>");
        //     if(val === "x") {roundWinner()}
        //     else return false;
        //     // console.log(count);
        //     // if(count === 1) return roundWinner();
        // });
        // return array[i].every(val => {
        //     console.log(val, "<>");
        //     if(val === "x") {count++;}
        //     else return false;
        //     console.log(count);
        //     if(count === 1) return roundWinner();
        // });
        // return array[i].forEach(val => {
        //     console.log(val, "<>")
        //     if(val === "x") count++;
        //     // if(count === 3) roundWinner();
        // })
        // }
        // if(count === 3) roundWinner();

        // array.some(rows => rows.every(cell => {
        //     if(cell === "x") roundWinner();
        //     else if(cell === "o") roundWinner();
        // }));

        // array.every(row => {
        //     row.every(cell => {
        //         if(cell === "x") {
        //             // count++;
        //             return roundWinner();
        //         } else if(cell === "o") {
        //             // count++;
        //             roundWinner();
        //         }
        //         // if(count === 3) roundWinner();
        //     })
        // });
        // console.log(count);
        // if(count === 3) roundWinner();

        // for (let i = 0; i < array.length; i++) {
        //     for (let j = 0; j < array[i].length; j++) {
        //         if (array[i][j] === "x") count++;
        //         else if (array[i][j] === "o") count++;
        //         // return;
        //         // if (array[i][j] === "x" || array[i][j] === "o") count++;
        //         if (count === 3) {
        //             roundWinner();
        //             return;
        //         }
        //     }
        // }
        // if(count === 3) roundWinner();
        // return;

        // for(let i = 0; i < numCols; i++) {
        //     for(let j = 0; j < rowNums; j++) {
        //         if(array[i][j] === "x") count++;
        //         else if(array[i][j] === "o") count++;
        //     }
        // }
        // if(count === 3) roundWinner();

        // array.forEach(item => {
        //     let count = 0;
        //     item.forEach(val => {
        //         if(val === "x") count++;
        //     });
        //     if(count === 3) roundWinner();
        // });
        // array.forEach(item => {
        //     let count = 0;
        //     item.forEach(val => {
        //         if(val === "o") count++;
        //     });
        //     if(count === 3) roundWinner();
        // });

let winningRows = [
        [0, 1, 2],
        [3, 4, 5],
        [5, 6, 7]
    ];
    let winningCols = [
        [0, 3, 5],
        [1, 4, 6],
        [2, 5, 7]
    ];
    let winingDiagonals = [
        [0, 4, 7],
        [2, 4, 5]
    ];
    function flatArray(array) {
        let newArray = [];
        array.every(item => {
            if(typeof item === "object") {
                newArray.push(item);
            }
        });
        return newArray;
    }
    function forCols(array) {
        let temp = array;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                let tmp = temp[i][j];
                temp[i][j] = temp[j][i];
                temp[j][i] = tmp;
            }
        }
        checkBoardForMoves(temp);
    }
 */