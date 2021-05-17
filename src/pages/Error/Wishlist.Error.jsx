import emptyWishlist from "../../assets/wishlist/empty-wishlist.png";
import "./Error.css";

export default function EmptyWishlist() {
  return (
    <div className="error error--empty-wishlist">
      <img src={emptyWishlist} alt="empty wishlist" />
    </div>
  );
}
