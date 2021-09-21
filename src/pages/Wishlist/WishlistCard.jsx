import './Wishlist.css';
import { Link } from 'react-router-dom';
import { useUser, useToast } from '../../contexts';
import { CardRating, CardPrice, ButtonLoading } from '../../components';
import { CartSolid, CartOutline, TrashBinIcon } from '../../assets/icons';
import { useState } from 'react';

export default function WishlistCard({ product }) {
  const {
    user: { wishlist, profile, cart },
    isBookInCart,
    dispatchUser,
    addToCart,
    removeFromWishlist,
  } = useUser();
  const [loading, setLoading] = useState({
    cart: false,
    delete: false,
  });
  const { dispatchToast } = useToast();

  const deleteHandler = async (book) => {
    setLoading({ ...loading, delete: true });
    await removeFromWishlist(dispatchUser, { wishlist, profile }, book._id);
    setLoading({ ...loading, delete: false });
    dispatchToast({
      type: 'TRIGGER_TOAST',
      payload: { type: 'success', body: `${book.name} removed from wishlist` },
    });
  };

  const moveToCartHandler = async (book) => {
    setLoading({ ...loading, cart: true });
    await addToCart(dispatchUser, { cart, profile }, book);
    setLoading({ ...loading, cart: false });
    dispatchToast({
      type: 'TRIGGER_TOAST',
      payload: { type: 'success', body: `${book.name} added to cart` },
    });
  };

  return (
    <div key={product._id} className="card card--horizontal card--wishlist">
      <div className="card__media">
        <img className="card__media--image" alt="" src={product.bookCoverURL} />
      </div>
      <div className="card__body flex--column">
        <h3 className="card__body__title title--xs">{product.name}</h3>
        <p className="text--sm">{product.author}</p>
        <small className="text--xs">{product.format}</small>
        <CardRating rating={product.rating} />
        <CardPrice price={product.price} />
      </div>
      <div class="card__footer flex--row">
        {isBookInCart(product._id) ? (
          <Link to="/cart" className="link btn btn--icon--left text--xs">
            <span className="fa--xs">
              <CartSolid />
            </span>
            <p className="btn__text">GO TO CART</p>
          </Link>
        ) : (
          <button
            onClick={() => moveToCartHandler(product)}
            className="btn btn--icon--left text--xs btn--secondary"
          >
            <span className="fa--xs">
              {loading.cart ? <ButtonLoading /> : <CartOutline />}
            </span>
            <p className="btn__text">ADD</p>
          </button>
        )}
        {loading.delete ? (
          <ButtonLoading />
        ) : (
          <button
            onClick={() => deleteHandler(product)}
            className="btn btn--icon"
          >
            <span className="fa--sm fa--hover">
              <TrashBinIcon />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
