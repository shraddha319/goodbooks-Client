import { createContext, useReducer, useContext } from "react";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  function productsReducer(products, { type, payload: { productList } }) {
    switch (type) {
      case "INIT_PRODUCTS":
        return productList;

      // case "DECREMENT_STOCK":
      // /**
      //  * payload should have product id
      //  */

      default:
        return products;
    }
  }

  const [products, dispatchProducts] = useReducer(productsReducer, []);

  return (
    <ProductsContext.Provider value={{ products, dispatchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
