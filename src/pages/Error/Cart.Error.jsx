import emptyCart from "../../assets/cart/empty-cart.png";
import "./Error.css";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <div className="error">
      <div className="error__container">
        <img src={emptyCart} alt="empty cart" />
        <p className="text--lg">Your cart is empty!</p>
        <Link
          to="/products"
          className="btn btn--lg btn--icon--right btn--primary"
        >
          <p class="btn__text">Shop Now</p>
          <span class="btn__icon fa--sm">
            <i class="fas fa-shopping-bag"></i>
          </span>
        </Link>
      </div>
    </div>
  );
}
