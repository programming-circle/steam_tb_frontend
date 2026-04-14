import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { navLinks, gameCards } from '../data/storeData';
import '../App.css';

const API_URL =
  process.env.REACT_APP_API_URL || 'https://localhost:7219/api/Game/get-all-games';

const makeSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const normalizeGame = (game, index) => {
  const title = game.title || game.name || game.gameTitle || `Game ${index + 1}`;
  return {
    title,
    slug: makeSlug(title),
    price:
      typeof game.price === 'number'
        ? `$${game.price.toFixed(2)}`
        : game.price || game.cost || game.finalPrice || '$19.99',
    genre: game.genre || game.category || game.tag || 'Featured',
    description:
      game.description ||
      game.about ||
      'An immersive gaming experience with stunning visuals, engaging gameplay, and a vibrant community.',
    developer: game.developer || 'NovaPlay Studios',
    publisher: game.publisher || 'NovaPlay Interactive',
    releaseDate: game.releaseDate || '2026',
    tags: game.tags || ['Action', 'Adventure', 'Multiplayer'],
    image:
      game.image ||
      game.imageUrl ||
      game.headerImage ||
      game.thumbnail ||
      gameCards[index % gameCards.length].image
  };
};

// Pre-compute local games once
const LOCAL_GAMES = gameCards.map(normalizeGame);

function GameDetailPage() {
  const { title: slug } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  useEffect(() => {
    let isMounted = true;

    // First try local games immediately
    const localFound = LOCAL_GAMES.find((g) => g.slug === slug);
    if (localFound) {
      setGame(localFound);
    }

    // Then try to fetch from backend
    fetch(API_URL, { signal: AbortSignal.timeout(4000) })
      .then((res) => {
        if (!res.ok) throw new Error('API unavailable');
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        const gamesArray = Array.isArray(data) ? data : data.items || data.games || [];
        const allGames = gamesArray.map(normalizeGame);
        const found = allGames.find((g) => g.slug === slug);
        if (found) setGame(found);
      })
      .catch(() => {});

    return () => { isMounted = false; };
  }, [slug]);

  if (!game) {
    return (
      <div className="store-shell">
        <div className="store-shell__bg" />
        <main className="store-main">
          <section className="section" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h2>Game not found</h2>
            <p>The game you're looking for doesn't exist.</p>
            <button className="hero__cta" onClick={() => navigate('/store')}>Back to Store</button>
          </section>
        </main>
      </div>
    );
  }

  const inCart = isInCart(game.title);
  const inWish = isInWishlist(game.title);

  return (
    <div className="store-shell">
      <div className="store-shell__bg" />
      <Navbar
        navLinks={navLinks}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((open) => !open)}
      />

      <main className="store-main">
        <AnimatedSection className="section game-detail">
          <div className="game-detail__hero" style={{ backgroundImage: `url(${game.image})` }}>
            <div className="game-detail__overlay" />
          </div>

          <div className="game-detail__info">
            <span className="game-detail__genre">{game.genre}</span>
            <h1>{game.title}</h1>
            <p className="game-detail__description">{game.description}</p>

            <div className="game-detail__actions">
              {!inCart ? (
                <button className="hero__cta game-detail__buy" onClick={() => addToCart(game)}>
                  Add to Cart — {game.price}
                </button>
              ) : (
                <button className="hero__cta game-detail__in-cart" disabled>
                  ✓ In Cart
                </button>
              )}
              <button
                className={`hero__cta game-detail__wish ${inWish ? 'game-detail__wish--active' : ''}`}
                onClick={() => toggleWishlist(game)}
              >
                {inWish ? '♥ In Wishlist' : '♡ Wishlist'}
              </button>
            </div>
          </div>

          <div className="game-detail__meta">
            <div className="game-detail__meta-item">
              <strong>Developer</strong>
              <span>{game.developer}</span>
            </div>
            <div className="game-detail__meta-item">
              <strong>Publisher</strong>
              <span>{game.publisher}</span>
            </div>
            <div className="game-detail__meta-item">
              <strong>Release Date</strong>
              <span>{game.releaseDate}</span>
            </div>
            <div className="game-detail__meta-item">
              <strong>Tags</strong>
              <div className="game-detail__tags">
                {game.tags.map((tag) => (
                  <span key={tag} className="game-detail__tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
}

export default GameDetailPage;
