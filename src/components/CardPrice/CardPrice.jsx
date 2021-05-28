import "./CardPrice.css";

export default function CardPrice({ price: { net, MRP, discountPercent } }) {
  return (
    <div className="card__price flex--row">
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
