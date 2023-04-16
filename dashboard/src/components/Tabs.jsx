import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { React, useState } from "react";
import axios from "axios";
function Tabse() {
  const [id, setId] = useState(null);
  const [item, setItems] = useState(null);
  const [formDataproduct, setformDataproduct] = useState({
    category: "",
    title: "",
    price: "",
    quantity: "",
    descreption: "",
    mark: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
  });
  const [product, setProduct] = useState({
    price: {
      value: "",
      isEditing: false,
    },

    title: {
      value: "",
      isEditing: false,
    },
    descreption: {
      value: "",
      isEditing: false,
    },
    quantity: {
      value: "",
      isEditing: false,
    },
  });

  const handleIconClick = (property) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [property]: {
        ...prevProduct[property],
        isEditing: !prevProduct[property].isEditing,
      },
    }));
  };
  const handleValueChange = (event, property) => {
    const value = event.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [property]: {
        ...prevProduct[property],
        value: value,
      },
    }));
  };

  function HandleChange(event) {
    const { name, value } = event.target;

    setformDataproduct((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formDataproduct);

    axios
      .post("http://192.168.1.6:5000/api/products/add", formDataproduct)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const searchitems = async () => {
    axios
      .get(`http://192.168.1.6:5000/api/products/get/${id}`)
      .then((response) => {
        setItems(response.data);
      });
  };

  const handleSubmite = async () => {
    try {
      const response = await axios.delete(
        `http://192.168.1.6:5000/api/products/delete/${id}`
      );
      setItems((prevestate) => (prevestate = null));
      console.log(response.data.message);
    } catch (e) {
      console.error(e);
    }
    alert("Prouct Delete success");
  };
  const handleFormSubmit = async () => {
    const updateproduct = {
      title: product.title.value,
      price: product.price.value,
      quantity: product.quantity.value,
      descreption: product.descreption.value,
    };
    try {
      console.log();
      const response = await axios.put(
        `http://192.168.1.6:5000/api/products/update/${id}`,
        updateproduct
      );
      console.log(response.data); // do something with the response data
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3 "
      fill>
      <Tab eventKey="home" title="Add Product To Database">
        <div>
          <h1>Add Product To Storage</h1>

          <form
            onSubmit={handleSubmit}
            className="d-grid gap-4 mx-3 my-5 text-start ">
            <div className="d-flex flex-column flex-wrap flex-lg-row gap-4 text-capitalize">
              <div className="col-lg-2 col-8">
                <label>category</label>
                <input
                  type="text"
                  name="category"
                  value={formDataproduct.category}
                  onChange={HandleChange}
                  className="form-control"></input>
              </div>
              <div className="col-lg-2 col-8">
                <label>title</label>
                <input
                  type="text"
                  name="title"
                  value={formDataproduct.title}
                  onChange={HandleChange}
                  className="form-control"></input>
              </div>
              <div className="col-lg-1 col-6">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={formDataproduct.price}
                  onChange={HandleChange}
                  className="form-control"></input>
              </div>
              <div className="col-lg-1 col-6">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  onChange={HandleChange}
                  value={formDataproduct.quantity}
                  className="form-control"></input>
              </div>
              <div className="col-lg-1 col-6">
                <label>mark</label>
                <input
                  type="text"
                  name="mark"
                  onChange={HandleChange}
                  value={formDataproduct.mark}
                  className="form-control"></input>
              </div>
              <div className="col-lg-3 col-6">
                <label>descreption</label>
                <textarea
                  type="number"
                  name="descreption"
                  onChange={HandleChange}
                  value={formDataproduct.descreption}
                  className="form-control"></textarea>
              </div>

              <div className="row col-10">
                <h3 className="my-2">Photo Of The Product</h3>
                <div className="col-2">
                  <label>Photo 1</label>
                  <input
                    type="text"
                    name="img1"
                    onChange={HandleChange}
                    value={formDataproduct.img1}
                    className="form-control"></input>
                </div>
                <div className="col-2">
                  <label>Photo 2</label>
                  <input
                    type="text"
                    name="img2"
                    onChange={HandleChange}
                    value={formDataproduct.img2}
                    className="form-control"></input>
                </div>
                <div className="col-2">
                  <label>Photo 3</label>
                  <input
                    type="text"
                    name="img3"
                    onChange={HandleChange}
                    value={formDataproduct.img3}
                    className="form-control"></input>
                </div>
                <div className="col-2">
                  <label>Photo 4</label>
                  <input
                    type="text"
                    name="img4"
                    onChange={HandleChange}
                    value={formDataproduct.img4}
                    className="form-control"></input>
                </div>
                <div className=" col-1">
                  <button type="submit" className="btn btn-success  mt-4 px-4 ">
                    Save{" "}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Tab>
      <Tab eventKey="profile" title="Delete Product">
        <div>
          <div className="row col-3 mx-auto mb-3">
            {" "}
            <div className="row col-12 ms-2">
              <label className="col-12 text-start" htmlFor="id">
                Product ID:
              </label>
              <div className="col-9">
                <input
                  type="text"
                  id="id"
                  className="form-control "
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>

              <button
                className="btn btn-warning rounded-5 col-2"
                onClick={searchitems}>
                <i
                  className="fa-solid fa-magnifying-glass"
                  style={{ color: "white" }}></i>
              </button>
            </div>
            {item != null ? (
              <div className="mx-auto p-3 border col-11 my-3 rounded-4">
                <li
                  key={item?._id}
                  className="d-flex align-items-center justify-content-start mb-2">
                  <img
                    src={item?.imgurl.mainimg}
                    width="50"
                    height="50"
                    className="mr-2"
                  />
                  <div className="d-flex flex-column justify-content-start ms-2">
                    <h6 className="mb-1">{item?.title}</h6>
                  </div>
                  <button
                    className="btn btn-outline-danger   my-3 mx-2"
                    onClick={handleSubmite}>
                    <i
                      class="fa-solid fa-trash"
                      style={{ color: "#b40404" }}></i>
                  </button>
                </li>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Tab>
      <Tab eventKey="longer-tab" title="Update Product">
        <div className="row col-3 mx-auto mb-3">
          {" "}
          <div className="row col-12 ms-2">
            <label className="col-12 text-start" htmlFor="id">
              Product ID:
            </label>
            <div className="col-9">
              <input
                type="text"
                id="id"
                className="form-control "
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>

            <button
              className="btn btn-warning rounded-5 col-2"
              onClick={searchitems}>
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ color: "white" }}></i>
            </button>
          </div>{" "}
        </div>

        {item != null ? (
          <div key={id}>
            <section className="container bg-white my-4 d-flex flex-column flex-lg-row ">
              <div className="d-flex flex-wrap  flex-lg-row left-side">
                <img
                  className="object-fit-contain bg-white  m-2  h-75  bg-light w-100 rounded-4  mainimg"
                  src={item?.imgurl.mainimg}
                />
                <div className=" d-flex flex-row ms-2 justify-content-evenly  w-100  h-fitcontent">
                  <img
                    className="bg-white  imgres rounded-4 shadow-sm"
                    src={item?.imgurl.secimg}
                  />
                  <img
                    className="bg-white  ms-2 imgres rounded-4 shadow-sm"
                    src={item?.imgurl.thirdimg}
                  />
                  {item.imgurl.fourimg ? (
                    <img
                      className="bg-white  ms-2 imgres rounded-4 shadow-sm"
                      src={item.imgurl.fourimg}
                    />
                  ) : (
                    <div className="imgres"></div>
                  )}
                </div>
              </div>
              <div className="d-flex flex-column  py-2 py-lg-5 px-3 bg-body right-side">
                <div className="d-flex flex-row align-items-center align-content-center my-2">
                  {" "}
                  {product.title.isEditing ? (
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Right Your New Title"
                      onChange={(event) => handleValueChange(event, "title")}
                    />
                  ) : (
                    <h1 className="fw-bolder my-3">{item?.title}</h1>
                  )}
                  <button
                    className="btn btn-outline-dark rounded-4 ms-2"
                    onClick={() => handleIconClick("title")}>
                    {" "}
                    <i class="fa-solid fa-pen "></i>
                  </button>
                </div>
                <p className="text-black fw-bold">
                  Réference:<p className="text-muted ">{item?._id}</p>
                </p>{" "}
                <div className="d-flex flex-row my-2 align-items-baseline text-warningn">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                  <p className="text-muted text-capitalize ms-2">
                    (34 customer reviews)
                  </p>
                </div>
                <div className="d-flex flex-row align-items-center me-auto align-content-center my-2">
                  {" "}
                  {product.price.isEditing ? (
                    <input
                      type="number"
                      name="price"
                      className="form-control w-25"
                      onChange={(event) =>
                        handleValueChange(event, "price")
                      }></input>
                  ) : (
                    <h2 className="text-warning opacity-50 ">
                      {item?.price} DT
                    </h2>
                  )}
                  <button
                    className="btn btn-outline-dark rounded-4 ms-2 "
                    onClick={() => handleIconClick("price")}>
                    <i class="fa-solid fa-pen "></i>
                  </button>
                </div>
                {product.descreption.isEditing ? (
                  <textarea
                    className="w-100 rounded-4 p-2 text-bg-light my-2"
                    name="descreption"
                    type="text"
                    onChange={(event) =>
                      handleValueChange(event, "descreption")
                    }></textarea>
                ) : (
                  <p className="w-100 overflow-y-auto">{item?.descreption}</p>
                )}
                <button
                  className="btn btn-outline-dark rounded-4 ms-2"
                  onClick={() => handleIconClick("descreption")}>
                  {" "}
                  <i class="fa-solid fa-pen "></i>
                </button>
                <div className="d-flex flex-row me-auto justify-content-around align-content-center align-items-center w-50 p-2 border-bottom mt-5 fs-4">
                  <i className="fa-solid fa-truck"></i>
                  <i className="fa-solid fa-shield-halved"></i>
                  <i className="fa-regular fa-clock"></i>
                </div>
                <div className="mt-0 ms-lg-5 ms-1 d-flex flex-row">
                  <div className="mt-0  ms-auto d-flex flex-row align-content-center justify-content-end align-items-center">
                    <span className="me-2 fs-5 fw-bold text-muted">
                      Quantity:
                    </span>

                    {product.quantity.isEditing ? (
                      <div className=" w-25">
                        <input
                          type="number"
                          className="form-control"
                          name="quantity"
                          onChange={(event) =>
                            handleValueChange(event, "quantity")
                          }
                        />
                      </div>
                    ) : (
                      <span className="fs-5 text-success">{item.quantity}</span>
                    )}

                    <button
                      className="btn btn-outline-dark rounded-4 ms-2 "
                      onClick={() => handleIconClick("quantity")}>
                      {" "}
                      <i class="fa-solid fa-pen "></i>
                    </button>
                  </div>
                </div>
                <div className="mt-5 col-12 w-50">
                  {" "}
                  <button
                    className="btn btn-success col-8 rounded-4 fw-semibold"
                    onClick={handleFormSubmit}>
                    Update
                  </button>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <></>
        )}
      </Tab>
      <Tab eventKey="contact" title="Contact"></Tab>
    </Tabs>
  );
}

export default Tabse;
