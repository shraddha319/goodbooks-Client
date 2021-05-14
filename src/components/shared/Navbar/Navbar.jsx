import { Link } from "react-router-dom";
import logoIcon from "/home/shraddha/e-commerce/src/assets/owl.svg";

export default function Navbar() {
  return (
    <header className="header">
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
              <i className="fa--sm fas fa-shopping-cart"></i>
            </Link>
          </li>
          <li className="nav__item">
            <Link className="link" to="/wishlist">
              <i class="fas fa--sm fa-heart"></i>
            </Link>
          </li>
          <li className="nav__item">
            <Link className="link" to="/login">
              <i class="far fa--sm fa-user-circle"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
