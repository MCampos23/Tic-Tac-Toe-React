import React from 'react';

export default function Log({ turns, playerOneName, playerTwoName}) {
    
    return <ol id="log">
        {turns.map((turn, index) => (
            <li key={index}>El jugador {turn.player === 'X' ? playerOneName : playerTwoName } ha pulsado la casilla {turn.square.row} - {turn.square.col}</li>
        ))}
      
    </ol>
}