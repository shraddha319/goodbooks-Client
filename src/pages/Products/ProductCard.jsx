import "./ProductCard.css";
import {
  ButtonWishlist,
  ButtonCart,
  CardPrice,
  CardRating,
} from "../../components/index";
import { addToCart, addToWishlist } from "../../api/index";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="card card--product hover--scale-out">
      <div className="card__header">
        <ButtonWishlist productId={product._id} clickHandler={addToWishlist} />
      </div>
      <div className="card__media">
        <img className="card__media--image" src={product.bookCoverURL} />
      </div>
      <div className="card__body flex--column">
        <p className="text--sm">{product.name}</p>
        <h2 className="text--muted">{`By ${product.author}`}</h2>
        <CardRating rating={product.rating} />
        <CardPrice price={product.price} />
      </div>
      <div className="card__footer justify-between">
        <ButtonCart productId={product._id} clickHandler={addToCart} />
        <Link to={`/products/${product._id}`} className="btn btn--icon">
          <span className="fa--sm fa--hover fa--primary">
            <i className="fas fa-external-link-alt"></i>
          </span>
        </Link>
      </div>
    </div>
  );
}
