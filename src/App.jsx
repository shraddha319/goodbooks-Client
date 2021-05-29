import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar, Loader, Toast } from "./components/index";
import {
  Home,
  Products,
  Cart,
  Wishlist,
  ProductDetail,
  Login,
} from "./pages/index";
import { useFeedback } from "./contexts/index";
import "./App.css";

export default function App() {
  const location = useLocation();
  const {
    feedback: { loader, toast },
  } = useFeedback();

  return (
    <div className="App">
      <Navbar theme={location.pathname === "/" ? "transparent" : ""} />
      <div className="Main">
        {loader ? <Loader /> : null}
        {toast.active ? <Toast /> : null}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </div>
  );
}
