import "./ProductCard.css";
import {
  ButtonWishlist,
  ButtonCart,
  CardPrice,
  CardRating,
} from "../../components/index";

export default function ProductCard({ product }) {
  return (
    <div className="card card--product hover--scale-out">
      <div className="card__header">
        <ButtonWishlist productId={product._id} />
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
        <ButtonCart productId={product._id} />
      </div>
    </div>
  );
}
