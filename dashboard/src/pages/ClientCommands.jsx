import React, { useState, useEffect } from "react";
import axios from "axios";

function ClientCommands() {
  const [clientCommands, setClientCommands] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    // Make a GET request to your Express backend to retrieve clientCommands data
    axios
      .get("http://192.168.1.6:5000/api/submit-form/clientCommands")
      .then((res) => {
        setClientCommands(res.data.clientCommands);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get("http://192.168.1.6:5000/api/products/get").then((response) => {
      setItems(response.data);
    });
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://192.168.1.6:5000/api/submit-form/delete/${id}`
      );
      // Update the clientCommands state to remove the deleted item
      setClientCommands((prevState) =>
        prevState.filter((item) => item._id !== id)
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container mx-auto d-flex flex-column justify-content-start bg-white">
      <h1 className="mb-4 fw-bolder">Client Order</h1>
      <table className="table text-capitalize">
        <thead>
          <tr className="bg-warning border text-white text-center ">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Postal Code</th>
            <th>Phone Number</th>
            <th>Items</th>
            <th>Delete Order</th>
          </tr>
        </thead>
        <tbody>
          {clientCommands.map((clientCommand) => (
            <tr
              key={clientCommand._id}
              className="border border-black text-center">
              <td>{clientCommand.firstname}</td>
              <td>{clientCommand.lastname}</td>
              <td>{clientCommand.adresse}</td>
              <td>{clientCommand.city}</td>
              <td>{clientCommand.CodePostal}</td>
              <td>{clientCommand.phoneNumber}</td>

              <td className="col-4">
                <ul className="list-unstyled">
                  {clientCommand.cartitems.map((detail) => {
                    let item = items.find((item) => item._id === detail.id);
                    return (
                      <li
                        key={detail.id}
                        className="d-flex align-items-center justify-content-start mb-2">
                        <img
                          src={item?.imgurl.mainimg}
                          width="50"
                          height="50"
                          className="mr-2"
                        />
                        <div className="d-flex flex-column justify-content-start ms-2">
                          <h6 className="mb-1">{item?.title}</h6>
                          <span className="text-muted me-auto">
                            Quantity: {detail.quantity}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </td>
              <td className="col-2 border">
                <label>Client Commands ID:{clientCommand._id}</label>
                <button
                  onClick={() => handleDelete(clientCommand._id)}
                  type="button"
                  className="btn btn-danger mt-4">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientCommands;
