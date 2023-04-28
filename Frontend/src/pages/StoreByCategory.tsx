import Card from "../components/storeitem";

import Footer from "../components/footer";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "../context/pagination";

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
export default function StoreByCategory() {
  const { category } = useParams();
  const [items, setItems] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMark, setSelectedMark] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [posteperpage, setposteperpage] = useState(8);
  const [filtreditems, setfiltereditems] = useState(items);
  const lastpostindex = currentPage * posteperpage;
  const firstpostindex = lastpostindex - posteperpage;
  const currentposts = filtreditems.slice(firstpostindex, lastpostindex);

  const fetchItems = async () => {
    axios
      .get<Product[]>(
        `http://localhost:5000/api/products/filter/category/${category}`
      )
      .then((response) => {
        setItems(response.data);
      });
  };
  useEffect(() => {
    fetchItems();
  }, [category]);

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
        <img
          className="hero__image"
          src="https://lh3.googleusercontent.com/pw/AJFCJaW8Og7OAtVetv6N6LP_ofarWwxf8wX-hznmKZed7kwFlhGZ4eJLTcCxDO00CfjJ9nfXYcSh94kZoqP4rp4Ppn7ieORu7hyw6hdNe9erSMZx2DRuhjBJNoiwm5IwysKUKXcF4dkGABR7mz1ja2LsxYL5VLYQYNfUzoi-Ftkk46rNAoBVle6Q510NIwaMi_WoE0FCoZ9QF9w8zmF3q4RQKgE7uUbLQZQb8uQUxJFWD6nWqqdyK3edoq7O9ZKDbgrhByGTO04jaJtScmm8KbgPPhB5oqszoER3GoRGBbHkFosaHX992_Lh5CTqG2BXh9X2cAbZb2vPhSxyeqrE8mdl2DkYtLMm2qvCGYilSjeBA2i5cdTTDR1PnSw3dpwjRin185GyrBSuE__ddPryIujXr2JNWCNHOuQrawP6RsCmitJIwKhtytZyF9HdPj3P9MDoNk_VK5nxWwPYPMiBe2wkEYeJCH2uy6GwKQmaPJ47S_2e_dkp118FXai_BYhv1HlHa9LhVBYkuXmgSuQahGKKVjWB9xj9iG0LYwcjxFFLJYct41-sgTChMwg5zvsOsQQ37wRCb_tkF0-hrWzu1BVKk2vyhTj7Rf0ypPkU4_mqeULXWcaNW--2iSCoRj0QmaNyoY-N8JsshFvTN0rL5MI9Z5LfgLHj8zgSGb9RlA69BMBHdguEYhhteaJRqQ_i7fHOgc-UCPyh4mJp51i8n2Rf5lYa7SJckyldgCcJrzkbqGClkA26qklrEWrHI9-d9sehxL45-ztjDXTmbLnjj5qRyqObChtoXMt_fEnp8ybJh3ELg-fHX3ZrVdGk2zJwI8UUZ3VpnymTn4_FGolTSoq2U0JPJ-v7MQ_RAQkUs_BF8ZIE3Nzw2G3HQ0xlqH0vy4SHcV4x58smvMOOkRsoZlDiyIxAYD-Cc27PgDaADrrdz5Zd54JoLHdf8c85zpyl_oybwBE7SgQ4G9K6zMpfAdL0PKiOduAEI1HQPYnKQOCQ9eJKLIuf2qlY4iyU2hcWYa2pVw=w1920-h350-s-no?authuser=0"
        />
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
                onClick={() => setfiltereditems(items)}
              >
                <span className="text-muted">All</span>
                <i className="fa-solid fa-angle-right ms-auto"></i>
              </button>

              {catagorybt.map((category: string) => {
                return (
                  <button
                    className="rounded-4 p-2 w-100 text-capitalize d-flex jsutfy-content-space-between align-items-center  btn text-center m-2 fw-bolder btn-outline-warning border-0 catbtn"
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                  >
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

              <p className="rounded-4 w-100 p-2   text-center m-2 fs-6 fw-bolder border">
                Mark
              </p>

              {marks.map((mark: string) => {
                return (
                  <button
                    className="rounded-4 p-2 w-100 text-capitalize d-flex jsutfy-content-space-between align-items-center  btn text-center btn-outline-warning border-0 m-2 fw-bolder catbtn"
                    key={mark}
                    onClick={() => setSelectedMark(mark)}
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
