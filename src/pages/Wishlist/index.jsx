import './Wishlist.css';
import { useUser } from '../../contexts';
import { EmptyWishlist } from '../Error';
import { Loader } from '../../components';
import WishlistCard from './WishlistCard';
import { useEffect } from 'react';

export default function Wishlist() {
  const {
    user: { wishlist, profile },
    getWishlist,
    dispatchUser,
  } = useUser();

  useEffect(() => {
    if (wishlist.status === 'idle') {
      getWishlist(dispatchUser, profile._id);
    }
    if (wishlist.status === 'failed') {
      console.log(wishlist.error);
    }
  }, []);

  return wishlist.status === 'loading' ? (
    <Loader />
  ) : wishlist?.books.length === 0 ? (
    <EmptyWishlist />
  ) : (
    <div className="Wishlist page-layout">
      <div className="wishlist__list">
        {wishlist.books.map((product) => (
          <WishlistCard product={product} />
        ))}
      </div>
    </div>
  );
}
