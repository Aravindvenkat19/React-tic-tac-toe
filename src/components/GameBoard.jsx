
export default function GameBoard({onSelectSquare,board}){ //Turns is array that store the history of the moves

  // Update GameBoard based on the Turns
    

    return(
        <ol id="game-board">
        {board.map((row,rowIndex)=> <li key={rowIndex}>
        <ol>
        {row.map((playerName,colIndex)=>
             <li key={colIndex}>
                <button onClick={()=> onSelectSquare(rowIndex,colIndex)} disabled={playerName!=null} >{playerName}</button>
             </li>)}
        </ol>
        </li> 
         )}
        </ol>

    );
}