const {game, gameBoard} = (function () {
    let board = [];
    let players = [];

    const resetBoard = () => board = [];

    const gameBoard = {
        getBoard: () => [...board] // returns read only copy of the board.
    }

    const resetPlayers = () => players = [];

    let nextToMove = "X"; // x starts first by default

    const startNextTurn = function() {
        if(nextToMove == "X") {
            //Update visuals to show "X" is ready to move.
        } else {
            //Update visuals to show "O" is ready to move.
        }

    }


    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    const isGameOver = function() {
        //logic to check win
        //logic to check for a full board with no winners (tie)

        //return boolean value
    }

    const game = {
        createPlayer: function(name) {
            if(players.length >= 2) 
                {return console.log("Cannot have 3 or more players");}
            
                if(players.length == 0) {
                    const marker = "X";
                    players.push({name, marker});
                }
            
                 else if (players.length == 1) {
                    const marker = "O";
                    players.push({name, marker});
                }
        },

        startGame: function () {
            if(players.length != 2) {
                return "Waiting for more players...";
            } else {
                startNextTurn();
                console.log("Game commencing");
            }
        },

        reset: function() {
            resetBoard();
            resetPlayers();
            nextToMove = "X";
        },

        placeMarker: function(squareNum) {
            if (board[squareNum] != undefined) {
                console.log("Theres already a marker there!");
                return;
            }
            board[squareNum] = nextToMove;
            // update visuals on board.

            if(isGameOver()) {
                game.reset();
            } else {
                if (nextToMove == "X") {
                    nextToMove = "O";
                } else {
                    nextToMove = "X";

                }
            
                startNextTurn();
            }
        }
    };

    return {game, gameBoard}
})();