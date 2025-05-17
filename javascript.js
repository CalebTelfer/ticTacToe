const {game, gameBoard} = (function () {
    let board = [null, null, null, null, null, null, null, null, null];
    let players = [];


// EVENT LISTENERS ------------------------------------
    const pnameform = document.querySelector("form");

    pnameform.addEventListener("submit", function(event) {
        event.preventDefault();
        const playerName = document.getElementById("pName").value;

        game.createPlayer(playerName);
    })



    const resetButton = document.getElementById("resetbutton");

    resetButton.addEventListener("click", () => game.reset());


    const startButton = document.getElementById("startbutton");

    startButton.addEventListener("click", () => game.startGame());




//----------------------------------------


// SCREEN SETUPS / DISPLAY ---------------------
    const gameScreen = {
        squares: document.querySelectorAll(".gamesquare"),
        markers: document.querySelectorAll(".gamesquare h1")
    }


    gameScreen.squares.forEach(square => {
        square.addEventListener("click", () => {
            const index = square.getAttribute("data-index");
            if(!document.getElementById("startbutton")) { // dont want markers placed with game not started
                game.placeMarker(index);
            }
        })
    })

    //info screen
    const infoScreen = {
        container: document.querySelector(".game-control-container"),
        children: [],
        resetButton: document.getElementById("resetbutton")
    }

    infoScreen.children = [...infoScreen.container.children];

    //game in progress
    const gameInProgressScreen = {
        nextMove: document.createElement("h1"),
        playerNameText: document.createElement("h1")
    }


    //game over screen elements.
    const gameOverScreen = {
        header: document.createElement("h1"), // can reUse the same variables here for same layout. Just rename for better understanding.
        winner: document.createElement("h2"),
        buttons: infoScreen.buttonsDiv
    }




//-----------------------------------------------
    const resetBoard = () => board = [null, null, null, null, null, null, null, null, null];

    const gameBoard = {
        getBoard: () => [...board] // returns read only copy of the board.
    }

    const resetPlayers = () => players = [];

    let nextToMove = "X"; // x starts first by default

    const display = {
        setDefaultScreens: function() {
            display.clearInfoScreen();
            infoScreen.children.forEach(child => infoScreen.container.appendChild(child));

            gameScreen.markers.forEach(marker => {
                marker.textContent = "";
            })
        },

        clearInfoScreen: function() {
            while (infoScreen.container.firstChild) {
                infoScreen.container.removeChild(infoScreen.container.firstChild);
            }
            
        },

        gameStartScreen: function() {
            display.clearInfoScreen();
            gameInProgressScreen.nextMove.textContent = "Please Place Your Marker,";

            if(nextToMove == "X") {
                gameInProgressScreen.playerNameText.textContent = players[0].name;
            } else {
                gameInProgressScreen.playerNameText.textContent = players[1].name;
            }
            infoScreen.container.appendChild(gameInProgressScreen.nextMove);
            infoScreen.container.appendChild(gameInProgressScreen.playerNameText);

            infoScreen.container.appendChild(infoScreen.resetButton);
        },

        updateTurn: function() {
            if(nextToMove == "X") {
                gameInProgressScreen.playerNameText.textContent = players[0].name;
            } else {
                gameInProgressScreen.playerNameText.textContent = players[1].name;
            }
        },

        updateGameScreen: function(index) {
            const square = document.querySelector(`[data-index="${index}"]`);
            const squareMarker = square.querySelector("h1");
            squareMarker.textContent = nextToMove;
        },

        updategameOverScreen: function(winningMarker, condition) {

            display.clearInfoScreen();

            if (condition == "win") {
                if (winningMarker == "X") {
                    gameOverScreen.header.textContent = "CONGRATULATIONS";
                    gameOverScreen.winner.textContent = players[0].name + " wins!";
                } else {
                    gameOverScreen.header.textContent = "CONGRATULATIONS";
                    gameOverScreen.winner.textContent = players[1].name + " wins!";
                }

            } else {
                gameOverScreen.header.textContent = "Game Over!"
                gameOverScreen.winner.textContent = "TIE!";
            }
            infoScreen.container.appendChild(gameOverScreen.header);
            infoScreen.container.appendChild(gameOverScreen.header);
            infoScreen.container.appendChild(gameOverScreen.winner);
            infoScreen.container.appendChild(resetButton);
        }

    }





    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    const isGameOver = function() {
        
        for (let combination of winCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                display.updategameOverScreen(board[a], "win")

                return true;
            } else {
                if (!board.includes(null)) {
                    display.updategameOverScreen(null, "tie")
                    return true;
                }
            }
        }

        return false;


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
                display.gameStartScreen();
                display.updateTurn();
                console.log("Game commencing");
            }
        },

        reset: function() {
            resetBoard();
            resetPlayers();
            nextToMove = "X";
            display.setDefaultScreens();
        },

        placeMarker: function(squareNum) {
            if (board[squareNum] != null) {
                console.log("Theres already a marker there!");
                return;
            }
            board[squareNum] = nextToMove;
            display.updateGameScreen(squareNum);

            if(!isGameOver()) {
                if (nextToMove == "X") {
                    nextToMove = "O";
                } else {
                    nextToMove = "X";
                }
                display.updateTurn();
            }
        }
    };

    return {game, gameBoard}
})();
