import { Offcanvas, Stack } from "react-bootstrap";

import "./carditem";
import { Carditem } from "./carditem";
import { NavLink } from "react-router-dom";
import { useProducts } from "../data/product";
import { useShoppingCart } from "../context/shopingcartcontext";
type Shopingcartprops = {
  isOpen: boolean;
};

export default function Shopingcart({ isOpen }: Shopingcartprops) {
  const { CloseCart, cartItems } = useShoppingCart();
  const items = useProducts();
  return (
    <>
      <Offcanvas show={isOpen} placement="end" onHide={CloseCart}>
        <Offcanvas.Header className="border-bottom border-1" closeButton>
          <br />
          <Offcanvas.Title className="fw-bolder text-uppercase">
            Shopping CART
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            {cartItems.map((item) => (
              <Carditem key={item.id} {...item} />
            ))}
          </Stack>

          <div className="cart-footer">
            <div className="subtotal subtotalpadding my-3">
              <span className="text ">Subtotal:</span>
              <span className="text total">
                {cartItems.reduce((total, Cartitem) => {
                  const item = items.find((i) => i._id === Cartitem.id);
                  return total + (item?.price || 0) * Cartitem.quantity;
                }, 0)}
                TND
              </span>
            </div>
            <div className="button">
              <button className="checkout-cta rounded-5 fw-bolder fs-5 text-capitalize ">
                <NavLink to="/checkout" className="nav-link text-center">
                  Checkout
                </NavLink>
              </button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
