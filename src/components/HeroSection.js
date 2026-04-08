function HeroSection({ slides, activeSlide, onSelectSlide }) {
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

export default HeroSection;
