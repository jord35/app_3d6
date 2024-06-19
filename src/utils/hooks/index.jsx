// Permet de faire des appels API (WebSocket)
// et de recevoir les réponses en temps réel.

import { useState, useEffect, useRef } from 'react';

const useWebSocket = (url, userKey) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      setIsConnected(true);
      // Envoyer la clé utilisateur au serveur
      socketRef.current.send(JSON.stringify({ type: 'register', key: userKey }));
    };

    socketRef.current.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    socketRef.current.onclose = () => {
      setIsConnected(false);
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socketRef.current.close();
    };
  }, [url, userKey]);

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

