import React from "react";
type propspagination = {
  totalposts: number;
  postperpage: number;
  setcurrentpage: any;
  currentpage: number;
};
export const Pagination = ({
  totalposts,
  postperpage,
  setcurrentpage,
  currentpage,
}: propspagination) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalposts / postperpage); i++) {
    pages.push(i);
  }
  const handlePrevClick = () => {
    if (currentpage > 1) {
      setcurrentpage(currentpage - 1);
    }
  };
  const handleNextClick = () => {
    if (currentpage < pages.length) {
      setcurrentpage(currentpage + 1);
    }
  };
  return (
    <div className="text-center mx-auto mt-auto">
     
        <ul >
          <li className="btn-page" onClick={handlePrevClick}>
            <i className="fa-solid fa-angles-left"></i>
          </li>
          {pages.map((page, index) => {
            return (
              <li
                onClick={() => setcurrentpage(page)}
                key={index}
                className={
                  page == currentpage ? "active btn-page " : "btn-page "
                }>
                {page}
              </li>
            );
          })}
          <li className="btn-page" onClick={handleNextClick}>
            <i className="fa-solid fa-angles-right"></i>
          </li>
        </ul>
     
    </div>
  );
};
