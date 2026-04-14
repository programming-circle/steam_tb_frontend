import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnimatedSection from '../components/AnimatedSection';
import Footer from '../components/Footer';
import GameCard from '../components/GameCard';
import SectionHeader from '../components/SectionHeader';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { gameCards, navLinks } from '../data/storeData';
import '../App.css';

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
        if (!response.ok) throw new Error('Failed to load library games');
        return response.json();
      })
      .then((data) => {
        if (!isMounted) return;
        const gamesArray = Array.isArray(data) ? data : data.items || data.games || [];
        setLibraryGames(gamesArray.map(normalizeGame));
      })
      .catch(() => {
        if (isMounted) {
          setLibraryGames(gameCards.map(normalizeGame));
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
