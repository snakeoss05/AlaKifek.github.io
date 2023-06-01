import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./chatstyle.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useShoppingCart } from "../context/shopingcartcontext";

interface User {
  username: string;
  FirstName: string;
}

const SocketComponent: React.FC = () => {
  const socket: any = useRef();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [user, setuser] = useState<User>();
  const scrollRef: any = useRef();
  const { UserLog } = useShoppingCart();
  let conversation = JSON.parse(sessionStorage.getItem("conversation")) || [];

  function addMessageToConversation(data) {
    conversation.push(data);
  }
  function saveConversation() {
    sessionStorage.setItem("conversation", JSON.stringify(conversation));
  }

  if (conversation == "") {
    const welcomemsg = {
      message: "Hi Welcome To Live Chat Please Wait Admin To Join U !",
      date: `Bot ${new Date().toLocaleString()}`,
      sender: false,
    };
    conversation.push(welcomemsg);
  }

  useEffect(() => {
    const getUserById = async () => {
      var token = Cookies.get("token");
      try {
        const response = await axios.get(`http://localhost:5000/api/ath/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setuser(response.data);

        socket.current.emit("addUser", response.data.username);
      } catch (error) {
        console.error(error);
      }
    };

    getUserById();
    return () => {
      socket.current.off("addUser");
    };
  }, [UserLog]);

  useEffect(() => {
    socket.current = io("ws://localhost:5000", {
      reconnectionAttempts: 10, //avoid having user reconnect manually in order to prevent dead clients after a server restart
      timeout: 10000, //before connect_error and connect_timeout are emitted.
      transports: ["websocket"],
    });
  }, []);

  useEffect(() => {
    socket.current.on("sendToUserMessage", (data) => {
      addMessageToConversation(data);
      saveConversation();
    });
  }, []);

  const sendMessage = () => {
    if (inputValue) {
      const dataUser = {
        room: socket.current.id,
        message: inputValue,
        date: new Date().toLocaleString(),
        sender: true,
      };

      addMessageToConversation(dataUser);
      saveConversation();
      socket.current.emit("userMessage", dataUser);

      setInputValue("");
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="page-content page-container" id="page-content">
      <div className="padding">
        <div className="row container d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card card-bordered">
              <div className="card-header bg-light border-bottom">
                <h4 className="card-title">
                  <strong>Chat With Admin</strong>
                </h4>
              </div>
              <div
                className="ps-container ps-theme-default ps-active-y"
                id="chat-content"
              >
                {conversation.map((data, index) => (
                  <div
                    className={`media media-chat ${
                      data.sender
                        ? "media-chat-reverse text-end"
                        : "text-start "
                    } `}
                    key={index}
                    ref={scrollRef}
                  >
                    {" "}
                    <div className="media-body  w-100 pe-2">
                      <p className={`${data.sender ? "" : "bg-light"}`}>
                        {data.message}
                      </p>
                      <p className="bg-transparent text-black">{data.date}</p>
                    </div>{" "}
                  </div>
                ))}

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
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Write something"
                />
                <span className="publisher-btn file-group">
                  <i className="fa fa-paperclip file-browser" />
                  <input type="file" />
                </span>
                <a className="publisher-btn" href="#" data-abc="true">
                  <i className="fa fa-smile" />
                </a>
                <a
                  className="publisher-btn text-info"
                  href="#"
                  data-abc="true"
                  onClick={sendMessage}
                >
                  <i className="fa fa-paper-plane" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocketComponent;
