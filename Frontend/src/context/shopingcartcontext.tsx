import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Shopingcart from "../components/shopingcart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

type Shoppingcartproviderprops = {
  children: ReactNode;
};
type ShoppingCartContext = {
  openCart: () => void;
  CloseCart: () => void;

  UserLog: boolean;
  cartQuantity: number;
  userState: (state: boolean) => void;
  cartItems: CartItem[];
  getItemQuantity: (id: any) => number;
  increaseItemQuantity: (
    id: any,
    imgurl: string,
    title: string,
    price: number
  ) => void;
  decreaseItemQuantity: (id: any) => void;
  removeFromCArt: (id: any) => void;
};

type CartItem = {
  id: any;
  quantity: number;
  imgurl: string;
  title: string;
  price: number;
};
const ShoppingCartContext = createContext({} as ShoppingCartContext);
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
export function ShoppingCartProvider({ children }: Shoppingcartproviderprops) {
  const navigate = useNavigate();
  const [isOpen, setisOpen] = useState(false);
  const [UserLog, setUserLog] = useState(false);
  const [cartItems, setCArtItems] = useLocalStorage<CartItem[]>(
    "Shopping-cart",
    []
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  const openCart = () => setisOpen(true);
  const CloseCart = () => setisOpen(false);
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  function increaseItemQuantity(
    id: any,
    imgurl: string,
    title: string,
    price: number
  ) {
    setCArtItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...cartItems, { id, quantity: 1, imgurl, title, price }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseItemQuantity(id: number) {
    setCArtItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCArt(id: number) {
    setCArtItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  function userState(state: boolean) {
    if (state == true) {
      navigate("/profile");
      setUserLog(true);
    } else {
      localStorage.clear();
      sessionStorage.clear();
      Cookies.remove("token");
      navigate("/login");
      setUserLog(false);
    }
  }
  var token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      setUserLog(true);
    }
  }, [token]);

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCArt,
        openCart,
        CloseCart,
        userState,
        cartItems,
        cartQuantity,
        UserLog,
      }}
    >
      {children}
      <Shopingcart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
