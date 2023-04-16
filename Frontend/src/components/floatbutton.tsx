import React from "react";
import "./floatbutton.css";
export default function Floatbutton() {
  return (
    <div className="position-fixed end-0 bottom-0">
      <div className="floating-container">
        <div className="floating-button">+</div>
        <div className="element-container">
          <a href="google.com">
            {" "}
            <span className="float-element tooltip-left">
              <i className="fa-solid fa-phone" style={{ color: "#ffffff" }}></i>
            </span>
          </a>
          <span className="float-element">
            <i
              className="fa-solid fa-envelope"
              style={{ color: "#ffffff" }}
            ></i>
          </span>
          <span className="float-element">
            <i
              className="fa-brands fa-rocketchat"
              style={{ color: "#ffffff" }}
            ></i>
          </span>
        </div>
      </div>
    </div>
  );
}
