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
              <img src="https://www.tunisianet.com.tn/modules/ps_imagegrid/images/ea139da18bb217b4e3c51c0b02140cc552d6acf0_CLOUD%20ALPHA%20S%20copie.jpg" />
            </li>
            <li className="image">
              <img src="https://www.tunisianet.com.tn/modules/ps_imagegrid/images/28d4843856f849bdbc31f10183002e3e1a1a7b64_tv%20vega%20square.jpg" />
            </li>
            <li className="image">
              <img src="https://www.tunisianet.com.tn/modules/ps_imagegrid/images/e72d9259dd1ae83bc3af3028004f1d321be2992d_lenovo-ideapad-3.jpg" />
            </li>
            <li className="image">
              <img src="https://www.tunisianet.com.tn/modules/ps_imagegrid/images/c46bb4c709e549f440e9370865b9f22004062615_ThinkCentre%20Neo%2030a.jpg" />
            </li>
            <li className="image">
              <img src="https://www.tunisianet.com.tn/modules/ps_imagegrid/images/bf6bd86f5920ae3edc8ab3001e457a4c761893c4_ORIENT.jpg" />
            </li>
            <li className="image">
              <img src="https://www.tunisianet.com.tn/modules/ps_imagegrid/images/e7bffd62594bd8d679d333bc788605df6b9c97a0_epson-l3210.jpg" />
            </li>
            <li className="image">
              <img src="https://www.tunisianet.com.tn/modules/ps_imagegrid/images/ec0157929f1396c1bae074d8f56e18e345815686_ACER-RE100.jpg" />
            </li>
            <li className="image">
              <img src="https://www.tunisianet.com.tn/modules/ps_imagegrid/images/272642f422fad80b83b630e385d1d83dfe79c38b_Sans-titre-1.jpg" />
            </li>
          </ul>

          <div className="container text-center mx-auto mt-5 p-2 bg-transparent border rounded-lg-pill shadow-sm">
            <div className="row">
              <div className="col">
                <img src="https://www.tunisianet.com.tn/modules/wblogoslider/views/img/69be67b14825e97210c3840388e599bfd68d7237_marque_apple.png"></img>
              </div>
              <div className="col">
                <img src="https://www.tunisianet.com.tn/modules/wblogoslider/views/img/1184daa1300142c0e943202d9743e3f3d76bc034_180705-CBG-Adjusted-HUAWEI-logo-(Vertical&Horizontal%EF%BC%89-qu-06.png"></img>
              </div>
              <div className="col">
                <img src="https://www.tunisianet.com.tn/modules/wblogoslider/views/img/2617db8253af14d8ab6c118e97c9a08e282020c6_marque_samsung.png"></img>
              </div>
              <div className="col">
                <img src="https://www.tunisianet.com.tn/modules/wblogoslider/views/img/8db5bbb06960daeb77b6412f1e4f0c0a63275b0f_marque_msi.png"></img>
              </div>
              <div className=" col-lg">
                <img
                  src="https://www.tunisianet.com.tn/modules/wblogoslider/views/img/8c6efd560cede847e8daeb38da9988a4331a7081_marque_asus.png"
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
