import "./Cart.css";
import { useUserData } from "../../contexts/index";
import { EmptyCart } from "../Error/index";
import { CardRating, CardPrice } from "../../components/index";
import { removeFromCart, updateQuantity } from "../../api/index";

export default function Cart() {
  const { userData, dispatchUserData } = useUserData();
  return !userData.cart._id ? (
    <EmptyCart />
  ) : (
    <div className="Cart page-layout">
      <div className="cart__list">
        {userData.cart.cartItems.map(({ _id, product, quantity }) => (
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
            <div className="card__footer flex--row">
              <button
                onClick={() => removeFromCart(_id, userData, dispatchUserData)}
                className="btn btn--icon"
              >
                <span className="fa--sm">
                  <i className="fas fa-trash"></i>
                </span>
              </button>
              <div className="cart__quantity">
                <button
                  onClick={
                    quantity > 1
                      ? () =>
                          updateQuantity("DEC", _id, userData, dispatchUserData)
                      : null
                  }
                  className={`btn btn--icon ${
                    quantity <= 1 ? "btn--disabled" : ""
                  }`}
                >
                  <span className="fa--sm">
                    {quantity > 0 && <i className="fas fa-minus-circle"></i>}
                  </span>
                </button>
                <span className="text--sm">{quantity}</span>
                <button
                  onClick={
                    quantity < product.quantity
                      ? () => {
                          updateQuantity(
                            "INC",
                            _id,
                            userData,
                            dispatchUserData
                          );
                        }
                      : null
                  }
                  className={`btn btn--icon ${
                    quantity >= product.quantity ? "btn--disabled" : ""
                  }`}
                >
                  <span className="fa--sm">
                    <i className="fas fa-plus-circle"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div class="card cart__pricing">
        <div class="card__header">
          <h2 class="title--xs title">PRICE DETAILS</h2>
        </div>
        <div class="card__body">
          <div className="price__item text--sm text justify-between">
            <p>Price (x items)</p>
            <p>₹ 123</p>
          </div>
          <div className="price__item text--sm text justify-between">
            <p>Discount</p>
            <p>₹ 123</p>
          </div>
          <div className="price__item text--sm text justify-between">
            <p>Delivery Charges</p>
            <p>₹ 123</p>
          </div>
        </div>
        <div class="card__footer">
          <div className="price__item text--sm price__item--total justify-between">
            <p>Total Amount</p>
            <p>₹ 123</p>
          </div>
          <p class="text--primary text--xs">
            <strong>You will save ₹</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
