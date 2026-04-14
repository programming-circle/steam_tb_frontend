import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnimatedSection from '../components/AnimatedSection';
import Footer from '../components/Footer';
import GameCard from '../components/GameCard';
import SectionHeader from '../components/SectionHeader';
import { gameCards, navLinks } from '../data/storeData';
import '../App.css';

const API_URL =
  process.env.REACT_APP_API_URL || 'https://localhost:7219/api/Game/get-all-games';

const normalizeGame = (game, index) => {
  const title = game.title || game.name || game.gameTitle || `Game ${index + 1}`;
  return {
    title,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    price:
      typeof game.price === 'number'
        ? `$${game.price.toFixed(2)}`
        : game.price || game.cost || game.finalPrice || '$19.99',
    genre: game.genre || game.category || game.tag || 'Featured',
    description: game.description || game.about || 'An immersive gaming experience.',
    developer: game.developer || 'NovaPlay Studios',
    publisher: game.publisher || 'NovaPlay Interactive',
    releaseDate: game.releaseDate || '2026',
    tags: game.tags || ['Action', 'Adventure'],
    image:
      game.image || game.imageUrl || game.headerImage || game.thumbnail ||
      gameCards[index % gameCards.length].image
  };
};

function StorePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [allGames, setAllGames] = useState(gameCards.map(normalizeGame));
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activeGenre, setActiveGenre] = useState('All');

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Fetch from backend in background, don't block rendering
  useEffect(() => {
    let isMounted = true;

    fetch(API_URL, { signal: AbortSignal.timeout(5000) })
      .then((res) => {
        if (!res.ok) throw new Error('API unavailable');
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        const gamesArray = Array.isArray(data) ? data : data.items || data.games || [];
        if (gamesArray.length > 0) {
          setAllGames(gamesArray.map(normalizeGame));
        }
      })
      .catch(() => {});

    return () => { isMounted = false; };
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const allGenres = useMemo(() => {
    const genres = new Set(allGames.map((g) => g.genre).filter(Boolean));
    return ['All', ...Array.from(genres)];
  }, [allGames]);

  const filteredGames = useMemo(() => {
    return allGames.filter((game) => {
      const matchesSearch = !searchQuery ||
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (game.genre && game.genre.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesGenre = activeGenre === 'All' || game.genre === activeGenre;
      return matchesSearch && matchesGenre;
    });
  }, [allGames, searchQuery, activeGenre]);

  return (
    <div className="store-shell">
      <div className="store-shell__bg" />
      <Navbar
        navLinks={navLinks}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((open) => !open)}
      />

      <main className="store-main">
        <AnimatedSection className="section" delay={0}>
          <SectionHeader eyebrow="Browse Collection" title="All Games" />

          {/* Search + Filter */}
          <div className="store-controls">
            <label className="store-search" aria-label="Search games">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </label>
            <div className="store-filters">
              {allGenres.slice(0, 8).map((genre) => (
                <button
                  key={genre}
                  className={`store-filter ${activeGenre === genre ? 'store-filter--active' : ''}`}
                  onClick={() => setActiveGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <p className="store-count">{filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''} found</p>
          <div className="games-grid">
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <GameCard key={game.title} game={game} showSubtitle={false} />
              ))
            ) : (
              <p className="library-empty">No games found</p>
            )}
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
}

export default StorePage;
