import { useProducts } from "../../contexts/index";

export function ProductFilter() {
  const {
    products: { filters },
    dispatchProducts,
    multipleCheckFilters,
  } = useProducts();
  function filterMultiCheckHandler(event, filterName, value) {
    console.log(event);
    let payload = { filterName, value },
      type = event.target.checked
        ? "ADD_CHECKITEM_FILTER"
        : "REMOVE_CHECKITEM_FILTER";
    dispatchProducts({
      type,
      payload,
    });
  }
  return (
    <div className="products__filter">
      <div className="justify-between">
        <h2 className="title--sm text--primary">Filters</h2>
        <button
          onClick={() => dispatchProducts({ type: "RESET_FILTERS" })}
          className="btn btn--secondary btn--clear-filters"
        >
          Reset
        </button>
      </div>

      <div className="filter__item">
        <h3 className="text--muted">Sort</h3>
        <select
          onChange={(event) =>
            dispatchProducts({
              type: "UPDATE_SORTBY_FILTER",
              payload: { sortBy: event.target.value },
            })
          }
          className="field__input"
          id="choice"
        >
          <option selected={filters.sortBy === "DEFAULT"} value="DEFAULT">
            Default
          </option>
          <option
            selected={filters.sortBy === "PRICE_LOW_TO_HIGH"}
            value="PRICE_LOW_TO_HIGH"
          >
            Price: Low to High
          </option>
          <option
            selected={filters.sortBy === "PRICE_HIGH_TO_LOW"}
            value="PRICE_HIGH_TO_LOW"
          >
            Price: High to Low
          </option>
          <option
            selected={filters.sortBy === "RATING_HIGH_TO_LOW"}
            value="RATING_HIGH_TO_LOW"
          >
            Rating: High to Low
          </option>
        </select>
      </div>
      <div className="filter__item">
        <h3 className="text--muted">Rating</h3>
        <fieldset className="form__field field--set field--checkbox">
          <div className="field--checkbox checkbox--container">
            <input
              type="checkbox"
              id="rating_above-4"
              checked={filters.rating.includes(4)}
              onChange={(event) => filterMultiCheckHandler(event, "rating", 4)}
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
              onChange={(event) => filterMultiCheckHandler(event, "rating", 3)}
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
              onChange={(event) => filterMultiCheckHandler(event, "rating", 2)}
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
              onChange={(event) => filterMultiCheckHandler(event, "rating", 1)}
            />
            <label htmlFor="rating_above-1" className="field__label">
              1★ & above
            </label>
          </div>
        </fieldset>
      </div>
      <div className="filter__item">
        <h3 className="text--muted">Language</h3>
        <fieldset className="form__field field--set field--checkbox">
          {multipleCheckFilters.language.map((lang) => (
            <div className="field--checkbox checkbox--container">
              <input
                type="checkbox"
                id={lang}
                checked={filters.language.includes(lang)}
                onChange={(event) =>
                  filterMultiCheckHandler(event, "language", lang)
                }
              />
              <label htmlFor={lang} className="field__label">
                {lang}
              </label>
            </div>
          ))}
        </fieldset>
      </div>
      <div className="filter__item">
        <h3 className="text--muted">Genre</h3>
        <fieldset className="form__field field--set field--checkbox">
          {multipleCheckFilters.genre.map((item) => (
            <div className="field--checkbox checkbox--container">
              <input
                type="checkbox"
                id={item}
                checked={filters.genre.includes(item)}
                onChange={(event) =>
                  filterMultiCheckHandler(event, "genre", item)
                }
              />
              <label htmlFor={item} className="field__label">
                {item}
              </label>
            </div>
          ))}
        </fieldset>
      </div>
      <div className="filter__item">
        <h3 className="text--muted">Availability</h3>
        <div className="field--checkbox checkbox--container">
          <input
            onChange={() => dispatchProducts({ type: "TOGGLE_INSTOCK_FILTER" })}
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
