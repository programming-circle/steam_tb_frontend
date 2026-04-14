import { Link } from 'react-router-dom';

function NewsGrid({ items }) {
  return (
    <div className="news-grid">
      {items.map((item) => (
        <article key={item.title} className="news-card">
          <span className="news-card__label">Update</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <Link to="/news">Read More</Link>
        </article>
      ))}
    </div>
  );
}

export default NewsGrid;
