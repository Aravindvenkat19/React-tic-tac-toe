import { useState } from "react"
import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx"
import Log from "./components/Log.jsx"
import {WINNING_COMBINATIONS} from "./winning-combinations.js"
import GameOver from "./components/GameOver.jsx"

const PLAYERS = {
  X : 'Player 1',
  O : 'Player 2'
};

const INITIAL_GAME_BOARD = [
   
  [null,null,null],
  [null,null,null],
  [null,null,null]

];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';  

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {  
    currentPlayer = 'O';
  }
  
  return currentPlayer; 
}

function deriveGameBoard(gameTurns){
    let gameboard = [...INITIAL_GAME_BOARD.map(array => [...array])];

    for (const turn of gameTurns) {
        const {square,player} = turn;
        const {row, col} = square;
        
        gameboard[row][col] = player;
    }
    return gameboard;
}

function deriveWinner(gameboard,players){ 
  let winner = null;

  for(const combination of WINNING_COMBINATIONS){
     const FirstSquareSymbol = gameboard[combination[0].row] [combination[0].column] 
     const SecondSquareSymbol = gameboard[combination[1].row] [combination[1].column]
     const ThirdSquareSymbol = gameboard[combination[2].row] [combination[2].column]

     if(
      FirstSquareSymbol && FirstSquareSymbol == SecondSquareSymbol && FirstSquareSymbol == ThirdSquareSymbol
     ) {
        winner = players[FirstSquareSymbol];
     }
  }
  return winner;
}

function App() {
  const [players,setplayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]); 

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameboard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(gameboard,players)
  const hasDraw = gameTurns.length === 9 && !winner;


  function handleChangeSquare(rowIndex, colIndex) {
    setGameTurns((preTurns) => {

      const currentPlayer = deriveActivePlayer(preTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },  
        ...preTurns,  
      ];

      return updatedTurns; 
    });
  }

  function handleRestart(){
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol,newname){
    setplayers(preTurns =>{
       return {
         ...preTurns,
         [symbol]: newname
       };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player Initialname={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange} />
          <Player Initialname={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleChangeSquare} board={gameboard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
