import Footer from "../components/footer";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "../context/pagination";
import Items from "../components/Items";
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
  mark: string;
  quantity: number;
}
import axios from "axios";
export default function BestOffers() {
  const { category } = useParams();
  const [items, setItems] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMark, setSelectedMark] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [posteperpage, setposteperpage] = useState(12);
  const [filtreditems, setfiltereditems] = useState(items);
  const lastpostindex = currentPage * posteperpage;
  const firstpostindex = lastpostindex - posteperpage;
  const currentposts = filtreditems.slice(firstpostindex, lastpostindex);

  const fetchItems = async () => {
    axios
      .get<Product[]>(
        "https://alakifekbackend.onrender.com/api/products/getpromo"
      )
      .then((response) => {
        setItems(response.data);
      });
  };
  useEffect(() => {
    fetchItems();
  }, [category]);

  useEffect(() => {
    const filteredProducts = items.filter((product) => {
      return (
        (selectedCategory === "All" || product.category === selectedCategory) &&
        (selectedMark === "All" || product.mark === selectedMark)
      );
    });

    setfiltereditems(filteredProducts);
  }, [selectedCategory, selectedMark, items]);

  const sortByPriceAscending = () => {
    const sortedProducts = [...items].sort((a, b) => a.price - b.price);
    setfiltereditems(sortedProducts);
  };
  const sortByPricedescending = () => {
    const sortedProducts = [...items].sort((a, b) => b.price - a.price);
    setfiltereditems(sortedProducts);
  };

  const catagorybt = [...new Set(items.map((item) => item.category))];
  const marks = [...new Set(items.map((item) => item.mark))];

  return (
    <div className="bg-body-secondry">
      <section className="landing">
        <img className="hero__image" src="https://i.imgur.com/XFbYF0g.png" />
      </section>
      <section className="container-fluid ">
        <div className="row ">
          <div className="col-xl-3 col-xxl-2  col-lg-4 bg-light  mx-auto mt-lg-3 mt-1 ">
            <h1 className="fw-bold text-bg-warning text-center p-3 fs-2 rounded-3 mt-5 mx-auto mt-lg-2">
              Filter
            </h1>
            <div className="d-flex flex-lg-column rounded-4 align-content-center  justify-content-center flex-wrap border bg-white px-3 py-2 align-items-start position-relative mx-auto mb-3">
              <p className=" w-100 rounded-4  p-2   text-center m-2 fs-6  fw-bolder border">
                Categorys
              </p>
              <button
                className="rounded-4 p-2 w-100 text-capitalize d-flex jsutfy-content-space-between align-items-center  btn  text-center m-2 fw-bolder catbtn"
                onClick={() => setfiltereditems(items)}>
                <span className="text-muted">All</span>
                <i className="fa-solid fa-angle-right ms-auto"></i>
              </button>

              {catagorybt.map((category: string) => {
                return (
                  <button
                    className="rounded-4 p-2 w-100 text-capitalize d-flex jsutfy-content-space-between align-items-center  btn text-center m-2 fw-bolder btn-outline-warning border-0 catbtn"
                    key={category}
                    onClick={() => setSelectedCategory(category)}>
                    <span className="text-muted">{category}</span>
                    <i className="fa-solid fa-angle-right ms-auto"></i>
                  </button>
                );
              })}

              <div className="d-flex flex-column w-100 ">
                <p className="  rounded-4  p-2   text-center m-2  fs-6 fw-bolder border">
                  Sort By Price
                </p>
                <button
                  className="btn btn-outline-dark  mt-3 rounded-4 border-0"
                  onClick={sortByPriceAscending}>
                  Ascending
                  <i className="fa-solid fa-arrow-down-9-1 mx-2 fs-4"></i>
                </button>
                <button
                  className="btn btn-outline-dark  mt-3 rounded-4 border-0"
                  onClick={sortByPricedescending}>
                  Descending
                  <i className="fa-solid fa-arrow-up-9-1 mx-2 fs-4 "></i>
                </button>
              </div>

              <p className="rounded-4 w-100 p-2   text-center m-2 fs-6 fw-bolder border">
                Mark
              </p>

              {marks.map((mark: string) => {
                return (
                  <button
                    className="rounded-4 p-2 w-100 text-capitalize d-flex jsutfy-content-space-between align-items-center  btn text-center btn-outline-warning border-0 m-2 fw-bolder catbtn"
                    key={mark}
                    onClick={() => setSelectedMark(mark)}>
                    <span className="text-muted">{mark}</span>
                    <i className="fa-solid fa-angle-right ms-auto"></i>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="col-xl-8 col-xxl-9 mx-auto col-md-6  mx-auto my-4 ">
            {currentposts.length !== 0 ? (
              <div className="d-flex align-content-center justify-content-center justify-content-lg-start flex-wrap mx-atuo gap-4 mb-3">
                <Items />
              </div>
            ) : (
              <div className="page-404 mt-5">
                <div className="outer">
                  <div className="middle">
                    <div className="inner">
                      {/*BEGIN CONTENT*/}
                      <div className="inner-circle">
                        <i className="fa fa-home" />
                        <span>404</span>
                      </div>
                      <span className="inner-status">
                        Oops! Not Items Available Right Now
                      </span>
                      <span className="inner-detail">
                        We can not find the Items you're looking for.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className=" position-relative">
              <Pagination
                totalposts={items.length}
                postperpage={posteperpage}
                setcurrentpage={setCurrentPage}
                currentpage={currentPage}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
