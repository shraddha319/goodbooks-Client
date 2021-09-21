import { useState } from 'react';
import './BookFilter.css';

export function BookFilter({ filters, dispatchFilters }) {
  const CheckInputFilters = {
    language: ['English', 'Hindi', 'Kannada'],
    genre: [
      'Fiction',
      'Non-Fiction',
      'Classic',
      'History',
      'Comic',
      'Self-Help',
      'Test Prep',
    ],
    rating: ['4 ★ & above', '3 ★ & above', '2 ★ & above', '1 ★ & above'],
  };

  function checkInputHandler(event, filterName, value) {
    let type = event.target.checked
      ? 'ADD_CHECKED_ITEM'
      : 'REMOVE_UNCHECKED_ITEM';
    dispatchFilters({
      type,
      payload: { filterName, value },
    });
  }

  const [showFilterDropDown, setShowFilterDropDown] = useState({
    rating: false,
    language: false,
    genre: false,
  });

  return (
    <div className="books__filter">
      <div className="justify-between">
        <p className="title--sm text--primary">Filters</p>
        <button
          onClick={() => dispatchFilters({ type: 'RESET_FILTERS' })}
          className="btn btn--secondary btn--clear-filters"
        >
          Reset
        </button>
      </div>

      <div className="filter__item">
        <p className="text--muted">Sort</p>
        <select
          onChange={(event) =>
            dispatchFilters({
              type: 'UPDATE_SORTBY_FILTER',
              payload: { sortBy: event.target.value },
            })
          }
          className="field__input"
          id="choice"
        >
          <option selected={filters.sortBy === 'DEFAULT'} value="DEFAULT">
            Default
          </option>
          <option
            selected={filters.sortBy === 'PRICE_LOW_TO_HIGH'}
            value="PRICE_LOW_TO_HIGH"
          >
            Price: Low to High
          </option>
          <option
            selected={filters.sortBy === 'PRICE_HIGH_TO_LOW'}
            value="PRICE_HIGH_TO_LOW"
          >
            Price: High to Low
          </option>
          <option
            selected={filters.sortBy === 'RATING_HIGH_TO_LOW'}
            value="RATING_HIGH_TO_LOW"
          >
            Rating: High to Low
          </option>
        </select>
      </div>
      <div className="filter__item">
        <div
          onClick={() =>
            setShowFilterDropDown({
              ...showFilterDropDown,
              rating: !showFilterDropDown.rating,
            })
          }
          className="filter__header clickable justify-between"
        >
          <p className="text--muted">Rating</p>
          <span className="fa--xs">
            <i
              class={`fas ${
                showFilterDropDown.rating ? 'fa-caret-up' : 'fa-caret-down'
              }`}
            ></i>
          </span>
        </div>
        <fieldset
          className="form__field field--set field--checkbox"
          style={{ display: showFilterDropDown.rating ? 'block' : 'none' }}
        >
          <div className="field--checkbox checkbox--container">
            <input
              type="checkbox"
              id="rating_above-4"
              checked={filters.rating.includes(4)}
              onChange={(event) => checkInputHandler(event, 'rating', 4)}
            />
            <label htmlFor="rating_above-4" className="field__label">
              4★ & above
            </label>
          </div>
          <div className="field--checkbox checkbox--container">
            <input
              type="checkbox"
              id="rating_above-3"
              checked={filters.rating.includes(3)}
              onChange={(event) => checkInputHandler(event, 'rating', 3)}
            />
            <label htmlFor="rating_above-3" className="field__label">
              3★ & above
            </label>
          </div>
          <div className="field--checkbox checkbox--container">
            <input
              type="checkbox"
              id="rating_above-2"
              checked={filters.rating.includes(2)}
              onChange={(event) => checkInputHandler(event, 'rating', 2)}
            />
            <label htmlFor="rating_above-2" className="field__label">
              2★ & above
            </label>
          </div>
          <div className="field--checkbox checkbox--container">
            <input
              type="checkbox"
              id="rating_above-1"
              checked={filters.rating.includes(1)}
              onChange={(event) => checkInputHandler(event, 'rating', 1)}
            />
            <label htmlFor="rating_above-1" className="field__label">
              1★ & above
            </label>
          </div>
        </fieldset>
      </div>
      <div className="filter__item">
        <div
          onClick={() =>
            setShowFilterDropDown({
              ...showFilterDropDown,
              language: !showFilterDropDown.language,
            })
          }
          className="filter__header clickable justify-between"
        >
          <p className="text--muted">Language</p>
          <span className="fa--xs">
            <i
              class={`fas ${
                showFilterDropDown.language ? 'fa-caret-up' : 'fa-caret-down'
              }`}
            ></i>
          </span>
        </div>
        <fieldset
          style={{ display: showFilterDropDown.language ? 'block' : 'none' }}
          className="filter__drop-down--show form__field field--set field--checkbox"
        >
          {CheckInputFilters.language.map((lang) => (
            <div className="field--checkbox checkbox--container">
              <input
                type="checkbox"
                id={lang}
                checked={filters.language.includes(lang)}
                onChange={(event) => checkInputHandler(event, 'language', lang)}
              />
              <label htmlFor={lang} className="field__label">
                {lang}
              </label>
            </div>
          ))}
        </fieldset>
      </div>
      <div className="filter__item">
        <div
          onClick={() =>
            setShowFilterDropDown({
              ...showFilterDropDown,
              genre: !showFilterDropDown.genre,
            })
          }
          className="filter__header clickable justify-between"
        >
          <p className="text--muted">Genre</p>
          <span className="fa--xs">
            <i
              class={`fas ${
                showFilterDropDown.genre ? 'fa-caret-up' : 'fa-caret-down'
              }`}
            ></i>
          </span>
        </div>
        <fieldset
          style={{ display: showFilterDropDown.genre ? 'block' : 'none' }}
          className="form__field field--set field--checkbox"
        >
          {CheckInputFilters.genre.map((item) => (
            <div className="field--checkbox checkbox--container">
              <input
                type="checkbox"
                id={item}
                checked={filters.genre.includes(item)}
                onChange={(event) => checkInputHandler(event, 'genre', item)}
              />
              <label htmlFor={item} className="field__label">
                {item}
              </label>
            </div>
          ))}
        </fieldset>
      </div>
      <div className="filter__item">
        <div className="field--checkbox checkbox--container">
          <input
            onChange={() => dispatchFilters({ type: 'TOGGLE_INSTOCK' })}
            checked={filters.inStock}
            type="checkbox"
            id="instock"
            name="inStock"
          />
          <label className="field__label" htmlFor="instock">
            In Stock
          </label>
        </div>
      </div>
    </div>
  );
}
