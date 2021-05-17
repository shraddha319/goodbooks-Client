import "./Wishlist.css";
import { useUserData } from "../../contexts/index";
import { EmptyWishlist } from "../Error/index";
import { CardRating, CardPrice } from "../../components/index";

export default function Wishlist() {
  const { userData } = useUserData();
  return (
    <div className="Wishlist">
      {!userData.wishlist._id ? (
        <EmptyWishlist />
      ) : (
        userData.wishlist.wishlistItems.map(({ product }) => (
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
              <button class="btn btn--icon">
                <span className="fa--sm">
                  <i class="fas fa-trash"></i>
                </span>
              </button>
              <button class="btn btn--icon">
                <span className="fa--sm">
                  <i class="fas fa-cart-plus"></i>
                </span>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
