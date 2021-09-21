import { createContext, useContext, useReducer, useEffect } from 'react';
import { fetchBooks } from './serviceHandler';
import { booksReducer } from './reducer';

const BooksContext = createContext();

export function BooksProvider({ children }) {
  const initialState = {
    books: [],
    status: 'idle',
    error: null,
  };

  const [books, dispatchBooks] = useReducer(booksReducer, initialState);

  useEffect(() => {
    fetchBooks(dispatchBooks);
  }, []);

  return (
    <BooksContext.Provider value={{ books, dispatchBooks, fetchBooks }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  return useContext(BooksContext);
}
