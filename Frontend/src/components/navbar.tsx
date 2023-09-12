import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar as Navi } from "react-bootstrap";
import axios from "axios";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSelect = () => {
    setExpanded(false);
  };
  const openNav = () => {
    setExpanded(!expanded);
  };
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 149) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
            onClick={() => userState(false)}></i>
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
    try {
      const response = await axios.get<results[]>(
        `https://alakifekbackend.onrender.com/api/products/get/Search/${query}`
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
    <header>
      <div className="header-top">
        <div className="contanier  ">
          <p>Welcome to Worldwide Electronics Store</p>
          <div className="link-top-heder">
            {UserLog && <Link to="/ProfileInformation">My Account</Link>}

            <a href="#">My Wishlist</a>
            <Link to="/login">Sign In</Link>
            <a href="#">Compare</a>
          </div>
        </div>
      </div>
      <div className="header-info">
        <div className="contanier d-flex flex-column flex-lg-row align-items-center justify-content-between">
          <Link to="/">
            <img
              src="https://ala-kifek.netlify.app/logo/logo black.png"
              width="100"
              height="100"
              alt=""
            />
          </Link>
          <div className="search-bar position-relative">
            <form className="rounded-5 overflow-hidden">
              <input
                type="text"
                placeholder="Search For Products..."
                value={query}
                onChange={handleInputChange}
              />
              <button className="btn-srch rounded-end-5" onClick={handleSearch}>
                Search
              </button>
            </form>
            <div id="searchBody" ref={elementRef}>
              {query &&
                results?.map((product) => (
                  <Link to={`/Product/${product._id}`} key={product._id}>
                    <li
                      key={product._id}
                      className="row d-flex align-items-center  border-bottom rounded-4 overflow-hidden text-black">
                      <span className="text-uppercase fs-6 col-md-6 ">
                        {product.title}
                      </span>
                      <div className="col-md-6 col-xl-3  ps-4">
                        <img
                          src={product.imgurl.mainimg}
                          width="100"
                          height="100"
                          className="object-fit-content ms-3 ms-lg-0"
                        />
                      </div>
                      <div className="col-md-6 col-xxl-3 ps-2 ">
                        <div className="d-flex flex-row ">
                          {product.quantity != 0 ? (
                            <span className="text-muted me-auto">
                              Disponibilté:{" "}
                              <i
                                className="fa-solid fa-circle fa-beat-fade mx-1"
                                style={{ color: "green" }}></i>
                            </span>
                          ) : (
                            <span className="text-muted me-auto">
                              Disponibilté:{" "}
                              <i
                                className="fa-solid fa-circle fa-beat-fade mx-1"
                                style={{ color: "red" }}></i>
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
          <div className="carde">
            <a>
              <i className="fa-solid fa-bag-shopping" onClick={openCart} />{" "}
              <span className="total" />
            </a>
            <div className="price">
              <p>My Cart:</p>
              <span>
                {" "}
                {cartItems.reduce((total, Cartitem) => {
                  return total + (Cartitem.price || 0) * Cartitem.quantity;
                }, 0)}
                TND
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`header-bottom z-3  bg-white ${
          isSticky && "sticky shadow-sm "
        }`}>
        <div className="contanier  ">
          <div className="dropdown">
            <i className="fa-solid fa-bars "></i>
            <span className="ms-2 fw-semibold " style={{ lineHeight: "50px" }}>
              SHOP BY DEPARTMENT
            </span>
            <div className="dropdown-content ">
              <ul className="side-links ">
                <div
                  className="bg-transparent"
                  style={{ height: "10px" }}></div>

                <a href="#">
                  <Link to="/mellieurOffre">
                    <li className="border-top-0 ">top 10 offers</li>
                  </Link>
                </a>

                <a href="#" className="toggler">
                  <li>phones &amp; tablets</li>
                  <div className="menu8">
                    <div className="row p-2">
                      <div className="col-xl-4 col-md-6 col-12">
                        {" "}
                        <h6>Accessoires Téléphonie</h6>
                        <ul className="border-gr">
                          <li>POWER BANK</li>
                          <li>Kit piéton et Casque</li>
                          <li>Etuis et coques</li>
                          <li>Protection Ecran</li>
                          <li>Tige Selfie</li>
                          <li>Chargeur</li>
                          <li>Câble Chargeur</li>
                        </ul>
                      </div>
                      <div className="col-xl-4 col-md-6 col-12">
                        <ul className="border-gr mt-4">
                          <li>Contrôleur de jeu</li>
                          <li>Batterie</li>
                          <li>Support Smartphone</li>
                          <li>Adaptateur iPhone</li>
                        </ul>
                        <h6>Smartphone & Mobile</h6>
                        <ul className="border-gr">
                          <li>Téléphone Portable</li>
                          <li>Smartphone</li>
                          <li>iPhone</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </a>
                <a href="#" className=" toggler ">
                  <li>Electronics &amp; digital</li>
                  <div className="menu8 ">
                    <div className="row p-2">
                      <div className="col-xl-4 col-md-6 col-12">
                        <Link to={`/Category/Accessoires Pc`}>
                          <h6>Périphériques et Accessoires Gamers</h6>
                        </Link>
                        <ul className="border-gr">
                          <li>Ecran Gamer</li>
                          <Link to="/Category/Clavier">
                            <li>Clavier Gamer</li>
                          </Link>
                          <Link to="/Category/Casque & Écouteurs">
                            <li>Micro Casque & Écouteur Gaming</li>
                          </Link>
                          <li>Haut-Parleur Gamer</li>
                          <Link to="/Category/Tapis">
                            <li>Tapis de Souris Gamer</li>
                          </Link>
                          <Link to="/Category/Ensemble Clavier Et Souris">
                            <li>Ensemble Clavier Et Souris</li>
                          </Link>
                          <Link to="/Category/Webcam">
                            <li>Webcam</li>
                          </Link>
                        </ul>
                      </div>
                      <div className="col-xl-4 col-md-6 col-12">
                        <h6>Composants Informatique</h6>
                        <ul className="border-gr">
                          <li>Processeur</li>
                          <li>Carte Graphique</li>
                          <li>Barrettes</li>
                          <li>Mémoire Carte</li>
                          <li>Mère Boîtier</li>
                          <li>Disque Dur Interne</li>
                        </ul>
                      </div>
                      <div className="col-xl-4 col-md-6 col-12 ">
                        <ul className="border-gr ">
                          <li>Bloc d'alimentation</li>
                          <li> Disque Dur Externe</li>
                          <li>Clé USB</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </a>
                <a href="#">
                  <li>Fashion &amp; Clothings</li>
                </a>
                <a href="#">
                  <li>jewelry &amp; watches</li>
                </a>
                <a href="#">
                  <li>health &amp; beauty</li>
                </a>
                <a href="#">
                  <li>TV &amp; audio</li>
                </a>
              </ul>
            </div>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/mellieurOffre">New arrivals</Link>
            </li>
            <li>
              <a href="about.html">about us</a>
            </li>
            <li>
              <Link to="contact">contact</Link>
            </li>
          </ul>
          <div className="headr-bottom-right">
            <div className="currency d-none d-lg-block">
              <select>
                <option value="">USD</option>
                <option value="">EUR</option>
                <option value="">SAR</option>
                <option value="">PKR</option>
              </select>
            </div>
            <div className="lnag d-none d-lg-block">
              <select name="" id="">
                <option value="">English</option>
                <option value="">Germany</option>
                <option value="">Arabic</option>
                <option value="">Pakistan</option>
              </select>
            </div>
            <div className="carde d-flex d-lg-none">
              <a>
                <i className="fa-solid fa-bag-shopping" onClick={openCart} />{" "}
                <span className="total" />
              </a>
              <div className="price">
                <p>My Cart:</p>
                <span>
                  {" "}
                  {cartItems.reduce((total, Cartitem) => {
                    return total + (Cartitem.price || 0) * Cartitem.quantity;
                  }, 0)}
                  TND
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
