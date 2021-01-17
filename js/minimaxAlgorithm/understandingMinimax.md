/**
 * Understanding Minimax, in context of Tic Tac toe Game:
 * key to this Minimax algorithm is a back and forth between two playrs where each player picks move with maximum score
 * In turn, scores for each possible moves are determined by opposite player deciding which moves has minimum score
 * And again scores for opposite players move determined by player taking turn to maximize it's score and so on and so forth to an end state moves tree
 * 
 * Algorithm In plain terms: assuming X is turn taking player:
 * - if game is over return score from X's perspective
 * - otherwise get a list of new game states for every possible move
 * - create a sccore list
 * - for each of those states add "minimax" result of that "state" to scores list
 * - if it's X's turn, return maximum score from scores list
 * - if it's O's turn, return minimum score from scores list
 * this algorithm is recursive, it flips back and forth between players until a final score is found
 * 
 * let's walk through execution with full move tree, and see why, algorithmically speaking, instant wining move will be picked:
 * board state: o _ x
 *              x _ _
 *              x o o
 * - it's X's turn in that state, X generates 3 other possible outcomes/states and calls "minimax" on those states
 * - imagine a state when X selects (e.g. Diagonally) and pushes score of +10 to state 1's score list, because game is in an end state
 * - rest of those 2 states out out of 3 are not in eend states, so they geneerates others possible outcomes/states and calls "minimax" on them, respectively for each states
 * - consider state generated from one of those 2 states "minimax" call resulted outcome, pushes -10 to it's state score list, and same happens for that other generated "minimax" cal generated outcome and pushees -10 to it's score list as well
 * - those left out states from previous "minimax" calls from it's ppreceding one's, they are only left with a single available move, which are end states, and they both adds +10 to their state's score list
 * - Because O's turn after it's initial(e.g. above board) "minimax" call, from those 2 available states, O will seek to find minimum score and given choices between -10/+10 for both of those states, when chose correctly gets +10 else -10 resulting gain +10 for X's state sccore list(e.g. explained in previous steps)
 * - finally scores list for in this scenario after it's first "minimax" call, lets say state 2,3,4 populates +10, -10, -10 respectively and initial state of this board would be seeking to maximize it's score by choosing this wining move of state 2 with +10 points to it's state scorre list
 * 
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
 * So each time we invoke "minimax", depth is incremented by 1 and when end game state is ultimately calculated, score is adjusted by depth:
 * this depth cause score to differ for each end state not just state, and because level 0 part(base level of moves) of "minimax" will try to maximize scores:
 * consider this board scenario:
 * _ x _
 * _ _ x
 * o o x
 * from it's possible 4 outcomes/states 3 of them will carry score of -8, as it gets to it's end game state at level 2, so scores beecomes 2 - 10 = -8, and one of those calculates to -6 as it gets to it's end state at level 4(e.g 4 - 10 = -6)
 * this approach actually lingers this game as late as possible for a perfect game, hence it will choose -6 instead of -8 where win is much immenent, so approach here from our perfect player is to choose blocking move than end game
 * 
 */

 /**
  * Breaking down of a Non-Coperative Game Theory: by definition, gamme theory is "study of mathematical models of conflicts and cooperation between initelligent rational decision-maker"
  * where a rational decision maker is someone who is trying to maximize their rewards, Non co-operative game theory implies that players work independently and are not assuming what other player is doing
  * 
  * Minimax Algorithm: is one approach to computing best possible outcome by recursively generating all possible final states of a game, which can be represented as a tree, where final states are leaf nodes
  * while simulataneuosly keeping track of current optimal node and comparing that to all other siblings of that node,this is considered as a zero sum game, when both players are using optimal strategy
  * 
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
  * 
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
  * 
  * Lets combine minimax and evaluation function together to write a proper Tic Tac Toe AI that plays a perfect game: this AI will consider all possible moves scenarios and make most optimal move
  * Find that Best Move: this function will evaluates all possible moves using minimax algorithm and then returns best move a maximizer can make
  * Psuedocode:
  * function findBestMove(board){
  *     bestMove = null
  *     for each move in board:
  *         if current move is better than bestMove
  *             bestMove = current move
  *     return bestMove;
  * }
  * Minimax Algorithm: to check whether or not current move is better than best move we use minimax algorithm, which will consider all possible ways game can go an return best value for that move optimally possible
  * it's similar to findBestMoves functionality, only difference is instead of returning a move, it'll return a value
  * Psuedocode:
  * function minimax(board, depth, isMaximizingPlayer) {
  *     if current board state is a terminal node/state:
  *         return value of board
  *     if isMaximizingPlayer:
  *         bestVal = -INFINITY
  *         for each move in board:
  *             value = minimax(board, depth+1, false)
  *             bestVal = max(bestVal, value)
  *         return bestVal
  *     else:
  *         bestVal = +INIFINITY
  *         for each move in board:
  *             value = minimax(board, depth+1, true)
  *             bestVal = min(bestVal, value)
  *         return bestVal
  * }
  * checking for gameOver state: to make sure that there are no moves left, it'll check whether a mvoe is possible or not
  * Psuedocode:
  * function isMoveLeft(board) {
  *     for each cell in board:
  *         if current cell is empty:
  *             return true;
  *     return false
  * }
  * Making this AI smarter: our AI might choose a move that wil result in a slower victory or faster loss
  * assume there are 2 possible ways for X to win from a given board state:
  * Move A: X can win in 2 move
  * Move B: X can win in 4 move
  * our evaluation function will return +10 for both of these moves, though Ai might choose B over A, to reduce this problem
  * we can subtract depth value from evaluated score,  meaning it'll choose least number of moves to gain victory over prolonging it
  * Move A will have a value of +10 - 2 = 8  
  * Move B will have a value of +10 - 4 = 6
  * now our maximizer will choose A(8) over B(6) and thus removing problem of prolonging victory
  * same logic should be implemented for minimizer as well, where instead of subtractiing depth we will add to node value
  * Psuecode:
  * if maximizer has own:
  *     return win_score - depth
  * else if minimizer has own:
  *     return loose_score + depth
  */