import "./Cart.css";
import { useUserData } from "../../contexts/index";
import { EmptyCart } from "../Error/Error";
import { CardRating, CardPrice } from "../../components/index";

export default function Cart() {
  const { userData } = useUserData();
  console.log(userData);
  return (
    <div className="Cart">
      {!userData.cart._id ? (
        <EmptyCart />
      ) : (
        userData.cart.cartItems.map(({ product, quantity }) => (
          <div key={product._id} className="card card--horizontal card--cart">
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
                <span className="fa--xs">
                  <i class="fas fa-trash"></i>
                </span>
              </button>
              <div className="cart__quantity">
                <button class="btn btn--icon" disabled={product.quantity <= 0}>
                  <span className="fa--xs">
                    <i class="fas fa-minus-circle"></i>
                  </span>
                </button>
                <span className="text--sm">{quantity}</span>
                <button class="btn btn--icon">
                  <span className="fa--xs">
                    <i class="fas fa-plus-circle"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
