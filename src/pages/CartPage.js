import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import GameCard from '../components/GameCard';
import '../App.css';

function CartPage() {
  const { items, removeFromCart, clearCart, total, count } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="store-shell">
        <div className="store-shell__bg" />
        <main className="store-main">
          <section className="section cart-empty">
            <h2>Your cart is empty</h2>
            <p>Browse the store and add games you'd like to purchase.</p>
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
        <section className="section cart-page">
          <div className="cart-header">
            <h2>Shopping Cart</h2>
            <span className="cart-count">{count} item{count !== 1 ? 's' : ''}</span>
          </div>

          <div className="cart-layout">
            <div className="cart-items">
              {items.map((game) => (
                <article key={game.title} className="cart-item">
                  <div className="cart-item__image" style={{ backgroundImage: `url(${game.image})` }} />
                  <div className="cart-item__info">
                    <span className="cart-item__genre">{game.genre || game.badge || 'Game'}</span>
                    <h3>{game.title}</h3>
                  </div>
                  <div className="cart-item__actions">
                    <strong className="cart-item__price">{game.price}</strong>
                    <button
                      className="cart-item__remove"
                      onClick={() => removeFromCart(game.title)}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="cart-summary">
              <h3>Order Summary</h3>
              <div className="cart-summary__row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="cart-summary__row">
                <span>Tax (estimated)</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
              <div className="cart-summary__divider" />
              <div className="cart-summary__row cart-summary__total">
                <span>Total</span>
                <span>${(total * 1.1).toFixed(2)}</span>
              </div>
              <button className="cart-summary__checkout" onClick={() => alert('Checkout simulated!')}>
                Proceed to Checkout
              </button>
              <button className="cart-summary__clear" onClick={clearCart}>
                Clear Cart
              </button>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CartPage;
