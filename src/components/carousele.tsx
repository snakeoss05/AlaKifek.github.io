import React from "react";
import "./carousel.css";
export default function Carouselle() {
  return (
    <div>
      <div
        id="myCarousel"
        className="carousel slide carousel-fade"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="mask flex-center">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-7 col-12 order-md-1 order-2">
                    <h4>
                      Present your <br />
                      awesome product
                    </h4>
                    <p>
                      Lorem ipsum dolor sit amet. Reprehenderit, qui blanditiis
                      quidem rerum <br />
                      necessitatibus praesentium voluptatum deleniti atque
                      corrupti.
                    </p>
                    <a href="#">BUY NOW</a>{" "}
                  </div>
                  <div className="col-md-5 col-12 order-md-2 order-1">
                    <img
                      src="https://i.imgur.com/NKvkfTT.png"
                      className="mx-auto"
                      alt="slide"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="mask flex-center">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-7 col-12 order-md-1 order-2">
                    <h4>
                      Present your <br />
                      awesome product
                    </h4>
                    <p>
                      Lorem ipsum dolor sit amet. Reprehenderit, qui blanditiis
                      quidem rerum <br />
                      necessitatibus praesentium voluptatum deleniti atque
                      corrupti.
                    </p>
                    <a href="#">BUY NOW</a>{" "}
                  </div>
                  <div className="col-md-5 col-12 order-md-2 order-1">
                    <img
                      src="https://i.imgur.com/duWgXRs.png"
                      className="mx-auto"
                      alt="slide"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="mask flex-center">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-7 col-12 order-md-1 order-2">
                    <h4>
                      Present your <br />
                      awesome product
                    </h4>
                    <p>
                      Lorem ipsum dolor sit amet. Reprehenderit, qui blanditiis
                      quidem rerum <br />
                      necessitatibus praesentium voluptatum deleniti atque
                      corrupti.
                    </p>
                    <a href="#">BUY NOW</a>{" "}
                  </div>
                  <div className="col-md-5 col-12 order-md-2 order-1">
                    <img
                      src="https://i.imgur.com/DGkR4OQ.png"
                      className="mx-auto"
                      alt="slide"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#myCarousel"
          role="button"
          data-slide="prev"
        >
          {" "}
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          />{" "}
          <span className="sr-only">Previous</span>{" "}
        </a>{" "}
        <a
          className="carousel-control-next"
          href="#myCarousel"
          role="button"
          data-slide="next"
        >
          {" "}
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          />{" "}
          <span className="sr-only">Next</span>{" "}
        </a>{" "}
      </div>
    </div>
  );
}
