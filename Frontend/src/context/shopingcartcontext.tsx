import { createContext, ReactNode, useContext, useState } from "react";
import Shopingcart from "../components/shopingcart";
import { useLocalStorage } from "../hooks/useLocalStorage";
type Shoppingcartproviderprops = {
  children: ReactNode;
};
type ShoppingCartContext = {
  openCart: () => void;
  CloseCart: () => void;
  cartQuantity: number;
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
  const [isOpen, setisOpen] = useState(false);
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
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCArt,
        openCart,
        CloseCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <Shopingcart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
