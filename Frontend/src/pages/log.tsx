import React, { useState, useEffect } from "react";
import "./logStyle.css";

import { useNavigate } from "react-router-dom";

import axios, { AxiosError, AxiosResponse } from "axios";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import UserAccount from "./UserAcoount";
export default function Log() {
  const [login, setlogin] = useState(false);
  const [register, setregister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [logform, setlogform] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signinmsg, setsigninmsg] = useState("");
  const [loginmsg, setloginmsg] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [verificationMessaget, setVerificationMessagett] = useState("");
  const navigate = useNavigate();
  function HandleChange(event: any) {
    const { name, value } = event.target;
    setregister((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
    setlogform((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }

  async function registerform(e: any) {
    e.preventDefault();
    try {
      const response: AxiosResponse = await axios.post(
        "https://alakifekbackend.onrender.com/api/ath/register",
        register
      );
      setsigninmsg(response.data);
      console.log(response.data);
      const timeoutId = setTimeout(() => {
        setsigninmsg("");
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    } catch (error) {
      setVerificationMessage("Email Or Username already exists.");
      const timeoutId = setTimeout(() => {
        setVerificationMessage("");
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }

  const loginform = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://alakifekbackend.onrender.com/api/ath/login",
        logform
      );

      Cookies.set("token", response.data.token);

      navigate("/profile");
    } catch (error) {
      setVerificationMessagett("Email OR Password Not Correct");
      const timeoutId = setTimeout(() => {
        setVerificationMessagett("");
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  };
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);
  function Changestyle() {
    setlogin(!login);
  }
  return (
    <>
      {isLoggedIn ? (
        <UserAccount />
      ) : (
        <div
          className="d-flex justify-content-center align-items-center flex-column familyMon h-100vh py-5"
          id="logform"
          style={{ backgroundColor: "#f6f5f7" }}
        >
          <>
            <div
              className={`container ${login ? "right-panel-active" : ""}`}
              id="container"
            >
              <div className="form-container sign-up-container">
                <form action="#" onSubmit={registerform}>
                  <h1>Create Account</h1>
                  <div className="social-container">
                    <a href="#" className="social">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href="#" className="social">
                      <i className="fab fa-google-plus-g" />
                    </a>
                    <a href="#" className="social">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                  <span>or use your email for registration</span>
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={HandleChange}
                    value={register.username}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={HandleChange}
                    value={register.email}
                  />
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={HandleChange}
                    value={register.password}
                  />
                  {signinmsg && (
                    <div
                      className="alert success-danger mx-auto"
                      style={{ fontSize: "14px" }}
                      role="alert"
                    >
                      {signinmsg}
                    </div>
                  )}
                  {verificationMessage && (
                    <div
                      className="alert alert-danger  mx-auto"
                      style={{ fontSize: "14px" }}
                      role="alert"
                    >
                      {verificationMessage}
                    </div>
                  )}
                  <button type="submit">Sign Up</button>
                </form>
              </div>
              <div className="form-container sign-in-container">
                <form onSubmit={loginform}>
                  <h1>Sign in</h1>
                  <div className="social-container">
                    <a href="#" className="social">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href="#" className="social">
                      <i className="fab fa-google-plus-g" />
                    </a>
                    <a href="#" className="social">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                  <span>or use your account</span>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={HandleChange}
                    value={logform.email}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={HandleChange}
                    name="password"
                    value={logform.password}
                  />
                  <a href="#">Forgot your password?</a>
                  {verificationMessaget && (
                    <div
                      className={`alert alert-danger  mx-auto  alert-verification ${verificationMessaget &&
                        "alertfadeup"}`}
                      style={{ fontSize: "14px" }}
                      role="alert"
                    >
                      {verificationMessaget}
                    </div>
                  )}

                  <button>Sign In</button>
                </form>
              </div>
              <div className="overlay-container">
                <div className="overlay">
                  <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>
                      To keep connected with us please login with your personal
                      info
                    </p>
                    <button className="ghost" id="signIn" onClick={Changestyle}>
                      Sign In
                    </button>
                  </div>
                  <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button className="ghost" id="signUp" onClick={Changestyle}>
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      )}
    </>
  );
}
