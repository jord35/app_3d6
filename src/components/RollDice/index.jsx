// C'est un bouton.
// Permet de simuler un lancer de dé.
// Le dé tourne tant que isLoading == true (provenant de UseContext).
// Si le joueur est le MJ, le résultat est rendu sans chargement, 
//et une roulette permet de changer la valeur du résultat (triche).
// La simulation du dé doit changer (leur nombre : 1, 2, 3)
//en fonction des statistiques du PJ/PNJ.

import React, { useState } from 'react';
import useWebSocket from './useWebSocket';
import { v4 as uuidv4 } from 'uuid'; // Pour générer un identifiant unique

const RollDice = () => {
  const userKey = uuidv4(); // Génère une clé unique pour chaque utilisateur
  const { isConnected, messages, sendMessage } = useWebSocket('ws://localhost:8080', userKey);
  const [diceResult, setDiceResult] = useState(null);

  const handleRollDice = () => {
    if (isConnected) {
      sendMessage('randomNumber');
    }
  };

  // Écouter les messages et mettre à jour le résultat du dé
  React.useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.startsWith('Random number generated:')) {
        const number = lastMessage.split(': ')[1];
        setDiceResult(number);
      }
    }
  }, [messages]);

  return (
    <div>
      <h1>Roll Dice</h1>
      <button onClick={handleRollDice} disabled={!isConnected}>
        Roll Dice
      </button>
      {diceResult && <p>Result: {diceResult}</p>}
      {!isConnected && <p>Connecting to WebSocket...</p>}
    </div>
  );
};

export default RollDice;
