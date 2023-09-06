import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";

import About from "./pages/About";
import Navbar from "./components/navbar";
import Contact from "./pages/contact";
import Impression from "./pages/Impression";

import $ from "jquery";
import { ShoppingCartProvider } from "./context/shopingcartcontext";
import Checkout from "./pages/checkout";
import "./privat.css";
import Floatbutton from "./components/floatbutton";
import Singlepage from "./pages/singlepage";
import Items from "./components/Items";
import Form from "./pages/Commands";
import StoreByCategory from "./pages/StoreByCategory";
import "react-toastify/dist/ReactToastify.css";

import UserAccount from "./pages/UserAcoount";
import Log from "./pages/log";
import ProfileInformation from "./pages/ProfileInformation";
import UserHistorique from "./pages/UserHistorique";
import SocketComponent from "./components/SocketComponent";
import BestOffers from "./pages/BestOffers";
import MyOrder from "./pages/MyOrder";

export default function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <div className="mb-4 container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactAdmin" element={<SocketComponent />} />
          <Route path="/MyOrder" element={<MyOrder />} />
          <Route path="/mellieurOffre" element={<BestOffers />} />
          <Route path="/UserHistorique" element={<UserHistorique />} />
          <Route path="/ProfileInformation" element={<ProfileInformation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Impression" element={<Impression />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Log />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/items" element={<Items />} />
          <Route path="/Product/:id" element={<Singlepage />} />
          <Route path="/commands" element={<Form />} />
          <Route path="/profile" element={<UserAccount />} />
          <Route path="/category/:category" element={<StoreByCategory />} />
        </Routes>
        <Floatbutton />
      </div>
    </ShoppingCartProvider>
  );
}
