import React from "react";
import "./CardProduct.css";
export default function Carttest() {
  return (
    <div id="CardProduct">
      <div className="CardBody">
        <img src="https://www.tunisianet.com.tn/296012-large/pc-de-bureau-gamer-war-i9-13900k-rtx-4090-24gb-128go.jpg" />
        <span className="Producttitle">
          PC de Bureau Gamer WAR / I9-13900K / RTX 4090 24GB
        </span>

        <p className="details">
          RAM 128 Go (4x 32 Go) ADATA DDR5 4800 Mhz - Disque SSD 2 To 2.5" -
          Carte graphique INNO3D GeFORCE RTX 4090 ASUS ROG STRIX, 24 Go
        </p>
        <div className="price">
          <span className="text-muted me-auto" style={{ fontSize: "13px" }}>
            $1250.00
          </span>
          <ul
            className="d-flex flex-row  align-content-center ms-auto"
            style={{ fontSize: "13px" }}
          >
            <i className="fa-solid fa-star" style={{ color: "gold" }}></i>
            <i className="fa-solid fa-star" style={{ color: "gold" }}></i>
            <i className="fa-solid fa-star" style={{ color: "gold" }}></i>
            <i className="fa-solid fa-star" style={{ color: "gold" }}></i>
            <i className="fa-solid fa-star" style={{ color: "gold" }}></i>
          </ul>
        </div>
        <div className="addcart">
          <button className="btn btn-outline-dark col-8 me-2">
            More detaills
          </button>
          <button className="btn btn-dark col-2">
            <i
              className="fa-solid fa-cart-shopping text-white "
              style={{ fontSize: "16px" }}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
}
