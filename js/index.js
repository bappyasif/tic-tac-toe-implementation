let gameTTT = (() => {
    let startGame = document.querySelector(".start-game");
    startGame.addEventListener("click", eachPlayer);
    let p1Div = document.querySelector(".playerOne");
    let p2Div = document.querySelector(".playerTwo");
    let compDiv = document.querySelector(".playerComputer");
    let gameBoard = [];
    let grid = window.getComputedStyle(document.querySelector(".gameBoard"));
    let numCols = grid.getPropertyValue("--colNum");
    let rowNums = grid.getPropertyValue("--rowNum");
    console.log(numCols, rowNums, typeof numCols);
    p1Div.classList.add("active");
    let gameCount = 0;
    let rounds = 0;
    let p1, p2, r;
    rounds = r;
    let announceWinner = document.querySelector(".announceWinner");
    let cubes = document.querySelectorAll(".grid-item");
    function gameStarter() {
        let p1Marker = prompt("Choose marker Player One", "X");
        let p2Marker = prompt("Choose marker Player Two", "O");
        let p1Span = document.querySelector("#p1-marking");
        let p2Span = document.querySelector("#p2-marking");
        let roundsNumber = +prompt("Choose how many rounds of Tic Tac Toe Game you would like to play?", 3)
        p1Span.textContent = ` " ${p1Marker} "`;
        p2Span.textContent = ` " ${p2Marker} "`;
        alert("Game Begins, Good Luck!!");
        document.querySelectorAll(".item").forEach(item => item.textContent = "00")
        announceWinner.innerHTML = "<strong>:Announcement will be here:</strong>";
        return [p1Marker, p2Marker, +roundsNumber];
    }
    function settingUpPlayerMarkers() {
        rounds = r;
        // if (gameCount === rounds || gameCount
        //     === r) startGame.textContent = "Play Again";
        return [p1, p2];
    }
    function showBoard() {
        gameBoard.forEach(item => {
            placeMoves(item.m, item.c, item.p);
        });
    }
    function placeMoves(marker, cube, player) {
        console.log(marker, cube);
        let cubeDisplay = document.querySelector(`#${cube}`);
        cubeDisplay.innerHTML = "<pre>" + marker + "\n" + "player:" + player + "</pre>";
    }
    function displayController(marker, cube, playerNum, cubeNum) {
        let [m1, m2] = [...settingUpPlayerMarkers()];
        if (playerNum === 1) {
            marker = m1;
        } else if (playerNum === 2) {
            marker = m2;
        }
        if (marker && cube) {
            gameBoard.push({ m: marker, c: cube, p: playerNum, n: cubeNum });
        }
        showBoard();
        startLookingForWinner(gameBoard, playerNum);
    }
    function startLookingForWinner(array, player) {
        let counter = [];
        counter = array.filter(obj => obj.p === player);
        if (counter.length > 2) {
            checkBoard(array, player);
        }
        if (gameCount === 2 && array.length === 9) gameDraw();
        else if (gameCount < 2 && array.length === 9) declareDraw();
    }
    function checkBoard(array, player) {
        let playerBoard = array.filter(x => x.p === player);
        let board = [];
        playerBoard.forEach(item => {
            board.push(+item["n"]);
        });
        let matches = [].concat(winningRows, winningCols, winingDiagonals);
        console.log(matches);
        // board.every(cell => {
        //     if(matches.includes(cell)) roundWinner(board);
        // });
        let winningMove = matches.find(moves => moves.every(cell => board.includes(cell)));
        if (winningMove) declareSingleRoundWinner(winningMove, player);
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
    function declareDraw() {
        announceWinner.textContent = "Match Drawn!!";
        setTimeout(() => {
            announceWinner.textContent = "";
        }, 2200);
        resetBoard();
    }
    let counter = { p1Counter: 0, p2Counter: 0, compCounter: 0 };
    function declareSingleRoundWinner(moves, player) {
        console.log("winner", moves);
        // let maxCount = Math.max(...Object.values(counter));
        // console.log("max: ",maxCount);
        let displayScore;
        if (gameCount < rounds) {
            if (player === 1) {
                counter.p1Counter++;
                gameCount++;
                displayScore = p1Div;
                displayScore.textContent = counter.p1Counter;
            } else if (player === 2) {
                counter.p2Counter++;
                gameCount++;
                displayScore = p2Div;
                displayScore.textContent = counter.p2Counter;
            } else {
                counter.compCounter++;
                gameCount++;
                displayScore = compDiv;
                displayScore.textContent = counter.compCounter;
            }
        }
        roundWinner(player);
        if (gameCount === rounds) {
            gameWinner(player);
            counter.p1Counter = 0;
            counter.p2Counter = 0;
        }
        // roundWinner(player);
        resetBoard();
    }
    function roundWinner(player) {
        announceWinner.innerHTML = `<strong>Round Won By Player: ${player}</strong>`
        setTimeout(() => {
            announceWinner.innerHTML = "";
        }, 2200);
    }
    function gameDraw() {
        announceWinner.innerHTML = `<strong>Game's Drawn</strong>`;
        resetGame();
    }
    function gameWinner(player) {
        console.log("Game Winner!! Player: ", player);
        winningPlayer(player);
    }
    function winningPlayer(player) {
        // announceWinner.innerHTML = `<pre> Oh Yeah!! ${"\n"} player: ${player === 1 ? "1" : player === 2 ? "2" : "Computer"} Wins!! Race To: ${player === 1 ? counter.p1Counter : player === 2 ? counter.p2Counter : counter.compCounter} </pre>`;
        announceWinner.innerHTML = `<pre> Oh Yeah!! ${"\n"} player: ${player === 1 ? "1" : player === 2 ? "2" : "Computer"} Wins!! Race To: ${rounds} </pre>`;
        resetGame();
        // playAgain();
    }
    function resetGame() {
        setTimeout(() => {
            // announceWinner.innerHTML = "Play Game";
            // startGame.textContent = "Start Again";
            document.querySelectorAll(".item").forEach(item => item.textContent = "00");
            playAgain();
            window.location.reload();
        }, 2200);
        // playAgain();
    }
    function resetBoard() {
        setTimeout(() => { boardLayout(); }, 1100);
        // boardLayout();
    }
    function boardLayout() {
        Array.from(cubes).forEach(item => item.innerHTML = "");
        gameBoard = [];
    }
    function playAgain() {
        boardLayout();
        startGame.style.display = "block";
        startGame.textContent = "Start Again";
        gameCount = 0;
        r = 0;
        // eachPlayer();
    }
    function playerOne() {
        flag = false;
        p2Div.classList.add("active");
        p1Div.classList.remove("active");
        // let marker = alert("Player One Placed Marking");
        let marker = null;
        return [marker, 1];
    }
    function playerTwo() {
        p1Div.classList.add("active");
        p2Div.classList.remove("active");
        flag = true;
        // let marker = alert("Player Two Placed Marking");
        let marker = null;
        return [marker, 2];
    }
    let flag = true;
    function eachPlayer() {
        // startGame.remove();
        // let startGame = document.querySelector(".start-game");
        if (gameCount === 0 || rounds === 0) {
            Array.from(cubes).forEach(item => item.textContent = "");
            [p1, p2, r] = [...gameStarter()];
            // rounds = r;
            // startGame.remove();
            startGame.style.display = "none";
        }
        Array.from(cubes).forEach(cube => {
            // console.log("<>",cube, cube.value, "game: "+gameCount);
            cube.addEventListener("click", () => {
                let playerMarker, player;
                if (!cube.textContent) {
                    flag
                        ? [playerMarker, player] = [...playerOne()]
                        : [playerMarker, player] = [...playerTwo()];
                    console.log(playerMarker, player, rounds, gameCount);
                    let cubeID = cube.id;
                    let cubeNumber = cube.getAttribute("data-cube");
                    console.log(cubeNumber, typeof cubeNumber, cubeID);
                    displayController(playerMarker, cubeID, player, cubeNumber);
                } else {
                    alert("cube's taken choose another");
                }
            });
        });
    }
    // settingUpPlayerMarkers();
    // eachPlayer();
})();

/**
 let [p1Marker, p2Marker] = gameStarter();
let startGame = document.querySelector(".start-game");
let gameTTT = ((p1, p2) => {
    let startGame = document.querySelector(".start-game");
    startGame.addEventListener("click", playAgain);
    let gameBoard = [];
    let grid = window.getComputedStyle(document.querySelector(".gameBoard"));
    let numCols = grid.getPropertyValue("--colNum");
    let rowNums = grid.getPropertyValue("--rowNum");
    console.log(numCols, rowNums, typeof numCols);
    // let boardArray = (new Array(+rowNums)).fill().map(() => new Array(+numCols).fill(0));
    let gameCount = 0;
    // let anotherBoard = (new Array(+rowNums)).fill().map(() => new Array(+numCols).fill(0));
    function settingUpPlayerMarkers() {
        // let p1Marker = prompt("Choose marker Player One");
        // let p2Marker = prompt("Choose marker Player Two");

        return [p1Marker = p1, p2Marker = p2];
    }
    function showBoard() {
        gameBoard.forEach(item => {
            placeMoves(item.m, item.c, item.p);
        });
    }
    function placeMoves(marker, cube, player) {
        console.log(marker, cube);
        let cubeDisplay = document.querySelector(`#${cube}`);
        cubeDisplay.innerHTML = "<pre>" + marker + "\n" + "player:" + player + "</pre>";
    }
    function displayController(marker, cube, playerNum, cubeNum) {
        let [m1, m2] = [...settingUpPlayerMarkers()];
        if (playerNum === 1) {
            marker = m1;
        } else if (playerNum === 2) {
            marker = m2;
        }
        if (marker && cube) {
            gameBoard.push({ m: marker, c: cube, p: playerNum, n: cubeNum });
        }
        showBoard();
        startLookingForWinner(gameBoard, playerNum);
    }
    function startLookingForWinner(array, player) {
        let counter = [];
        // counter = array.filter(obj => obj.m === marker);
        counter = array.filter(obj => obj.p === player);
        console.log(player + " length: ", counter.length);
        if (counter.length > 2) {
            checkBoard(array, player);
        }
    }
    function checkBoard(array, player) {
        // console.log(array);
        let playerBoard = array.filter(x => x.p === player);
        let board = [];
        playerBoard.forEach(item => {
            board.push(+item["n"]);
        });
        // console.log(board);
        // console.log(array, playerBoard, player);
        // let matchCol = winningCols.flat();
        // let matchRow = winningRows.flat();
        // let matchDiagonals = winingDiagonals.flat();
        // board.flat();
        // let matches = [].concat(matchCol, matchRow, matchDiagonals);
        let matches = [].concat(winningRows, winningCols, winingDiagonals);
        console.log(matches);
        // board.every(cell => {
        //     if(matches.includes(cell)) roundWinner(board);
        // });
        let winningMove = matches.find(moves => moves.every(cell => board.includes(cell)));
        // console.log(winningMove);
        // if(winningMove) roundWinner(board);
        // if (winningMove) roundWinner(board, winningMove, player);
        if (winningMove) declareSingleRoundWinner(winningMove, player);
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
    let counter = {p1Counter: 0, p2Counter: 0, compCounter: 0};
    function declareSingleRoundWinner(moves, player) {
        console.log("winner",moves);
        // gameCount++;
        // let maxCount = Math.max(Object.values(counter));
        // let maxCount = Object.values(counter);
        let maxCount = Math.max(...Object.values(counter));
        console.log("max: ",maxCount);
        let displayScore;
        // if (gameCount === 3) { gameWinner(); gameCount = 0; }
        // if (maxCount === 2) { gameWinner(player); counter.p1Counter = 0; counter.p2Counter = 0; }
        if (maxCount < 2) {
            if (player === 1) {
                counter.p1Counter++;
                displayScore = document.querySelector(".playerOne");
                displayScore.textContent = counter.p1Counter;
            } else if (player === 2) {
                counter.p2Counter++;
                displayScore = document.querySelector(".playerTwo");
                displayScore.textContent = counter.p2Counter;
            } else {
                counter.compCounter++;
                displayScore = document.querySelector(".playerComputer");
                displayScore.textContent = counter.compCounter;
            }
            // displayScore.textContent = gameCount;
        }
        if (maxCount === 2) {
            displayScore.textContent = "00";
            gameWinner(player);
            counter.p1Counter = 0;
            counter.p2Counter = 0;
            resetBoard();
        }
    }
    function roundWinner(board, moves, player) {
        // console.log("winner!!", boardArray);
        console.log("winner!!", board, moves, player);
        gameCount++;
        let displayScore;
        // if (gameCount === 3) { gameWinner(); gameCount = 0; }
        if (gameCount === 3) { gameWinner(player); gameCount = 0; }
        if (gameCount < 3) {
            if (player === 1) {
                displayScore = document.querySelector(".playerOne");
            } else if (player === 2) {
                displayScore = document.querySelector(".playerTwo");
            } else {
                displayScore = document.querySelector(".playerComputer");
            }
            displayScore.textContent = gameCount;
            resetBoard();
            // let playerOne = document.querySelector(".playerOne");
            // playerOne.textContent = gameCount;
            // console.log("game count: " + gameCount);
            // return resetBoard();
        }
    }
    function gameWinner(player) {
        console.log("Game Winner!!", gameCount, player);
        winningPlayer(player);
        // winningDisplay(player);
        // let gameWinner = document.querySelector(".announceWinner");
        // gameWinner.textContent = "Oh Yeah!!" + gameCount;
        // gameWinner.innerHTML = "<pre>"+"Oh Yeah!!"+"\n"+ "player: "+player+" Wins!! Race To: " + gameCount+"</pre>";
        // setTimeout(() => {
        //     // winningDisplay(player,gameWinner);
        //     winningDisplay(player);
        // },2200);
        // gameBoard = [];
    }
    function winningPlayer(player) {
        let gameWinner = document.querySelector(".announceWinner");
        gameWinner.innerHTML = "<pre>" + "Oh Yeah!!" + "\n" + "player: "
        + player === 1 ? 1 : player === 2 ? 2 : "Computer"
        + " Wins!! Race To: "
        + player === 1 ? counter.p1Counter : player === 2 ? counter.p2Counter : counter.compCounter
        + "</pre>";
        resetGame(gameWinner);
    }
    function winningDisplay(player) {
        // gameWinner.innerHTML = "<pre>"+"Oh Yeah!!"+"\n"+ "player: "+player+" Wins!! Race To: " + gameCount+"</pre>";
        let gameWinner = document.querySelector(".announceWinner");
        gameWinner.innerHTML = "<pre>" + "Oh Yeah!!" + "\n" + "player: " + player + " Wins!! Race To: " + gameCount + "</pre>";
        resetGame(gameWinner);
    }
    function resetGame(divEl) {
        setTimeout(() => {
            divEl.innerHTML = "Play Game";
            startGame.textContent = "Start Again";
            document.querySelectorAll(".item").forEach(item => item.textContent = "00");
        }, 2200);
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
    function playAgain() {
        // startGame.remove()
        eachPlayer();
    }
    // function settingUpPlayerMarkers() {
    //     let p1Marker = prompt("Choose marker Player One");
    //     let p2Marker = prompt("Choose marker Player Two");
    //     return [p1Marker, p2Marker];
    // }
    function playerOne() {
        // let [marker, ] = [...settingUpPlayerMarkers()]
        // let marker = gameBoard
        flag = false;

        // let marker = prompt("Choose marker Player One");
        // let marker = alert("Player One Place Marking", "X/O");
        // let marker = alert("Player One Place Marking", p1Marker);
        // let marker = alert("Player One Place Marking", p1);
        let marker = alert("Player One Place Marking");
        return [marker, 1];
    }
    function playerTwo() {
        flag = true;
        // let marker = prompt("Choose marker Player Two");
        // let [,marker] = [...settingUpPlayerMarkers()];
        // let marker = alert("Player One Place Marking", "X/O");
        // let marker = alert("Player Two Place Marking", p2Marker);
        // let marker = alert("Player Two Place Marking", p2);
        let marker = alert("Player Two Place Marking");
        return [marker, 2];
    }
    let flag = true;
    function eachPlayer() {
        // startGame.remove();
        // let startGame = document.querySelector(".start-game");
        startGame.remove();
        let cubes = document.querySelectorAll(".grid-item");
        Array.from(cubes).forEach(cube => {
            cube.addEventListener("click", () => {
                let playerMarker, player;
                if (!cube.textContent) {
                    flag
                        ? [playerMarker, player] = [...playerOne()]
                        : [playerMarker, player] = [...playerTwo()];
                    console.log(playerMarker, player);
                    let cubeID = cube.id;
                    let cubeNumber = cube.getAttribute("data-cube");
                    console.log(cubeNumber, typeof cubeNumber, cubeID);
                    displayController(playerMarker, cubeID, player, cubeNumber);
                } else {
                    alert("cube's taken choose another");
                }
            });
        });
    }
    // settingUpPlayerMarkers();
    eachPlayer();
})(p1Marker, p2Marker);

// let startGame = document.querySelector(".start-game");
// startGame.addEventListener("click", gameStarter);
// startGame.addEventListener("click", () => {
//     let p1Marker = prompt("Choose marker Player One");
//     let p2Marker = prompt("Choose marker Player Two");
//     alert("Game Begins, Good Luck!!");
//     // gameTTT(p1Marker,p2Marker);
//     return [p1Marker, p2Marker];
// });

function gameStarter() {
    let p1Marker = prompt("Choose marker Player One");
    let p2Marker = prompt("Choose marker Player Two");
    let p1Span = document.querySelector("#p1-marking");
    let p2Span = document.querySelector("#p2-marking");
    p1Span.textContent = ` " ${p1Marker} "`;
    p2Span.textContent = ` " ${p2Marker} "`;
    alert("Game Begins, Good Luck!!");
    document.querySelectorAll(".item").forEach(item => item.textContent = "00")
    // startGame.remove();
    // gameTTT(p1Marker,p2Marker);
    return [p1Marker, p2Marker];
}


    function playerOne() {
        flag = false;
        p2Div.classList.add("active");
        p1Div.classList.remove("active");
        // let marker = alert("Player One Placed Marking");
        let marker = null;
        return [marker, 1];
    }
    function playerTwo() {
        p1Div.classList.add("active");
        p2Div.classList.remove("active");
        flag = true;
        // let marker = alert("Player Two Placed Marking");
        let marker = null;
        return [marker, 2];
    }

function declareSingleRoundWinner(moves, player) {
        console.log("winner",moves);
        let maxCount = Math.max(...Object.values(counter));
        // console.log("max: ",maxCount);
        let displayScore;
        if (maxCount < 2) {
            if (player === 1) {
                counter.p1Counter++;
                displayScore = p1Div;
                displayScore.textContent = counter.p1Counter;
            } else if (player === 2) {
                counter.p2Counter++;
                displayScore = p2Div;
                displayScore.textContent = counter.p2Counter;
            } else {
                counter.compCounter++;
                displayScore = compDiv;
                displayScore.textContent = counter.compCounter;
            }
        }
        if (maxCount === 2) {
            gameWinner(player);
            counter.p1Counter = 0;
            counter.p2Counter = 0;
            // resetBoard();
        }
        resetBoard();
    }
    function gameWinner(player) {
        console.log("Game Winner!! Player: ", player);
        winningPlayer(player);
    }
    function winningPlayer(player) {
        let gameWinner = document.querySelector(".announceWinner");
        gameWinner.innerHTML = `<pre> Oh Yeah!! ${"\n"} player: ${player === 1 ? "1" : player === 2 ? "2" : "Computer"} Wins!! Race To: ${player === 1 ? counter.p1Counter : player === 2 ? counter.p2Counter : counter.compCounter} </pre>`;
        // console.log("..");
        // gameWinner.innerHTML = "<pre>" + "Oh Yeah!!" + "\n" + "player: "
        // + player === 1 ? 1 : player === 2 ? 2 : "Computer"
        // + " Wins!! Race To: "
        // + player === 1 ? counter.p1Counter : player === 2 ? counter.p2Counter : counter.compCounter
        // + "</pre>";
        resetGame(gameWinner);
    }

let [p1Marker, p2Marker] = gameStarter();
// let startGame = document.querySelector(".start-game");
let gameTTT = ((p1, p2) => {
    let startGame = document.querySelector(".start-game");
    startGame.addEventListener("click", playAgain);
    let p1Div = document.querySelector(".playerOne");
    let p2Div = document.querySelector(".playerTwo");
    let compDiv = document.querySelector(".playerComputer");
    let gameBoard = [];
    let grid = window.getComputedStyle(document.querySelector(".gameBoard"));
    let numCols = grid.getPropertyValue("--colNum");
    let rowNums = grid.getPropertyValue("--rowNum");
    console.log(numCols, rowNums, typeof numCols);
    p1Div.classList.add("active");
    let gameCount = 0;
    let announceWinner = document.querySelector(".announceWinner");
    function settingUpPlayerMarkers() {
        // let p1Marker = prompt("Choose marker Player One");
        // let p2Marker = prompt("Choose marker Player Two");
        return [p1Marker = p1, p2Marker = p2];
    }
    function showBoard() {
        gameBoard.forEach(item => {
            placeMoves(item.m, item.c, item.p);
        });
    }
    function placeMoves(marker, cube, player) {
        console.log(marker, cube);
        let cubeDisplay = document.querySelector(`#${cube}`);
        cubeDisplay.innerHTML = "<pre>" + marker + "\n" + "player:" + player + "</pre>";
    }
    function displayController(marker, cube, playerNum, cubeNum) {
        let [m1, m2] = [...settingUpPlayerMarkers()];
        if (playerNum === 1) {
            marker = m1;
        } else if (playerNum === 2) {
            marker = m2;
        }
        if (marker && cube) {
            gameBoard.push({ m: marker, c: cube, p: playerNum, n: cubeNum });
        }
        showBoard();
        startLookingForWinner(gameBoard, playerNum);
    }
    function startLookingForWinner(array, player) {
        let counter = [];
        counter = array.filter(obj => obj.p === player);
        // console.log(player + " length: ", counter.length);
        if (counter.length > 2) {
            checkBoard(array, player);
        }
        // console.log(array.length,counter.length);
        if(gameCount === 2 && array.length === 9) gameDraw();
        else if(gameCount < 2 && array.length === 9) declareDraw();
        // if(array.length === 9 || counter.length === 9) declareDraw();
    }
    function checkBoard(array, player) {
        // console.log(array);
        let playerBoard = array.filter(x => x.p === player);
        let board = [];
        playerBoard.forEach(item => {
            board.push(+item["n"]);
        });
        let matches = [].concat(winningRows, winningCols, winingDiagonals);
        console.log(matches);
        // board.every(cell => {
        //     if(matches.includes(cell)) roundWinner(board);
        // });
        let winningMove = matches.find(moves => moves.every(cell => board.includes(cell)));
        if (winningMove) declareSingleRoundWinner(winningMove, player);
        // if(gameBoard.length === 9) declareDraw();
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
    function declareDraw() {
        announceWinner.textContent = "Match Drawn!!";
        setTimeout(() => {
            announceWinner.textContent = "";
        }, 2200);
        resetBoard();
        // document.querySelector(".announceWinner").textContent = "Match Drawn!!";
        // setTimeout(() => {
        //     document.querySelector(".announceWinner").textContent = "";
        // }, 2200);
        // resetBoard();
    }
    let counter = {p1Counter: 0, p2Counter: 0, compCounter: 0};
    function declareSingleRoundWinner(moves, player) {
        console.log("winner",moves);
        // let maxCount = Math.max(...Object.values(counter));
        // console.log("max: ",maxCount);
        let displayScore;
        // let gameCount = 0;
        if (gameCount < 3) {
            if (player === 1) {
                counter.p1Counter++;
                gameCount++;
                displayScore = p1Div;
                displayScore.textContent = counter.p1Counter;
            } else if (player === 2) {
                counter.p2Counter++;
                gameCount++;
                displayScore = p2Div;
                displayScore.textContent = counter.p2Counter;
            } else {
                counter.compCounter++;
                gameCount++;
                displayScore = compDiv;
                displayScore.textContent = counter.compCounter;
            }
        }
        if (gameCount === 3) {
            gameWinner(player);
            // if(counter.p1Counter === counter.p2Counter) {
            //     gameDraw();
            // }
            counter.p1Counter = 0;
            counter.p2Counter = 0;
            // gameWinner(player);
            // counter.p1Counter = 0;
            // counter.p2Counter = 0;
            // resetBoard();
        }
        // if (maxCount < 2) {
        //     if (player === 1) {
        //         counter.p1Counter++;
        //         gameCount++;
        //         displayScore = p1Div;
        //         displayScore.textContent = counter.p1Counter;
        //     } else if (player === 2) {
        //         counter.p2Counter++;
        //         gameCount++;
        //         displayScore = p2Div;
        //         displayScore.textContent = counter.p2Counter;
        //     } else {
        //         counter.compCounter++;
        //         gameCount++;
        //         displayScore = compDiv;
        //         displayScore.textContent = counter.compCounter;
        //     }
        // }
        // if (maxCount === 2) {
        //     gameWinner(player);
        //     // if(counter.p1Counter === 1 && counter.p2Counter === 2) {
        //     //     gameDraw();
        //     // }
        //     counter.p1Counter = 0;
        //     counter.p2Counter = 0;
        //     // gameWinner(player);
        //     // counter.p1Counter = 0;
        //     // counter.p2Counter = 0;
        //     // resetBoard();
        // }

        roundWinner(player);

        resetBoard();
    }
    function roundWinner(player) {
        announceWinner.innerHTML = `<strong>Round Won By Player: ${player}</strong>`
        setTimeout(() => {
            announceWinner.innerHTML = "";
        },2200);
    }
    function gameDraw() {
        announceWinner.innerHTML = `<strong>Game's Drawn</strong>`;
        resetGame();
        // let announceWinner = document.querySelector(".announceWinner");
        // announceWinner.innerHTML = `<strong>Game's Drawn</strong>`;
        // resetGame(announceWinner);
    }
    function gameWinner(player) {
        console.log("Game Winner!! Player: ", player);
        winningPlayer(player);
    }
    function winningPlayer(player) {
        announceWinner.innerHTML = `<pre> Oh Yeah!! ${"\n"} player: ${player === 1 ? "1" : player === 2 ? "2" : "Computer"} Wins!! Race To: ${player === 1 ? counter.p1Counter : player === 2 ? counter.p2Counter : counter.compCounter} </pre>`;
        resetGame();
    }
    // function winningPlayer(player) {
    //     let announceWinner = document.querySelector(".announceWinner");
    //     announceWinner.innerHTML = `<pre> Oh Yeah!! ${"\n"} player: ${player === 1 ? "1" : player === 2 ? "2" : "Computer"} Wins!! Race To: ${player === 1 ? counter.p1Counter : player === 2 ? counter.p2Counter : counter.compCounter} </pre>`;
    //     // console.log("..");
    //     // gameWinner.innerHTML = "<pre>" + "Oh Yeah!!" + "\n" + "player: "
    //     // + player === 1 ? 1 : player === 2 ? 2 : "Computer"
    //     // + " Wins!! Race To: "
    //     // + player === 1 ? counter.p1Counter : player === 2 ? counter.p2Counter : counter.compCounter
    //     // + "</pre>";
    //     // resetGame(gameWinner);
    //     resetGame(announceWinner);
    // }
    function resetGame() {
        startGame.textContent = "Start Again";
        setTimeout(() => {
            announceWinner.innerHTML = "Play Game";
            // startGame.textContent = "Start Again";
            document.querySelectorAll(".item").forEach(item => item.textContent = "00");
        }, 2200);
    }
    // function resetGame(divEl) {
    //     setTimeout(() => {
    //         divEl.innerHTML = "Play Game";
    //         startGame.textContent = "Start Again";
    //         document.querySelectorAll(".item").forEach(item => item.textContent = "00");
    //     }, 2200);
    // }
    function resetBoard() {
        setTimeout(() => { boardLayout(); }, 2200);
    }
    function boardLayout() {
        let cubes = document.querySelectorAll(".grid-item");
        Array.from(cubes).forEach(item => item.textContent = "");
        // boardArray = [];
        gameBoard = [];
    }
    function playAgain() {
        // startGame.remove()
        eachPlayer();
    }
    function playerOne() {
        flag = false;
        p2Div.classList.add("active");
        p1Div.classList.remove("active");
        // let marker = alert("Player One Placed Marking");
        let marker = null;
        return [marker, 1];
    }
    function playerTwo() {
        p1Div.classList.add("active");
        p2Div.classList.remove("active");
        flag = true;
        // let marker = alert("Player Two Placed Marking");
        let marker = null;
        return [marker, 2];
    }
    let flag = true;
    function eachPlayer() {
        // startGame.remove();
        // let startGame = document.querySelector(".start-game");
        startGame.remove();
        let cubes = document.querySelectorAll(".grid-item");
        Array.from(cubes).forEach(cube => {
            cube.addEventListener("click", () => {
                let playerMarker, player;
                if (!cube.textContent) {
                    flag
                        ? [playerMarker, player] = [...playerOne()]
                        : [playerMarker, player] = [...playerTwo()];
                    console.log(playerMarker, player);
                    let cubeID = cube.id;
                    let cubeNumber = cube.getAttribute("data-cube");
                    console.log(cubeNumber, typeof cubeNumber, cubeID);
                    displayController(playerMarker, cubeID, player, cubeNumber);
                } else {
                    alert("cube's taken choose another");
                }
            });
        });
    }
    // settingUpPlayerMarkers();
    eachPlayer();
})(p1Marker, p2Marker);


// let [p1Marker, p2Marker] = gameStarter();
let [p1Marker, p2Marker, rounds] = gameStarter();
let gameTTT = ((p1, p2, rounds) => {
    let startGame = document.querySelector(".start-game");
    startGame.addEventListener("click", playAgain);
    let p1Div = document.querySelector(".playerOne");
    let p2Div = document.querySelector(".playerTwo");
    let compDiv = document.querySelector(".playerComputer");
    let gameBoard = [];
    let grid = window.getComputedStyle(document.querySelector(".gameBoard"));
    let numCols = grid.getPropertyValue("--colNum");
    let rowNums = grid.getPropertyValue("--rowNum");
    console.log(numCols, rowNums, typeof numCols);
    p1Div.classList.add("active");
    let gameCount = 0;
    let announceWinner = document.querySelector(".announceWinner");
    function gameStarter() {
        let p1Marker = prompt("Choose marker Player One", "X");
        let p2Marker = prompt("Choose marker Player Two", "O");
        let p1Span = document.querySelector("#p1-marking");
        let p2Span = document.querySelector("#p2-marking");
        let roundsNumber = +prompt("Choose how many rounds of Tic Tac Toe Game you would like to play?", 3)
        p1Span.textContent = ` " ${p1Marker} "`;
        p2Span.textContent = ` " ${p2Marker} "`;
        alert("Game Begins, Good Luck!!");
        document.querySelectorAll(".item").forEach(item => item.textContent = "00")
        // return [p1Marker, p2Marker];
        return [p1Marker, p2Marker, +roundsNumber];
    }
    function settingUpPlayerMarkers() {
        // let p1Marker = prompt("Choose marker Player One");
        // let p2Marker = prompt("Choose marker Player Two");
        return [p1Marker = p1, p2Marker = p2];
    }
    function showBoard() {
        gameBoard.forEach(item => {
            placeMoves(item.m, item.c, item.p);
        });
    }
    function placeMoves(marker, cube, player) {
        console.log(marker, cube);
        let cubeDisplay = document.querySelector(`#${cube}`);
        cubeDisplay.innerHTML = "<pre>" + marker + "\n" + "player:" + player + "</pre>";
    }
    function displayController(marker, cube, playerNum, cubeNum) {
        let [m1, m2] = [...settingUpPlayerMarkers()];
        if (playerNum === 1) {
            marker = m1;
        } else if (playerNum === 2) {
            marker = m2;
        }
        if (marker && cube) {
            gameBoard.push({ m: marker, c: cube, p: playerNum, n: cubeNum });
        }
        showBoard();
        startLookingForWinner(gameBoard, playerNum);
    }
    function startLookingForWinner(array, player) {
        let counter = [];
        counter = array.filter(obj => obj.p === player);
        if (counter.length > 2) {
            checkBoard(array, player);
        }
        if(gameCount === 2 && array.length === 9) gameDraw();
        else if(gameCount < 2 && array.length === 9) declareDraw();
    }
    function checkBoard(array, player) {
        let playerBoard = array.filter(x => x.p === player);
        let board = [];
        playerBoard.forEach(item => {
            board.push(+item["n"]);
        });
        let matches = [].concat(winningRows, winningCols, winingDiagonals);
        console.log(matches);
        // board.every(cell => {
        //     if(matches.includes(cell)) roundWinner(board);
        // });
        let winningMove = matches.find(moves => moves.every(cell => board.includes(cell)));
        if (winningMove) declareSingleRoundWinner(winningMove, player);
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
    function declareDraw() {
        announceWinner.textContent = "Match Drawn!!";
        setTimeout(() => {
            announceWinner.textContent = "";
        }, 2200);
        resetBoard();
    }
    let counter = {p1Counter: 0, p2Counter: 0, compCounter: 0};
    function declareSingleRoundWinner(moves, player) {
        console.log("winner",moves);
        // let maxCount = Math.max(...Object.values(counter));
        // console.log("max: ",maxCount);
        let displayScore;
        if (gameCount < rounds) {
            if (player === 1) {
                counter.p1Counter++;
                gameCount++;
                displayScore = p1Div;
                displayScore.textContent = counter.p1Counter;
            } else if (player === 2) {
                counter.p2Counter++;
                gameCount++;
                displayScore = p2Div;
                displayScore.textContent = counter.p2Counter;
            } else {
                counter.compCounter++;
                gameCount++;
                displayScore = compDiv;
                displayScore.textContent = counter.compCounter;
            }
        }
        roundWinner(player);
        if (gameCount === rounds) {
            gameWinner(player);
            counter.p1Counter = 0;
            counter.p2Counter = 0;
        }
        // roundWinner(player);
        resetBoard();
    }
    function roundWinner(player) {
        announceWinner.innerHTML = `<strong>Round Won By Player: ${player}</strong>`
        setTimeout(() => {
            announceWinner.innerHTML = "";
        },2200);
    }
    function gameDraw() {
        announceWinner.innerHTML = `<strong>Game's Drawn</strong>`;
        resetGame();
    }
    function gameWinner(player) {
        console.log("Game Winner!! Player: ", player);
        winningPlayer(player);
    }
    function winningPlayer(player) {
        // announceWinner.innerHTML = `<pre> Oh Yeah!! ${"\n"} player: ${player === 1 ? "1" : player === 2 ? "2" : "Computer"} Wins!! Race To: ${player === 1 ? counter.p1Counter : player === 2 ? counter.p2Counter : counter.compCounter} </pre>`;
        announceWinner.innerHTML = `<pre> Oh Yeah!! ${"\n"} player: ${player === 1 ? "1" : player === 2 ? "2" : "Computer"} Wins!! Race To: ${rounds} </pre>`;
        resetGame();
    }
    function resetGame() {
        startGame.textContent = "Start Again";
        setTimeout(() => {
            announceWinner.innerHTML = "Play Game";
            // startGame.textContent = "Start Again";
            document.querySelectorAll(".item").forEach(item => item.textContent = "00");
        }, 2200);
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
    function playAgain() {
        // startGame.remove()
        eachPlayer();
    }
    function playerOne() {
        flag = false;
        p2Div.classList.add("active");
        p1Div.classList.remove("active");
        // let marker = alert("Player One Placed Marking");
        let marker = null;
        return [marker, 1];
    }
    function playerTwo() {
        p1Div.classList.add("active");
        p2Div.classList.remove("active");
        flag = true;
        // let marker = alert("Player Two Placed Marking");
        let marker = null;
        return [marker, 2];
    }
    let flag = true;
    function eachPlayer() {
        // startGame.remove();
        // let startGame = document.querySelector(".start-game");
        startGame.remove();
        let cubes = document.querySelectorAll(".grid-item");
        Array.from(cubes).forEach(cube => {
            cube.addEventListener("click", () => {
                let playerMarker, player;
                if (!cube.textContent) {
                    flag
                        ? [playerMarker, player] = [...playerOne()]
                        : [playerMarker, player] = [...playerTwo()];
                    console.log(playerMarker, player);
                    let cubeID = cube.id;
                    let cubeNumber = cube.getAttribute("data-cube");
                    console.log(cubeNumber, typeof cubeNumber, cubeID);
                    displayController(playerMarker, cubeID, player, cubeNumber);
                } else {
                    alert("cube's taken choose another");
                }
            });
        });
    }
    // settingUpPlayerMarkers();
    eachPlayer();
})(p1Marker, p2Marker, rounds);

function gameStarter() {
    let p1Marker = prompt("Choose marker Player One", "X");
    let p2Marker = prompt("Choose marker Player Two", "O");
    let p1Span = document.querySelector("#p1-marking");
    let p2Span = document.querySelector("#p2-marking");
    let roundsNumber = +prompt("Choose how many rounds of Tic Tac Toe Game you would like to play?", 3)
    p1Span.textContent = ` " ${p1Marker} "`;
    p2Span.textContent = ` " ${p2Marker} "`;
    alert("Game Begins, Good Luck!!");
    document.querySelectorAll(".item").forEach(item => item.textContent = "00")
    // return [p1Marker, p2Marker];
    return [p1Marker, p2Marker, +roundsNumber];
}



// let [p1Marker, p2Marker] = gameStarter();
// let [p1Marker, p2Marker, rounds] = gameStarter();
let gameTTT = (() => {
    let startGame = document.querySelector(".start-game");
    // startGame.addEventListener("click", playAgain);
    // startGame.addEventListener("click", settingUpPlayerMarkers);
    // startGame.addEventListener("click", gameStarter);
    startGame.addEventListener("click", eachPlayer);
    let p1Div = document.querySelector(".playerOne");
    let p2Div = document.querySelector(".playerTwo");
    let compDiv = document.querySelector(".playerComputer");
    let gameBoard = [];
    let grid = window.getComputedStyle(document.querySelector(".gameBoard"));
    let numCols = grid.getPropertyValue("--colNum");
    let rowNums = grid.getPropertyValue("--rowNum");
    console.log(numCols, rowNums, typeof numCols);
    p1Div.classList.add("active");
    let gameCount = 0;
    let rounds;
    // let [p1,p2,r] = [...gameStarter()];
    let p1, p2, r;
    rounds = r;
    let announceWinner = document.querySelector(".announceWinner");
    let cubes = document.querySelectorAll(".grid-item");
    function gameStarter() {
        let p1Marker = prompt("Choose marker Player One", "X");
        let p2Marker = prompt("Choose marker Player Two", "O");
        let p1Span = document.querySelector("#p1-marking");
        let p2Span = document.querySelector("#p2-marking");
        let roundsNumber = +prompt("Choose how many rounds of Tic Tac Toe Game you would like to play?", 3)
        p1Span.textContent = ` " ${p1Marker} "`;
        p2Span.textContent = ` " ${p2Marker} "`;
        alert("Game Begins, Good Luck!!");
        document.querySelectorAll(".item").forEach(item => item.textContent = "00")
        announceWinner.innerHTML = "<strong>:Announcement will be here:</strong>";
        // return [p1Marker, p2Marker];
        return [p1Marker, p2Marker, +roundsNumber];
    }
    // if(gameCount === 0) [p1,p2, r] = [...gameStarter()];
    function settingUpPlayerMarkers() {
        // let p1Marker = prompt("Choose marker Player One");
        // let p2Marker = prompt("Choose marker Player Two");
        // return [p1Marker = p1, p2Marker = p2];
        // let [p1,p2,r]  = [...gameStarter()];
        // if(gameCount === 0) [p1,p2, r] = [...gameStarter()];
        rounds = r;
        // eachPlayer();
        // return [p1="XX",p2="OO"];
        // console.log(p1,p2,r);
        return [p1, p2];
    }
    function showBoard() {
        gameBoard.forEach(item => {
            placeMoves(item.m, item.c, item.p);
        });
    }
    function placeMoves(marker, cube, player) {
        console.log(marker, cube);
        let cubeDisplay = document.querySelector(`#${cube}`);
        cubeDisplay.innerHTML = "<pre>" + marker + "\n" + "player:" + player + "</pre>";
    }
    function displayController(marker, cube, playerNum, cubeNum) {
        let [m1, m2] = [...settingUpPlayerMarkers()];
        // let [m1, m2, r] = [...settingUpPlayerMarkers()];
        // rounds = r;
        // console.log(m1,m2);
        if (playerNum === 1) {
            marker = m1;
        } else if (playerNum === 2) {
            marker = m2;
        }
        if (marker && cube) {
            gameBoard.push({ m: marker, c: cube, p: playerNum, n: cubeNum });
        }
        showBoard();
        startLookingForWinner(gameBoard, playerNum);
    }
    function startLookingForWinner(array, player) {
        let counter = [];
        counter = array.filter(obj => obj.p === player);
        if (counter.length > 2) {
            checkBoard(array, player);
        }
        if (gameCount === 2 && array.length === 9) gameDraw();
        else if (gameCount < 2 && array.length === 9) declareDraw();
    }
    function checkBoard(array, player) {
        let playerBoard = array.filter(x => x.p === player);
        let board = [];
        playerBoard.forEach(item => {
            board.push(+item["n"]);
        });
        let matches = [].concat(winningRows, winningCols, winingDiagonals);
        console.log(matches);
        // board.every(cell => {
        //     if(matches.includes(cell)) roundWinner(board);
        // });
        let winningMove = matches.find(moves => moves.every(cell => board.includes(cell)));
        if (winningMove) declareSingleRoundWinner(winningMove, player);
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
    function declareDraw() {
        announceWinner.textContent = "Match Drawn!!";
        setTimeout(() => {
            announceWinner.textContent = "";
        }, 2200);
        resetBoard();
    }
    let counter = { p1Counter: 0, p2Counter: 0, compCounter: 0 };
    function declareSingleRoundWinner(moves, player) {
        console.log("winner", moves);
        // let maxCount = Math.max(...Object.values(counter));
        // console.log("max: ",maxCount);
        let displayScore;
        if (gameCount < rounds) {
            if (player === 1) {
                counter.p1Counter++;
                gameCount++;
                displayScore = p1Div;
                displayScore.textContent = counter.p1Counter;
            } else if (player === 2) {
                counter.p2Counter++;
                gameCount++;
                displayScore = p2Div;
                displayScore.textContent = counter.p2Counter;
            } else {
                counter.compCounter++;
                gameCount++;
                displayScore = compDiv;
                displayScore.textContent = counter.compCounter;
            }
        }
        roundWinner(player);
        if (gameCount === rounds) {
            gameWinner(player);
            counter.p1Counter = 0;
            counter.p2Counter = 0;
        }
        // roundWinner(player);
        resetBoard();
    }
    function roundWinner(player) {
        announceWinner.innerHTML = `<strong>Round Won By Player: ${player}</strong>`
        setTimeout(() => {
            announceWinner.innerHTML = "";
        }, 2200);
    }
    function gameDraw() {
        announceWinner.innerHTML = `<strong>Game's Drawn</strong>`;
        resetGame();
    }
    function gameWinner(player) {
        console.log("Game Winner!! Player: ", player);
        winningPlayer(player);
    }
    function winningPlayer(player) {
        // announceWinner.innerHTML = `<pre> Oh Yeah!! ${"\n"} player: ${player === 1 ? "1" : player === 2 ? "2" : "Computer"} Wins!! Race To: ${player === 1 ? counter.p1Counter : player === 2 ? counter.p2Counter : counter.compCounter} </pre>`;
        announceWinner.innerHTML = `<pre> Oh Yeah!! ${"\n"} player: ${player === 1 ? "1" : player === 2 ? "2" : "Computer"} Wins!! Race To: ${rounds} </pre>`;
        resetGame();
        // playAgain();
    }
    function resetGame() {
        startGame.textContent = "Start Again";
        gameCount = 0;
        // eachPlayer();
        setTimeout(() => {
            announceWinner.innerHTML = "Play Game";
            startGame.textContent = "Start Again";
            document.querySelectorAll(".item").forEach(item => item.textContent = "00");
            // playAgain();
        }, 2200);
        // playAgain();
    }
    function resetBoard() {
        setTimeout(() => { boardLayout(); }, 2200);
        // boardLayout();
    }
    function boardLayout() {
        // let cubes = document.querySelectorAll(".grid-item");
        // Array.from(cubes).forEach(item => item.textContent = "");
        Array.from(cubes).forEach(item => item.textContent = null);
        // boardArray = [];
        gameBoard = [];
    }
    function playAgain() {
        // startGame.remove()
        // resetBoard();
        gameBoard = [];
        boardLayout();
        eachPlayer();
    }
    function playerOne() {
        flag = false;
        p2Div.classList.add("active");
        p1Div.classList.remove("active");
        // let marker = alert("Player One Placed Marking");
        let marker = null;
        return [marker, 1];
    }
    function playerTwo() {
        p1Div.classList.add("active");
        p2Div.classList.remove("active");
        flag = true;
        // let marker = alert("Player Two Placed Marking");
        let marker = null;
        return [marker, 2];
    }
    let flag = true;
    function eachPlayer() {
        // startGame.remove();
        // let startGame = document.querySelector(".start-game");
        if (gameCount === 0) {
            [p1, p2, r] = [...gameStarter()];
            startGame.remove();
        } else if(gameCount === rounds) startGame.textContent = "Play Again";
        // else {
        //     startGame.remove();
        //     let cubes = document.querySelectorAll(".grid-item");
        //     Array.from(cubes).forEach(cube => {
        //         cube.addEventListener("click", () => {
        //             let playerMarker, player;
        //             if (!cube.textContent) {
        //                 flag
        //                     ? [playerMarker, player] = [...playerOne()]
        //                     : [playerMarker, player] = [...playerTwo()];
        //                 console.log(playerMarker, player);
        //                 let cubeID = cube.id;
        //                 let cubeNumber = cube.getAttribute("data-cube");
        //                 console.log(cubeNumber, typeof cubeNumber, cubeID);
        //                 displayController(playerMarker, cubeID, player, cubeNumber);
        //             } else {
        //                 alert("cube's taken choose another");
        //             }
        //         });
        //     });
        // }
        // startGame.remove();
        // let cubes = document.querySelectorAll(".grid-item");
        Array.from(cubes).forEach(cube => {
            console.log(cube, cube.value);
            cube.addEventListener("click", () => {
                let playerMarker, player;
                if (!cube.textContent) {
                    flag
                        ? [playerMarker, player] = [...playerOne()]
                        : [playerMarker, player] = [...playerTwo()];
                    console.log(playerMarker, player);
                    let cubeID = cube.id;
                    let cubeNumber = cube.getAttribute("data-cube");
                    console.log(cubeNumber, typeof cubeNumber, cubeID);
                    displayController(playerMarker, cubeID, player, cubeNumber);
                } else {
                    alert("cube's taken choose another");
                }
            });
        });
    }
    // settingUpPlayerMarkers();
    // eachPlayer();
})();



let gameTTT = (() => {
    let startGame = document.querySelector(".start-game");
    startGame.addEventListener("click", eachPlayer);
    let p1Div = document.querySelector(".playerOne");
    let p2Div = document.querySelector(".playerTwo");
    let compDiv = document.querySelector(".playerComputer");
    let gameBoard = [];
    let grid = window.getComputedStyle(document.querySelector(".gameBoard"));
    let numCols = grid.getPropertyValue("--colNum");
    let rowNums = grid.getPropertyValue("--rowNum");
    console.log(numCols, rowNums, typeof numCols);
    p1Div.classList.add("active");
    let gameCount = 0;
    let rounds;
    let p1, p2, r;
    rounds = r;
    let announceWinner = document.querySelector(".announceWinner");
    let cubes = document.querySelectorAll(".grid-item");
    function gameStarter() {
        let p1Marker = prompt("Choose marker Player One", "X");
        let p2Marker = prompt("Choose marker Player Two", "O");
        let p1Span = document.querySelector("#p1-marking");
        let p2Span = document.querySelector("#p2-marking");
        let roundsNumber = +prompt("Choose how many rounds of Tic Tac Toe Game you would like to play?", 3)
        p1Span.textContent = ` " ${p1Marker} "`;
        p2Span.textContent = ` " ${p2Marker} "`;
        alert("Game Begins, Good Luck!!");
        document.querySelectorAll(".item").forEach(item => item.textContent = "00")
        announceWinner.innerHTML = "<strong>:Announcement will be here:</strong>";
        // return [p1Marker, p2Marker];
        return [p1Marker, p2Marker, +roundsNumber];
    }
    // if(gameCount === 0) [p1,p2, r] = [...gameStarter()];
    function settingUpPlayerMarkers() {
        rounds = r;
        // if (gameCount === rounds || gameCount
        //     === r) startGame.textContent = "Play Again";
        return [p1, p2];
    }
    function showBoard() {
        gameBoard.forEach(item => {
            placeMoves(item.m, item.c, item.p);
        });
    }
    function placeMoves(marker, cube, player) {
        console.log(marker, cube);
        let cubeDisplay = document.querySelector(`#${cube}`);
        cubeDisplay.innerHTML = "<pre>" + marker + "\n" + "player:" + player + "</pre>";
    }
    function displayController(marker, cube, playerNum, cubeNum) {
        let [m1, m2] = [...settingUpPlayerMarkers()];
        if (playerNum === 1) {
            marker = m1;
        } else if (playerNum === 2) {
            marker = m2;
        }
        if (marker && cube) {
            gameBoard.push({ m: marker, c: cube, p: playerNum, n: cubeNum });
        }
        showBoard();
        startLookingForWinner(gameBoard, playerNum);
    }
    function startLookingForWinner(array, player) {
        let counter = [];
        counter = array.filter(obj => obj.p === player);
        if (counter.length > 2) {
            checkBoard(array, player);
        }
        if (gameCount === 2 && array.length === 9) gameDraw();
        else if (gameCount < 2 && array.length === 9) declareDraw();
    }
    function checkBoard(array, player) {
        let playerBoard = array.filter(x => x.p === player);
        let board = [];
        playerBoard.forEach(item => {
            board.push(+item["n"]);
        });
        let matches = [].concat(winningRows, winningCols, winingDiagonals);
        console.log(matches);
        // board.every(cell => {
        //     if(matches.includes(cell)) roundWinner(board);
        // });
        let winningMove = matches.find(moves => moves.every(cell => board.includes(cell)));
        if (winningMove) declareSingleRoundWinner(winningMove, player);
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
    function declareDraw() {
        announceWinner.textContent = "Match Drawn!!";
        setTimeout(() => {
            announceWinner.textContent = "";
        }, 2200);
        resetBoard();
    }
    let counter = { p1Counter: 0, p2Counter: 0, compCounter: 0 };
    function declareSingleRoundWinner(moves, player) {
        console.log("winner", moves);
        // let maxCount = Math.max(...Object.values(counter));
        // console.log("max: ",maxCount);
        let displayScore;
        if (gameCount < rounds) {
            if (player === 1) {
                counter.p1Counter++;
                gameCount++;
                displayScore = p1Div;
                displayScore.textContent = counter.p1Counter;
            } else if (player === 2) {
                counter.p2Counter++;
                gameCount++;
                displayScore = p2Div;
                displayScore.textContent = counter.p2Counter;
            } else {
                counter.compCounter++;
                gameCount++;
                displayScore = compDiv;
                displayScore.textContent = counter.compCounter;
            }
        }
        roundWinner(player);
        if (gameCount === rounds) {
            gameWinner(player);
            counter.p1Counter = 0;
            counter.p2Counter = 0;
        }
        // roundWinner(player);
        resetBoard();
    }
    function roundWinner(player) {
        announceWinner.innerHTML = `<strong>Round Won By Player: ${player}</strong>`
        setTimeout(() => {
            announceWinner.innerHTML = "";
        }, 2200);
    }
    function gameDraw() {
        announceWinner.innerHTML = `<strong>Game's Drawn</strong>`;
        resetGame();
    }
    function gameWinner(player) {
        console.log("Game Winner!! Player: ", player);
        winningPlayer(player);
    }
    function winningPlayer(player) {
        // announceWinner.innerHTML = `<pre> Oh Yeah!! ${"\n"} player: ${player === 1 ? "1" : player === 2 ? "2" : "Computer"} Wins!! Race To: ${player === 1 ? counter.p1Counter : player === 2 ? counter.p2Counter : counter.compCounter} </pre>`;
        announceWinner.innerHTML = `<pre> Oh Yeah!! ${"\n"} player: ${player === 1 ? "1" : player === 2 ? "2" : "Computer"} Wins!! Race To: ${rounds} </pre>`;
        resetGame();
        // playAgain();
    }
    function resetGame() {
        // startGame.style.display = "block";
        // startGame.textContent = "Start Again";
        // startGame.parentNode.appendChild(startGame);
        // document.querySelector(".scores").appendChild(startGame);
        // gameCount = 0;
        // eachPlayer();
        setTimeout(() => {
            // announceWinner.innerHTML = "Play Game";
            // startGame.textContent = "Start Again";
            document.querySelectorAll(".item").forEach(item => item.textContent = "00");
            // playAgain();
        }, 2200);
        // playAgain();
    }
    function resetBoard() {
        setTimeout(() => { boardLayout(); }, 2200);
        // boardLayout();
    }
    function boardLayout() {
        // let cubes = document.querySelectorAll(".grid-item");
        // Array.from(cubes).forEach(item => item.textContent = "");
        Array.from(cubes).forEach(item => item.textContent = null);
        // boardArray = [];
        gameBoard = [];
    }
    function playAgain() {
        // startGame.remove()
        // resetBoard();
        // gameBoard = [];
        boardLayout();
        // eachPlayer();
        startGame.style.display = "block";
        startGame.textContent = "Start Again";
        gameCount = 0;
        // eachPlayer();
    }
    function playerOne() {
        flag = false;
        p2Div.classList.add("active");
        p1Div.classList.remove("active");
        // let marker = alert("Player One Placed Marking");
        let marker = null;
        return [marker, 1];
    }
    function playerTwo() {
        p1Div.classList.add("active");
        p2Div.classList.remove("active");
        flag = true;
        // let marker = alert("Player Two Placed Marking");
        let marker = null;
        return [marker, 2];
    }
    let flag = true;
    function eachPlayer() {
        // startGame.remove();
        // let startGame = document.querySelector(".start-game");
        if (gameCount === 0) {
            [p1, p2, r] = [...gameStarter()];
            // rounds = r;
            // startGame.remove();
            startGame.style.display = "none";
        }
        // else if(gameCount === rounds || gameCounts
        //     === r) startGame.textContent = "Play Again";
        // startGame.remove();
        // let cubes = document.querySelectorAll(".grid-item");
        Array.from(cubes).forEach(cube => {
            console.log(cube, cube.value);
            cube.addEventListener("click", () => {
                let playerMarker, player;
                if (!cube.textContent) {
                    flag
                        ? [playerMarker, player] = [...playerOne()]
                        : [playerMarker, player] = [...playerTwo()];
                    console.log(playerMarker, player);
                    let cubeID = cube.id;
                    let cubeNumber = cube.getAttribute("data-cube");
                    console.log(cubeNumber, typeof cubeNumber, cubeID);
                    displayController(playerMarker, cubeID, player, cubeNumber);
                } else {
                    alert("cube's taken choose another");
                }
            });
        });
    }
    // settingUpPlayerMarkers();
    // eachPlayer();
})();
 */