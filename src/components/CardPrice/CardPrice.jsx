import './CardPrice.css';

export default function CardPrice({
  price: { value, unit, discountPercent = 10 },
}) {
  const MRP = value + value / 10;
  return (
    <div className="card__price flex--row">
      <p className="price__net">{`${unit} ${value}`}</p>
      <p className="price__mrp">
        <strike className="text--muted">{`₹ ${MRP}`}</strike>
      </p>
      <p className="price__discount">
        <strong>{`${discountPercent}% off`}</strong>
      </p>
    </div>
  );
}
