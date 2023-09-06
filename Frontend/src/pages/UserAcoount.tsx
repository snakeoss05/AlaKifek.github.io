import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import ProfileInformation from "./ProfileInformation";
import UserHistorique from "./UserHistorique";

import SocketComponent from "../components/SocketComponent";
import { Link } from "react-router-dom";
function UserAccount() {
  return (
    <nav className="d-flex align-items-center">
      <ul className="container ">
        <div className="row mx-auto my-3 ">
          <Link
            to="/ContactAdmin"
            className="m-2 p-2  nav-link rounded-pill btn shadow-sm btn-outline-warning border col-lg-2 col-11 bg-white mx-auto">
            Contact <i className="fa-regular fa-comments mx-1 mx-2"></i>
          </Link>
          <Link
            to="/UserHistorique"
            className="m-2 p-2   nav-link rounded-pill btn btn-outline-warning border col-lg-2 col-11 bg-white mx-auto shadow-sm">
            Historique <i className="fa-regular fa-clock mx-1 mx-2"></i>
          </Link>
          <Link
            to="/MyOrder"
            className="m-2 p-2   nav-link rounded-pill btn shadow-sm btn-outline-warning border col-lg-2 col-11 bg-white mx-auto">
            My Order <i className="fa-solid fa-gears mx-1 mx-2 "></i>
          </Link>
          <Link
            to="/ProfileInformation"
            className="m-2 p-2   nav-link rounded-pill btn shadow-sm btn-outline-warning border col-lg-2 col-11 bg-white mx-auto">
           
              Settings <i className="fa-solid fa-gears mx-1 mx-2 "></i>
           
          </Link>
        </div>
      </ul>
    </nav>
  );
}

export default UserAccount;
