import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Navbar as Navi } from "react-bootstrap";

import "./navbar.css";

import { useShoppingCart } from "../context/shopingcartcontext";

function Navbar() {
  const { cartQuantity } = useShoppingCart();

  const [navbarColor, setNavbarColor] = useState("#ffeb60");
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { openCart } = useShoppingCart();
  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 50) {
      setNavbarColor("white");
    } else {
      setNavbarColor("white");
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav className="navbar col-logo nav1 bg-black d-none d-lg-flex ">
        <div className="container text-white" style={{ height: "19px" }}>
          <div className="row" style={{ width: "100%", marginTop: "-3px" }}>
            <div style={{ textAlign: "start", width: "20%" }}>
              {" "}
              Choisissez les spécialistes !{" "}
            </div>
            <div
              className="col-7"
              style={{ textAlign: "start", width: " 55%" }}
            >
              <i className="fa fa-phone" style={{ marginLeft: "40px" }}></i>{" "}
              APPELEZ NOUS : 27-768-325{" "}
            </div>
            <div className="col-3" style={{ textAlign: "end", width: "25%" }}>
              <a
                href="https://www.facebook.com/GoMegaPC"
                target="_blank"
                style={{ color: "gray", margin: " 0 10px" }}
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/megapc_official"
                target="_blank"
                style={{ color: "gray", margin: " 0 10px" }}
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://www.youtube.com/channel/UCP2cS4C5THD4KyrsqS24PAw"
                target="_blank"
                style={{ color: "gray", margin: " 0 10px" }}
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/mega-pc"
                target="_blank"
                style={{ color: "gray", margin: " 0 10px" }}
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a
                href="https://twitter.com/MegaPcNet"
                target="_blank"
                style={{ color: "gray", margin: " 0 10px" }}
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <Navi
        style={{ backgroundColor: navbarColor, height: "100px" }}
        sticky="top"
        expand="sm"
        className="p-0"
      >
        <div className="container border-nav">
          <Navi.Toggle aria-controls="basic-navbar-nav" />

          <div>
            <NavLink to="/" className="navbar-brand mt-2 mt-lg-0">
              <img src="/public/logo/logo black.png" height="120" />
            </NavLink>
          </div>

          <Navi.Collapse>
            <ul className="navbar-nav ms-lg-5 me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link text-black fw-semibold text-uppercase"
                  type="button"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                {" "}
                <NavLink
                  to="/store"
                  id="megamneu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  className="nav-link dropdown-toggle border-0 text-black fw-semibold text-uppercase"
                >
                  Store
                </NavLink>
                <ul className="dropdown-menu border-0 p-0 dropdown-menu-scroll">
                  <div className="animated pt-lg-4 pt-0">
                    <div className="d-flex flex-column flex-lg-row shadow-sm">
                      <li className=" m-2 col-lg-3 col-8 ">
                        <NavLink
                          to="/store"
                          className="dropdown-item fs-5 text-warning fw-medium border-bottom border-2"
                        >
                          Accessoires Pc
                        </NavLink>
                        <ul className="list-unstyled ms-2 ps-1 ">
                          <li>
                            <a className="nav-link">Casque & Écouteurs</a>
                          </li>
                          <li>
                            <a className="nav-link">Souris</a>
                          </li>
                          <li>
                            <a className="nav-link">Clavier</a>
                          </li>
                          <li>
                            <a className="nav-link">
                              Ensemble Clavier Et Souris
                            </a>
                          </li>
                          <li>
                            <a className="nav-link">Tapis De Souris</a>
                          </li>
                          <li>
                            <a className="nav-link">Webcam</a>
                          </li>
                        </ul>
                      </li>
                      <li className="m-2 col-lg-3 col-8">
                        <a
                          className="dropdown-item fs-5 text-warning fw-medium border-bottom border-2 "
                          href="#"
                        >
                          Accessoires Téléphones
                        </a>
                        <ul className="list-unstyled ms-1 ps-1 ">
                          <li>
                            <a className="nav-link">Etuis et coques </a>
                          </li>

                          <li>
                            <a className="nav-link">Protection Ecran</a>
                          </li>
                          <li>
                            <a className="nav-link">Power bank</a>
                          </li>
                          <li>
                            <a className="nav-link">Tige Selfie</a>
                          </li>
                          <li>
                            <a className="nav-link">Chargeur</a>
                          </li>
                          <li>
                            <a className="nav-link">Câble Chargeur</a>
                          </li>
                        </ul>
                      </li>
                      <li className=" m-2 col-lg-3 col-8">
                        <a
                          className="dropdown-item fs-5 text-warning fw-medium border-bottom border-2 "
                          href="#"
                        >
                          Composants De Pc Bureau
                        </a>
                        <ul className="list-unstyled">
                          <li>
                            <a className="nav-link">Disque Dur Interne</a>
                          </li>

                          <li>
                            <a className="nav-link">Afficheur</a>
                          </li>

                          <li>
                            <a className="nav-link">
                              Ventilateur & Refroidisseur
                            </a>
                          </li>
                          <li>
                            <a className="nav-link">Processeur</a>
                          </li>
                          <li>
                            <a className="nav-link">Barrette Mémoire</a>
                          </li>
                          <li>
                            <a className="nav-link">Carte Mère</a>
                          </li>
                          <li>
                            <a className="nav-link">Carte Graphique</a>
                          </li>
                          <li>
                            <a className="nav-link">Boîte D'alimentation</a>
                          </li>
                          <li>
                            <a className="nav-link">Boîtier</a>
                          </li>
                        </ul>
                      </li>
                      <li className="m-2 col-lg-3 col-8">
                        <a
                          className="dropdown-item col  fs-5 text-warning fw-medium border-bottom border-2 "
                          href="#"
                        >
                          Composants De Pc Portable
                        </a>
                        <ul className="list-unstyled ">
                          <li className="nav-item">
                            <a className="nav-link">Disque Dur Interne</a>
                          </li>

                          <li className="nav-item">
                            <a className="nav-link">Afficheur</a>
                          </li>

                          <li className="nav-item">
                            <a className="nav-link">
                              Ventilateur & Refroidisseur
                            </a>
                          </li>

                          <li className="nav-item">
                            <a className="nav-link">Barrette Mémoire</a>
                          </li>

                          <li className="nav-item">
                            <a className="nav-link">
                              Chargeur Pour Pc Portable
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link">
                              Batterie Pour Pc Portable
                            </a>
                          </li>
                        </ul>
                      </li>
                    </div>
                  </div>
                </ul>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link fw-semibold text-uppercase"
                  to="/contact"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="searchbar mt-4 me-4">
              <form action="#">
                <input type="search" placeholder="" />
                <i className="fa fa-search" id="search-icon"></i>
              </form>
            </div>
          </Navi.Collapse>

          <ul className="navbar-nav d-flex flex-row justify-content-center">
            <li className="nav-item me-3 me-lg-0 position-relative">
              <a className="nav-link">
                <button
                  className="rounded-pill bg-transparent text-black border-0 "
                  type="button"
                  onClick={openCart}
                >
                  <i className="fas fa-shopping-cart">
                    {cartQuantity > 0 && (
                      <p className="navbar-icon-circle rounded-circle ">
                        {cartQuantity}
                      </p>
                    )}
                  </i>
                </button>
              </a>
            </li>
            <li className="nav-item me-3 me-lg-0">
              <NavLink to="/login" className="nav-link">
                <i className="fa-solid fa-user"></i>
              </NavLink>
            </li>
          </ul>
        </div>
      </Navi>
    </>
  );
}

export default Navbar;
