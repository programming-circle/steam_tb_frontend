import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnimatedSection from '../components/AnimatedSection';
import Footer from '../components/Footer';
import NewsGrid from '../components/NewsGrid';
import SectionHeader from '../components/SectionHeader';
import { heroSlides, navLinks, newsItems } from '../data/storeData';
import '../App.css';

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const SLIDE_DURATION = 6000;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
      setProgress(0);
    }, SLIDE_DURATION);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 100 / (SLIDE_DURATION / 50), 100));
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  return (
    <div className="store-shell">
      <div className="store-shell__bg" />
      <Navbar
        navLinks={navLinks}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((open) => !open)}
      />

      <main className="store-main">
        {/* Hero Slideshow */}
        <section className="hero-slideshow">
          <div className="hero-slideshow__slides">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`hero-slideshow__slide ${index === activeSlide ? 'hero-slideshow__slide--active' : ''}`}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="hero-slideshow__overlay" />
                <div className="hero-slideshow__content">
                  <span className="hero-slideshow__eyebrow">{slide.eyebrow}</span>
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                  <div className="hero-slideshow__meta">
                    <span className="hero-slideshow__price">{slide.price}</span>
                    <span className="hero-slideshow__tag">{slide.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="hero-slideshow__progress-bar">
            <div className="hero-slideshow__progress-fill" style={{ width: `${progress}%` }} />
          </div>

          {/* Navigation dots */}
          <div className="hero-slideshow__dots">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                className={`hero-slideshow__dot ${index === activeSlide ? 'hero-slideshow__dot--active' : ''}`}
                onClick={() => { setActiveSlide(index); setProgress(0); }}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            className="hero-slideshow__arrow hero-slideshow__arrow--prev"
            onClick={() => { setActiveSlide((p) => (p - 1 + heroSlides.length) % heroSlides.length); setProgress(0); }}
          >
            ‹
          </button>
          <button
            className="hero-slideshow__arrow hero-slideshow__arrow--next"
            onClick={() => { setActiveSlide((p) => (p + 1) % heroSlides.length); setProgress(0); }}
          >
            ›
          </button>
        </section>

        {/* Stats Bar */}
        <section className="stats-bar" aria-label="Store highlights">
          <article className="stats-bar__item">
            <strong>120+</strong>
            <span>Live offers</span>
          </article>
          <article className="stats-bar__item">
            <strong>48K</strong>
            <span>Community picks</span>
          </article>
          <article className="stats-bar__item">
            <strong>36</strong>
            <span>New this week</span>
          </article>
        </section>

        {/* News Section */}
        <AnimatedSection className="section" delay={0}>
          <SectionHeader eyebrow="Platform Feed" title="Latest News & Updates" />
          <div className="home-news-grid">
            {newsItems.slice(0, 3).map((item) => (
              <article key={item.id} className="home-news-card">
                <div className="home-news-card__image" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="home-news-card__content">
                  <div className="home-news-card__meta">
                    <span className="home-news-card__category">{item.category}</span>
                    <span className="home-news-card__date">{item.date}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <a className="section__action" href="/news" style={{ display: 'inline-flex' }}>
              View All News →
            </a>
          </div>
        </AnimatedSection>

        {/* Categories */}
        <AnimatedSection className="section" delay={150}>
          <SectionHeader eyebrow="Discover Faster" title="Browse by Category" />
          <div className="category-pills">
            {['Action', 'RPG', 'Strategy', 'Survival', 'Sandbox', 'FPS', 'MOBA', 'Open World'].map((cat) => (
              <a key={cat} className="category-pill" href="/store">
                {cat}
              </a>
            ))}
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
