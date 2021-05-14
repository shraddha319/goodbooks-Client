import { useEffect, useState } from "react";
import { useProducts } from "../../contexts/index";
import { getProducts } from "../../api/index";
import { Loader } from "../../components/index";
import ProductCard from "./ProductCard";
import "./Products.css";

export default function Products() {
  const { products, dispatchProducts } = useProducts();
  const [enableLoader, setEnableLoader] = useState(false);

  useEffect(() => getProducts(dispatchProducts, setEnableLoader), []);

  return (
    <div className="Products">
      {enableLoader ? <Loader /> : null}
      <div className="products__list">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}
