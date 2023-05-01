import React from "react";
import "./carousel2.css";
export default function TrendingProducts() {
  return (
    <div>
      <div className="container" id="carousel2">
        <div className="row">
          <div className="col-md-12">
            <h2>
              Trending <b>Products</b>
            </h2>
            <div
              id="myCarousel2"
              className="carousel slide"
              data-ride="carousel"
              data-interval={0}
            >
              {/* Carousel indicators */}
              <ol className="carousel-indicators">
                <li
                  data-target="#myCarousel2"
                  data-slide-to={0}
                  className="active"
                />
                <li data-target="#myCarousel2" data-slide-to={1} />
                <li data-target="#myCarousel2" data-slide-to={2} />
              </ol>
              {/* Wrapper for carousel items */}
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row">
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <div className="img-box">
                          <img
                            src="/examples/images/products/ipad.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Apple iPad</h4>
                          <p className="item-price">
                            $400.00 <span>$369.00</span>
                          </p>
                          <div className="star-rating">
                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star-o" />
                              </li>
                            </ul>
                          </div>
                          <a href="#" className="btn btn-primary">
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <div className="img-box">
                          <img
                            src="/examples/images/products/headphone.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Sony Headphone</h4>
                          <p className="item-price">
                            $25.00 <span>$23.99</span>
                          </p>
                          <div className="star-rating">
                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star-o" />
                              </li>
                            </ul>
                          </div>
                          <a href="#" className="btn btn-primary">
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <div className="img-box">
                          <img
                            src="/examples/images/products/macbook-air.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Macbook Air</h4>
                          <p className="item-price">
                            $899.00 <span>$649.00</span>
                          </p>
                          <div className="star-rating">
                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star-half-o" />
                              </li>
                            </ul>
                          </div>
                          <a href="#" className="btn btn-primary">
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <div className="img-box">
                          <img
                            src="/examples/images/products/nikon.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Nikon DSLR</h4>
                          <p className="item-price">
                            $315.00 <span>$250.00</span>
                          </p>
                          <div className="star-rating">
                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star-o" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star-o" />
                              </li>
                            </ul>
                          </div>
                          <a href="#" className="btn btn-primary">
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <div className="img-box">
                          <img
                            src="/examples/images/products/play-station.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Sony Play Station</h4>
                          <p className="item-price">
                            $289.00 <span>$269.00</span>
                          </p>
                          <div className="star-rating">
                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star-o" />
                              </li>
                            </ul>
                          </div>
                          <a href="#" className="btn btn-primary">
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <div className="img-box">
                          <img
                            src="/examples/images/products/macbook-pro.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Macbook Pro</h4>
                          <p className="item-price">
                            $1099.00 <span>$869.00</span>
                          </p>
                          <div className="star-rating">
                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star-half-o" />
                              </li>
                            </ul>
                          </div>
                          <a href="#" className="btn btn-primary">
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <div className="img-box">
                          <img
                            src="/examples/images/products/speaker.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Bose Speaker</h4>
                          <p className="item-price">
                            $109.00 <span>$99.00</span>
                          </p>
                          <div className="star-rating">
                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star-o" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star-o" />
                              </li>
                            </ul>
                          </div>
                          <a href="#" className="btn btn-primary">
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <div className="img-box">
                          <img
                            src="/examples/images/products/galaxy.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Samsung Galaxy S8</h4>
                          <p className="item-price">
                            $599.00 <span>$569.00</span>
                          </p>
                          <div className="star-rating">
                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star-o" />
                              </li>
                            </ul>
                          </div>
                          <a href="#" className="btn btn-primary">
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <div className="img-box">
                          <img
                            src="/examples/images/products/iphone.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Apple iPhone</h4>
                          <p className="item-price">
                            $369.00 <span>$349.00</span>
                          </p>
                          <div className="star-rating">
                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star-o" />
                              </li>
                            </ul>
                          </div>
                          <a href="#" className="btn btn-primary">
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <div className="img-box">
                          <img
                            src="/examples/images/products/canon.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Canon DSLR</h4>
                          <p className="item-price">
                            $315.00 <span>$250.00</span>
                          </p>
                          <div className="star-rating">
                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star-o" />
                              </li>
                            </ul>
                          </div>
                          <a href="#" className="btn btn-primary">
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <div className="img-box">
                          <img
                            src="/examples/images/products/pixel.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Google Pixel</h4>
                          <p className="item-price">
                            $450.00 <span>$418.00</span>
                          </p>
                          <div className="star-rating">
                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star-o" />
                              </li>
                            </ul>
                          </div>
                          <a href="#" className="btn btn-primary">
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <div className="img-box">
                          <img
                            src="/examples/images/products/watch.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Apple Watch</h4>
                          <p className="item-price">
                            $350.00 <span>$330.00</span>
                          </p>
                          <div className="star-rating">
                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star" />
                              </li>
                              <li className="list-inline-item">
                                <i className="fa fa-star-o" />
                              </li>
                            </ul>
                          </div>
                          <a href="#" className="btn btn-primary">
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Carousel controls */}
              <a
                className="carousel-control-prev"
                href="#myCarousel2"
                data-slide="prev"
              >
                <i className="fa fa-angle-left" />
              </a>
              <a
                className="carousel-control-next"
                href="#myCarousel2"
                data-slide="next"
              >
                <i className="fa fa-angle-right" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
