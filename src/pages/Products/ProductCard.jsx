import "./ProductCard.css";
import { addToCart, addToWishlist } from "../../api/index";
import { Link } from "react-router-dom";

export default function ProductCard({
  product,
  userData,
  dispatchUserData,
  isProductInCart,
  isProductInWishlist,
}) {
  return (
    <div className="card card--product clickable hover--scale-out">
      {isProductInWishlist(product._id) ? (
        <Link to="/wishlist">
          <button className="btn btn--icon">
            <span className="fa--sm fa--hover fa--primary">
              <i className="fas fa-heart"></i>
            </span>
          </button>
        </Link>
      ) : (
        <button
          className="btn btn--icon"
          onClick={() => addToWishlist(product._id, userData, dispatchUserData)}
        >
          <span className="fa--sm fa--hover fa--primary">
            <i className="far fa-heart"></i>
          </span>
        </button>
      )}
      <div className="card__header"></div>
      <div className="card__media">
        <img className="card__media--image" src={product.bookCoverURL} />
      </div>
      <div className="card__body flex--column">
        <p className="text--sm">{product.name}</p>
        <h2 className="text--muted">{`By ${product.author}`}</h2>
        <ProductRating rating={product.rating} />
        <ProductPrice price={product.price} />
      </div>
      <div className="card__footer justify-center">
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
            onClick={() => addToCart(product._id, userData, dispatchUserData)}
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
  );

  function ProductPrice({ price: { net, MRP, discountPercent } }) {
    return (
      <div className="product__price flex--row">
        <p className="text--sm">{`₹ ${net}`}</p>
        <p>
          <strike className="text--muted">{`₹ ${MRP}`}</strike>
        </p>
        <p className="text--sm">
          <strong>{`${discountPercent}% off`}</strong>
        </p>
      </div>
    );
  }

  function ProductRating({ rating: { avgRating, ratingCount } }) {
    return (
      <div className="product__rating flex--row">
        <p className="text--xs rating--badge">{`★ ${avgRating} `}</p>
        <p className="text--muted rating--count">({ratingCount})</p>
      </div>
    );
  }
}
