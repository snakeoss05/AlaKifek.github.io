import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/shopingcartcontext";
import Cookies from "js-cookie";
import "./checkoutstyle.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
interface User {
  FirstName: string;
  LastName: string;
  AddressLine: string;
  PhoneNumber: number;
  City: string;
  email: string;
}

export default function Checkout() {
  const { cartItems, getItemQuantity } = useShoppingCart();
  const { openCart } = useShoppingCart();
  const [user, setuser] = useState<User>();
  const [formData, setformData] = useState({
    firstname: "",
    lastname: "",
    adresse: "",
    city: "",
    CodePostal: "",
    phoneNumber: "",
    cartitems: [...cartItems],
  });
  const formDataone = {
    firstname: user?.FirstName,
    lastname: user?.LastName,
    adresse: user?.AddressLine,
    city: user?.City,
    phoneNumber: user?.PhoneNumber,
    cartitems: [...cartItems],
    clientId: user?.email,
  };

  // Handle input Changer
  function HandleChange(event: any) {
    const { name, value } = event.target;
    setformData((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }

  // Post Order Form
  const sendform = async () => {
    try {
      const response = await axios.post(
        "https://alakifekbackend.onrender.com/api/submit-form/post",

        user ? formDataone : formData
      );

      toast.success(
        "Your Order has been Send it Successfuly Please Wait To Call You Back 📞",
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // Get User Inforamtion From Local Session

  useEffect(() => {
    const getUserById = async () => {
      var token = Cookies.get("token");
      try {
        const response = await axios.get(
          `https://alakifekbackend.onrender.com/api/ath/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setuser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (!user) getUserById();
  }, []);
  return (
    <>
      <div className=" container-fluid my-5 ">
        <div className="row justify-content-center ">
          <div className="col-xl-10">
            <div className="card shadow-lg ">
              <div className="row p-2 mt-3 justify-content-between mx-sm-2">
                <div className="col">
                  <p className="text-muted space mb-0 shop"> Shop Ala Kifek</p>
                  <p className="text-muted space mb-0 shop">
                    48 Rue tattawer Cité Tahrir
                  </p>
                </div>
                <div className="col">
                  <div className="row justify-content-start ">
                    <div className="col">
                      <img
                        className="irc_mi img-fluid cursor-pointer "
                        src="https://scontent.ftun4-2.fna.fbcdn.net/v/t39.30808-6/343961794_780214266760865_7512067717752570543_n.png?_nc_cat=109&ccb=1-7&_nc_sid=730e14&_nc_ohc=4jjmuXg37z0AX_BkHhb&_nc_ht=scontent.ftun4-2.fna&oh=00_AfBzv60u1a_rCBXzGMqhLFF8T1MZ-QJ-Fm2TGzm383L2PA&oe=64537BB3"
                        width={80}
                        height={100}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <img
                    className="irc_mi img-fluid bell"
                    src="https://i.imgur.com/uSHMClk.jpg"
                    width={30}
                    height={30}
                  />
                </div>
              </div>
              <div className="row  mx-auto justify-content-center text-center">
                <div className="col-12 mt-3 ">
                  <nav aria-label="breadcrumb" className="second ">
                    <ol className="breadcrumb indigo lighten-6 first  ">
                      <li className="breadcrumb-item font-weight-bold ">
                        <NavLink
                          className="black-text text-uppercase links"
                          to="/store"
                        >
                          <span className="mr-md-3 mr-1 ">BACK TO SHOP</span>
                        </NavLink>
                        <i
                          className="fa fa-angle-double-right "
                          aria-hidden="true"
                        />
                      </li>
                      <li className="breadcrumb-item font-weight-bold">
                        <a className="black-text text-uppercase links" href="#">
                          <span className="mr-md-3 mr-1" onClick={openCart}>
                            SHOPPING BAG
                          </span>
                        </a>
                        <i
                          className="fa fa-angle-double-right text-uppercase "
                          aria-hidden="true"
                        />
                      </li>
                      <li className="breadcrumb-item font-weight-bold">
                        <a
                          className="black-text text-uppercase active-2 links"
                          href="#"
                        >
                          <span className="mr-md-3 mr-1">CHECKOUT</span>
                        </a>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <div className="row justify-content-around ">
                <div className="col-md-5">
                  <div className="card border-0">
                    <div className="card-header pb-0">
                      <h2 className="card-title space ">Checkout</h2>
                      <p className="card-text text-muted mt-4  space">
                        SHIPPING DETAILS
                      </p>
                      <hr className="my-0" />
                    </div>
                    <div className="card-body">
                      <form className="text-capitalize">
                        {user != null ? (
                          <>
                            <div className="form-group">
                              <label className="small text-muted mb-1">
                                FirstName
                              </label>
                              <h5>{user.FirstName}</h5>
                            </div>
                            <div className="form-group">
                              <label className="small text-muted mb-1">
                                LastName
                              </label>
                              <h5>{user.LastName}</h5>
                            </div>
                            <div className="form-group">
                              <label className="small text-muted mb-1">
                                City
                              </label>
                              <h5>{user.City}</h5>
                            </div>
                            <div className="form-group">
                              <label className="small text-muted mb-1">
                                Location
                              </label>
                              <h5>{user.AddressLine}</h5>
                            </div>
                            <div className="form-group">
                              <label className="small text-muted mb-1">
                                Phone Number
                              </label>
                              <h5>{user.PhoneNumber}</h5>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="form-group">
                              <label className="small text-muted mb-1">
                                First Name
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="firstname"
                                onChange={HandleChange}
                                value={formData.firstname}
                                placeholder="Example: Ahmed"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label className="small text-muted mb-1">
                                Last Name
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="lastname"
                                onChange={HandleChange}
                                value={formData.lastname}
                                placeholder="Example: Ben Torkia"
                                required
                              />
                              <label className="small text-muted mb-1">
                                Adresse
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="adresse"
                                onChange={HandleChange}
                                value={formData.adresse}
                                placeholder="Example: 48 Rue zouhour"
                                required
                              />
                            </div>
                            <div className="row no-gutters">
                              <div className="col-sm-6 pr-sm-2">
                                <div className="form-group">
                                  <label
                                    htmlFor="NAME"
                                    className="small text-muted mb-1"
                                  >
                                    City
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    name="city"
                                    onChange={HandleChange}
                                    value={formData.city}
                                    placeholder="Tunis"
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label
                                    htmlFor="NAME"
                                    className="small text-muted mb-1"
                                  >
                                    Code Postal
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control form-control-sm "
                                    name="CodePostal"
                                    onChange={HandleChange}
                                    value={formData.CodePostal}
                                    placeholder={"Example: 2042"}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="input-group  form-control-sm my-2 me-auto px-3">
                                <label
                                  htmlFor="NAME"
                                  className="small text-muted mb-1 col-12"
                                >
                                  Phone Number
                                </label>

                                <span
                                  className="input-group-text "
                                  id="basic-addon1"
                                >
                                  216
                                </span>
                                <input
                                  type="number"
                                  className="form-control form-control-sm "
                                  placeholder="Example: 27 768 325"
                                  name="phoneNumber"
                                  onChange={HandleChange}
                                  value={formData.phoneNumber}
                                  required
                                />
                              </div>
                            </div>
                          </>
                        )}
                        <div className="row mb-md-5 my-3">
                          <div className="d-grid my-3">
                            <button
                              type="button"
                              className="btn btn-lg  "
                              onClick={sendform}
                            >
                              PURCHASE
                            </button>
                            <ToastContainer />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="card border-0 ">
                    <div className="card-header card-2">
                      <p className="card-text text-muted mt-md-4  mb-2 space">
                        YOUR ORDER{" "}
                        <span className=" small text-muted ml-2 cursor-pointer">
                          EDIT SHOPPING BAG
                        </span>{" "}
                      </p>
                      <hr className="my-2" />
                    </div>
                    <div className="card-body pt-0 ">
                      {cartItems.map((item) => {
                        const quantity = getItemQuantity(item.id);
                        return (
                          <div
                            className="row  justify-content-between"
                            key={item.id}
                          >
                            <div className="col-auto col-md-7">
                              <div className="d-flex my-1 flex-row flex-sm-row">
                                <img
                                  className=" img-fluid"
                                  src={item.imgurl}
                                  width={62}
                                  height={62}
                                />
                                <div className="d-flex align-items-center align-content-center mx-5 my-auto">
                                  <div className="row">
                                    <div className="col-auto">
                                      <p className="mb-1 text-uppercase">
                                        <b>{item.title}</b>
                                      </p>
                                      <small className="text-muted">
                                        Réference:
                                        {item.id}
                                      </small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className=" pl-0 flex-sm-col col-auto  my-auto">
                              {" "}
                              <p className="boxed-1">{quantity}</p>
                            </div>
                            <div className=" pl-0 flex-sm-col col-auto  my-auto ">
                              <p>
                                <b>
                                  {(item.price || 0) * quantity || 0}
                                  <span className="text-warning"> TND</span>
                                </b>
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      <hr className="my-2" />
                      <div className="row ">
                        <div className="col">
                          <div className="row justify-content-between">
                            <div className="col-4">
                              <p className="mb-1">
                                <b>Subtotal</b>
                              </p>
                            </div>
                            <div className="flex-sm-col col-auto">
                              <p className="mb-1">
                                <b>
                                  {cartItems.reduce((total, Cartitem) => {
                                    return (
                                      total +
                                      (Cartitem.price || 0) * Cartitem.quantity
                                    );
                                  }, 0)}
                                  <span> TND</span>
                                </b>
                              </p>
                            </div>
                          </div>
                          <div className="row justify-content-between">
                            <div className="col">
                              <p className="mb-1">
                                <b>Shipping</b>
                              </p>
                            </div>
                            <div className="flex-sm-col col-auto">
                              <p className="mb-1">
                                <b>5 TND</b>
                              </p>
                            </div>
                          </div>
                          <div className="row justify-content-between">
                            <div className="col-4">
                              <p>
                                <b>Total</b>
                              </p>
                            </div>
                            <div className="flex-sm-col col-auto">
                              <p className="mb-1">
                                <b>
                                  {cartItems.reduce((total, Cartitem) => {
                                    return (
                                      total +
                                      (Cartitem.price || 0) * Cartitem.quantity
                                    );
                                  }, 5)}
                                  <span> TND</span>
                                </b>
                              </p>{" "}
                            </div>
                          </div>
                          <hr className="my-0" />
                        </div>
                      </div>
                      <div className="d-grid mb-5 mt-4">
                        <button
                          type="button"
                          className="btn btn-block btn-lg btn-outline-primary col-10 col-md-7 col-lg-6 mx-auto"
                        >
                          ADD GIFT CODE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
