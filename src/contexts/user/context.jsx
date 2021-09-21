import { createContext, useContext, useReducer, useEffect } from 'react';
import { userReducer } from './reducer';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
} from './serviceHandler';

const UserContext = createContext();

export function UserProvider({ children }) {
  const initialState = {
    profile: null,
    cart: {
      status: 'idle',
      _id: null,
      totalPrice: 0,
      books: [], // [{quantity, book}]
      error: null,
    },
    wishlist: {
      status: 'idle',
      _id: null,
      books: [], // [book]
      error: null,
    },
  };

  const [user, dispatchUser] = useReducer(userReducer, initialState);

  function isBookInCart(bookId) {
    if (!user.cart._id) return false;
    return user.cart.books.findIndex(({ book }) => book._id === bookId) === -1
      ? false
      : true;
  }

  function isBookInWishlist(bookId) {
    if (!user.wishlist._id) return false;
    return user.wishlist.books.findIndex((book) => book._id === bookId) === -1
      ? false
      : true;
  }

  useEffect(() => {
    if (user.wishlist.status === 'idle' && user.profile) {
      getWishlist(dispatchUser, user.profile?._id);
    }

    if (user.cart.status === 'idle' && user.profile) {
      getCart(dispatchUser, user.profile?._id);
    }
  }, [user.profile]);

  return (
    <UserContext.Provider
      value={{
        user,
        dispatchUser,
        isBookInCart,
        isBookInWishlist,
        getWishlist,
        addToWishlist,
        removeFromWishlist,
        getCart,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
