import { Link } from "react-router-dom";
import { addToCart, addToWishlist } from "../../api/index";
import { useState } from "react";
import { useUserData } from "../../contexts";

function ButtonLoading() {
  return (
    <button onClick={null} className="btn btn--disabled btn--icon">
      <span class="fa--sm fa--primary">
        <i class="fa fa-spinner fa-spin"></i>
      </span>
    </button>
  );
}

export function ButtonWishlist({ productId }) {
  const [btnState, setBtnState] = useState("default");
  const { userData, dispatchUserData, isProductInWishlist } = useUserData();

  async function addToWishlistHandler(productId, userData, dispatchUserData) {
    setBtnState("loading");
    await addToWishlist(productId, userData, dispatchUserData);
    setBtnState("default");
  }

  return btnState === "loading" ? (
    <ButtonLoading />
  ) : isProductInWishlist(productId) ? (
    <Link to="/wishlist" className="btn btn--icon">
      <span className="fa--sm fa--hover fa--primary">
        <i className="fas fa-heart"></i>
      </span>
    </Link>
  ) : (
    <button
      className="btn btn--icon"
      onClick={() =>
        addToWishlistHandler(productId, userData, dispatchUserData)
      }
    >
      <span className="fa--sm fa--hover fa--primary">
        <i className="far fa-heart"></i>
      </span>
    </button>
  );
}

export function ButtonCart({ productId }) {
  const [btnState, setBtnState] = useState("default");
  const { userData, dispatchUserData, isProductInCart } = useUserData();

  async function addToCartHandler(productId, userData, dispatchUserData) {
    setBtnState("loading");
    await addToCart(productId, userData, dispatchUserData);
    setBtnState("default");
  }

  return btnState === "loading" ? (
    <ButtonLoading />
  ) : isProductInCart(productId) ? (
    <Link className="btn btn--icon--left text--xs btn--secondary" to="/cart">
      <span className="btn__icon fa--xs">
        <i className="fas fa-shopping-cart"></i>
      </span>
      <p className="btn__text">GO TO CART</p>
    </Link>
  ) : (
    <button
      onClick={() => addToCartHandler(productId, userData, dispatchUserData)}
      className="btn btn--icon--left text--xs btn--secondary"
    >
      <span className="btn__icon fa--xs">
        <i className="fas fa-shopping-cart"></i>
      </span>
      <p className="btn__text">ADD TO CART</p>
    </button>
  );
}
