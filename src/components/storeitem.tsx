import { useState } from "react";
import { useShoppingCart } from "../context/shopingcartcontext";

import Modal from "react-bootstrap/Modal";
import Singleproduct from "../pages/singleproduct";
import { Link } from "react-router-dom";

type storeitemprops = {
  id: any;
  title: string;
  price: number;
  imgurl: string;
  quantity: number;
  description: string;
};
export default function Card({
  id,
  title,
  price,
  imgurl,
  quantity,
  description,
}: storeitemprops) {
  const { increaseItemQuantity } = useShoppingCart();

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [lgShow, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleViewFullDescription = () => {
    setShowFullDescription(true);
    setShow(true);
  };

  return (
    <div key={id}>
      <div
        className="px-2  py-3 d-flex align-content-center flex-column rounded-5 border position-relative bg-white item-hover"
        style={{
          height: "460px",
          width: "300px",
          backgroundColor: "rgb(218 218 218)",
        }}
      >
        <div className="mx-auto">
          <button
            onClick={handleViewFullDescription}
            className="position-absolute start-0 top-0 m-4 rounded-5 p-2 fw-bolder  btn btn-outline-dark border border-2"
          >
            <i className="fa-regular fa-eye"></i>
          </button>
          <Link to={`/Product/${id}`}>
            <img
              src={imgurl}
              className="rounded-5  bg-white object-fit-contain"
              width="260px"
              height="300px"
              style={{ objectFit: "fill" }}
            />
          </Link>
        </div>
        <h1
          className="mx-auto fs-6 text-capitalize"
          style={{ maxHeight: "40px" }}
        >
          {title}
        </h1>

        <div className="d-flex flex-row align-items-center justify-content-around align-content-center position-absolute bottom-0 my-2 py-2 pe-2 w-100">
          {quantity ? (
            <span className="text-muted">
              Disponibilté:{" "}
              <i
                className="fa-solid fa-circle fa-beat-fade mx-1"
                style={{ color: "green" }}
              ></i>
            </span>
          ) : (
            <span className="text-muted">
              Disponibilté:{" "}
              <i
                className="fa-solid fa-circle fa-beat-fade mx-1"
                style={{ color: "red" }}
              ></i>
            </span>
          )}
          <h4 className=" text-muted  fs-5">{price} DT</h4>
          <button
            type="button"
            className="btn fw-semibold btn-outline-dark p-2 rounded-pill"
            onClick={() => {
              if (quantity != 0) increaseItemQuantity(id);
              else alert("items out of stock");
            }}
          >
            <i className="fa-solid fa-cart-plus fs-5"></i>
          </button>
        </div>
      </div>
      {showFullDescription && (
        <Modal show={lgShow} onHide={handleClose} size="xl">
          <Singleproduct id={id} />
        </Modal>
      )}
    </div>
  );
}
