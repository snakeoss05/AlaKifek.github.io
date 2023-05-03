import { useState } from "react";
import { useShoppingCart } from "../context/shopingcartcontext";
import "./CardProduct.css";
import Modal from "react-bootstrap/Modal";
import Singleproduct from "../pages/singleproduct";
import { Link } from "react-router-dom";

type storeitemprops = {
  id: any;
  title: string;
  price: number;
  imgurl: string;
  quantity: number;
  imgurl2: string;
  descreption: string;
};
export default function Card({
  id,
  title,
  price,
  imgurl,
  quantity,
  imgurl2,
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
    <div id="CardProduct" key={id}>
      <div className="CardBody">
        <Link to={`/Product/${id}`}>
          <div className="img-container">
            <img className="img1" src={imgurl} />
            <img className="img2" src={imgurl2} />
          </div>
        </Link>
        <span className="Producttitle">{title}</span>

        <div className="details">
          {quantity != 0 ? (
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
        </div>
        <div className="price">
          <span className="text-muted me-auto" style={{ fontSize: "15px" }}>
            {price} DT
          </span>
          <ul
            className="d-flex flex-row  ms-auto my-auto"
            style={{ fontSize: "15px" }}
          >
            <i className="fa-solid fa-star" style={{ color: "gold" }}></i>
            <i className="fa-solid fa-star" style={{ color: "gold" }}></i>
            <i className="fa-solid fa-star" style={{ color: "gold" }}></i>
            <i className="fa-solid fa-star" style={{ color: "gold" }}></i>
            <i className="fa-solid fa-star" style={{ color: "gold" }}></i>
            <span className="ms-1">4.9</span>
          </ul>
        </div>
        <div className="addcart">
          <button
            className="btn btn-outline-dark col-8 me-2"
            onClick={handleViewFullDescription}
          >
            More detaills
          </button>
          <button
            className="btn btn-dark col-2"
            onClick={() => {
              if (quantity != 0) increaseItemQuantity(id, imgurl, title, price);
              else alert("items out of stock");
            }}
          >
            <i
              className="fa-solid fa-cart-shopping text-white "
              style={{ fontSize: "16px" }}
            ></i>
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
