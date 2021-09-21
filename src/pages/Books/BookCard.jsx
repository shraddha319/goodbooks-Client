import './BookCard.css';
import { CardPrice, CardRating, ButtonLoading } from '../../components';
import { Link } from 'react-router-dom';
import {
  CartOutline,
  CartSolid,
  HeartOutline,
  HeartSolid,
} from '../../assets/icons';
import { useState } from 'react';
import { useUser, useToast } from '../../contexts';

export default function BookCard({ book }) {
  const [loading, setLoading] = useState({
    cart: false,
    wishlist: false,
  });
  const {
    user: { wishlist, cart, profile },
    dispatchUser,
    isBookInWishlist,
    isBookInCart,
    addToWishlist,
    removeFromWishlist,
    addToCart,
    removeFromCart,
  } = useUser();
  const { dispatchToast } = useToast();

  const wishlistHandler = async (book) => {
    let toastMessage = '';

    setLoading({ ...loading, wishlist: true });
    if (!isBookInWishlist(book._id)) {
      await addToWishlist(dispatchUser, { wishlist, profile }, book);
      toastMessage = `${book.name} added to wishlist`;
    } else {
      await removeFromWishlist(dispatchUser, { wishlist, profile }, book._id);
      toastMessage = `${book.name} removed from wishlist`;
    }

    setLoading({ ...loading, wishlist: false });
    dispatchToast({
      type: 'TRIGGER_TOAST',
      payload: { type: 'success', body: toastMessage },
    });
  };

  const cartHandler = async (book) => {
    let toastMessage = '';

    setLoading({ ...loading, cart: true });
    if (!isBookInCart(book._id)) {
      await addToCart(dispatchUser, { cart, profile }, book);
      toastMessage = `${book.name} added to cart`;
    } else {
      await removeFromCart(dispatchUser, { cart, profile }, book);
      toastMessage = `${book.name} removed from cart`;
    }
    setLoading({ ...loading, cart: false });
    dispatchToast({
      type: 'TRIGGER_TOAST',
      payload: { type: 'success', body: toastMessage },
    });
  };

  return (
    <div className="card card--book hover--scale-out">
      <div className="btn--heart">
        {loading.wishlist ? (
          <ButtonLoading />
        ) : (
          <button
            className="btn btn--icon"
            onClick={() => {
              wishlistHandler(book);
            }}
          >
            <span className="fa--sm fa--hover fa--primary">
              {isBookInWishlist(book._id) ? <HeartSolid /> : <HeartOutline />}
            </span>
          </button>
        )}
      </div>
      <Link to={`/books/${book._id}`} className="link card__media">
        <img
          className="card__media--image"
          src={book.bookCoverURL}
          alt={book.name}
        />
      </Link>
      <div className="card__body flex--column">
        <p className="">{book.name}</p>
        <p className="text--muted">{`By ${book.author}`}</p>
        <CardRating rating={book.rating} />
        <CardPrice price={book.price} />
      </div>
      <div className="card__footer">
        {loading.cart ? (
          <ButtonLoading />
        ) : (
          <button
            className="btn btn--icon btn--cart"
            onClick={() => {
              cartHandler(book);
            }}
          >
            <span className="fa--md fa--hover fa--primary">
              {isBookInCart(book._id) ? <CartSolid /> : <CartOutline />}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
