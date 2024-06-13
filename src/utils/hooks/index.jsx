// Permet de faire des appels API (WebSocket)
// et de recevoir les réponses en temps réel.

import { useState, useEffect, useRef } from 'react';

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    // Créer une nouvelle instance WebSocket
    socketRef.current = new WebSocket(url);

    // Événements de connexion
    socketRef.current.onopen = () => {
      setIsConnected(true);
    };

    // Événements de réception de messages
    socketRef.current.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // Événements de déconnexion
    socketRef.current.onclose = () => {
      setIsConnected(false);
    };

    // Événements d'erreur
    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Nettoyage à la fin du cycle de vie du composant
    return () => {
      socketRef.current.close();
    };
  }, [url]);

  // Fonction pour envoyer des messages via le WebSocket
  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.error("WebSocket is not open. Unable to send message.");
    }
  };

  return { isConnected, messages, sendMessage };
};

export default useWebSocket;
