import React from "react";

const Footer = () => {
  return (
    <div>
      <footer
        className="text-center text-lg-start text-current border  "
        style={{ backgroundColor: "#f2e5dcba" }}
      >
        <section className="d-flex justify-content-center  p-4 border-bottom">
          <div className="me-5 d-none d-lg-block ">
            <span>Get connected with us on social networks:</span>
            <div className="d-flex align-items-center mt-2 flex-row">
              <a href="" className="me-4 text-reset">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="" className="me-4 text-reset">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="" className="me-4 text-reset">
                <i className="fab fa-google"></i>
              </a>
              <a href="" className="me-4 text-reset">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="" className="me-4 text-reset">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="" className="me-4 text-reset">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          <div className="text-bg-light ms shadow-sm text-black text-center flex-column p-4 d-flex flex-lg-row rounded-pill me-5">
            <div className="d-flex align-items-center ms-2 flex-column flex-lg-row ">
              <i className="fa-solid fa-truck me-2 text-black my-2"></i>
              <p className="text-uppercase mb-2 mb-lg-0 fw-bold ">
                Livraison en 24h Hors confinement
              </p>
            </div>
            <div className="d-flex align-items-center ms-2 flex-column text-center flex-lg-row ">
              <i className="fa-regular fa-clock me-2 text-black my-2"></i>
              <p className="text-uppercase mb-2 mb-lg-0  fw-bold ">
                Ouvert tous les jours de 8h à 19h
              </p>
            </div>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>Ala Kifek
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Angular
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    React
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Vue
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Laravel
                  </a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Settings
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Orders
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3"></i> 48 Rue Tattawer Cité
                  Tahrir
                </p>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                  Alakifek@mail.com
                </p>
                <p>
                  <i className="fas fa-phone me-3"></i> +216 27768325
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center p-4">
          © 2021 Copyright:
          <a className="text-reset fw-bold" href="https://Alakifek.tn">
            Alakifek.tn
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
