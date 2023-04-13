import Carousel from "react-bootstrap/Carousel";

function Carousell() {
  return (
    <Carousel slide={true}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/src/assets/03e9cf6e7444733c843978d92e6dc81cf90fe711_HP-SMART-TANK-615.jpg"
          alt="First slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/src/assets/444d65d37de73b11413d10c3a3c2a7a2cf4dc60f_mal-schneider-site.jpg"
          alt="Second slide"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/src/assets/5967fb16051d9f3f881644041e27f6827dfffd49_katana-gf76.jpg"
          alt="Third slide"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousell;
