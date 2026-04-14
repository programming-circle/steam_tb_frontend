import { useState, useEffect } from 'react';
import '../App.css';

function HeroSection({ slides, activeSlide, onSelectSlide }) {
  const currentSlide = slides[activeSlide];
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const duration = 6000;
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeSlide]);

  useEffect(() => {
    const sliderTimer = window.setInterval(() => {
      onSelectSlide((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(sliderTimer);
  }, [slides.length, onSelectSlide]);

  return (
    <section className="hero section" id="hero">
      <div className="hero__content">
        <span className="hero__eyebrow">{currentSlide.eyebrow}</span>
        <h1 className="hero__title">{currentSlide.title}</h1>
        <p>{currentSlide.description}</p>

        <div className="hero__actions">
          <a className="hero__cta" href="/store">
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
            className={`hero__thumb-btn ${index === activeSlide ? 'is-active' : ''}`}
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

      <div className="hero__progress-bar">
        <div className="hero__progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </section>
  );
}

export default HeroSection;
