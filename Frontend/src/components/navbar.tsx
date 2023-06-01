import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar as Navi } from "react-bootstrap";
import axios from "axios";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useShoppingCart } from "../context/shopingcartcontext";
import { debounce } from "lodash";
interface results {
  _id: any;
  title: string;
  price: number;
  imgurl: { mainimg: string };
  quantity: number;
}

function Navbar() {
  const navigate = useNavigate();
  const { cartQuantity } = useShoppingCart();
  const { cartItems } = useShoppingCart();
  const { userState, UserLog } = useShoppingCart();
  const [navbarColor, setNavbarColor] = useState("white");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<results[]>([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [category, setLinkValue] = useState("");
  const elementRef = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState(false);

  const handleSelect = () => {
    setExpanded(false);
  };
  const openNav = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    // add event listener to document
    document.addEventListener("click", handleClick);

    return () => {
      // remove event listener when component unmounts
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const ChangLogoutIcon = () => {
    if (UserLog) {
      return (
        <li className="nav-item mx-2 me-lg-0 ">
          <i
            className="fa-solid fa-right-from-bracket"
            onClick={() => userState(false)}
          ></i>
        </li>
      );
    } else {
      <></>;
    }
  };

  const handleClick = (e: any) => {
    // check if click occurred outside of element
    if (elementRef.current && !elementRef.current.contains(e.target)) {
      setQuery("");
    }
  };

  const handleSearch = async () => {
    console.log(`Query: ${query}`);
    try {
      const response = await axios.get<results[]>(
        `http://localhost:5000/api/products/get/Search/${query}`
      );
      if (query) {
        setResults(response.data);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedHandleSearch = debounce(handleSearch, 500);

  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
    debouncedHandleSearch();
  };
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
              <a target="_blank" style={{ color: "gray", margin: " 0 10px" }}>
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a target="_blank" style={{ color: "gray", margin: " 0 10px" }}>
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a target="_blank" style={{ color: "gray", margin: " 0 10px" }}>
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a target="_blank" style={{ color: "gray", margin: " 0 10px" }}>
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a target="_blank" style={{ color: "gray", margin: " 0 10px" }}>
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
        expanded={expanded}
        className="p-0 shadow-sm"
      >
        <div className="container border-nav">
          <Navi.Toggle aria-controls="basic-navbar-nav" onClick={openNav} />

          <div>
            <NavLink
              to="/"
              className="navbar-brand mt-2 mt-lg-0 overflow-auto h-100"
            >
              <img
                src="https://i.imgur.com/YzaiAsz.png"
                height="100"
                className="object-fit-content"
              />
            </NavLink>
          </div>

          <Navi.Collapse>
            <ul className="navbar-nav ms-1 ms-lg-5 me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <NavLink to="/" className="nav-title" type="button">
                  Home
                </NavLink>
              </li>
              <li className="togi nav-item">
                {" "}
                <li className="nav-title">Informatique</li>
                <ul className="menu2 p-0">
                  <li className=" m-2   ">
                    <NavLink
                      to={`/Category/Accessoires Pc`}
                      className="groupeList nav-header  "
                      onClick={handleSelect}
                    >
                      <i className="fa-regular fa-keyboard "></i>
                      <span>Accessoires Pc</span>
                    </NavLink>

                    <ul className="list-unstyled  ms-2 ps-1 ">
                      <Link
                        to={`/Category/Casque & Écouteurs`}
                        className="nav-link"
                        onClick={handleSelect}
                      >
                        Casque & Écouteurs
                      </Link>
                      <Link
                        to={`/Category/Souris`}
                        className="nav-link"
                        onClick={handleSelect}
                      >
                        Souris
                      </Link>
                      <Link
                        to={`/Category/Clavier`}
                        className="nav-link"
                        onClick={handleSelect}
                      >
                        Clavier
                      </Link>

                      <Link
                        to={`/Category/Ensemble Clavier Et Souris`}
                        className="nav-link"
                        onClick={handleSelect}
                      >
                        Ensemble Clavier Et Souris
                      </Link>
                      <Link
                        to={`/Category/Tapis De Souris`}
                        className="nav-link"
                        onClick={handleSelect}
                      >
                        Tapis De Souris
                      </Link>
                      <Link
                        to={`/Category/Webcam`}
                        className="nav-link"
                        onClick={handleSelect}
                      >
                        Webcam
                      </Link>
                    </ul>
                  </li>
                  <li className=" m-2  ">
                    <NavLink
                      to={`/Category/Accessoires Téléphones`}
                      className="groupeList"
                      onClick={handleSelect}
                    >
                      <i className="fa-solid fa-mobile-screen-button fs-5 ms-1"></i>
                      <span> Accessoires Téléphones</span>
                    </NavLink>

                    <ul className="list-unstyled  ms-2 ps-1  ">
                      <Link
                        to={`/Category/Etuis et coques`}
                        className="nav-link"
                        onClick={handleSelect}
                      >
                        Etuis et coques
                      </Link>

                      <Link
                        to={`/Category/Protection Ecran`}
                        className="nav-link"
                        onClick={handleSelect}
                      >
                        Protection Ecran
                      </Link>
                      <Link
                        to={`/Category/Power bank`}
                        onClick={handleSelect}
                        className="nav-link"
                      >
                        Power bank
                      </Link>
                      <Link
                        to={`/Category/Tige Selfie`}
                        onClick={handleSelect}
                        className="nav-link"
                      >
                        Tige Selfie
                      </Link>
                      <Link
                        to={`/Category/Chargeur`}
                        onClick={handleSelect}
                        className="nav-link"
                      >
                        Chargeur
                      </Link>
                      <Link
                        to={`/Category/Câble Chargeur`}
                        className="nav-link"
                        onClick={handleSelect}
                      >
                        Câble Chargeur
                      </Link>
                    </ul>
                  </li>
                  <li className="m-2 ">
                    <NavLink
                      to={`/Category/Composants De Pc Bureau`}
                      className="groupeList"
                    >
                      <i className="fa-solid fa-desktop fs-5"></i>
                      <span> Composants De Pc Bureau</span>
                    </NavLink>
                    <ul className="list-unstyled ms-2 ps-1 ">
                      <Link
                        to={`/Category/Disque Dur Interne`}
                        className="nav-link"
                      >
                        Disque Dur Interne
                      </Link>

                      <Link to={`/Category/Afficheur`} className="nav-link">
                        Afficheur
                      </Link>

                      <Link
                        to={`/Category/Ventilateur & Refroidisseur`}
                        className="nav-link"
                      >
                        Ventilateur & Refroidisseur
                      </Link>
                      <Link to={`/Category/Processeur`} className="nav-link">
                        Processeur
                      </Link>
                      <Link
                        to={`/Category/Barrette Mémoire`}
                        className="nav-link"
                      >
                        Barrette Mémoire
                      </Link>
                      <Link to={`/Category/Carte Mère`} className="nav-link">
                        Carte Mère
                      </Link>
                      <Link
                        to={`/Category/Carte Graphique`}
                        className="nav-link"
                      >
                        Carte Graphique
                      </Link>
                      <Link
                        to={`/Category/Boîte D'alimentation`}
                        className="nav-link"
                      >
                        Boîte D'alimentation
                      </Link>
                      <Link to={`/Category/Boitier`} className="nav-link">
                        Boîtier
                      </Link>
                    </ul>
                  </li>
                  <li className="m-2  ">
                    <NavLink
                      to={`/Category/Composants De Pc Portable`}
                      className="groupeList"
                    >
                      <i className="fa-solid fa-laptop fs-5"></i>
                      <span> Composants De Pc Portable</span>
                    </NavLink>
                    <ul className="list-unstyled  ms-2 ps-1 ">
                      <li className="nav-item">
                        <a className="nav-link">Disque Dur Interne</a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link">Afficheur</a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link">Ventilateur & Refroidisseur</a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link">Barrette Mémoire</a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link">Chargeur Pour Pc Portable</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link">Batterie Pour Pc Portable</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <NavLink className="nav-title" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="searchbar mt-4 me-lg-4 me-0">
              <form action="#">
                <input
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder="2 Caractères minimum"
                />
                <i className="fa fa-search" id="search-icon"></i>
              </form>
              <div id="searchBody" ref={elementRef}>
                {query &&
                  results?.map((product) => (
                    <Link to={`/Product/${product._id}`} key={product._id}>
                      <li
                        key={product._id}
                        className="row d-flex align-items-center border-bottom overflow-hidden text-black"
                      >
                        <span className="text-uppercase fs-6 col-md-6 ">
                          {product.title}
                        </span>
                        <div className="col-md-6 col-lg-3  ps-4">
                          <img
                            src={product.imgurl.mainimg}
                            width="100"
                            height="100"
                            className="object-fit-content ms-3 ms-lg-0"
                          />
                        </div>
                        <div className="col-md-6 col-lg-3 ps-2 ">
                          <div className="d-flex flex-row ">
                            {product.quantity != 0 ? (
                              <span className="text-muted me-auto">
                                Disponibilté:{" "}
                                <i
                                  className="fa-solid fa-circle fa-beat-fade mx-1"
                                  style={{ color: "green" }}
                                ></i>
                              </span>
                            ) : (
                              <span className="text-muted me-auto">
                                Disponibilté:{" "}
                                <i
                                  className="fa-solid fa-circle fa-beat-fade mx-1"
                                  style={{ color: "red" }}
                                ></i>
                              </span>
                            )}
                            <span className="fw-semibold text-warning ms-auto">
                              {product.price} DT
                            </span>
                          </div>
                        </div>
                      </li>
                    </Link>
                  ))}
              </div>
            </div>
          </Navi.Collapse>

          <ul className="navbar-nav d-flex flex-row justify-content-start  align-items-center">
            <li className="nav-item mx-2 me-lg-0 ">
              <i className="fa-regular fa-heart text-black"></i>
            </li>
            <li className="nav-item me-1 me-lg-0 ">
              <NavLink to="/login" className="nav-link">
                <i className="fa-solid fa-user text-black"></i>
              </NavLink>
            </li>

            {ChangLogoutIcon()}

            <li className="nav-item me-1 me-lg-0 position-relative">
              <a className="nav-link">
                <button
                  className="rounded-pill bg-transparent text-black border-0 ms-lg-0 ms-1 "
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
            <div className="d-flex flex-column mx-2 mt-lg-4 mt-1 ">
              <span className="fw-semibold">TOTAL</span>
              <p className="text-muted">
                {cartItems.reduce((total, Cartitem) => {
                  return total + (Cartitem.price || 0) * Cartitem.quantity;
                }, 0)}
                TND
              </p>
            </div>
          </ul>
        </div>
      </Navi>
    </>
  );
}

export default Navbar;
