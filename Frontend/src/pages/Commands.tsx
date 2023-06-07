import React, { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import io from "socket.io-client";
const socket = io("https://alakifekbackend.onrender.com:5001");
interface ClientCommand {
  _id: string;
  firstname: string;
  lastname: string;
  adresse: string;
  city: string;
  CodePostal: string;
  phoneNumber: String;
  cartitems: [object];
}
interface Product {
  _id: string;
  category: string;
  title: string;
  price: number;
  imgurl: {
    mainimg: string;
    secimg: string;
    thirdimg: string;
  };
  Countity: number;
  descreption: string;
  stock: boolean;
}
function ClientCommands() {
  const [clientCommands, setClientCommands] = useState<ClientCommand[]>([]);

  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => {
    async function getItems() {
      axios
        .get<Product[]>(
          "https://alakifekbackend.onrender.com:5000/api/products/get"
        )
        .then((response) => {
          setItems(response.data);
        });
    }
    getItems();
  }, []);
  useEffect(() => {
    // Make a GET request to your Express backend to retrieve clientCommands data
    axios
      .get<{ clientCommands: ClientCommand[] }>(
        "https://alakifekbackend.onrender.com:5000/api/submit-form/clientCommands"
      )
      .then((res) => {
        setClientCommands(res.data.clientCommands);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container mx-auto mt-4 bg-white">
      <h1 className="text-center">ClientCommands</h1>
      <table className="table text-capitalize">
        <thead>
          <tr className="text-bg-success border border-black">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Postal Code</th>
            <th>Phone Number</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {clientCommands.map((clientCommand) => (
            <tr key={clientCommand._id} className="border border-black">
              <td>{clientCommand.firstname}</td>
              <td>{clientCommand.lastname}</td>
              <td>{clientCommand.adresse}</td>
              <td>{clientCommand.city}</td>
              <td>{clientCommand.CodePostal}</td>
              <td>{clientCommand.phoneNumber}</td>
              <td>
                <ul className="list-unstyled">
                  {clientCommand.cartitems.map((detail: any) => {
                    let item = items.find((item: any) => item._id == detail.id);
                    return (
                      <li
                        key={detail.id}
                        className="d-flex align-items-center mb-2">
                        <img
                          src={item?.imgurl.mainimg}
                          width="50"
                          height="50"
                          className="mr-2"
                        />
                        <div>
                          <h6 className="m-0">{item?.title}</h6>
                          <span className="text-muted">
                            Quantity: {detail.quantity}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientCommands;
