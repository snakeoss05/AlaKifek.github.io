import "./item.css";
import React, { useEffect } from "react";
import "./carousel2.css";
import { useState } from "react";
import axios from "axios";
import { useShoppingCart } from "../context/shopingcartcontext";
import Modal from "react-bootstrap/Modal";
import Singleproduct from "../pages/singleproduct";
import { isArray } from "lodash";

interface Product {
  _id: string;
  category: string;
  title: string;
  price: number;
  imgurl: {
    mainimg: string;
    secimg: string;
    thirdimg: string;
  };
  Countity: number;
  descreption: string;
  promotion: string;
  stock: boolean;
  mark: string;
  quantity: number;
}
export default function Items() {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [lgShow, setShow] = useState(false);
  const [items, setItems] = useState<Product[]>([]);
  const { increaseItemQuantity } = useShoppingCart();
  const handleClose = () => setShow(false);
  const handleViewFullDescription = () => {
    setShowFullDescription(true);
    setShow(true);
  };
  useEffect(() => {
    axios
      .get<Product[]>(
        "https://alakifekbackend.onrender.com/api/products/getpromo"
      )
      .then((response) => {
        setItems(response.data);
      });
  }, []);
  function calculateDiscountedPrice(price: number, discount: string) {
    const discountDecimal = parseFloat(discount.replace("%", "")) / 100;
    return Math.floor(price * (1 - discountDecimal));
  }
  return (
    <div>
      <div className="container">
        <h3 className="h3">Nos Meilleures Offres | Jusqu'à -40%</h3>
        <div className="row">
          {isArray(items) &&
            items.map((item) => {
              return (
                <div className="col-md-3 col-sm-6" key={item._id}>
                  <div className="product-grid4">
                    <div className="product-image4">
                      <a>
                        <img className="pic-1" src={item.imgurl.mainimg} />
                        <img className="pic-2" src={item.imgurl.secimg} />
                      </a>
                      <ul className="social">
                        <li>
                          <a
                            data-tip="Quick View"
                            onClick={handleViewFullDescription}
                          >
                            <i className="fa fa-eye" />
                            {showFullDescription && (
                              <Modal
                                show={lgShow}
                                onHide={handleClose}
                                size="xl"
                              >
                                <Singleproduct id={item._id} />
                              </Modal>
                            )}
                          </a>
                        </li>
                        <li>
                          <a
                            data-tip="Add to Wishlist"
                            onClick={() => {
                              if (item.quantity != 0)
                                increaseItemQuantity(
                                  item._id,
                                  item.imgurl.mainimg,
                                  item.title,
                                  item.price
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
                              if (item.quantity != 0)
                                increaseItemQuantity(
                                  item._id,
                                  item.imgurl.mainimg,
                                  item.title,
                                  item.price
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
                        -{item.promotion}
                      </span>
                    </div>
                    <div className="product-content">
                      <h3 className="title">
                        <a>Women's Black Top</a>
                      </h3>
                      <div className="price">
                        {calculateDiscountedPrice(item.price, item.promotion)}
                        <span>${item.price}</span>
                      </div>
                      <a
                        className="add-to-cart"
                        onClick={() => {
                          if (item.quantity != 0)
                            increaseItemQuantity(
                              item._id,
                              item.imgurl.mainimg,
                              item.title,
                              item.price
                            );
                          else alert("items out of stock");
                        }}
                      >
                        ADD TO CART
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
