import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "../css/chat.css";

const AdminContact = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [conversation, setConversation] = useState(
    JSON.parse(sessionStorage.getItem("conversation")) || []
  );
  const [inputValue, setInputValue] = useState("");
  const [userConversation, setuserConversation] = useState([]);

  const scrollRef = useRef();
  const socket = useRef();

  function saveConversation() {
    sessionStorage.setItem("conversation", JSON.stringify(conversation));
  }

  useEffect(() => {
    socket.current = io("ws://localhost:5000", {
      reconnectionAttempts: 10,
      timeout: 10000,
      transports: ["websocket"],
    });

    socket.current.emit("addUser", "Admin");

    socket.current.on("getUsers", (users) => {
      setRooms(users);
    });

    socket.current.on("userMessage", (data) => {
      setConversation((prevConversation) => [...prevConversation, data]);
      saveConversation();
    });

    return () => {
      socket.current.off("addUser");
      socket.current.off("getUsers");
      socket.current.off("userMessage");
    };
  }, []);

  useEffect(() => {
    const userConversation = conversation.filter(
      (msg) => msg.room === selectedRoom.socketId
    );
    setuserConversation(userConversation);
  }, [selectedRoom, conversation]);

  const joinRoom = (room) => {
    socket.current.emit("joinRoom", room);
    setSelectedRoom(room);
  };

  const sendMessage = () => {
    if (inputValue && selectedRoom) {
      const data = {
        room: selectedRoom.socketId,
        message: inputValue,
        date: new Date().toLocaleString(),
        sender: false,
      };

      socket.current.emit("adminMessage", data);
      setConversation((prevConversation) => [...prevConversation, data]);
      saveConversation();
      setInputValue("");
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [userConversation]);

  return (
    <div className="container">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div id="plist" className="people-list">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="btn btn-outline-dark">
                    <i className="fa fa-search" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>
              <ul className="list-unstyled chat-list mt-2 mb-0">
                {rooms.map((room) => {
                  return (
                    <li
                      className="clearfix"
                      key={room.socketId}
                      onClick={() => joinRoom(room)}
                    >
                      <div className="about">
                        <div className="name">{room.userId}</div>
                        <div className="status">
                          {" "}
                          <i className="fa fa-circle offline" /> left 7 mins ago{" "}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            {selectedRoom && (
              <div className="chat">
                <div className="chat-header clearfix">
                  <div className="row">
                    <div className="col-lg-6">
                      <a href="#" data-toggle="modal" data-target="#view_info">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar2.png"
                          alt="avatar"
                        />
                      </a>
                      <div className="chat-about">
                        <h6 className="m-b-0">{selectedRoom.userId}</h6>
                        <small>Last seen: 2 hours ago</small>
                      </div>
                    </div>
                    <div className="col-lg-6 hidden-sm text-right">
                      <a href="#" className="btn btn-outline-secondary">
                        <i className="fa fa-camera" />
                      </a>
                      <a href="#" className="btn btn-outline-primary">
                        <i className="fa fa-image" />
                      </a>
                      <a href="#" className="btn btn-outline-info">
                        <i className="fa fa-cogs" />
                      </a>
                      <a href="#" className="btn btn-outline-warning">
                        <i className="fa fa-question" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="chat-history">
                  <ul className="m-b-0">
                    {userConversation.map((user, index) => {
                      return (
                        <li
                          className={`clearfix ${
                            user.sender ? "text-start" : "text-end"
                          }`}
                          key={index}
                          ref={scrollRef}
                        >
                          <div className="message-data text-right">
                            <span className="message-data-time">
                              {user.date}
                            </span>
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar7.png"
                              alt="avatar"
                            />
                          </div>
                          <div
                            className={`${
                              user.sender ? "bg-dark" : "me"
                            } message`}
                          >
                            {user.message}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="chat-message clearfix">
                  <div className="input-group mb-0">
                    <div className="input-group-prepend">
                      <button
                        className="btn btn-outline-warning"
                        onClick={sendMessage}
                      >
                        <i className="fa-regular fa-paper-plane"></i>
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter text here..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContact;
