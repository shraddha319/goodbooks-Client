import { useEffect, useState } from "react";
import { useProducts, useUserData } from "../../contexts/index";
import { getProducts } from "../../api/index";
import { Loader } from "../../components/index";
import ProductCard from "./ProductCard";
import "./Products.css";

export default function Products() {
  const { products, dispatchProducts } = useProducts();
  const { userData, dispatchUserData } = useUserData();
  const [enableLoader, setEnableLoader] = useState(false);

  const initFilters = {
    sortBy: "DEFAULT",
    language: [],
    genre: [],
    rating: [],
    inStock: false,
  };
  const [filters, setFilters] = useState(initFilters);
  const multipleCheckFilters = {
    language: ["English", "Hindi", "Kannada"],
    genre: ["Fiction", "Non-Fiction", "Classic", "Comic", "Self-Help"],
    rating: ["4 ★ & above", "3 ★ & above", "2 ★ & above", "1 ★ & above"],
  };

  useEffect(() => getProducts(dispatchProducts, setEnableLoader), []);

  function filterRatingHandler(event, filterName, value) {
    event.target.checked
      ? setFilters({
          ...filters,
          [filterName]: [...filters[filterName], value],
        })
      : setFilters({
          ...filters,
          [filterName]: filters[filterName].filter((elem) => elem !== value),
        });
  }

  return (
    <div className="Products page-layout">
      {enableLoader ? <Loader /> : null}
      <div className="products__filter">
        <div className="justify-between">
          <h2 className="title--sm text--primary">Filters</h2>
          <button
            onClick={() => setFilters(initFilters)}
            className="btn btn--secondary btn--clear-filters"
          >
            Reset
          </button>
        </div>

        <div className="filter__item">
          <h3 className="text--muted">Sort</h3>
          <select
            onChange={(event) =>
              setFilters({ ...filters, sortBy: event.target.value })
            }
            className="field__input"
            id="choice"
          >
            <option selected={filters.sortBy == "DEFAULT"} value="DEFAULT">
              Default
            </option>
            <option
              selected={filters.sortBy == "PRICE_LOW_TO_HIGH"}
              value="PRICE_LOW_TO_HIGH"
            >
              Price: Low to High
            </option>
            <option
              selected={filters.sortBy == "PRICE_HIGH_TO_LOW"}
              value="PRICE_HIGH_TO_LOW"
            >
              Price: High to Low
            </option>
            <option
              selected={filters.sortBy == "RATING_HIGH_TO_LOW"}
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
                onChange={(event) => filterRatingHandler(event, "rating", 4)}
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
                onChange={(event) => filterRatingHandler(event, "rating", 3)}
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
                onChange={(event) => filterRatingHandler(event, "rating", 2)}
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
                onChange={(event) => filterRatingHandler(event, "rating", 1)}
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
                    filterRatingHandler(event, "language", lang)
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
                    filterRatingHandler(event, "genre", item)
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
              onChange={(event) =>
                setFilters({
                  ...filters,
                  inStock: event.target.checked ? true : false,
                })
              }
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

      <div className="products__list">
        {products.map((product) => (
          <ProductCard
            product={product}
            userData={userData}
            dispatchUserData={dispatchUserData}
          />
        ))}
      </div>
    </div>
  );
}

// return (
//   <div className="products__filter">
//     <div className="justify-between">
//       <h2 className="title--sm text--primary">Filters</h2>
//       <button className="btn btn--secondary btn--clear-filters">
//         Reset
//       </button>
//     </div>

//     <div className="filter__item">
//       <h3 className="text--muted">Sort</h3>
//       <select
//         onChange={(event) =>
//           setFilters({ ...filters, sortBy: event.target.value })
//         }
//         className="field__input"
//         id="choice"
//       >
//         <option value="DEFAULT">Default</option>
//         <option value="PRICE_LOW_TO_HIGH">Price: Low to High</option>
//         <option value="PRICE_HIGH_TO_LOW">Price: High to Low</option>
//         <option value="RATING_HIGH_TO_LOW">Rating: High to Low</option>
//       </select>
//     </div>
//     <div className="filter__item">
//       <h3 className="text--muted">Rating</h3>
//       <fieldset className="form__field field--set field--checkbox">
//         <div className="field--checkbox checkbox--container">
//           <input
//             type="checkbox"
//             id="rating_above-4"
//             onChange={(event) => filterRatingHandler(event, "rating", 4)}
//           />
//           <label htmlFor="rating_above-4" className="field__label">
//             4★ & above
//           </label>
//         </div>
//         <div className="field--checkbox checkbox--container">
//           <input
//             type="checkbox"
//             id="rating_above-3"
//             onChange={(event) => filterRatingHandler(event, "rating", 3)}
//           />
//           <label htmlFor="rating_above-3" className="field__label">
//             3★ & above
//           </label>
//         </div>
//         <div className="field--checkbox checkbox--container">
//           <input
//             type="checkbox"
//             id="rating_above-2"
//             onChange={(event) => filterRatingHandler(event, "rating", 2)}
//           />
//           <label htmlFor="rating_above-2" className="field__label">
//             2★ & above
//           </label>
//         </div>
//         <div className="field--checkbox checkbox--container">
//           <input
//             type="checkbox"
//             id="rating_above-1"
//             onChange={(event) => filterRatingHandler(event, "rating", 1)}
//           />
//           <label htmlFor="rating_above-1" className="field__label">
//             1★ & above
//           </label>
//         </div>
//       </fieldset>
//     </div>
//     <div className="filter__item">
//       <h3 className="text--muted">Language</h3>
//       <fieldset className="form__field field--set field--checkbox">
//         {multipleCheckFilters.language.map((lang) => (
//           <div className="field--checkbox checkbox--container">
//             <input
//               type="checkbox"
//               id={lang}
//               onChange={(event) =>
//                 filterRatingHandler(event, "language", { lang })
//               }
//             />
//             <label htmlFor={lang} className="field__label">
//               {lang}
//             </label>
//           </div>
//         ))}
//       </fieldset>
//     </div>
//     <div className="filter__item">
//       <h3 className="text--muted">Genre</h3>
//       <fieldset className="form__field field--set field--checkbox">
//         {multipleCheckFilters.genre.map((item) => (
//           <div className="field--checkbox checkbox--container">
//             <input
//               type="checkbox"
//               id={item}
//               onChange={(event) =>
//                 filterRatingHandler(event, "genre", { item })
//               }
//             />
//             <label htmlFor={item} className="field__label">
//               {item}
//             </label>
//           </div>
//         ))}
//       </fieldset>
//     </div>
//     <div className="filter__item">
//       <h3 className="text--muted">Availability</h3>
//       <div className="field--checkbox checkbox--container">
//         <input
//           onChange={(event) =>
//             setFilters({
//               ...filters,
//               inStock: event.target.checked ? true : false,
//             })
//           }
//           type="checkbox"
//           id="instock"
//           name="inStock"
//         />
//         <label className="field__label" htmlFor="instock">
//           In Stock
//         </label>
//       </div>
//     </div>
//   </div>
// );
