import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import CategoryPills from './components/CategoryPills';
import Footer from './components/Footer';
import GameCard from './components/GameCard';
import HeroSection from './components/HeroSection';
import NewsGrid from './components/NewsGrid';
import SectionHeader from './components/SectionHeader';
import {
  categories,
  heroSlides,
  navLinks,
  newsItems
} from './data/storeData';

const API_URL =
  process.env.REACT_APP_API_URL || 'https://localhost:7219/api/Game/get-all-games';

const normalizeGame = (game, index) => ({
  id: game.id || game.gameId || index,
  title: game.title || game.name || game.gameTitle || `Game ${index + 1}`,
  slug: game.slug || (game.title || game.name || game.gameTitle || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  price:
    typeof game.price === 'number'
      ? `$${game.price.toFixed(2)}`
      : game.price || game.cost || game.finalPrice || '$0.00',
  genre: game.genre || game.category || game.tag || 'Game',
  image:
    game.image ||
    game.imageUrl ||
    game.headerImage ||
    game.thumbnail ||
    game.coverImage ||
    '',
  description: game.description || game.summary || game.shortDescription || '',
  developer: game.developer || game.developerName || game.creator || '',
  publisher: game.publisher || game.publisherName || '',
  tags: game.tags || game.tagsList || game.labels || []
});

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sliderTimer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(sliderTimer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!isMounted) return;

        console.log('API response:', data);
        const gamesArray = Array.isArray(data) ? data : data.items || data.games || data.data || [];

        if (gamesArray.length === 0) {
          setError('API вернул пустой список игр');
          setGames([]);
        } else {
          setGames(gamesArray.map(normalizeGame));
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Failed to load games:', err);
          setError(`Не удалось загрузить игры: ${err.message}`);
          setGames([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="store-shell">
      <div className="store-shell__bg" />
      <Navbar
        navLinks={navLinks}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((open) => !open)}
      />

      <main className="store-main">
        <HeroSection
          slides={heroSlides}
          activeSlide={activeSlide}
          onSelectSlide={setActiveSlide}
        />

        <section className="section" id="catalog">
          <SectionHeader
            eyebrow="Store Shelf"
            title={loading ? 'Загрузка...' : 'Trending Right Now'}
          />

          {loading && <p className="loading-text">Загрузка игр из каталога...</p>}

          {error && !loading && (
            <div className="error-banner">
              <p>{error}</p>
              <p className="error-hint">Убедитесь, что бэкенд запущен и CORS настроен правильно</p>
            </div>
          )}

          {!loading && games.length > 0 && (
            <div className="games-grid">
              {games.map((game) => (
                <GameCard key={game.id || game.title} game={game} />
              ))}
            </div>
          )}

          {!loading && games.length === 0 && !error && (
            <p className="empty-message">Каталог пуст</p>
          )}
        </section>

        <section className="section" id="categories">
          <SectionHeader
            eyebrow="Discover Faster"
            title="Browse by Category"
          />
          <CategoryPills items={categories} />
        </section>

        <section className="section" id="news">
          <SectionHeader eyebrow="Platform Feed" title="News & Events" />
          <NewsGrid items={newsItems} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
