import React, { useState, useEffect } from "react";
import { useShoppingCart } from "../context/shopingcartcontext";
import { useParams } from "react-router-dom";
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
export default function Singlepage() {
  let { id } = useParams();
  const [item, setProduct] = useState<Product>();
  const [mainimg, setmainimg] = useState("");

  useEffect(() => {
    axios
      .get<Product>(`http://localhost:5000/api/products/get/${id}`)
      .then((response) => {
        setProduct(response.data);
        setmainimg(response.data?.imgurl.mainimg);
      });
  }, [id]);

  const { increaseItemQuantity } = useShoppingCart();

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div key={id}>
      <section className="container  bg-white my-4 d-flex flex-column flex-lg-row ">
        <div className="d-flex flex-wrap  flex-lg-row left-side">
          <img
            className="object-fit-contain bg-white  m-2  h-75  bg-light w-100 rounded-4  mainimg"
            src={mainimg}
          />
          <div className=" d-flex flex-row ms-2 justify-content-evenly  w-100  h-fitcontent">
            <img
              className="bg-white  imgres rounded-4 shadow-sm"
              src={item?.imgurl.secimg}
              onClick={() => setmainimg(item?.imgurl.mainimg)}
            />
            <img
              className="bg-white  ms-2 imgres rounded-4 shadow-sm"
              src={item?.imgurl.thirdimg}
              onClick={() => setmainimg(item?.imgurl.thirdimg)}
            />
            {item.imgurl.fourimg ? (
              <img
                className="bg-white  ms-2 imgres rounded-4 shadow-sm"
                src={item.imgurl.fourimg}
                onClick={() => setmainimg(item.imgurl.fourimg)}
              />
            ) : (
              <div className="imgres"></div>
            )}
          </div>
        </div>
        <div className="d-flex flex-column  py-2 py-lg-5 px-3 bg-body right-side">
          <h1 className="fw-bolder my-3">{item?.title}</h1>
          <p className="text-black fw-bold">
            Réference:
            <p className="text-muted ">{item?._id}</p>
          </p>{" "}
          <div className="d-flex flex-row my-2 align-items-baseline text-warningn">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <p className="text-muted text-capitalize ms-2">
              (34 customer reviews)
            </p>
          </div>
          <h2 className="text-warning opacity-50">{item?.price} DT</h2>
          <p className="w-100 overflow-y-auto">{item?.descreption}</p>
          <div className="d-flex flex-row me-auto justify-content-around align-content-center align-items-center w-50 p-2 border-bottom my-3 fs-4">
            <i className="fa-solid fa-truck"></i>
            <i className="fa-solid fa-shield-halved"></i>
            <i className="fa-regular fa-clock"></i>
          </div>
          <div className="mt-lg-2 mt-0 ms-lg-5 ms-1 d-flex flex-row">
            <button
              onClick={() => {
                increaseItemQuantity(
                  id,
                  item.imgurl.mainimg,
                  item.title,
                  item.price
                );
              }}
              type="button"
              className="btn  fw-semibold   my-2 btn-outline-dark  rounded-4 mt-lg-5 mt-0"
            >
              ADD TO CART
            </button>
            <div className="mt-0 mt-lg-4 ms-auto d-flex flex-row align-content-center justify-content-center align-items-center">
              <span className="me-2 fs-5 fw-bold text-muted">
                Disponibilté:
              </span>
              {item?.quantity != 0 ? (
                <span className="fs-5 text-success">En Stock</span>
              ) : (
                <span className="fs-5 text-danger">Out Of Stock</span>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
