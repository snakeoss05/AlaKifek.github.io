import React from "react";
import "./chatstyle.css";
export default function UserContact() {
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
                      <time className="chat-time" dateTime="2015-07-01T11:39">
                        11:39:57 am
                      </time>
                    </div>
                  </div>
                </div>
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
                      <p>If necessary, please ask me.</p>
                      <time className="chat-time" dateTime="2015-07-01T11:40">
                        11:40:10 am
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-footer">
              <form>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Say something"
                  />
                  <span className="input-group-btn">
                    <button className="btn btn-primary" type="button">
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
