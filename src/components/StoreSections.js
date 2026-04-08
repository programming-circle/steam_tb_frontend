export function SectionHeader({ title, eyebrow, actionLabel, actionHref = '#hero' }) {
  return (
    <div className="section__header">
      <div>
        {eyebrow && <span className="section__eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {actionLabel && (
        <a className="section__action" href={actionHref}>
          {actionLabel}
        </a>
      )}
    </div>
  );
}

export function HeroSection({ slides, activeSlide, onSelectSlide }) {
  const currentSlide = slides[activeSlide];

  return (
    <section className="hero section" id="hero">
      <div className="hero__content">
        <span className="hero__eyebrow">{currentSlide.eyebrow}</span>
        <h1>{currentSlide.title}</h1>
        <p>{currentSlide.description}</p>

        <div className="hero__actions">
          <a className="hero__cta" href="#featured">
            Explore Now
          </a>
          <span className="hero__price">{currentSlide.price}</span>
        </div>

        <div className="hero__meta">
          <span>{currentSlide.tag}</span>
          <span>Curated for modern players</span>
        </div>
      </div>

      <div className="hero__media" style={{ backgroundImage: `url(${currentSlide.image})` }}>
        <div className="hero__overlay">
          <span>Live this week</span>
          <strong>Exclusive bundles and spotlight releases</strong>
        </div>
      </div>

      <div className="hero__thumbs">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={index === activeSlide ? 'is-active' : ''}
            onClick={() => onSelectSlide(index)}
          >
            <img src={slide.image} alt={slide.title} />
            <div>
              <strong>{slide.title}</strong>
              <span>{slide.tag}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export function GameCard({ game }) {
  return (
    <article className="game-card">
      <div className="game-card__image" style={{ backgroundImage: `url(${game.image})` }} />
      <div className="game-card__content">
        <span className="game-card__genre">{game.genre || game.badge}</span>
        <h3>{game.title}</h3>
        {game.subtitle && <p>{game.subtitle}</p>}
        <div className="game-card__footer">
          <strong>{game.price}</strong>
          <a className="game-card__button" href="#hero">
            View Game
          </a>
        </div>
      </div>
    </article>
  );
}

export function HorizontalScroller({ items, variant = 'default' }) {
  return (
    <div className={`scroll-row ${variant === 'featured' ? 'featured-strip' : ''}`}>
      {items.map((item) => (
        <GameCard key={item.title} game={item} />
      ))}
    </div>
  );
}

export function CategoryPills({ items }) {
  return (
    <div className="category-pills">
      {items.map((item) => (
        <a key={item} className="category-pill" href="#recommendations">
          {item}
        </a>
      ))}
    </div>
  );
}

export function RecommendationBanner({ items }) {
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

export function NewsGrid({ items }) {
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

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>NovaPlay</strong>
        <p>Discover premium releases, curated collections, and community-driven recommendations.</p>
      </div>
      <div className="footer__links">
        <a href="#featured">Featured</a>
        <a href="#categories">Categories</a>
        <a href="#recommendations">Recommendations</a>
      </div>
    </footer>
  );
}
