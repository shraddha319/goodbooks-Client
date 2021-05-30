import { createContext, useReducer, useContext } from "react";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  function productsReducer(products, { type, payload }) {
    switch (type) {
      case "INIT_PRODUCTS":
        return { ...products, productList: payload.productList };

      // case "DECREMENT_STOCK":
      // /**
      //  * payload should have product id
      //  */

      case "ADD_CHECKITEM_FILTER":
        console.log("in reducer: ", payload);
        var { filterName, value } = payload;
        var newFilter = {
          ...products.filters,
          [filterName]: [...products.filters[filterName], value],
        };
        return { ...products, filters: newFilter };

      case "REMOVE_CHECKITEM_FILTER":
        var { filterName, value } = payload;
        newFilter = {
          ...products.filters,
          [filterName]: products.filters[filterName].filter(
            (elem) => elem !== value
          ),
        };
        return { ...products, filters: newFilter };

      case "UPDATE_SORTBY_FILTER":
        return {
          ...products,
          filters: { ...products.filters, sortBy: payload.sortBy },
        };

      case "TOGGLE_INSTOCK_FILTER":
        return {
          ...products,
          filters: { ...products.filters, inStock: !products.filters.inStock },
        };

      case "RESET_FILTERS":
        return { ...products, filters: initFilters };

      default:
        return products;
    }
  }

  const initFilters = {
    sortBy: "DEFAULT",
    language: [],
    genre: [],
    rating: [],
    inStock: true,
  };

  const multipleCheckFilters = {
    language: ["English", "Hindi", "Kannada"],
    genre: [
      "Fiction",
      "Non-Fiction",
      "Classic",
      "History",
      "Comic",
      "Self-Help",
      "Test Prep",
    ],
    rating: ["4 ★ & above", "3 ★ & above", "2 ★ & above", "1 ★ & above"],
  };

  const [products, dispatchProducts] = useReducer(productsReducer, {
    productList: [],
    filters: initFilters,
  });

  return (
    <ProductsContext.Provider
      value={{ products, dispatchProducts, multipleCheckFilters }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
