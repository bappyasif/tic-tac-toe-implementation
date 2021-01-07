<!-- Assignment Details -->
<> setting up project with html, css, and Javascript files and get it upload to git repo
<> store gameboard as an array inside of a Gameboard object, so start there! players are also going to be stored in objects, so get an object to control flow of game itself:
    -- main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thum: if you only ever need one of something(gameBoard, displayController) use a module. when needed multiple of something (players) use Factory Functions
<> setup HTML and write a JavaScript function that will render contents of gameboard array to webpage(for now manulayy fill in array with "x" annd "o"'s)
<> Build functions that allow playeers to add marks to a specefic spot on board and then tie it to DOM, letting player click on gameboard to place their marker, dont forget, logic that keeps player froom playing in spots that are already taken
    -- be thoughful about where each bit of logic should reside, each pieece of functionality should be able to fit in game, player or gameboard objects, but take care to put them in "logical" places, brainstorm as much as you can to make coding easier
<> build logicthat checks for when game is over, should also check for 3 in a row and a tie
<> cleean uo interface to allow players to put in their names, include a button start/restart game and add a display element that congratulates winning player

<Optionals> create an AI so that a player can play against computer!! 
<> start by just getting computer to make a random legal move
<> once that's been done try to make it smarter to make an unbeatable AI using minimax algorithm
<> share and ask for feedback from communities when needed