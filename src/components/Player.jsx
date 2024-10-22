import { useState } from "react"
import React from 'react';

export default function Player({ symbol, isActive, initialName, onChangeName}){
  const [playerName, setPlayerName] = useState(initialName)  
  const [isEdit, setIsEdit] = useState(false);
  
    function handleEditClick() {    
        setIsEdit((editing) => !editing)
        if(isEdit){
          onChangeName(symbol, playerName)
        }
    }

    function handleChange(e) {
      setPlayerName(e.target.value)
    }

    return(
        <li className={isActive ? 'active' : undefined}>
          <span className="player">
            {!isEdit ? 
                <span className="player-name">{playerName}</span> : 
                <input type="text" required value={playerName} onChange={handleChange}/>}
            <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleEditClick}>{!isEdit ? 'Edit' :'Save'}</button>
        </li>
    )
}