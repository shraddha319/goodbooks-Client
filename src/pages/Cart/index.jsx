import './Cart.css';
import { EmptyCart } from '../Error';
import { Loader } from '../../components';
import CartPrice from './CartPrice';
import { useUser } from '../../contexts';
import { useEffect } from 'react';
import CartCard from './CartCard';

export default function Cart() {
  const {
    user: { cart, profile },
    getCart,
    dispatchUser,
  } = useUser();

  useEffect(() => {
    if (cart.status === 'idle') {
      getCart(dispatchUser, profile._id);
    }
    if (cart.status === 'failed') {
      console.log(cart.error);
    }
  }, []);

  return cart.status === 'loading' ? (
    <Loader />
  ) : !cart._id ? (
    <EmptyCart />
  ) : (
    <div className="Cart page-layout">
      <div className="cart__list">
        {cart.books.map(({ book, quantity }) => (
          <CartCard book={book} quantity={quantity} />
        ))}
      </div>
      <CartPrice cart={cart} />
    </div>
  );
}
