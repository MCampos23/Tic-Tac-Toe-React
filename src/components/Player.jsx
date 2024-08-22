import { useState } from "react"

export default function Player({playerName, symbol, isActive, onChangeName}){
    const [isEdit, setIsEdit] = useState(false);
  
    function handleEditClick() {    
        setIsEdit((editing) => !editing)
    }

    return(
        <li className={isActive ? 'active' : undefined}>
          <span className="player">
            {!isEdit ? 
                <span className="player-name">{playerName}</span> : 
                <input type="text" required value={playerName} onChange={onChangeName}/>}
            <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleEditClick}>{!isEdit ? 'Edit' :'Save'}</button>
        </li>
    )
}