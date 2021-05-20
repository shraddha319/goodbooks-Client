import { useEffect, useState } from "react";
import { useProducts, useUserData } from "../../contexts/index";
import { getProducts } from "../../api/index";
import { Loader } from "../../components/index";
import ProductCard from "./ProductCard";
import "./Products.css";
import { ProductFilter } from "./ProductFilter";

export default function Products() {
  const {
    products: { productList },
    dispatchProducts,
  } = useProducts();

  const { userData, dispatchUserData } = useUserData();
  const [enableLoader, setEnableLoader] = useState(false);

  useEffect(() => getProducts(dispatchProducts, setEnableLoader), []);

  return (
    <div className="Products page-layout">
      {enableLoader ? <Loader /> : null}
      <ProductFilter />
      <div className="products__list">
        {productList.map((product) => (
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
