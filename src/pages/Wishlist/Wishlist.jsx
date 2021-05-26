import "./Wishlist.css";
import { Link } from "react-router-dom";
import { useUserData } from "../../contexts/index";
import { EmptyWishlist } from "../Error/index";
import { CardRating, CardPrice } from "../../components/index";
import { removeFromWishlist, addToCart } from "../../api/index";

export default function Wishlist() {
  const { userData, dispatchUserData, isProductInCart } = useUserData();

  return !userData.wishlist._id ? (
    <EmptyWishlist />
  ) : (
    <div className="Wishlist page-layout">
      <div className="wishlist__list">
        {userData.wishlist.wishlistItems.map(({ _id, product }) => (
          <div
            key={product._id}
            className="card card--horizontal card--wishlist"
          >
            <div className="card__media">
              <img
                className="card__media--image"
                alt=""
                src={product.bookCoverURL}
              />
            </div>
            <div className="card__body flex--column">
              <h3 className="card__body__title title--xs">{product.name}</h3>
              <p className="text--sm">{product.author}</p>
              <small className="text--xs">{product.specs.format}</small>
              <CardRating rating={product.rating} />
              <CardPrice price={product.price} />
            </div>
            <div class="card__footer flex--row">
              <button
                onClick={() =>
                  removeFromWishlist(_id, userData, dispatchUserData)
                }
                class="btn btn--icon"
              >
                <span className="fa--sm">
                  <i class="fas fa-trash"></i>
                </span>
              </button>
              {isProductInCart(product._id) ? (
                <Link className="link" to="/cart">
                  <button className="btn btn--icon--left text--xs btn--secondary">
                    <span className="btn__icon fa--xs">
                      <i className="fas fa-shopping-cart"></i>
                    </span>
                    <p className="btn__text">GO TO CART</p>
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() =>
                    addToCart(product._id, userData, dispatchUserData)
                  }
                  className="btn btn--icon--left text--xs btn--secondary"
                >
                  <span className="btn__icon fa--xs">
                    <i className="fas fa-shopping-cart"></i>
                  </span>
                  <p className="btn__text">ADD TO CART</p>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
