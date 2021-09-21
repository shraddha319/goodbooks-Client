import { getBooks } from '../../api/books.api';

export const fetchBooks = async (dispatchBooks) => {
  dispatchBooks({ type: 'FETCH_BOOKS_REQUEST' });
  try {
    const {
      data: {
        data: { products },
      },
      status,
    } = await getBooks();
    if (status === 200)
      dispatchBooks({
        type: 'FETCH_BOOKS_SUCCESS',
        payload: { books: products },
      });
  } catch (error) {
    if (error?.response) {
      dispatchBooks({
        type: 'FETCH_BOOKS_FAILED',
        payload: { error: error.response.data },
      });
    } else console.log(error);
  }
};
