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