import React from "react";
import { useState } from "react";
import "./item.css";
import { useShoppingCart } from "../context/shopingcartcontext";
import Modal from "react-bootstrap/Modal";
import SingleProductHome from "../pages/SingleProductHome";
export default function StoreHomeitem(props: any) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [lgShow, setShow] = useState(false);
  const { increaseItemQuantity } = useShoppingCart();
  const handleClose = () => setShow(false);
  const handleViewFullDescription = () => {
    setShowFullDescription(true);
    setShow(true);
  };
  function calculateDiscountedPrice(price: number, discount: string) {
    const discountDecimal = parseFloat(discount.replace("%", "")) / 100;
    return Math.floor(price * (1 - discountDecimal));
  }
  return (
    <div className="col-md-3 col-sm-6" key={props.item._id}>
      {" "}
      <div>
        <div className="product-grid4">
          <div className="product-image4">
            <a>
              <img className="pic-1" src={props.item.imgurl.mainimg} />
              <img className="pic-2" src={props.item.imgurl.secimg} />
            </a>
            <ul className="social">
              <li>
                <a data-tip="Quick View" onClick={handleViewFullDescription}>
                  <i className="fa fa-eye" />
                </a>
              </li>
              <li>
                <a
                  data-tip="Add to Wishlist"
                  onClick={() => {
                    if (props.item.quantity != 0)
                      increaseItemQuantity(
                        props.item._id,
                        props.item.imgurl.mainimg,
                        props.item.title,
                        props.item.price
                      );
                    else alert("items out of stock");
                  }}
                >
                  <i className="fa fa-shopping-bag" />
                </a>
              </li>
              <li>
                <a
                  data-tip="Add to Cart"
                  onClick={() => {
                    if (props.item.quantity != 0)
                      increaseItemQuantity(
                        props.item._id,
                        props.item.imgurl.mainimg,
                        props.item.title,
                        props.item.price
                      );
                    else alert("items out of stock");
                  }}
                >
                  <i className="fa fa-shopping-cart" />
                </a>
              </li>
            </ul>
            <span className="product-new-label">New</span>
            <span className="product-discount-label">
              -{props.item.promotion}
            </span>
          </div>
          <div className="product-content">
            <h3 className="title">
              <a>Women's Black Top</a>
            </h3>
            <div className="price">
              {calculateDiscountedPrice(props.item.price, props.item.promotion)}{" "}
              <span>{props.item.price}DT</span>
            </div>
            <a
              className="add-to-cart"
              onClick={() => {
                if (props.item.quantity != 0)
                  increaseItemQuantity(
                    props.item._id,
                    props.item.imgurl.mainimg,
                    props.item.title,
                    props.item.price
                  );
                else alert("items out of stock");
              }}
            >
              ADD TO CART
            </a>
          </div>
        </div>
      </div>
      {showFullDescription && (
        <Modal show={lgShow} onHide={handleClose} size="xl">
          <SingleProductHome item={props.item} handleClose={handleClose} />
        </Modal>
      )}
    </div>
  );
}
