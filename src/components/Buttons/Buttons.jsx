import { Link } from "react-router-dom";
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

export function ButtonWishlist({ productId, clickHandler }) {
  const [btnState, setBtnState] = useState("default");
  const { userData, dispatchUserData, isProductInWishlist } = useUserData();

  async function addToWishlistHandler(productId, userData, dispatchUserData) {
    setBtnState("loading");
    await clickHandler(productId, userData, dispatchUserData);
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

export function ButtonCart({ productId, clickHandler }) {
  const [btnState, setBtnState] = useState("default");
  const { userData, dispatchUserData, isProductInCart } = useUserData();

  async function addToCartHandler(productId, userData, dispatchUserData) {
    setBtnState("loading");
    await clickHandler(productId, userData, dispatchUserData);
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

export function DeleteItem({ itemId, deleteHandler }) {
  const { userData, dispatchUserData } = useUserData();
  const [btnState, setBtnState] = useState("default");

  async function deleteItemHandler(itemId, userData, dispatchUserData) {
    setBtnState("loading");
    await deleteHandler(itemId, userData, dispatchUserData);
    setBtnState("default");
  }

  return btnState === "loading" ? (
    <ButtonLoading />
  ) : (
    <button
      onClick={() => deleteItemHandler(itemId, userData, dispatchUserData)}
      class="btn btn--icon"
    >
      <span className="fa--sm">
        <i class="fas fa-trash"></i>
      </span>
    </button>
  );
}

export function UpdateQuantity({
  cartItemId,
  updateHandler,
  isDisabled,
  iconClass,
  updateType,
}) {
  const { userData, dispatchUserData } = useUserData();
  const [btnState, setBtnState] = useState("default");

  async function updateItemHandler() {
    setBtnState("loading");
    await updateHandler(updateType, cartItemId, userData, dispatchUserData);
    setBtnState("default");
  }

  return btnState === "loading" ? (
    <ButtonLoading />
  ) : (
    <button
      onClick={!isDisabled ? updateItemHandler : null}
      className={`btn btn--icon ${isDisabled ? "btn--disabled" : ""}`}
    >
      <span className="fa--sm">
        <i className={iconClass}></i>
      </span>
    </button>
  );
}
