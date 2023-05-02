import React from "react";
import "./floatbutton.css";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
export default function Floatbutton() {
  const popovermail = (
    <Popover id="popover-basic" className="me-4">
      <Popover.Body>Alakifek@gmail.com</Popover.Body>
    </Popover>
  );
  const popoverphone = (
    <Popover id="popover-basic" className="me-4">
      <Popover.Body>27768325</Popover.Body>
    </Popover>
  );
  const popovermessenger = (
    <Popover id="popover-basic" className="me-4">
      <Popover.Body>Alakifek@gmail.com</Popover.Body>
    </Popover>
  );
  return (
    <div className="position-fixed end-0 bottom-0 z-3">
      <div className="floating-container">
        <div className="floating-button">+</div>
        <div className="element-container">
          {" "}
          <span className="float-element tooltip-left">
            <OverlayTrigger
              trigger="click"
              placement="left"
              overlay={popoverphone}
            >
              <i className="fa-solid fa-phone" style={{ color: "#ffffff" }}></i>
            </OverlayTrigger>
          </span>
          <span className="float-element">
            <OverlayTrigger
              trigger="click"
              placement="left"
              overlay={popovermessenger}
            >
              <i
                className="fa-solid fa-envelope"
                style={{ color: "#ffffff" }}
              ></i>
            </OverlayTrigger>
          </span>
          <span className="float-element">
            <OverlayTrigger
              trigger="click"
              placement="left"
              overlay={popovermail}
            >
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
