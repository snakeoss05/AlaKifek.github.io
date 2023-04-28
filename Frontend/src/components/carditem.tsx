import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Stack } from "react-bootstrap";
import "./carditem.css";
import { useShoppingCart } from "../context/shopingcartcontext";

type CarditemProps = {
  id: any;
  quantity: number;
  imgurl: string;
  title: string;
  price: number;
};

export function Carditem({ id, imgurl, title, price }: CarditemProps) {
  const {
    increaseItemQuantity,
    decreaseItemQuantity,
    removeFromCArt,
    getItemQuantity,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);

  return (
    <Stack
      direction="horizontal"
      gap={2}
      className="d-flex align-items-center text-capitalize"
    >
      <img
        className="rounded-4"
        src={imgurl}
        style={{ width: "125px", height: "75px", objectFit: "contain" }}
      />
      <div className="me-auto fs-6 w-50">
        <span className="align-middle text-center text-capitalize">
          {title}
        </span>
        <div className="text-muted" style={{ fontSize: "0.75rem" }}>
          {price} TND
        </div>
        <div className="mx-auto my-2">
          <button
            className="btn btn-sm btn-outline-warning me-2 rounded-4"
            onClick={() => increaseItemQuantity(id, imgurl, title, price)}
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
        {price * quantity} TND
      </div>
      <button
        className="btn btn-outline-dark rounded-circle btn-sm border"
        onClick={() => removeFromCArt(id)}
      >
        <i className="fa-regular fa-trash-can"></i>
      </button>
    </Stack>
  );
}
