import emptyCart from "../../assets/cart/empty-cart.png";
import "./Error.css";

export function EmptyCart() {
  return (
    <div className="error error--empty-cart">
      <img src={emptyCart} alt="empty cart" />
    </div>
  );
}
