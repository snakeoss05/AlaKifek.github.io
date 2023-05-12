import React, { useState, useEffect } from "react";
import "./chatstyle.css";
import axios from "axios";
import { data } from "jquery";
import { io } from "socket.io-client";
export default function UserContact() {
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const socket = io("http://localhost:5000");

  /*const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      const currentTime = new Date().toLocaleTimeString();
      const user = localStorage.getItem("userProfile");
      const userid = JSON.parse(user);
      const newMessage = {
        id: userid._id,
        msg: inputValue,
        date: currentTime,
      };

      try {
        const response = await axios
          .post("http://localhost:5000/api/ath/sendmsg", newMessage)
          .then((reponse) => {
            setMessages([...messages, newMessage]);
            setInputValue("");
          });
      } catch (error) {
        console.error(error);
      }
    }
  };*/
  useEffect(() => {
    socket.on("adminMessage", (message) => {
      setReceivedMessages((prevMessages) => [...prevMessages, message.message]);
    });

    socket.on("userMessage", (message) => {
      setReceivedMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const handleSendMessage = () => {
    const user = localStorage.getItem("userProfile");
    const userid = JSON.parse(user);
    const currentTime = new Date().toLocaleTimeString();
    const newMessage = {
      userId: userid._id,
      message: message,
      date: currentTime,
    };
    socket.emit("userMessage", newMessage);
    setMessage("");
  };
  return (
    <div className="chatContainer">
      <div className="mx-auto container bootstrap snippets bootdeys ">
        <div className="col-md-7 col-xs-12 col-md-offset-2">
          {/* Panel Chat */}
          <div className="panel" id="chat">
            <div className="panel-heading">
              <h3 className="panel-title">
                <i className="icon wb-chat-text" aria-hidden="true" /> Chat With
                Admin
              </h3>
            </div>
            <div className="panel-body">
              <div className="chats">
                <div className="chat">
                  <div className="chat-avatar">
                    <a
                      className="avatar avatar-online"
                      data-toggle="tooltip"
                      href="#"
                      data-placement="right"
                      title=""
                      data-original-title="June Lane"
                    >
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        alt="..."
                      />
                      <i />
                    </a>
                  </div>
                  <div className="chat-body">
                    <div className="chat-content">
                      <p>
                        Good morning, sir.
                        <br />
                        What can I do for you?
                      </p>
                      <time className="chat-time" dateTime="2015-07-01T11:37">
                        11:37:08 am
                      </time>
                    </div>
                  </div>
                </div>
                <div className="chat chat-left">
                  <div className="chat-avatar">
                    <a
                      className="avatar avatar-online"
                      data-toggle="tooltip"
                      href="#"
                      data-placement="left"
                      title=""
                      data-original-title="Edward Fletcher"
                    >
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                        alt="..."
                      />
                      <i />
                    </a>
                  </div>
                  <div className="chat-body">
                    <div className="chat-content">
                      <p>Well, I am just looking around.</p>
                      <time className="chat-time" dateTime="now">
                        11:39:57 am
                      </time>
                    </div>
                  </div>
                </div>
                {receivedMessages.map((message, index) => (
                  <div className="chat" key={index}>
                    <div className="chat-avatar">
                      <a
                        className="avatar avatar-online"
                        data-toggle="tooltip"
                        href="#"
                        data-placement="right"
                        title=""
                        data-original-title="June Lane"
                      >
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar1.png"
                          alt="..."
                        />
                        <i />
                      </a>
                    </div>
                    <div className="chat-body">
                      <div className="chat-content">
                        <p>{message.text}</p>
                        <time className="chat-time" dateTime="2015-07-01T11:40">
                          {message.time} PM
                        </time>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="panel-footer">
              <form>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Say something"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={handleSendMessage}
                    >
                      Send
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
          {/* End Panel Chat */}
        </div>
      </div>
    </div>
  );
}
