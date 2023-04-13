import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Navbar as Navi, Nav, Dropdown } from "react-bootstrap";

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
      setNavbarColor("#ffeb60");
    }
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
        style={{ backgroundColor: navbarColor, maxHeight: "50px !impotant" }}
        sticky="top"
        collapseOnSelect
        expand="sm"
        variant="light"
        className="shadow"
      >
        <div className="container border-nav">
          <Navi.Toggle aria-controls="basic-navbar-nav" />

          <div>
            <NavLink to="/" className="navbar-brand mt-2 mt-lg-0">
              <img src="/public/logo/logo black.png" height="120" />
            </NavLink>
          </div>

          <Navi.Collapse>
            <ul className="navbar-nav ms-lg-5 me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link"
                  type="button"
                  id="dropdownMenuButton"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  Home
                </NavLink>
              </li>
              <Dropdown>
                <NavLink
                  to="/store"
                  className="nav-link"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="true"
                  aria-expanded="false"
                >
                  {" "}
                  Accessoires et Périphériques
                </NavLink>
                <ul className="dropdown-menu dropdown-menu-scroll bg-shadow">
                  <div className="d-flex flex-column flex-lg-row ">
                    <li className=" m-2 ">
                      <NavLink
                        className="fs-5 dropdown-item  text-warning fw-medium border-bottom border-2 "
                        to="/store"
                      >
                        Accessoires Pc
                      </NavLink>
                      <ul className="list-unstyled ms-2 ps-1">
                        <li>
                          <a className="links row">Casque & Écouteurs</a>
                        </li>
                        <li>
                          <a className="links row">Souris</a>
                        </li>
                        <li>
                          <a className="links row">Clavier</a>
                        </li>
                        <li>
                          <a className="links row">
                            Ensemble Clavier Et Souris
                          </a>
                        </li>
                        <li>
                          <a className="links row">Tapis De Souris</a>
                        </li>
                        <li>
                          <a className="links row">Webcam</a>
                        </li>
                      </ul>
                    </li>
                    <li className="m-2">
                      <a
                        className="dropdown-item fs-5 text-warning fw-medium border-bottom border-2 "
                        href="#"
                      >
                        Accessoires Téléphones
                      </a>
                      <ul className="list-unstyled ms-1 ps-1 ">
                        <li>
                          <a className="links row">Etuis et coques </a>
                        </li>

                        <li>
                          <a className="links row">Protection Ecran</a>
                        </li>
                        <li>
                          <a className="links row">Power bank</a>
                        </li>
                        <li>
                          <a className="links row">Tige Selfie</a>
                        </li>
                        <li>
                          <a className="links row">Chargeur</a>
                        </li>
                        <li>
                          <a className="links row">Câble Chargeur</a>
                        </li>
                      </ul>
                    </li>
                  </div>
                </ul>
              </Dropdown>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link"
                  to="/contact"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="true"
                  aria-expanded="false"
                >
                  Composant Informatique
                </NavLink>
                <ul className="dropdown-menu dropdown-menu-scroll bg-shadow">
                  <div className="d-flex flex-column flex-lg-row px-2 scroll-menu">
                    <li className=" mx-2">
                      <a
                        className="dropdown-item fs-5 text-warning fw-medium border-bottom border-2 "
                        href="#"
                      >
                        Composants De Pc Bureau
                      </a>
                      <ul className="list-unstyled">
                        <li>
                          <a className="links row">Disque Dur Interne</a>
                        </li>

                        <li>
                          <a className="links row">Afficheur</a>
                        </li>

                        <li>
                          <a className="links row">
                            Ventilateur & Refroidisseur
                          </a>
                        </li>
                        <li>
                          <a className="links row">Processeur</a>
                        </li>
                        <li>
                          <a className="links row">Barrette Mémoire</a>
                        </li>
                        <li>
                          <a className="links row">Carte Mère</a>
                        </li>
                        <li>
                          <a className="links row">Carte Graphique</a>
                        </li>
                        <li>
                          <a className="links row">Boîte D'alimentation</a>
                        </li>
                        <li>
                          <a className="links row">Boîtier</a>
                        </li>
                      </ul>
                    </li>
                    <li className="mx-2">
                      <a
                        className="dropdown-item col  fs-5 text-warning fw-medium border-bottom border-2 "
                        href="#"
                      >
                        Composants De Pc Portable
                      </a>
                      <ul className="list-unstyled ">
                        <li>
                          <a className="links row">Disque Dur Interne</a>
                        </li>

                        <li>
                          <a className="links row">Afficheur</a>
                        </li>

                        <li>
                          <a className="links row">
                            Ventilateur & Refroidisseur
                          </a>
                        </li>

                        <li>
                          <a className="links row">Barrette Mémoire</a>
                        </li>

                        <li>
                          <a className="links row">Chargeur Pour Pc Portable</a>
                        </li>
                        <li>
                          <a className="links row">Batterie Pour Pc Portable</a>
                        </li>
                        <li>
                          <a className="links row">Clavier Pour Pc Portable</a>
                        </li>
                      </ul>
                    </li>
                  </div>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="true"
                  aria-expanded="false"
                  to="/impression"
                >
                  Impression
                </NavLink>
                <ul className="dropdown-menu bg-shadow">
                  <div className="d-flex flex-column flex-lg-row px-2">
                    <li className=" mx-2 ">
                      <a
                        className="dropdown-item fs-5 text-warning fw-medium border-bottom border-2 "
                        href="#"
                      >
                        Photocopieurs
                      </a>
                      <ul className="list-unstyled">
                        <li>
                          <a className="links row">Photocopieurs A4 | A3</a>
                        </li>
                        <li>
                          <a className="links row">Accessoires Photocopieurs</a>
                        </li>
                        <li>
                          <a className="dropdown-item fs-5 text-warning fw-medium border-bottom border-2">
                            Papier
                          </a>
                        </li>
                        <li>
                          <a className="links row">Papier A4</a>
                        </li>
                        <li>
                          <a className="links row">Papier A3</a>
                        </li>
                        <li>
                          <a className="links row">Enveloppe</a>
                        </li>
                        <li>
                          <a className="links row">Papier Photo</a>
                        </li>
                      </ul>
                    </li>
                  </div>
                </ul>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
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
