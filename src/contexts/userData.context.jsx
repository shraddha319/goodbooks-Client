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

      case "ADD_TO_WISHLIST":
        return {
          ...userData,
          wishlist: { ...userData.wishlist, ...payload.wishlist },
        };

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
