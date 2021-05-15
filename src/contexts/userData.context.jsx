import { createContext, useReducer, useContext, useEffect } from "react";

const UserContext = createContext();

export function UserDataProvider({ children }) {
  const initialUserData = {
    cart: {
      _id: null,
      cartItems: [],
    },
  };

  const [userData, dispatchUserData] = useReducer(
    userDataReducer,
    initialUserData
  );

  useEffect(() => console.log(userData), userData);

  function userDataReducer(userData, { type, payload }) {
    switch (type) {
      case "ADD_TO_CART":
        return {
          ...userData,
          cart: { ...userData.cart, ...payload.cart },
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
