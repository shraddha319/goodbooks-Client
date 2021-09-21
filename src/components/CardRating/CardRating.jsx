import './CardRating.css';

export default function CardRating({ rating, ratingCount = 120 }) {
  const computeAvgRating = (rating) => {
    const sop = Object.entries(rating).reduce((sop, [k, v]) => sop + k * v, 0);
    const sum = Object.values(rating).reduce((sum, v) => sum + v, 0);
    console.log(rating, sop, sum);

    return sop / sum;
  };

  return (
    <div className="card__rating flex--row">
      <p className="text--xs rating--badge">{`★ ${
        Math.round(computeAvgRating(rating) * 10) / 10
      } `}</p>
      <p className="text--muted rating--count">({ratingCount})</p>
    </div>
  );
}
