import "./CardRating.css";

export default function CardRating({ rating: { avgRating, ratingCount } }) {
  return (
    <div className="card__rating flex--row">
      <p className="text--xs rating--badge">{`★ ${avgRating} `}</p>
      <p className="text--muted rating--count">({ratingCount})</p>
    </div>
  );
}
