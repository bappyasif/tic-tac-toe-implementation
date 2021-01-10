let gameTTT = (() => {
    let gameBoard = [];
    let grid = window.getComputedStyle(document.querySelector(".gameBoard"));
    let numCols = grid.getPropertyValue("--colNum");
    let rowNums = grid.getPropertyValue("--rowNum");
    console.log(numCols, rowNums, typeof numCols);
    let boardArray = (new Array(+rowNums)).fill().map(() => new Array(+numCols).fill(0));
    // let boardArray = (new Array(+rowNums)).fill().map(() => new Array(+numCols).fill(false));
    // console.log(boardArray);
    function showBoard() {
        gameBoard.forEach(item => {
            placeMoves(item.marker, item.cube);
        });
    }
    function placeMoves(marker, cube) {
        console.log(marker, cube);
        let cubeDisplay = document.querySelector(`#${cube}`);
        cubeDisplay.textContent = marker;
    }
    function displayController(marker, cube) {
        if (marker && cube) {
            gameBoard.push({ marker, cube });
            // gameBoard.push([marker, cube]);
            showBoard();
            // if (gameBoard.length > 2) roundWinner();
            if (gameBoard.length > 2) {
                checkRows(boardArray) || checkCols();
            }
        }
    }
    function checkRows(array) {
        array.forEach(item => {
            console.log(item,"??");
            let count = 0;
            item.forEach(val => {
                // console.log(val === "x");
                if(val === "x") {count++}
            });
            if(count === 3) {
                count = 0; 
                roundWinner();
            }
        });
    }
    function checkCols() {
        let temp2D = boardArray;
        for(let i=0;i<temp2D.length; i++) {
            for(let j=0;j<i;j++) {
                let tmp = temp2D[i][j];
                temp2D[i][j] = temp2D[j][i];
                temp2D[j][i] = tmp;
            }
        }
        // console.log(temp2D);
        checkRows(temp2D);
    }
    function roundWinner() {
        console.log("winner!!");

        // console.log(gameBoard);
        // let cols = document.querySelector(".gameBoard");
        // console.log(cols.children, cols.rows[0].cells.length);

        // let grid = window.getComputedStyle(document.querySelector(".gameBoard"));
        // let numCols = grid.getPropertyValue("--colNum");
        // let rowNums = grid.getPropertyValue("--rowNum");
        // console.log(numCols, rowNums);
    }
    function playerMove() {
        let cubes = document.querySelectorAll(".grid-item");
        Array.from(cubes).forEach(item => {
            item.addEventListener("click", () => {
                if (!item.textContent) {
                    let playerMarker = prompt("choose marker", "X/O");
                    let cubeID = item.id;
                    // displayController(playerMarker, cubeID);
                    let cubeNum = item.getAttribute("data-cube");
                    console.log("cube :", cubeNum, typeof cubeNum);
                    for (let i = 0; i < numCols; i++) {
                        for (let j = 0; j < rowNums; j++) {
                            // let newJ = boardArrayUtilityLogic(+cubeNum - 1);
                            // let newI = boardArrayColsLogic(+cubeNum - 1);
                            let newI = boardArrayRowsLogic(+cubeNum - 1);
                            let newJ = boardArrayColsLogic(+cubeNum - 1);
                            // console.log(newI, newJ);
                            // if(i == newI && j == newJ) boardArray[i][j] = playerMarker;
                            if (i == newI && j == newJ) {
                                console.log(newI, newJ);
                                boardArray[i][j] = playerMarker;
                                displayController(playerMarker, cubeID);
                                // console.log(boardArray[i][j], boardArray[i+1][j], boardArray[i+2][j], "<>");
                            }
                        }
                    }
                    // console.log(boardArray);
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





// let test = document.querySelector("#test1");
// console.log(test.textContent, test.value);
/**
 let gameBoard = [];
    function displayController(marker, cube) {
        // if(playerMark && cubeNumber > 0 && cubeNumber < 9) {
        //     // let boradDisplay = document.querySelector(".gameBoard");
        //     let cubeDisplay = document.querySelector(cubeNumber);
        //     console.log(cubeDisplay);
        // }

        // console.log("..");
        if (marker && cube) {
            // let boradDisplay = document.querySelector(".gameBoard");
            console.log(marker, cube);
            // let cubeDisplay = document.querySelector(cubeNumber);
            // let cubeDisplay = document.querySelector(`"#${cubeNumber}"`);
            let cubeDisplay = document.querySelector(`#${cube}`);
            // console.log(cubeDisplay.textContent);
            cubeDisplay.textContent = marker;
        }

        // if (marker && cubeNumber > 0 && cubeNumber < 10) {
        //     // let boradDisplay = document.querySelector(".gameBoard");
        //     let cubeDisplay = document.querySelector(cubeNumber);
        //     // console.log(cubeDisplay.textContent);
        //     cubeDisplay.textContent = marker;
        // }
    }
    function playerMove() {
        let cubes = document.querySelectorAll(".grid-item");
        // console.log(cubes);
        // let playerMarker = prompt("choose marker", "X/O");
        Array.from(cubes).forEach(item => {
            // console.log(item.getAttribute("data-cube"));
            // let cubeNum = item.getAttribute("data-cube");
            // let cubeID = item.id;
            // console.log(cubeID);
            item.addEventListener("click", () => {
                // displayController(playerMarker, cubeNum);
                // let cubeNum = item.getAttribute("data-cube");
                let playerMarker = prompt("choose marker", "X/O");
                console.log(playerMarker, typeof playerMarker);
                let cubeID = item.id;
                console.log(cubeID);
                displayController(playerMarker, cubeID);
            });
        });
        // let playerMarker;
        function checkWinner() {

        }
    }


    function displayController(marker, cube) {
        // console.log("..");
        if (marker && cube) {
            console.log(marker, cube);
            let cubeDisplay = document.querySelector(`#${cube}`);
            cubeDisplay.textContent = marker;
            gameBoard.push({marker, cube});
        }
    }
    function playerMove() {
        let cubes = document.querySelectorAll(".grid-item");
        Array.from(cubes).forEach(item => {
            item.addEventListener("click", () => {
                let playerMarker = prompt("choose marker", "X/O");
                console.log(playerMarker, typeof playerMarker);
                let cubeID = item.id;
                console.log(cubeID);
                displayController(playerMarker, cubeID);
            });
        });

    let gameBoard = [];
    function showBoard() {
        // gameBoard.push({marker: "x", cube: "cube1"});
        // gameBoard.push({marker: "0", cube: "cube2"});
        // gameBoard.push({marker: "x", cube: "cube3"});
        // gameBoard.push({marker: "x", cube: "cube4"});
        // gameBoard.push({marker: "0", cube: "cube5"});
        // gameBoard.push({marker: "x", cube: "cube6"});
        // gameBoard.push({marker: "0", cube: "cube7"});
        // gameBoard.push({marker: "0", cube: "cube8"});
        // gameBoard.push({marker: "0", cube: "cube9"});
        gameBoard.forEach(item => {
            // console.log(item.marker, item.cube);
            // displayController(item.marker, item.cube);
            displayBoard(item.marker, item.cube);
        });
    }
    function displayBoard(marker, cube) {
        console.log(marker, cube);
        let cubeDisplay = document.querySelector(`#${cube}`);
        cubeDisplay.textContent = marker;
    }
    function displayController(marker, cube) {
        // console.log("..");
        if (marker && cube) {
            // console.log(marker, cube);
            // let cubeDisplay = document.querySelector(`#${cube}`);
            // cubeDisplay.textContent = marker;
            gameBoard.push({ marker, cube });
            showBoard();
        }
    }
    function playerMove() {
        let cubes = document.querySelectorAll(".grid-item");
        Array.from(cubes).forEach(item => {
            item.addEventListener("click", () => {
                let playerMarker = prompt("choose marker", "X/O");
                console.log(playerMarker, typeof playerMarker);
                let cubeID = item.id;
                console.log(cubeID);
                displayController(playerMarker, cubeID);
            });
        });
    }
    // showBoard();
    playerMove();
    // console.log();
    // displayController("XX", "#cube1");


        function playerMove() {
        let cubes = document.querySelectorAll(".grid-item");
        Array.from(cubes).forEach(item => {
            item.addEventListener("click", () => {
                if (!item.textContent) {
                    let playerMarker = prompt("choose marker", "X/O");
                    console.log(playerMarker, typeof playerMarker);
                    let cubeID = item.id;
                    console.log(cubeID);
                    displayController(playerMarker, cubeID);
                } else {
                    alert("Spot already been marked");
                }
                // let playerMarker = prompt("choose marker", "X/O");
                // console.log(playerMarker, typeof playerMarker);
                // let cubeID = item.id;
                // console.log(cubeID);
                // displayController(playerMarker, cubeID);
            });
        });
    }


// console.log(boardArray);
    for(let i = 0; i < numCols; i++) {
        for(let j = 0; j < rowNums; j++) {
            // console.log(boardArray[i][j], typeof boardArray[i][j]);
            if(i == 2 && j == 2) boardArray[i][j] = "??";
        }
    }
    console.log(boardArray);

    // let boardArray = Array.from(Array(rowNums), () => new Array(numCols).fill("0"));
    // console.log(boardArray);

    // let boardArray = new Array(rowNums);
    // let boardArray = [];
    // for(let i = 0; i < rowNums; i++) {
    //     boardArray[i] = [];
    //     for(let j = 0; j < numCols; j++) {
    //         if(i == 2 && j == 2) boardArray[i][j] = i+j;
    //     }
    // }
    // console.log(boardArray);
    // let boardArray = [numCols][rowNums];
    // let boardArray;
    // console.log(boardArray);
    // for(let i = 0; i < numCols; i++) {
    //     for(let j = 0; j < rowNums; j++) {
    //         // boardArray[i][j] = i+j;
    //         // boardArray[i][j] = "??"
    //         boardArray.push("??")
    //     }
    // }
    // let boardArray = [];
    // for (let i = 0; i < numCols; i++) {
    //     for (let j = 0; j < rowNums; j++) {
    //         // boardArray.push([i*j]);
    //         boardArray.push(i * j);
    //     }
    // }
    // console.table(boardArray);

    // let boardArray = new Array(rowNums);
        // for(let i = 0; i < rowNums; i++) {
        //     boardArray[i] =  new Array(numCols);
        //     for(let j = 0; j < numCols; j++) {
        //         boardArray[i][j] = i+j;
        //     }
        // }
        // console.log(boardArray);

// let boardArray = Array.from(Array(rowNums), () => new Array(numCols).fill("0"));
                    // console.log(boardArray);
                    // let boardArray = Array(rowNums).fill(Array(numCols).fill(0));
                    // console.log(boardArray);

                    // let boardArray = new Array(rowNums);
                    // for (let i = 0; i < boardArray.length; i++) {
                    //     boardArray[i] = new Array(numCols);
                    // }
                    // boardArray[0][0] = "aa";
                    // console.log(boardArray);
                    // let boardArray = [];
                    // for (let i = 0; i < rowNums; i++) {
                    //     boardArray[i] = [];
                    //     for (let j = 0; j < boardArray[i].length; j++) {
                    //         // if (i == cubeNum - 1 ) boardArray[i][j] = cubeNum;
                    //         // if (cubeNum - 1  > i) boardArray[i][j] = cubeNum;
                    //         // boardArray[i][j] = cubeNum;
                    //         // boardArray[i][j] = "00";
                    //     }
                    // }
                    // console.log(boardArray);

function playerMove() {
        let cubes = document.querySelectorAll(".grid-item");
        Array.from(cubes).forEach(item => {
            item.addEventListener("click", () => {
                if (!item.textContent) {
                    let playerMarker = prompt("choose marker", "X/O");
                    let cubeID = item.id;
                    displayController(playerMarker, cubeID);
                    let cubeNum = item.getAttribute("data-cube");
                    console.log("cube :", cubeNum, typeof cubeNum);
                    for (let i = 0; i < numCols; i++) {
                        for (let j = 0; j < rowNums; j++) {
                            // console.log(boardArray[i][j], typeof boardArray[i][j]);
                            // if (i == 2 && j == 2) boardArray[i][j] = "??";
                            let newJ = boardArrayUtilityLogic(+cubeNum - 1);
                            let newI = boardArrayColsLogic(+cubeNum - 1);
                            // console.log(newI, newJ);
                            if(i == newI && j == newJ) boardArray[i][j] = "<>";
                        }
                    }
                    console.log(boardArray);
                } else {
                    alert("Spot already been marked");
                }
            });
        });
    }
    function boardArrayUtilityLogic(cube) {
        switch(cube) {
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
        switch(cube) {
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

function playerMove() {
        let cubes = document.querySelectorAll(".grid-item");
        Array.from(cubes).forEach(item => {
            item.addEventListener("click", () => {
                if (!item.textContent) {
                    let playerMarker = prompt("choose marker", "X/O");
                    let cubeID = item.id;
                    displayController(playerMarker, cubeID);
                    let cubeNum = item.getAttribute("data-cube");
                    console.log("cube :", cubeNum, typeof cubeNum);
                    for (let i = 0; i < numCols; i++) {
                        for (let j = 0; j < rowNums; j++) {
                            // let newJ = boardArrayUtilityLogic(+cubeNum - 1);
                            // let newI = boardArrayColsLogic(+cubeNum - 1);
                            let newI = boardArrayRowsLogic(+cubeNum - 1);
                            let newJ = boardArrayColsLogic(+cubeNum - 1);
                            console.log(newI, newJ);
                            // if(i == newI && j == newJ) boardArray[i][j] = playerMarker;
                            if (i == newI && j == newJ) {
                                boardArray[i][j] = playerMarker;
                                if (boardArray[i][j] === "x"
                                    &&
                                    boardArray[i][j + 1] === "x"
                                    &&
                                    boardArray[i][j + 2] === "x"
                                ) { roundWinner(); }

                                if (boardArray[i][j] === "x"
                                    &&
                                    boardArray[i - 1][j] === "x"
                                    &&
                                    boardArray[i + 1][j + 1] === "x"
                                ) { roundWinner(); }

                                // if (boardArray[i][j] === playerMarker
                                //     &&
                                //     boardArray[i][j + 1] === playerMarker
                                //     &&
                                //     boardArray[i][j + 2] === playerMarker
                                // ) { roundWinner(); }

                                // if (boardArray[i][j] === playerMarker
                                //     &&
                                //     boardArray[i - 1][j] === playerMarker
                                //     &&
                                //     boardArray[i + 1][j + 1] === playerMarker
                                // ) { roundWinner(); }
                            }
                            // if (boardArray[i][j] === playerMarker
                            //     &&
                            //     boardArray[i][j + 1] === playerMarker
                            //     &&
                            //     boardArray[i][j + 2] === playerMarker
                            // ) { roundWinner(); }

                            // if (boardArray[i][j] === playerMarker
                            //     &&
                            //     boardArray[i - 1][j] === playerMarker
                            //     &&
                            //     boardArray[i + 1][j + 1] === playerMarker
                            // ) { roundWinner(); }
                        }
                    }
                    console.log(boardArray);

                } else {
                    alert("Spot already been marked");
                }
            });
        });
    }

        // for (let i = 0; i < rowNums; i++) {
        //     for (let j = 0; j < numCols; j++) {
        //         if (boardArray[i] === "x"
        //             &&
        //             boardArray[i + 1] === "x"
        //             &&
        //             boardArray[i + 2] === "x"
        //         ) { console.log("winner!!"); }

        //         if (boardArray[i][j] === "x"
        //             &&
        //             boardArray[i - 1][j] === "x"
        //             &&
        //             boardArray[i + 1][j + 1] === "x"
        //         ) { console.log("winner!!"); }
        //     }
        // }

        for(let i=0;i<rowNums;i++) {
            for(let j=0;j<numCols;j++) {
                // boardArray[i][j] === "X" && boardArray[i+1][j] === "X" && boardArray[i+2][j] === "X" ? console.log("winner!!") : ":( :(";
                // boardArray[i] === "x" && boardArray[i+1] === "x" && boardArray[i+2] === "x" ? console.log("winner!!") : ":( :(";
                // boardArray[j] === "x" && boardArray[j+1] === "x" && boardArray[j+2] === "x" ? console.log("winner!!") : ":( :(";
                // boardArray[i][j] === boardArray[i+1][j] === boardArray[i+2][j] ? console.log("winner!!") : ":( :(";
                // boardArray[i][j] === boardArray[i+1] === boardArray[i+2] ? console.log("winner!!") : ":( :(";
                // boardArray[j] === boardArray[j+1] === boardArray[j+2] ? console.log("winner!!") : ":( :(";
            }
        }

// boardArray.forEach(item => item.forEach(val => val === "x"))
        // boardArray.map(item => console.log("<>",item));
        // boardArray.map(item => {
        //     // console.log(item[0],item[1],item[2],"<>");
        //     // item[0] === item[1] === item[2] ? console.log("winner!!") : console.log("try again!!");
        //     item[0] === "x" && item[1] === "x" && item[2] === "x" ? console.log("winner!!") : console.log("try again!!");
        //     item[0] === "o" && item[1] === "o" && item[2] === "o" ? console.log("winner!!") : console.log("try again!!");
        // });


for(let i = 0; i < 3; i++) {
            // boardArray[i] === "x" && boardArray[i+1] === "x" && boardArray[i+2] === "x" ? console.log("winner") : console.log("try again")
            boardArray[i] === boardArray[i+1] === boardArray[i+2] ? console.log("winner") : console.log("try again")
            for(let j=0;j<3;j++) {
                // boardArray[j] === "x" && boardArray[j+1] === "x" && boardArray[j+2] === "x" ? console.log("winner") : console.log("try again")
                // boardArray[j] === boardArray[j+1] === boardArray[j+2] ? console.log("winner") : console.log("try again")
                boardArray[j] === boardArray[j+1] === boardArray[j+2] === "x" ? console.log("winner") : console.log("try again")
            }
        }


function checkRows() {
        // boardArray.forEach(item=>console.log(item[0], item[1], item[2], "<>"))
        boardArray.forEach(item => {
            console.log(item,"??");
            let count = 0;
            item.forEach(val => {
                // console.log(val === "x");
                if(val === "x") {count++}
                // console.log((val === "x").length === 3);
                // val === "x" ? roundWinner() : val === "o" ? roundWinner() : false;
                // val === "x" ? roundWinner() : false;
                // val === "o" ? roundWinner() : false;
                // console.log(val[0], val[1], val[2], "<>");
            })
            if(count === 3) {count = 0; roundWinner();}
            // for(let i=0; i<3;i++) {
            //     // console.log(item[0][0], item[0][1], item[0][2], "<>")
            //     // console.log(item[0][i], item[0][i], item[0][i], "<>");
            //     // item[0][i] === item[0][i] === item[0][i] ? roundWinner() : false;
            //     // item[0][i] === "x" && item[0][i+1] === "x" && item[0][i+2] === "x" ? roundWinner() : false;
            //     // console.log(item[0][i], item[0][i+1], item[0][i+2], "<>");
            // }
        });
    }

function displayController(marker, cube) {
        if (marker && cube) {
            gameBoard.push({ marker, cube });
            // gameBoard.push([marker, cube]);
            showBoard();
            // if (gameBoard.length > 2) roundWinner();
            if (gameBoard.length > 2) {
                // console.log(boardArray);
                // checkRows();
                // checkCols() || checkRows() 
                // checkCols();
                checkRows(boardArray) || checkCols();
            }
        }
    }
    function checkRows(array) {
        // boardArray.forEach(item=>console.log(item[0], item[1], item[2], "<>"))

        array.forEach(item => {
            console.log(item,"??");
            let count = 0;
            item.forEach(val => {
                // console.log(val === "x");
                if(val === "x") {count++}
            });
            if(count === 3) {
                count = 0; 
                roundWinner();
            }
        });

        // boardArray.forEach(item => {
        //     console.log(item,"??");
        //     let count = 0;
        //     item.forEach(val => {
        //         // console.log(val === "x");
        //         if(val === "x") {count++}
        //     });
        //     if(count === 3) {
        //         count = 0; 
        //         roundWinner();
        //     }
        // });
    }
    function checkCols() {
        let temp2D = boardArray;
        for(let i=0;i<temp2D.length; i++) {
            for(let j=0;j<i;j++) {
                let tmp = temp2D[i][j];
                temp2D[i][j] = temp2D[j][i];
                temp2D[j][i] = tmp;
            }
        }
        // console.log(temp2D);
        checkRows(temp2D);
    }
 */