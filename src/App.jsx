import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Nav, Loader, Toast, ScrollToTop, PrivateRoute } from './components';
import {
  Home,
  Books,
  Cart,
  Wishlist,
  BookDetail,
  NotFound,
  Login,
  Signup,
  EditProfile,
} from './pages';
import { useUser, useToast } from './contexts';
import './App.css';

export default function App() {
  const location = useLocation();
  const {
    user: { cart, wishlist },
  } = useUser();
  const { toast } = useToast();

  return (
    <div className="App">
      <Nav pathname={location.pathname} />
      <ScrollToTop>
        {cart.status === 'loading' || wishlist.status === 'loading' ? (
          <Loader />
        ) : (
          <div className="Main">
            {toast.active ? <Toast /> : null}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/:bookId" element={<BookDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <PrivateRoute path="/cart" element={<Cart />} />
              <PrivateRoute path="/wishlist" element={<Wishlist />} />
              <PrivateRoute path="/profile" element={<EditProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        )}
      </ScrollToTop>
    </div>
  );
}
