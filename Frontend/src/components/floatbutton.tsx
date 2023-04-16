import React from "react";
import "./floatbutton.css";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
export default function Floatbutton() {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        Alakifek@gmail.com Or Noussaier.bibani@gmail.com
      </Popover.Body>
    </Popover>
  );
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
            <OverlayTrigger trigger="click" placement="left" overlay={popover}>
              <i
                className="fa-brands fa-rocketchat"
                style={{ color: "#ffffff" }}
              ></i>
            </OverlayTrigger>
          </span>
        </div>
      </div>
    </div>
  );
}
