export const booksReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return { ...state, status: 'loading' };

    case 'FETCH_BOOKS_SUCCESS':
      return { ...state, status: 'success', books: action.payload.books };

    case 'FETCH_BOOKS_FAILED':
      return { ...state, status: 'failed', error: action.payload.error };

    default:
      return state;
  }
};
