import API from './config';

import { getBooks, getBook } from './books.api';

import { postCart, getCart, updateCart, deleteCart } from './cart.api';

import {
  postWishlist,
  getWishlist,
  updateWishlist,
  deleteWishlist,
} from './wishlist.api';

import { loginRequest, signUpRequest } from './auth.api';

export {
  API,
  getBook,
  getBooks,
  postCart,
  getCart,
  updateCart,
  deleteCart,
  postWishlist,
  getWishlist,
  updateWishlist,
  deleteWishlist,
  loginRequest,
  signUpRequest,
};
