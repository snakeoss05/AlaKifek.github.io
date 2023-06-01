import React, { useState, useEffect } from "react";
import "./chatstyle.css";


export default function UserContact() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
/*
  useEffect(() => {
    // Listen for incoming messages
   


  }, []);

  const handleMessageChange = (event:any) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();

    // Send the message to the server
    socket.emit('message', message);
    setMessage('');
  };*/
  return (
    <div>
      <h1>Chat</h1>
      <div>
    
      </div>
      <form >
        <input
          type="text"
        
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
