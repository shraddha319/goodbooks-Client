import { useParams } from 'react-router-dom';
import { useBooks, useUser } from '../../../contexts';
import './BookDetail.css';
import {
  CardRating,
  CardPrice,
  Loader,
  ButtonLoading,
} from '../../../components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBook } from '../../../api';
import {
  CartOutline,
  CartSolid,
  HeartOutline,
  HeartSolid,
  ArrowBack,
} from '../../../assets/icons';

export default function BookDetail() {
  const {
    books: { books },
  } = useBooks();
  const { bookId } = useParams();
  const [book, setBook] = useState(books.find(({ _id }) => _id === bookId));
  const [loading, setLoading] = useState({
    cart: false,
    wishlist: false,
    book: true,
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

  const wishlistHandler = async (book) => {
    setLoading({ ...loading, wishlist: true });
    if (!isBookInWishlist(book._id))
      await addToWishlist(dispatchUser, { wishlist, profile }, book);
    else
      await removeFromWishlist(dispatchUser, { wishlist, profile }, book._id);
    setLoading({ ...loading, wishlist: false });
  };

  const cartHandler = async (book) => {
    setLoading({ ...loading, cart: true });
    if (!isBookInCart(book._id))
      await addToCart(dispatchUser, { cart, profile }, book);
    else await removeFromCart(dispatchUser, { cart, profile }, book);
    setLoading({ ...loading, cart: false });
  };

  useEffect(() => {
    (async () => {
      if (book) {
        setLoading({ ...loading, book: false });
        return;
      }
      try {
        const {
          data: {
            data: { product: book },
          },
          status,
        } = await getBook(bookId);
        console.log(book);
        if (status === 200) setBook(book);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading({ ...loading, book: false });
      }
    })();
  }, []);

  return loading.book ? (
    <Loader />
  ) : (
    <div className="Book-Detail page-layout">
      <div className="book__detail flex--column">
        <Link to="/books" class="btn btn--icon">
          <span class="fa--md fa--primary fa--hover">
            <ArrowBack />
          </span>
        </Link>
        <section className="book__detail__1 flex--row">
          <img
            className="detail__image"
            src={book.bookCoverURL}
            alt={book.name}
          />
          <div className="">
            <p className="book__title title--sm  title">{`${book.name}`}</p>
            <p className="text--sm text">{`By ${book.author}`}</p>
            <CardRating rating={book.rating} />
            <CardPrice price={book.price} />
            <div className="detail__icon-features flex--row">
              <div>
                <span class="fa--xs fa--primary">
                  <i class="fas fa-undo"></i>
                </span>
                <p className="text--muted text--xs">7 Day Replacement</p>
              </div>
              <div>
                <span class="fa--xs fa--primary">
                  <i class="fas fa-hand-holding-usd"></i>
                </span>
                <p className="text--muted text--xs">Save with Offers</p>
              </div>
              <div>
                <span class="fa--xs fa--primary">
                  <i class="fas fa-shipping-fast"></i>
                </span>
                <p className="text--muted text--xs">Fast Delivery</p>
              </div>
              <div>
                <span class="fa--xs fa--primary">
                  <i class="fas fa-gifts"></i>
                </span>
                <p className="text--muted text--xs">Win Prizes</p>
              </div>
            </div>
            <button
              onClick={() => {
                wishlistHandler(book);
              }}
              className="btn btn--icon--left text--xs btn--secondary"
            >
              {isBookInWishlist(book._id) ? (
                <>
                  <span className="fa--sm">
                    {loading.wishlist ? <ButtonLoading /> : <HeartSolid />}
                  </span>
                  <p className="btn__text">REMOVE</p>
                </>
              ) : (
                <>
                  <span className="fa--sm">
                    {loading.wishlist ? <ButtonLoading /> : <HeartOutline />}
                  </span>
                  <p className="btn__text">ADD</p>
                </>
              )}
            </button>
            <button
              onClick={() => {
                cartHandler(book);
              }}
              className="btn btn--icon--left text--xs btn--secondary"
            >
              {isBookInCart(book._id) ? (
                <>
                  <span className="fa--sm">
                    {loading.cart ? <ButtonLoading /> : <CartSolid />}
                  </span>
                  <p className="btn__text">REMOVE</p>
                </>
              ) : (
                <>
                  <span className="fa--sm">
                    {loading.cart ? <ButtonLoading /> : <CartOutline />}
                  </span>
                  <p className="btn__text">ADD</p>
                </>
              )}
            </button>
          </div>
        </section>
        <section>
          <details className="detail__description" open="true">
            <summary>Summary</summary>
            <p className="text--muted">{book.description}</p>
          </details>
        </section>
        <section className="book__detail__2">
          <div className="detail__specs">
            <p className="title--xs">Specifications</p>
            <div className="detail__specs__table">
              <div>
                <h4 className="text--muted">Author</h4>
                <span>{book.author}</span>
              </div>
              <div>
                <h4 className="text--muted">Language</h4>
                <span>{book.language}</span>
              </div>
              <div>
                <h4 className="text--muted">Genre</h4>
                <span>{book.genre}</span>
              </div>
              <div>
                <h4 className="text--muted">Publisher</h4>
                <span>{book.publication.publisher}</span>
              </div>
              <div>
                <h4 className="text--muted">Pages</h4>
                <span>{book.pages}</span>
              </div>
              <div>
                <h4 className="text--muted">Format</h4>
                <span>{book.format}</span>
              </div>
              <div>
                <h4 className="text--muted">Weight</h4>
                <span>{`${book.weight.value} ${book.weight.unit}`}</span>
              </div>
              <div>
                <h4 className="text--muted">ISBN</h4>
                <span>{book.isbn}</span>
              </div>
              <div>
                <h4 className="text--muted">Dimensions</h4>
                <span>{`${book.dimensions.width} x ${book.dimensions.height} x ${book.dimensions.length} (${book.dimensions.unit}) `}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
