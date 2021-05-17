import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/index";
import { Products, Cart, Wishlist } from "./pages/index";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="Main">
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </div>
  );
}
