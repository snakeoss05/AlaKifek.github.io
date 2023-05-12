import React, { useState, useEffect } from "react";

import { useShoppingCart } from "../context/shopingcartcontext";
import axios from "axios";

interface Product {
  _id: string;
  category: string;
  title: string;
  price: number;

  imgurl: {
    mainimg: string;
    secimg: string;
    thirdimg: string;
    fourimg: string;
  };

  quantity: number;
  descreption: string;
  stock: boolean;
  mark: string;
}
export default function SingleProductHome(props: any) {
  const [mainimg, setmainimg] = useState(props.item.imgurl.mainimg);

  const { increaseItemQuantity } = useShoppingCart();

  return (
    <div>
      <button
        className="btn btn-close m-3 d-flex d-md-none ms-auto"
        onClick={props.handleClose}
      ></button>
      <section className="container  bg-white my-4 d-flex flex-column flex-lg-row ">
        <div className="d-flex flex-wrap  flex-lg-row left-side">
          <img
            className="object-fit-contain bg-white  m-2  h-75  bg-light w-100 rounded-4  mainimg"
            src={mainimg}
          />
          <div className=" d-flex flex-row ms-2 justify-content-evenly  w-100  h-fitcontent">
            <img
              className="bg-white  imgres rounded-4 shadow-sm"
              src={props.item.imgurl.secimg}
              onClick={() => setmainimg(props.item.imgurl.secimg)}
            />
            <img
              className="bg-white  ms-2 imgres rounded-4 shadow-sm"
              src={props.item.imgurl.thirdimg}
              onClick={() => setmainimg(props.item.imgurl.thirdimg)}
            />
            {props.item.imgurl.fourimg ? (
              <img
                className="bg-white d-lg-flex d-none ms-2 imgres rounded-4 shadow-sm"
                src={props.item.imgurl.fourimg}
                onClick={() => setmainimg(props.item.imgurl.fourimg)}
              />
            ) : (
              <div className="imgres"></div>
            )}
          </div>
        </div>
        <div className="d-flex flex-column  py-2 py-lg-5 px-3 bg-body right-side">
          <h1 className="fw-bolder my-3">{props.item.title}</h1>

          <p className="text-muted "> Réference:{props.item._id}</p>

          <div className="d-flex flex-row my-2 align-props.item-baseline text-warningn">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <p className="text-muted text-capitalize ms-2">
              (34 customer reviews)
            </p>
          </div>
          <h2 className="text-warning opacity-50">{props.item.price} DT</h2>
          <p className="w-100 overflow-y-auto">{props.item.descreption}</p>
          <div className="d-flex flex-row me-auto justify-content-around align-content-center align-props.item-center w-50 p-2 border-bottom my-3 fs-4">
            <i className="fa-solid fa-truck"></i>
            <i className="fa-solid fa-shield-halved"></i>
            <i className="fa-regular fa-clock"></i>
          </div>
          <div className="d-flex flex-row  justify-content-between align-props.item-center w-100 mt-4">
            <div className="me-3 me-lg-auto">
              <button
                onClick={() => {
                  increaseItemQuantity(
                    props.item.id,
                    props.item.imgurl.mainimg,
                    props.item.title,
                    props.item.price
                  );
                }}
                type="button"
                className="btn fw-semibold me-auto my-auto btn-outline-dark btn-sm  rounded-4"
              >
                ADD TO CART
              </button>
            </div>
            <div className="ms-auto">
              <span className=" fs-6 fw-bold text-muted ms-auto">
                Disponibilté:
              </span>
              {props.item.quantity != 0 ? (
                <span className="ms-2 fs-5 text-success">En Stock</span>
              ) : (
                <span className="ms-2 fs-5 text-danger">Out Of Stock</span>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
