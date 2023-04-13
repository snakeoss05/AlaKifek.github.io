import Footer from "../components/footer";
import Carouselle from "../components/carousele";
import Items from "../components/Items";
export default function Home() {
  return (
    <div>
      <Carouselle />
      <div>
        <Items />
      </div>
      <section id="main" className="breadcrumb col-xs-12 container-fluid">
        <section id="content" className="homegrid-container">
          <ul className="homegrid">
            <li className="image">
              <img src="/src/assets/Home img/22619abc7d1688d19f6ed14793e658866898f734_lenovo-ideapad-3.jpg" />
            </li>
            <li className="image">
              <img src="/src/assets/Home img/272642f422fad80b83b630e385d1d83dfe79c38b_Sans-titre-1.jpg" />
            </li>
            <li className="image">
              <img src="/src/assets/Home img/39e45220c4191542660bcb89bb46b8d8868f0302_logitech-g102.jpg" />
            </li>
            <li className="image">
              <img src="/src/assets/Home img/51e7b7777b5f97bfdfb69e26700e2be4cbceeb12_ACER-UP300.jpg" />
            </li>
            <li className="image">
              <img src="/src/assets/Home img/565b207771f6a4a01e4634acbf8eb61dfb5a148d_mal-schneider-carre.jpg" />
            </li>
            <li className="image">
              <img src="/src/assets/Home img/58b3d5fbff21523f366cbd0a7f9608876805e0d0_hyperx.jpg" />
            </li>
            <li className="image">
              <img src="/src/assets/Home img/e7bffd62594bd8d679d333bc788605df6b9c97a0_epson-l3210.jpg" />
            </li>
            <li className="image">
              <img src="/src/assets/Home img/ec0157929f1396c1bae074d8f56e18e345815686_ACER-RE100.jpg" />
            </li>
          </ul>
          <div className="container text-center mx-auto mt-5 p-2 bg-transparent border rounded-lg-pill shadow-sm">
            <div className="row">
              <div className="col">
                <img src="/public/logo/acer.png"></img>
              </div>
              <div className="col">
                <img src="/public/logo/apple.png"></img>
              </div>
              <div className="col">
                <img src="/public/logo/msi.png"></img>
              </div>
              <div className="col">
                <img src="/public/logo/samsung.png"></img>
              </div>
              <div className=" col-lg">
                <img
                  src="/public/logo/xiaomi.png"
                  style={{ maxWidth: "225px", maxHeight: "150px" }}
                ></img>
              </div>
            </div>
          </div>
        </section>
      </section>

      <Footer />
    </div>
  );
}
