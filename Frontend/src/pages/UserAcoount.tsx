import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import ProfileInformation from "./ProfileInformation";
import UserHistorique from "./UserHistorique";

import SocketComponent from "../components/SocketComponent";
import { Link } from "react-router-dom";
function UserAccount() {
  return (
    <nav className="w-100 d-flex align-items-center">
      <ul className="d-flex flex-row justify-content-evenly align-items-center justify-content-center mx-auto bg-secondary-subtle border border-2 border-black rounded-pill mt-3 px-2 fw-medium space">
        <li className="m-3 px-3 py-2 nav-link  letter-spacing rounded-pill btn btn-outline-warning border">
          <Link
            to="/ContactAdmin"
            className="text-black text-center btn-outline-dark">
            Contact <i className="fa-regular fa-comments mx-2"></i>
          </Link>
        </li>
        <li className="m-3 px-3 py-2 nav-link  letter-spacing rounded-pill btn btn-outline-warning border">
          <Link to="/UserHistorique" className="text-black btn-outline-dark">
            MyOrder <i className="fa-regular fa-clock mx-2"></i>
          </Link>
        </li>
        <li className="m-3 px-3 py-2 nav-link  letter-spacing rounded-pill btn btn-outline-warning border">
          <Link to="/ProfileInformation" className="text-black ">
            Settings <i className="fa-solid fa-gears mx-2 "></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default UserAccount;
