import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnimatedSection from '../components/AnimatedSection';
import Footer from '../components/Footer';
import GameCard from '../components/GameCard';
import SectionHeader from '../components/SectionHeader';
import { navLinks } from '../data/storeData';
import '../App.css';

const API_URL =
  process.env.REACT_APP_API_URL || '/api/Game/get-all-games';

const normalizeGame = (game, index) => {
  const title = game.title || game.name || game.gameTitle || `Game ${index + 1}`;
  return {
    id: game.id || game.gameId || index,
    title,
    slug: game.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    price:
      typeof game.price === 'number'
        ? `$${game.price.toFixed(2)}`
        : game.price || game.cost || game.finalPrice || '$0.00',
    genre: game.genre || game.category || game.tag || 'Game',
    description: game.description || game.about || 'An immersive gaming experience.',
    developer: game.developer || '',
    publisher: game.publisher || '',
    releaseDate: game.releaseDate || '',
    tags: game.tags || [],
    image:
      game.image || game.imageUrl || game.headerImage || game.thumbnail || game.coverImage || ''
  };
};

function StorePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [allGames, setAllGames] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Fetch from backend
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`API ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        const gamesArray = Array.isArray(data) ? data : data.items || data.games || data.data || [];
        setAllGames(gamesArray.map(normalizeGame));
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Failed to load games:', err);
          setAllGames([]);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

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

          <p className="store-count">
            {loading ? 'Loading...' : `${filteredGames.length} game${filteredGames.length !== 1 ? 's' : ''} found`}
          </p>
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
