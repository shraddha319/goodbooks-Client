import { createContext, useReducer, useContext, useEffect } from "react";

const UserContext = createContext();

export function UserDataProvider({ children }) {
  const initialUserData = JSON.parse(localStorage.getItem("userData")) || {
    cart: {
      _id: null,
      totalPrice: 0,
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
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  function userDataReducer(userData, { type, payload }) {
    switch (type) {
      case "ADD_TO_CART":
        return {
          ...userData,
          cart: { ...userData.cart, ...payload.cart },
        };

      case "UPDATE_QUANTITY":
        let update = payload.updateType === "INC" ? 1 : -1;
        let updatedCartItems = userData.cart.cartItems.map((item) =>
          item._id === payload.cartItemId
            ? {
                ...item,
                quantity: item.quantity + update,
                totalPrice: payload.totalPrice,
              }
            : item
        );
        return {
          ...userData,
          cart: {
            ...userData.cart,
            cartItems: updatedCartItems,
            totalPrice: payload.totalPrice,
          },
        };

      case "REMOVE_FROM_CART":
        let newCartItems = userData.cart.cartItems.filter(
          (item) => item._id !== payload.cartItemId
        );
        return {
          ...userData,
          cart: {
            ...userData.cart,
            totalPrice: payload.totalPrice,
            cartItems: newCartItems,
          },
        };

      case "REMOVE_CART":
        return {
          ...userData,
          cart: { _id: null, totalPrice: 0, cartItems: [] },
        };

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

  function isProductInCart(productId) {
    return userData.cart.cartItems.findIndex(
      (cartItem) => cartItem.product._id === productId
    ) === -1
      ? false
      : true;
  }

  function isProductInWishlist(productId) {
    return userData.wishlist.wishlistItems.findIndex(
      (wishlistItem) => wishlistItem.product._id === productId
    ) === -1
      ? false
      : true;
  }

  return (
    <UserContext.Provider
      value={{
        userData,
        dispatchUserData,
        isProductInCart,
        isProductInWishlist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserData() {
  return useContext(UserContext);
}
