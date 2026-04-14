import { useEffect, useMemo, useState } from 'react';
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
  gameCards,
  heroSlides,
  navLinks,
  newsItems
} from './data/storeData';

const API_URL =
  process.env.REACT_APP_API_URL || 'https://localhost:7219/api/Game/get-all-games';

const normalizeGame = (game, index) => ({
  title: game.title || game.name || game.gameTitle || `Game ${index + 1}`,
  price:
    typeof game.price === 'number'
      ? `$${game.price.toFixed(2)}`
      : game.price || game.cost || game.finalPrice || '$19.99',
  genre: game.genre || game.category || game.tag || 'Featured',
  image:
    game.image ||
    game.imageUrl ||
    game.headerImage ||
    game.thumbnail ||
    gameCards[index % gameCards.length].image
});

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [backendGames, setBackendGames] = useState([]);
  const [loading, setLoading] = useState(true);

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

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load local backend games');
        }

        return response.json();
      })
      .then((data) => {
        if (!isMounted) {
          return;
        }

        const gamesArray = Array.isArray(data) ? data : data.items || data.games || [];
        setBackendGames(gamesArray.map(normalizeGame));
      })
      .catch(() => {
        if (isMounted) {
          setBackendGames([]);
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

  const spotlightStats = useMemo(
    () => [
      { label: 'Live offers', value: '120+' },
      { label: 'Community picks', value: '48K' },
      { label: 'New this week', value: '36' }
    ],
    []
  );

  const storefrontGames = backendGames.length > 0 ? backendGames : gameCards;

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

        <section className="stats-bar" aria-label="Store highlights">
          {spotlightStats.map((stat) => (
            <article key={stat.label} className="stats-bar__item">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </section>

        <section className="section" id="catalog">
          <SectionHeader
            eyebrow="Store Shelf"
            title={loading ? 'Loading...' : 'Trending Right Now'}
          />
          <div className="games-grid">
            {storefrontGames.map((game) => (
              <GameCard key={game.title} game={game} />
            ))}
          </div>
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
