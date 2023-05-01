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
    <div>
      <nav className="d-flex align-items-center justify-content-center mt-5 ">
        <ul className="pagination">
          <li className="page-item ">
            <a className="page-link text-black" onClick={handlePrevClick}>
              Previous
            </a>
          </li>
          {pages.map((page, index) => {
            return (
              <button
                onClick={() => setcurrentpage(page)}
                key={index}
                className={page == currentpage ? "active" : ""}
              >
                {page}
              </button>
            );
          })}
          <li className="page-item">
            <a className="page-link text-black" onClick={handleNextClick}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
