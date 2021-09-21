import { NavLink, Link } from 'react-router-dom';
import './Nav.scss';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';
import { useUser } from '../../contexts';

export default function Nav({ pathname }) {
  const {
    user: { cart, wishlist, profile },
  } = useUser();

  return (
    <header
      style={{ background: pathname === '/' ? 'rgba(0,0,0,0.5)' : '' }}
      className="header"
    >
      <button className="btn" id="header__toggle">
        <span></span>
      </button>

      <div className="header__brand brand">
        <Link className="link" to="/">
          <LogoIcon className="icon--lg" fill="#fff" />
        </Link>
      </div>

      <nav className="nav nav--main">
        <ul className="list--no-bullets">
          <li className="nav__item">
            <NavLink end activeClassName="active" className="link" to="/books">
              Explore
            </NavLink>
          </li>
        </ul>
      </nav>

      <nav className="nav nav--social">
        <ul className="list--no-bullets">
          <li className="nav__item">
            <NavLink end activeClassName="active" className="link" to="/cart">
              <i className="fas fa--sm fa-shopping-cart"></i>
              {cart._id && (
                <span class="badge--icon badge__data badge--round badge--notif">
                  {cart.books.length}
                </span>
              )}
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              end
              activeClassName="active"
              className="link"
              to="/wishlist"
            >
              <i className="fas fa--sm fa-heart"></i>
              {wishlist._id && (
                <span class="badge--icon badge__data badge--round badge--notif">
                  {wishlist.books.length}
                </span>
              )}
            </NavLink>
          </li>
          <li className="nav__item">
            {profile ? (
              <NavLink
                end
                activeClassName="active"
                to="/profile"
                className="link flex--row"
              >
                <span className="fa--xs">
                  <i className="far fa-user-circle"></i>
                </span>
                <p>{profile.firstName}</p>
              </NavLink>
            ) : (
              <NavLink
                end
                activeClassName="active"
                className="link flex--row"
                to="/login"
              >
                <span className="fa--sm">
                  <i className="far fa-user-circle"></i>
                </span>
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
