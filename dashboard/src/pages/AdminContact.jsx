import React, { useEffect, useState } from "react";
import {io} from "socket.io-client";
const socket = io("http://localhost:3000");

function AdminContact() {
  socket.emit("new-client","new user")
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });
  socket.emit("hello", "world");
  console.log(socket)
 /*  const datas = localStorage.getItem("userProfile");
  const userName = JSON.parse(datas);

  useEffect(() => {
   socket.on("userMessage", ({ message }) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("userMessage");
      socket.off("addUser");
    };
  }, []);

  const sendMessage = () => {
    if (inputValue) {
      const data = {
        message: inputValue,
        date: new Date().toLocaleTimeString,
      };
      socket.emit("userMessage", data);
      setMessages((prevMessages) => [...prevMessages, inputValue]);
      setInputValue("");
    }
  };
*/

  return (
    <div className="position-absolute start-50">
      <h2>Admin Chat</h2>
      <div>
     
      </div>

    </div>
  );
}

export default AdminContact;
