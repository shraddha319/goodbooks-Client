import { useEffect, useState } from "react";
import { useProducts, useUserData } from "../../contexts/index";
import { getProducts } from "../../api/index";
import { Loader } from "../../components/index";
import ProductCard from "./ProductCard";
import "./Products.css";
import { ProductFilter } from "./ProductFilter";

export default function Products() {
  const {
    products: { productList, filters },
    dispatchProducts,
  } = useProducts();

  function applyProductFilters(productList, filters) {
    let itemList = [...productList];
    switch (filters.sortBy) {
      case "PRICE_LOW_TO_HIGH":
        itemList.sort((a, b) => a.price.MRP - b.price.MRP);
        break;
      case "PRICE_HIGH_TO_LOW":
        itemList.sort((a, b) => b.price.MRP - a.price.MRP);
        break;
      case "RATING_HIGH_TO_LOW":
        itemList.sort((a, b) => b.rating.avgRating - a.rating.avgRating);
        break;
      default:
    }
    itemList = itemList.filter((item) => item.inStock === filters.inStock);

    if (filters.rating.length > 0)
      itemList = itemList.filter(({ rating: { avgRating } }) => {
        return filters.rating.some((rating) => avgRating >= rating);
      });

    if (filters.language.length > 0)
      itemList = itemList.filter(({ specs: { language } }) =>
        filters.language.includes(language)
      );

    if (filters.genre.length > 0)
      itemList = itemList.filter(({ specs: { genre } }) =>
        filters.genre.includes(genre)
      );

    return itemList;
  }

  const { userData, dispatchUserData } = useUserData();
  const [enableLoader, setEnableLoader] = useState(false);

  useEffect(() => getProducts(dispatchProducts, setEnableLoader), []);

  return (
    <div className="Products page-layout">
      {enableLoader ? <Loader /> : null}
      <ProductFilter />
      <div className="products__list">
        {applyProductFilters(productList, filters).map((product) => (
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
