import { Link } from 'react-router-dom';
import emptyCart from '../../assets/cart/empty-cart.png';
import './Error.css';

export default function NotFound() {
  return (
    <div className="error">
      <div className="error__container">
        <img src={emptyCart} alt="404 error" />
        <h1 className="text--lg">404 Error</h1>
        <p className="text--md">
          Oops! The link you are looking for does not exist.
        </p>
        <Link to="/books" className="btn btn--icon--left btn--primary">
          <span className="btn__icon fa--xs">
            <i className="fas fa-arrow-left"></i>
          </span>
          <p className="btn__text">Back to Home</p>
        </Link>
      </div>
    </div>
  );
}
