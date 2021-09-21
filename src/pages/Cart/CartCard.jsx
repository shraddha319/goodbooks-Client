import './Cart.css';
import { CardRating, CardPrice, ButtonLoading } from '../../components';
import { useUser, useToast } from '../../contexts';
import { useState } from 'react';
import { AddIcon, RemoveIcon, TrashBinIcon } from '../../assets/icons';

export default function CartCard({ book, quantity }) {
  const {
    user: { cart, profile },
    dispatchUser,
    removeFromCart,
    updateQuantity,
  } = useUser();
  const [loading, setLoading] = useState({
    increment: false,
    decrement: false,
    delete: false,
  });
  const { dispatchToast } = useToast();

  const decrementHandler = async ({ book, quantity }) => {
    setLoading({ ...loading, decrement: true });
    await updateQuantity(
      dispatchUser,
      'DECRE',
      { product: book, quantity },
      { cart, profile }
    );
    setLoading({ ...loading, decrement: false });
  };

  const incrementHandler = async ({ book, quantity }) => {
    setLoading({ ...loading, increment: true });
    await updateQuantity(
      dispatchUser,
      'INCRE',
      { product: book, quantity },
      { cart, profile }
    );
    setLoading({ ...loading, increment: false });
  };

  const deleteHandler = async (book) => {
    setLoading({ ...loading, delete: true });
    await removeFromCart(dispatchUser, { cart, profile }, book);
    setLoading({ ...loading, delete: false });
    dispatchToast({
      type: 'TRIGGER_TOAST',
      payload: { type: 'success', body: `${book.name} removed from cart` },
    });
  };

  return (
    <div key={book._id} className="card card--horizontal card--cart">
      <div className="card__media">
        <img className="card__media--image" alt="" src={book.bookCoverURL} />
      </div>
      <div className="card__body flex--column">
        <h3 className="card__body__title title--xs">{book.name}</h3>
        <p className="text--sm">{book.author}</p>
        <small className="text--xs">{book.format}</small>
        <CardRating rating={book.rating} />
        <CardPrice price={book.price} />
      </div>
      <div className="card__footer flex--row">
        <div className="cart__quantity">
          {loading.decrement ? (
            <ButtonLoading />
          ) : (
            <button
              onClick={() => decrementHandler({ quantity, book })}
              className="btn btn--icon"
            >
              <span className="fa--sm fa--hover fa--primary">
                <RemoveIcon />
              </span>
            </button>
          )}
          <span className="text--xs">{quantity}</span>
          {loading.increment ? (
            <ButtonLoading />
          ) : (
            <button
              onClick={
                quantity === book.quantity
                  ? null
                  : () => incrementHandler({ quantity, book })
              }
              className={`btn btn--icon ${
                quantity === book.quantity ? 'btn--disabled' : ''
              }`}
            >
              <span className="fa--sm fa--hover fa--primary">
                <AddIcon />
              </span>
            </button>
          )}
        </div>
        {loading.delete ? (
          <ButtonLoading />
        ) : (
          <button onClick={() => deleteHandler(book)} className="btn btn--icon">
            <span className="fa--sm fa--hover">
              <TrashBinIcon />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
