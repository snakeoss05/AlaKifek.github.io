import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Stack } from "react-bootstrap";
import "./carditem.css";
import { useShoppingCart } from "../context/shopingcartcontext";
import { useProducts } from "../data/product";
type CarditemProps = {
  id: any;
  quantity: number;
};

export function Carditem({ id }: CarditemProps) {
  const items = useProducts();
  const {
    increaseItemQuantity,
    decreaseItemQuantity,
    removeFromCArt,
    getItemQuantity,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);
  const Item = items.find((i) => i._id === id);
  if (Item == null) return null;
  return (
    <Stack
      direction="horizontal"
      gap={2}
      className="d-flex align-items-center text-capitalize"
    >
      <img
        className="rounded-4"
        src={Item.imgurl.mainimg}
        style={{ width: "125px", height: "75px", objectFit: "contain" }}
      />
      <div className="me-auto fs-6 w-50">
        <span className="align-middle text-center text-capitalize">
          {Item.title}
        </span>
        <div className="text-muted" style={{ fontSize: "0.75rem" }}>
          {Item.price} TND
        </div>
        <div className="mx-auto my-2">
          <button
            className="btn btn-sm btn-outline-warning me-2 rounded-4"
            onClick={() => increaseItemQuantity(id)}
            style={{ fontSize: "10px" }}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
          <span>{quantity}</span>
          <button
            className="btn btn-sm  btn-outline-warning ms-2 rounded-4"
            onClick={() => decreaseItemQuantity(id)}
            style={{ fontSize: "10px" }}
          >
            <i className="fa-solid fa-minus"></i>
          </button>
        </div>
      </div>
      <div className="text-muted fw-semibold" style={{ fontSize: "0.75rem" }}>
        {Item.price * quantity} TND
      </div>
      <button
        className="btn btn-outline-dark rounded-circle btn-sm border"
        onClick={() => removeFromCArt(Item._id)}
      >
        <i className="fa-regular fa-trash-can"></i>
      </button>
    </Stack>
  );
}
