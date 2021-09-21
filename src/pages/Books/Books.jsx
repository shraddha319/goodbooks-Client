import { useReducer, useEffect } from 'react';
import BookCard from './BookCard';
import './Books.css';
import { BookFilter } from './filter';
import { useBooks, useUser } from '../../contexts';
import { Loader } from '../../components';

function filterReducer(state, action) {
  switch (action.type) {
    case 'ADD_CHECKED_ITEM':
      var { filterName, value } = action.payload;

      return { ...state, [filterName]: [...state[filterName], value] };

    case 'REMOVE_UNCHECKED_ITEM':
      var { filterName, value } = action.payload;

      return {
        ...state,
        [filterName]: state[filterName].filter((elem) => elem !== value),
      };

    case 'UPDATE_SORTBY_FILTER':
      return {
        ...state,
        sortBy: action.payload.sortBy,
      };

    case 'TOGGLE_INSTOCK':
      return {
        ...state,
        inStock: !state.inStock,
      };

    case 'RESET_FILTERS':
      return {
        sortBy: 'DEFAULT',
        language: [],
        genre: [],
        rating: [],
        inStock: true,
      };

    default:
      return state;
  }
}

export default function Books() {
  const {
    books: { books, status },
    fetchBooks,
    dispatchBooks,
  } = useBooks();
  const [filters, dispatchFilters] = useReducer(filterReducer, {
    sortBy: 'DEFAULT',
    language: [],
    genre: [],
    rating: [],
    inStock: true,
  });

  const computeAvgRating = (rating) => {
    const sop = Object.entries(rating).reduce((sop, [k, v]) => sop + k * v, 0);
    const sum = Object.values(rating).reduce((sum, v) => sum + v, 0);
    return sop / sum;
  };

  function applyFilters(books, filters) {
    let itemList = [...books];
    switch (filters.sortBy) {
      case 'PRICE_LOW_TO_HIGH':
        itemList.sort((a, b) => a.price.value - b.price.value);
        break;
      case 'PRICE_HIGH_TO_LOW':
        itemList.sort((a, b) => b.price.value - a.price.value);
        break;
      case 'RATING_HIGH_TO_LOW':
        itemList.sort((a, b) => {
          return computeAvgRating(b.rating) - computeAvgRating(a.rating);
        });
        break;
      default:
        break;
    }
    itemList = itemList.filter(
      (item) => !((item.quantity > 0) ^ filters.inStock)
    );

    if (filters.rating.length > 0)
      itemList = itemList.filter(({ rating }) => {
        const avgRating = computeAvgRating(rating);
        return filters.rating.some((rating) => avgRating >= rating);
      });

    if (filters.language.length > 0)
      itemList = itemList.filter(({ language }) =>
        filters.language.includes(language)
      );

    if (filters.genre.length > 0)
      itemList = itemList.filter(
        ({ genre }) =>
          filters.genre.findIndex(
            (g) => g.toLowerCase() === genre.toLowerCase()
          ) !== -1
      );

    return itemList;
  }

  useEffect(() => {
    if (status === 'idle') fetchBooks(dispatchBooks);
  }, []);

  return (
    <div className="Books page-layout">
      {status === 'loading' || status === 'idle' ? (
        <Loader />
      ) : (
        <>
          <BookFilter filters={filters} dispatchFilters={dispatchFilters} />
          <div className="books__list">
            {applyFilters(books, filters).map((book) => (
              <BookCard book={book} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
