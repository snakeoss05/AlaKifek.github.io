import { useEffect, useState } from "react";
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
  };
  Countity: number;
  descreption: string;
  stock: boolean;
}

export function useProducts() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>("http://192.168.1.6:5000/api/products/get")
      .then((response) => {
        setItems(response.data);
      });
  }, []);

  return items;
}
