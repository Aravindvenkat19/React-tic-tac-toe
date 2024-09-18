import { useState } from "react";

export default function Player({Initialname, symbol, isActive,onChangeName }) {
    const [playerchange, isplayerchange] = useState(Initialname)
    const [isEditing,isSetEditing] = useState(false)

    let PlayerEditInput = <span className="player-name">{playerchange}</span>

    function PlayerName(){
      isSetEditing((editing)=>!editing);

      if(isEditing){
      onChangeName(symbol,playerchange)
      }
      
    }

    function handleChange(event){
        isplayerchange(event.target.value)
    }

    if(isEditing){
        PlayerEditInput = <input type="text" required Value={playerchange}  onChange={handleChange} />
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {PlayerEditInput}
                <span className="player-symbol">{symbol}</span>
                <button onClick={PlayerName}>{isEditing ? 'Save' : 'Edit'}</button>
            </span>
        </li>
    );
}