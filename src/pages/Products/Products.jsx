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

  useEffect(() => getProducts(dispatchProducts, setEnableLoader), []);

  return (
    <div className="Products page-layout">
      {enableLoader ? <Loader /> : null}
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
