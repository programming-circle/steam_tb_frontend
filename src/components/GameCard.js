import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import '../App.css';

function GameCard({ game, showSubtitle = true }) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const slug = game.slug || game.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const inCart = isInCart(game.title);
  const inWish = isInWishlist(game.title);

  return (
    <article className="game-card game-card--grid">
      <Link to={`/game/${slug}`} className="game-card__image-link">
        <div className="game-card__image" style={{ backgroundImage: `url(${game.image})` }} />
      </Link>
      <div className="game-card__content">
        <span className="game-card__genre">{game.genre || game.badge}</span>
        <Link to={`/game/${slug}`} className="game-card__title-link">
          <h3>{game.title}</h3>
        </Link>
        {showSubtitle && game.subtitle && <p>{game.subtitle}</p>}
        <div className="game-card__footer">
          <strong>{game.price}</strong>
          <div className="game-card__buttons">
            <button
              className={`game-card__wish-btn ${inWish ? 'game-card__wish-btn--active' : ''}`}
              onClick={() => toggleWishlist(game)}
              title={inWish ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {inWish ? '♥' : '♡'}
            </button>
            {!inCart ? (
              <button className="game-card__cart-btn" onClick={() => addToCart(game)} title="Add to cart">
                🛒
              </button>
            ) : (
              <span className="game-card__in-cart" title="Already in cart">✓</span>
            )}
            <Link className="game-card__button" to={`/game/${slug}`}>
              View
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default GameCard;
