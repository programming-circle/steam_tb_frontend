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
              <a href="#news">Open Details</a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default RecommendationBanner;
