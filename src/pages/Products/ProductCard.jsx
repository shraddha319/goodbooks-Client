import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <div className="card card--product clickable hover--scale-out">
      <button className="btn btn--icon">
        <span className="fa--sm fa--hover fa--primary">
          <i className="far fa-heart"></i>
        </span>
      </button>
      <div className="card__header"></div>
      <div className="card__media">
        <img className="card__media--image" src={product.bookCoverURL} />
      </div>
      <div className="card__body flex--column">
        <p className="text--sm">{product.name}</p>
        <h2 className="text--muted">{`By ${product.author}`}</h2>
        <ProductRating rating={product.rating} />
        <ProductPrice price={product.price} />
      </div>
      <div className="card__footer">
        <button className="btn btn--icon">
          <span className="fa--sm">
            <i className="fas fa-shopping-cart"></i>
          </span>
        </button>
      </div>
    </div>
  );

  function ProductPrice({ price: { net, MRP, discountPercent } }) {
    return (
      <div className="product__price flex--row">
        <p className="text--sm">{`₹ ${net}`}</p>
        <p>
          <strike className="text--muted">{`₹ ${MRP}`}</strike>
        </p>
        <p className="text--sm">
          <strong>{`${discountPercent}% off`}</strong>
        </p>
      </div>
    );
  }

  function ProductRating({ rating: { avgRating, ratingCount } }) {
    return (
      <div className="product__rating flex--row">
        <p className="text--xs rating--badge">{`★ ${avgRating} `}</p>
        <p className="text--muted rating--count">({ratingCount})</p>
      </div>
    );
  }
}
