import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import GameCard from '../components/GameCard';
import '../App.css';

function WishlistPage() {
  const { items, removeFromWishlist, count } = useWishlist();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="store-shell">
        <div className="store-shell__bg" />
        <main className="store-main">
          <section className="section wishlist-empty">
            <h2>Your wishlist is empty</h2>
            <p>Save games you're interested in and get notified about sales.</p>
            <button className="hero__cta" onClick={() => navigate('/')}>
              Browse Store
            </button>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="store-shell">
      <div className="store-shell__bg" />
      <main className="store-main">
        <section className="section">
          <div className="wishlist-header">
            <h2>My Wishlist</h2>
            <span className="wishlist-count">{count} item{count !== 1 ? 's' : ''}</span>
          </div>

          <div className="games-grid">
            {items.map((game) => (
              <div key={game.title} className="wishlist-card-wrapper">
                <GameCard game={game} buttonLabel="Add to Cart" buttonHref="/cart" />
                <button
                  className="wishlist-remove"
                  onClick={() => removeFromWishlist(game.title)}
                >
                  ✕ Remove
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default WishlistPage;
