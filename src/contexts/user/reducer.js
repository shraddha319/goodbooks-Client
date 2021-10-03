export const userReducer = (state, action) => {
  let updatedPrice = 0,
    updatedBooks,
    cartItem;

  switch (action.type) {
    case 'SET_USER':
      return { ...state, profile: action.payload.user };

    case 'GET_CART_REQUEST':
      return { ...state, cart: { ...state.cart, status: 'loading' } };

    case 'GET_CART_SUCCESS':
      /**
       * payload: {_id, user, books: [{quantity, product}]}
       */
      const books = action.payload.books?.map(({ quantity, product }) => ({
        quantity,
        book: product,
      }));
      updatedPrice = books?.reduce(
        (price, { quantity, book }) => price + quantity * book.price.value,
        0
      );

      return {
        ...state,
        cart: {
          status: 'success',
          _id: action.payload._id || null,
          totalPrice: updatedPrice || 0,
          books,
        },
      };

    case 'GET_CART_FAILED':
      return {
        ...state,
        cart: { status: 'failed', error: action.payload.error },
      };

    case 'ADD_TO_CART':
      /**
       * payload: {book}
       */
      updatedPrice = state.cart.totalPrice + action.payload.book.price.value;

      return {
        ...state,
        cart: {
          ...state.cart,
          totalPrice: updatedPrice,
          books: [...state.cart.books, { quantity: 1, ...action.payload }],
        },
      };

    case 'REMOVE_FROM_CART':
      /**
       * payload: {book}
       */
      cartItem = state.cart.books.find(
        ({ book }) => book._id === action.payload.book._id
      );

      updatedBooks = state.cart.books.filter(
        ({ book }) => book._id !== action.payload.book._id
      );
      updatedPrice =
        state.cart.totalPrice -
        cartItem.quantity * action.payload.book.price.value;
      return {
        ...state,
        cart: {
          ...state.cart,
          totalPrice: updatedPrice,
          books: updatedBooks,
        },
      };

    case 'UPDATE_QUANTITY':
      /**
       * payload: {book, type: ['INCRE', 'DECRE']}
       */
      let update = action.payload.type === 'INCRE' ? 1 : -1;
      updatedPrice =
        state.cart.totalPrice + action.payload.book.price.value * update;

      updatedBooks = state.cart.books.map(({ book, quantity }) =>
        book._id === action.payload.book._id
          ? { book, quantity: quantity + update }
          : { book, quantity }
      );

      return {
        ...state,
        cart: {
          ...state.cart,
          totalPrice: updatedPrice,
          books: updatedBooks,
        },
      };

    case 'REMOVE_CART':
      return {
        ...state,
        cart: {
          _id: null,
          totalPrice: 0,
          books: [], // [{quantity, book}]
          status: 'idle',
        },
      };

    case 'GET_WISHLIST_REQUEST':
      return {
        ...state,
        wishlist: {
          ...state.wishlist,
          status: 'loading',
        },
      };

    case 'GET_WISHLIST_SUCCESS':
      /**
       * payload: {user, _id, books: [book]}
       */
      console.log(action.payload);
      return {
        ...state,
        wishlist: {
          status: 'success',
          _id: action.payload._id || null,
          books: action.payload.books || [],
        },
      };

    case 'GET_WISHLIST_FAILED':
      return {
        ...state,
        wishlist: { status: 'failed', error: action.payload.error },
      };

    case 'ADD_TO_WISHLIST':
      /**
       * payload: {book}
       */

      return {
        ...state,
        wishlist: {
          ...state.wishlist,
          books: [...state.wishlist.books, action.payload.book],
        },
      };

    case 'REMOVE_FROM_WISHLIST':
      /**
       * payload: {bookId}
       */
      updatedBooks = state.wishlist.books.filter(
        (p) => p._id !== action.payload.bookId
      );

      return {
        ...state,
        wishlist: {
          ...state.wishlist,
          books: updatedBooks,
        },
      };

    case 'REMOVE_WISHLIST':
      return {
        ...state,
        wishlist: {
          _id: null,
          books: [],
          status: 'idle',
        },
      };

    case 'UPDATE_PROFILE':
      /**
       * payload: {update}
       */
      return {
        ...state,
        profile: state.profile
          ? { ...state.profile, ...action.payload.update }
          : state.profile,
      };

    case 'LOGOUT_USER':
      return {
        profile: null,
        cart: {
          status: 'idle',
          _id: null,
          totalPrice: 0,
          books: [],
          error: null,
        },
        wishlist: {
          status: 'idle',
          _id: null,
          books: [],
          error: null,
        },
      };

    default:
      return state;
  }
};
