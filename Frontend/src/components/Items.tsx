import React, { useEffect } from "react";
import "./carousel2.css";
import { useState } from "react";
import axios from "axios";
import StoreHomeitem from "./storeHomeitem";
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
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>(
        "https://alakifekbackend.onrender.com/api/products/getpromo"
      )
      .then((response) => {
        setItems(response.data);
      });
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          {items ? (
            items.map((item) => {
              return <StoreHomeitem item={item} key={item._id} />;
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
