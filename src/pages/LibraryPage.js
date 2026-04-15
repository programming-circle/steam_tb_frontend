import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnimatedSection from '../components/AnimatedSection';
import Footer from '../components/Footer';
import GameCard from '../components/GameCard';
import SectionHeader from '../components/SectionHeader';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { navLinks } from '../data/storeData';
import '../App.css';

const API_URL =
  process.env.REACT_APP_API_URL || '/api/Game/get-all-games';

const normalizeGame = (game, index) => ({
  id: game.id || game.gameId || index,
  title: game.title || game.name || game.gameTitle || `Game ${index + 1}`,
  slug: game.slug || (game.title || game.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  price:
    typeof game.price === 'number'
      ? `$${game.price.toFixed(2)}`
      : game.price || game.cost || game.finalPrice || '$0.00',
  genre: game.genre || game.category || game.tag || 'Game',
  description: game.description || game.about || '',
  image:
    game.image ||
    game.imageUrl ||
    game.headerImage ||
    game.thumbnail ||
    game.coverImage ||
    ''
});

function LibraryPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [libraryGames, setLibraryGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

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
        if (!response.ok) throw new Error(`API ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!isMounted) return;
        const gamesArray = Array.isArray(data) ? data : data.items || data.games || data.data || [];
        setLibraryGames(gamesArray.map(normalizeGame));
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Failed to load library:', err);
          setLibraryGames([]);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  const filteredGames = filter
    ? libraryGames.filter(
        (game) =>
          game.title.toLowerCase().includes(filter.toLowerCase()) ||
          (game.genre && game.genre.toLowerCase().includes(filter.toLowerCase()))
      )
    : libraryGames;

  if (!user) return null;

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
          <SectionHeader eyebrow="Your Collection" title="Game Library" />

          <div className="library-controls">
            <label className="library-search" aria-label="Search library">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search your library..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </label>
          </div>

          {loading ? (
            <p className="library-loading">Loading your library...</p>
          ) : (
            <div className="games-grid">
              {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                  <GameCard key={game.title} game={game} showSubtitle={false} />
                ))
              ) : (
                <p className="library-empty">No games found matching "{filter}"</p>
              )}
            </div>
          )}
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
}

export default LibraryPage;
