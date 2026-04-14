import { Link } from 'react-router-dom';

function RecommendationBanner({ items }) {
  return (
    <div className="recommendation-banner">
      {items.map((item) => (
        <article key={item.title} className="recommendation-banner__item">
          <div
            className="recommendation-banner__image"
            style={{ backgroundImage: `url(${item.image})` }}
          />
          <div className="recommendation-banner__content">
            <span>Recommended for you</span>
            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
            <div className="recommendation-banner__footer">
              <strong>{item.price}</strong>
              <Link to="/library">Open Details</Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default RecommendationBanner;
