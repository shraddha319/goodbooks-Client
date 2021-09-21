import * as apiWishlist from '../../api/wishlist.api';
import * as apiCart from '../../api/cart.api';

export const getWishlist = async (dispatchUser, userId) => {
  try {
    dispatchUser({ type: 'GET_WISHLIST_REQUEST' });
    const {
      data: {
        data: { wishlist },
      },
      status,
    } = await apiWishlist.getWishlist(userId);
    // wishlist: {_id, user: userId, products: [{}]}
    if (status === 200) {
      dispatchUser({
        type: 'GET_WISHLIST_SUCCESS',
        payload: { _id: wishlist?._id, books: wishlist?.products },
      });
    }
  } catch (error) {
    if (error?.response) {
      dispatchUser({
        type: 'GET_WISHLIST_FAILED',
        payload: { error: error.response.data.error },
      });
    } else console.log(error);
  }
};

export const addToWishlist = async (dispatchUser, user, product) => {
  const { wishlist, profile } = user;
  try {
    if (!wishlist._id) {
      const {
        data: {
          data: { wishlist },
        },
        status,
      } = await apiWishlist.postWishlist(product._id, profile._id);
      if (status === 201) {
        dispatchUser({
          type: 'GET_WISHLIST_SUCCESS',
          payload: {
            _id: wishlist._id,
            books: wishlist.products,
          },
        });
      }
    } else {
      const { status } = await apiWishlist.updateWishlist({
        type: 'add',
        productId: product._id,
        wishlistId: wishlist._id,
        userId: profile._id,
      });
      if (status === 204) {
        dispatchUser({ type: 'ADD_TO_WISHLIST', payload: { book: product } });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeFromWishlist = async (dispatchUser, user, productId) => {
  const { wishlist, profile } = user;
  try {
    if (wishlist.books.length === 1) {
      const { status } = await apiWishlist.deleteWishlist(
        wishlist._id,
        profile._id
      );
      if (status === 204) dispatchUser({ type: 'REMOVE_WISHLIST' });
    } else {
      const { status } = await apiWishlist.updateWishlist({
        type: 'remove',
        productId,
        wishlistId: wishlist._id,
        userId: profile._id,
      });
      if (status === 204)
        dispatchUser({
          type: 'REMOVE_FROM_WISHLIST',
          payload: { bookId: productId },
        });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async (dispatchUser, userId) => {
  try {
    dispatchUser({ type: 'GET_CART_REQUEST' });
    const {
      data: {
        data: { cart },
      },
      status,
    } = await apiCart.getCart(userId);
    // cart: {_id, user: userId, products: [{quantity, product}]}
    if (status === 200) {
      dispatchUser({
        type: 'GET_CART_SUCCESS',
        payload: { _id: cart?._id, books: cart?.products },
      });
    }
  } catch (error) {
    if (error?.response) {
      dispatchUser({
        type: 'GET_CART_FAILED',
        payload: { error: error.response.data.error },
      });
    } else console.log(error);
  }
};

export const addToCart = async (dispatchUser, user, product) => {
  const { cart, profile } = user;
  try {
    if (!cart._id) {
      const {
        data: {
          data: { cart },
        },
        status,
      } = await apiCart.postCart(product._id, profile._id);
      if (status === 201) {
        dispatchUser({
          type: 'GET_CART_SUCCESS',
          payload: {
            _id: cart._id,
            books: cart.products,
          },
        });
      }
    } else {
      const { status } = await apiCart.updateCart({
        type: 'add',
        productId: product._id,
        cartId: cart._id,
        userId: profile._id,
      });
      if (status === 204) {
        dispatchUser({ type: 'ADD_TO_CART', payload: { book: product } });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = async (dispatchUser, user, product) => {
  const { cart, profile } = user;
  try {
    if (cart.books.length === 1) {
      const { status } = await apiCart.deleteCart(cart._id, profile._id);
      if (status === 204) dispatchUser({ type: 'REMOVE_CART' });
    } else {
      const { status } = await apiCart.updateCart({
        type: 'remove',
        productId: product._id,
        cartId: cart._id,
        userId: profile._id,
      });
      if (status === 204)
        dispatchUser({
          type: 'REMOVE_FROM_CART',
          payload: { book: product },
        });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateQuantity = async (
  dispatchUser,
  type,
  { product, quantity },
  user
) => {
  const { cart, profile } = user;
  try {
    if (type === 'INCRE') {
      const { status } = await apiCart.updateCart({
        type: 'increment',
        productId: product._id,
        cartId: cart._id,
        userId: profile._id,
      });

      if (status === 204) {
        dispatchUser({
          type: 'UPDATE_QUANTITY',
          payload: { type: 'INCRE', book: product },
        });
      }
    } else {
      if (quantity === 1) await removeFromCart(dispatchUser, user, product);
      else {
        const { status } = await apiCart.updateCart({
          type: 'decrement',
          productId: product._id,
          cartId: cart._id,
          userId: profile._id,
        });

        if (status === 204) {
          dispatchUser({
            type: 'UPDATE_QUANTITY',
            payload: { type: 'DECRE', book: product },
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
