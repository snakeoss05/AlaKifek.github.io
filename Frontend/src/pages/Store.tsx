import Card from "../components/storeitem";

import Footer from "../components/footer";
import React, { useState, useEffect } from "react";

import { Pagination } from "../context/pagination";

import axios from "axios";
export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMark, setSelectedMark] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [posteperpage, setposteperpage] = useState(8);
  const [items, setItems] = useState<Product[]>([]);
  const [filtreditems, setfiltereditems] = useState<Product[]>(items);
  const lastpostindex = currentPage * posteperpage;
  const firstpostindex = lastpostindex - posteperpage;
  const currentposts = filtreditems.slice(firstpostindex, lastpostindex);
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
    quantity: number;
    descreption: string;
    stock: boolean;
    mark: string;
  }

  useEffect(() => {
    axios
      .get<Product[]>("http://192.168.1.6:5000/api/products/get")
      .then((response) => {
        setItems(response.data);
      });
  }, []);

  useEffect(() => {
    let newFilteredItems = items;

    if (selectedCategory !== "All") {
      newFilteredItems = newFilteredItems.filter(
        (item) => item.category === selectedCategory
      );
    }

    if (selectedMark !== "All") {
      newFilteredItems = newFilteredItems.filter(
        (item) => item.mark === selectedMark
      );
    }

    setfiltereditems(newFilteredItems);
  }, [selectedCategory, selectedMark, items]);

  function handleCategorySelect(category: any) {
    setSelectedCategory(category);
  }
  function handleMarkSelect(mark: string) {
    setSelectedMark(mark);
  }
  const sortByPriceAscending = () => {
    const sortedProducts = [...items].sort((a, b) => a.price - b.price);
    setItems(sortedProducts);
  };
  const sortByPricedescending = () => {
    const sortedProducts = [...items].sort((a, b) => b.price - a.price);
    setItems(sortedProducts);
  };

  const catagorybt = [...new Set(items.map((item) => item.category))];
  const marks = [...new Set(items.map((item) => item.mark))];
  return (
    <div className="bg-body-secondry">
      <section className="landing">
        <img
          className="hero__image"
          src="/src/assets/Home img/Dimensions personnalisées 1920x350 px.png"
        />
      </section>
      <section className="container-fluid ">
        <div className="row ">
          <div className="col-xl-3 col-xxl-2  col-lg-4 bg-light  mx-auto mt-lg-3 mt-1 ">
            <h1 className="fw-bold text-bg-warning text-center p-3 fs-2 rounded-3 mt-5 mx-auto mt-lg-2">
              Filter
            </h1>
            <div className="d-flex flex-lg-column rounded-4 align-content-center  justify-content-center flex-wrap border bg-white px-3 py-2 align-items-start position-relative mx-auto mb-3">
              <p className=" w-100 rounded-4  p-2   text-center m-2   fw-bolder border-bottom">
                Categorys
              </p>
              <button
                className="rounded-4 p-2 w-100 text-capitalize d-flex jsutfy-content-space-between align-items-center  btn  text-center m-2 fw-bolder catbtn"
                onClick={() => setSelectedCategory("All")}
              >
                <span className="text-muted">All</span>
                <i className="fa-solid fa-angle-right ms-auto"></i>
              </button>

              {catagorybt.map((category: string) => {
                return (
                  <button
                    className="rounded-4 p-2 w-100 text-capitalize d-flex jsutfy-content-space-between align-items-center  btn text-center m-2 fw-bolder btn-outline-warning border-0 catbtn"
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                  >
                    <span className="text-muted">{category}</span>
                    <i className="fa-solid fa-angle-right ms-auto"></i>
                  </button>
                );
              })}

              <div className="d-flex flex-column w-100">
                <p className="  rounded-4  p-2   text-center m-2   fw-bolder border-bottom">
                  Sort By Price
                </p>
                <button
                  className="btn btn-outline-dark  mt-3 rounded-4 border-0"
                  onClick={sortByPriceAscending}
                >
                  Ascending
                  <i className="fa-solid fa-arrow-down-9-1 mx-2 fs-4"></i>
                </button>
                <button
                  className="btn btn-outline-dark  mt-3 rounded-4 border-0"
                  onClick={sortByPricedescending}
                >
                  Descending
                  <i className="fa-solid fa-arrow-up-9-1 mx-2 fs-4 "></i>
                </button>
              </div>

              <p className="rounded-4 w-100 p-2   text-center m-2   fw-bolder border-bottom">
                Mark
              </p>

              {marks.map((mark: string) => {
                return (
                  <button
                    className="rounded-4 p-2 w-100 text-capitalize d-flex jsutfy-content-space-between align-items-center  btn text-center btn-outline-warning border-0 m-2 fw-bolder catbtn"
                    key={mark}
                    onClick={() => handleMarkSelect(mark)}
                  >
                    <span className="text-muted">{mark}</span>
                    <i className="fa-solid fa-angle-right ms-auto"></i>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="col-xl-8 col-xxl-9 mx-auto col-md-6  mx-auto my-4">
            <div className="d-flex align-content-center justify-content-center flex-wrap mx-atuo gap-4 my-3">
              {currentposts.map((item) => {
                return (
                  <Card
                    key={item._id}
                    id={item._id}
                    imgurl={item.imgurl.mainimg}
                    title={item.title}
                    price={item.price}
                    description={item.descreption}
                    quantity={item.quantity}
                  />
                );
              })}
            </div>

            <Pagination
              totalposts={items.length}
              postperpage={posteperpage}
              setcurrentpage={setCurrentPage}
              currentpage={currentPage}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
