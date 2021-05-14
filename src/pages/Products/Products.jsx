import { useEffect } from "react";
import { useProducts } from "../../contexts/Products.context";

export default function Products() {
  const { products, disptachProducts } = useProducts();

  return <div className="Products"></div>;
}
