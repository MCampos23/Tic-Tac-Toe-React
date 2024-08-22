import { useState, useEffect } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/gameOver";

const url = 'https://api.restful-api.dev/objects'

const initalGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerOneName, setPlayerOneName] = useState("Player 1");
  const [playerTwoName, setPlayerTwoName] = useState("Player 2");
  
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json", "Access-Control-Allow-Origin");
  useEffect(()=>{
      fetch(url, {
        headers: myHeaders,
        mode: 'cors'
      })
          .then((res) => res.json)
          .then((data) => console.log(data))
  }, [])
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initalGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    if (gameBoard[row][col] === null) {
      gameBoard[row][col] = player;
    }
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handlePlayerOneNameChange(event) {
    setPlayerOneName(event.target.value);
  }
  function handlePlayerTwoNameChange(event) {
    setPlayerTwoName(event.target.value);
  }

  function handleRestart() {
    setGameTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            playerName={playerOneName}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerOneNameChange}
          />
          <Player
            playerName={playerTwoName}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerTwoNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log
        turns={gameTurns}
        playerOneName={playerOneName}
        playerTwoName={playerTwoName}
      />
    </main>
  );
}

export default App;
