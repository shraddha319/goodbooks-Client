import { createContext, useReducer, useContext, useEffect } from "react";

const UserContext = createContext();

export function UserDataProvider({ children }) {
  const initialUserData = JSON.parse(localStorage.getItem("userData")) || {
    cart: {
      _id: null,
      cartItems: [],
    },
    wishlist: {
      _id: null,
      wishlistItems: [],
    },
  };

  const [userData, dispatchUserData] = useReducer(
    userDataReducer,
    initialUserData
  );

  useEffect(() => {
    console.log(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  function userDataReducer(userData, { type, payload }) {
    switch (type) {
      case "ADD_TO_CART":
        return {
          ...userData,
          cart: { ...userData.cart, ...payload.cart },
        };

      case "REMOVE_FROM_CART":
        let newCartItems = userData.cart.cartItems.filter(
          (item) => item._id !== payload.cartItemId
        );
        return {
          ...userData,
          cart: { ...userData.cart, cartItems: newCartItems },
        };

      case "REMOVE_CART":
        return { ...userData, cart: { _id: null, cartItems: [] } };

      case "ADD_TO_WISHLIST":
        return {
          ...userData,
          wishlist: { ...userData.wishlist, ...payload.wishlist },
        };

      case "REMOVE_FROM_WISHLIST":
        let newWishlistItems = userData.wishlist.wishlistItems.filter(
          (item) => item._id !== payload.wishlistItemId
        );
        return {
          ...userData,
          wishlist: { ...userData.wishlist, wishlistItems: newWishlistItems },
        };

      case "REMOVE_WISHLIST":
        return { ...userData, wishlist: { _id: null, wishlistItems: [] } };

      default:
        return userData;
    }
  }

  return (
    <UserContext.Provider value={{ userData, dispatchUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserData() {
  return useContext(UserContext);
}
