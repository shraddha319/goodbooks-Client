import { Link } from "react-router-dom";
import "./Navbar.css";
import logoIcon from "../../assets/owl.svg";
import { useUserData } from "../../contexts/index";

export default function Navbar({ theme }) {
  const {
    userData: {
      cart: { cartItems },
      wishlist: { wishlistItems },
    },
  } = useUserData();
  return (
    <header
      style={{
        background: theme,
      }}
      className="header"
    >
      <button className="btn" id="header__toggle">
        <span></span>
      </button>

      <div className="header__brand brand">
        <Link className="link" to="/">
          <img className="icon--lg" src={logoIcon} />
        </Link>
      </div>

      <nav className="nav nav--main">
        <ul className="list--no-bullets">
          <li className="nav__item">
            <Link className="link" to="/products">
              Explore
            </Link>
          </li>
        </ul>
      </nav>

      <nav className="nav nav--social">
        <ul className="list--no-bullets">
          <li className="nav__item">
            <Link className="link" to="/cart">
              <i className="fas fa--sm fa-shopping-cart"></i>
              <span class="badge--icon badge__data badge--round badge--notif">
                {cartItems.length}
              </span>
            </Link>
          </li>
          <li className="nav__item">
            <Link className="link" to="/wishlist">
              <i className="fas fa--sm fa-heart"></i>
              <span class="badge--icon badge__data badge--round badge--notif">
                {wishlistItems.length}
              </span>
            </Link>
          </li>
          <li className="nav__item">
            <Link className="link" to="/login">
              <i className="far fa--sm fa-user-circle"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
