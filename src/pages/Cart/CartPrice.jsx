import "./Cart.css";
import { useUserData } from "../../contexts/index";

export function CartPrice() {
  const { userData } = useUserData();
  const totalMRP = userData.cart.cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.product.price.MRP,
    0
  );
  const finalAmount = userData.cart.totalPrice;
  const discount = totalMRP - finalAmount;

  return (
    <div class="card cart__pricing">
      <div class="card__header">
        <h2 class="title--xs title">PRICE DETAILS</h2>
      </div>
      <div class="card__body">
        <div className="price__item text--sm text justify-between">
          <p>Price (x items)</p>
          <p>{`₹ ${totalMRP}`}</p>
        </div>
        <div className="price__item text--sm text justify-between">
          <p>Discount</p>
          <p className="text--primary">{`- ₹ ${discount}`}</p>
        </div>
        <div className="price__item text--sm text justify-between">
          <p>Delivery Charges</p>
          <p>{`₹ 0`}</p>
        </div>
      </div>
      <div class="card__footer">
        <div className="price__item text--sm price__item--total justify-between">
          <p>Total Amount</p>
          <p>{`₹ ${finalAmount}`}</p>
        </div>
        <p class="text--primary text--sm">You will save ₹ {discount}</p>
      </div>
    </div>
  );
}
