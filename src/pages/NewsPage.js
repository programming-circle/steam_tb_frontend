import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AnimatedSection from '../components/AnimatedSection';
import Footer from '../components/Footer';
import { navLinks, newsItems } from '../data/storeData';
import '../App.css';

function NewsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  const categories = ['All', ...new Set(newsItems.map((item) => item.category))];
  const filteredNews = activeFilter === 'All' ? newsItems : newsItems.filter((item) => item.category === activeFilter);

  return (
    <div className="store-shell">
      <div className="store-shell__bg" />
      <Navbar navLinks={navLinks} isMenuOpen={isMenuOpen} onToggleMenu={() => setIsMenuOpen((open) => !open)} />

      <main className="store-main">
        <AnimatedSection className="section" delay={0}>
          <div className="news-page-header">
            <h1>News & Events</h1>
            <p className="news-page-subtitle">Stay up to date with the latest game updates, patches, and community events.</p>
          </div>

          <div className="news-filters">
            {categories.map((cat) => (
              <button key={cat} className={`news-filter ${activeFilter === cat ? 'news-filter--active' : ''}`} onClick={() => setActiveFilter(cat)}>
                {cat}
              </button>
            ))}
          </div>

          <div className="news-page-grid">
            {filteredNews.map((item) => (
              <article key={item.id} className="news-page-card">
                <div className="news-page-card__image" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="news-page-card__content">
                  <div className="news-page-card__meta">
                    <span className="news-page-card__category">{item.category}</span>
                    <span className="news-page-card__date">{item.date}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
}

export default NewsPage;
