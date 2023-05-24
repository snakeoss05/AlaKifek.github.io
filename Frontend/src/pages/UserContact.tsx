import React, { useState, useEffect } from "react";
import "./chatstyle.css";

import io from "socket.io-client";
const socket = io("http://localhost:3001");

export default function UserContact() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });
  socket.emit("hello", "world");

  return (
    <div className="page-content page-container" id="page-content">
      <div className="padding">
        <div className="row container d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card card-bordered">
              <div className="card-header">
                <h4 className="card-title">
                  <strong>Chat</strong>
                </h4>
                <a
                  className="btn btn-xs btn-secondary"
                  href="#"
                  data-abc="true"
                >
                  Let's Chat App
                </a>
              </div>
              <div
                className="ps-container ps-theme-default ps-active-y"
                id="chat-content"
                style={{
                  overflowY: "scroll",
                  height: "400px",
                }}
              >
                <div className="media media-chat">
                  <img
                    className="avatar"
                    src="https://img.icons8.com/color/36/000000/administrator-male.png"
                    alt="..."
                  />
                  <div className="media-body"></div>
                </div>
                <div className="media media-meta-day">Today</div>
                <div className="media media-chat media-chat-reverse">
                  <div className="media-body text-end w-100 pe-2">
                  
                  </div>
                </div>

                <div
                  className="ps-scrollbar-x-rail"
                  style={{ left: 0, bottom: 0 }}
                >
                  <div
                    className="ps-scrollbar-x"
                    tabIndex={0}
                    style={{ left: 0, width: 0 }}
                  />
                </div>
                <div
                  className="ps-scrollbar-y-rail"
                  style={{ top: 0, height: 0, right: 2 }}
                >
                  <div
                    className="ps-scrollbar-y"
                    tabIndex={0}
                    style={{ top: 0, height: 2 }}
                  />
                </div>
              </div>
              <div className="publisher bt-1 border-light">
                <img
                  className="avatar avatar-xs"
                  src="https://img.icons8.com/color/36/000000/administrator-male.png"
                  alt="..."
                />
                <input
                  className="publisher-input"
                  type="text"
                  
                  placeholder="Write something"
                />
                <span className="publisher-btn file-group">
                  <i className="fa fa-paperclip file-browser" />
                  <input type="file" />
                </span>
                <a className="publisher-btn" href="#" data-abc="true">
                  <i className="fa fa-smile" />
                </a>
                <a className="publisher-btn text-info" href="#" data-abc="true">
                  <i className="fa fa-paper-plane"  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
