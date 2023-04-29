import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar as Navi } from "react-bootstrap";
import axios from "axios";
import "./navbar.css";
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
  const { cartQuantity } = useShoppingCart();
  const { cartItems } = useShoppingCart();
  const [navbarColor, setNavbarColor] = useState("white");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<results[]>([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [category, setLinkValue] = useState("");
  const elementRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // add event listener to document
    document.addEventListener("click", handleClick);

    return () => {
      // remove event listener when component unmounts
      document.removeEventListener("click", handleClick);
    };
  }, []);

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
              <img
                src="https://lh3.googleusercontent.com/pw/AJFCJaVLpH09oRpkY88RdQijuMr-OsulSvXZRlx92ojhdpyQGmz8Zl5QP-QR3ZtCrPwP6R1PCNVk5INgkLF_1VWThGghqtKMdKj7kriepDHEHcitck99gLhvwe5xdjoC4FH6i564_MRgiCrp2vIK4aWGbuJXsp-8wLAe8oYus8-8AfEmjElatXZTDETBzPKcGiRxHfWHB5VohoPI8lXZtN0EHttcbIDhvG_RXABR-RP-Vkn9ZfZY_kOHrtme0y3zfk4gW8-xM0N6qmKjD9swpk0ZvLEDFUAHpMqJ8Jxm-uREC9BDB4b6VFs8ILWAFxZT8W-0aRurqjs0M8Qcw2w5Yguq2cqS6Oqmbf52CmEyk0WtokWsNjx6iKvVx9qjIWZBJ34rq21j-jonal8BrseoGg4uGXGAxC-R-wpFB12h8qbWQEB4D4XwzK-ZbjmtM0KQZ_b1-hCOFvzpSaFUPCREMlIGbpIadJfh9RWZSCmXkv4BaJx3hbVhOfbDF1Hkw3mIbUArDT2npT6gkX5V-cVH9XIDS-mQiPYt3ngoFMPtJCTgFm8iM7E8Kjpte1cNKT5JPBvf8u2U6NDh4IyxDQ6E-O6r3djQu9qawjyQ1FKVscbM-3f4FuNjIcrOJxpHFfJfvKOIHuSXD6SQaeYtxfZAlS2iauCYw32SACQxCt63JretzJh9vnd8jLzZTqO3dP13ma031JMNfTKLusxjejydEoyDo2tvcl_NuR9FGGeguNu1D4XpkfgHQGmdVDSq0vfhRpXsed_UoOwnPInwh7Ordw5Vvma59wueAfdqPlgVXJulzLKNCJv97V_fmfMnHOQGHqe57AroR_AVwCjKqVEbzb5O-OKXEOrVPDVetKyaa9uW4uvFtKxamKIXpbO7tkdEj2sUm8q17N9dt2K2KfvHGWgLN66fkoLZhkznzAc604C6nmg8VqwiQZo-ATLaTEwb-j9ZSGhcrmITJf6hkaiplyXs4bbQ6TdU1hWvLGI0hp37eG1BTj7JTvWF19Ly1m1Gutolbg=w500-h500-s-no?authuser=0"
                height="120"
              />
            </NavLink>
          </div>

          <Navi.Collapse>
            <ul className="navbar-nav ms-lg-5 me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <NavLink to="/" className="nav-title" type="button">
                  Home
                </NavLink>
              </li>
              <li className="togi nav-item">
                {" "}
                <li className="nav-title">Informatique</li>
                <ul className="menu2 p-0">
                  <div className="d-flex flex-column flex-md-row shadow-sm justify-content-around bg-white   flex-wrap flex-lg-nowrap">
                    <li className=" m-2   ps-3 ">
                      <NavLink
                        to={`/Category/Accessoires Pc`}
                        className="groupeList nav-header  "
                      >
                        <i className="fa-regular fa-keyboard "></i>
                        <span>Accessoires Pc</span>
                      </NavLink>

                      <ul className="list-unstyled  ms-2 ps-1 ">
                        <Link
                          to={`/Category/Casque & Écouteurs`}
                          className="nav-link"
                        >
                          Casque & Écouteurs
                        </Link>
                        <Link to={`/Category/Souris`} className="nav-link">
                          Souris
                        </Link>
                        <Link to={`/Category/Clavier`} className="nav-link">
                          Clavier
                        </Link>

                        <Link
                          to={`/Category/Ensemble Clavier Et Souris`}
                          className="nav-link"
                        >
                          Ensemble Clavier Et Souris
                        </Link>
                        <Link
                          to={`/Category/Tapis De Souris`}
                          className="nav-link"
                        >
                          Tapis De Souris
                        </Link>
                        <Link to={`/Category/Webcam`} className="nav-link">
                          Webcam
                        </Link>
                      </ul>
                    </li>
                    <li className=" m-2   ps-3">
                      <NavLink
                        to={`/Category/Accessoires Téléphones`}
                        className="groupeList"
                      >
                        <i className="fa-solid fa-mobile-screen-button fs-5 ms-1"></i>
                        <span className="fw-500 "> Accessoires Téléphones</span>
                      </NavLink>

                      <ul className="list-unstyled  ms-2 ps-1  ">
                        <Link
                          to={`/Category/Etuis et coques`}
                          className="nav-link"
                        >
                          Etuis et coques
                        </Link>

                        <Link
                          to={`/Category/Protection Ecran`}
                          className="nav-link"
                        >
                          Protection Ecran
                        </Link>
                        <Link to={`/Category/Power bank`} className="nav-link">
                          Power bank
                        </Link>
                        <Link to={`/Category/Tige Selfie`} className="nav-link">
                          Tige Selfie
                        </Link>
                        <Link to={`/Category/Chargeur`} className="nav-link">
                          Chargeur
                        </Link>
                        <Link
                          to={`/Category/Câble Chargeur`}
                          className="nav-link"
                        >
                          Câble Chargeur
                        </Link>
                      </ul>
                    </li>
                    <li className="m-2  ps-3">
                      <NavLink
                        to={`/Category/Composants De Pc Bureau`}
                        className="groupeList"
                      >
                        <i className="fa-solid fa-desktop fs-5"></i>
                        <span className="fw-500 ">
                          {" "}
                          Composants De Pc Bureau
                        </span>
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
                    <li className="m-2   ps-3">
                      <NavLink
                        to={`/Category/Composants De Pc Portable`}
                        className="groupeList"
                      >
                        <i className="fa-solid fa-laptop fs-5"></i>
                        <span className="fw-500 ">
                          {" "}
                          Composants De Pc Portable
                        </span>
                      </NavLink>
                      <ul className="list-unstyled  ms-2 ps-1 ">
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
                          <a className="nav-link">Chargeur Pour Pc Portable</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link">Batterie Pour Pc Portable</a>
                        </li>
                      </ul>
                    </li>
                  </div>
                </ul>
              </li>

              <li className="nav-item">
                <NavLink className="nav-title" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="searchbar mt-4 me-4 ">
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
                    <Link to={`/Product/${product._id}`}>
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
            <ul className="navbar-nav d-flex flex-row justify-content-start  align-items-center">
              <li className="nav-item me-3 me-lg-0 ">
                <i className="fa-regular fa-heart fs-5 me-2 text-black"></i>
              </li>
              <li className="nav-item me-3 me-lg-0 mb-1">
                <NavLink to="/login" className="nav-link">
                  <i className="fa-solid fa-user text-black"></i>
                </NavLink>
              </li>
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
              <div className="d-flex flex-column mx-2 mt-4">
                <span className="fw-semibold">TOTAL</span>
                <p className="text-muted">
                  {cartItems.reduce((total, Cartitem) => {
                    return total + (Cartitem.price || 0) * Cartitem.quantity;
                  }, 0)}
                  TND
                </p>
              </div>
            </ul>
          </Navi.Collapse>
        </div>
      </Navi>
    </>
  );
}

export default Navbar;
