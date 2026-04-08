function NewsGrid({ items }) {
  return (
    <div className="news-grid">
      {items.map((item) => (
        <article key={item.title} className="news-card">
          <span className="news-card__label">Update</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <a href="#hero">Read More</a>
        </article>
      ))}
    </div>
  );
}

export default NewsGrid;
