let gameTTT = (() => {
    let gameBoard = [];
    let grid = window.getComputedStyle(document.querySelector(".gameBoard"));
    let numCols = grid.getPropertyValue("--colNum");
    let rowNums = grid.getPropertyValue("--rowNum");
    console.log(numCols, rowNums);
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
            showBoard();
            if(gameBoard.length > 2) roundWinner();
        }
    }
    function roundWinner() {
        

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
                    displayController(playerMarker, cubeID);
                } else {
                    alert("Spot already been marked");
                }
            });
        });
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
 */