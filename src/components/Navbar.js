import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import BurgerMenu from './BurgerMenu';
import useSmartNav from '../hooks/useSmartNav';
import '../App.css';

function Navbar({ navLinks, onToggleMenu, isMenuOpen }) {
  const scrolled = useSmartNav(60);
  const { user, logout } = useAuth();
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/store?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      if (searchRef.current) searchRef.current.blur();
    }
  };

  return (
    <>
      <header className={`topbar ${scrolled ? 'topbar--scrolled' : ''}`}>
        <Link className="topbar__logo" to="/" aria-label="NovaPlay home">
          <div className="topbar__logo-mark">N</div>
          <div>
            <strong>NovaPlay</strong>
            <span>Game Store</span>
          </div>
        </Link>

        <nav className="topbar__nav" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="topbar__actions">
          <form className="topbar__search" onSubmit={handleSearch}>
            <span className="topbar__search-icon">⌕</span>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search games, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="topbar__search-submit">Go</button>
          </form>

          <Link className="topbar__cart-btn" to="/cart" aria-label="Cart">
            🛒
            {cartCount > 0 && <span className="topbar__cart-badge">{cartCount}</span>}
          </Link>

          <Link className="topbar__wish-btn" to="/wishlist" aria-label="Wishlist">
            ♡
            {wishCount > 0 && <span className="topbar__cart-badge">{wishCount}</span>}
          </Link>

          {user ? (
            <div className="topbar__user-menu">
              <button className="topbar__profile" onClick={() => navigate('/profile')}>
                <img src={user.avatar} alt={user.displayName} className="topbar__avatar" />
                <span>{user.displayName}</span>
              </button>
              <button className="topbar__logout" onClick={() => { logout(); navigate('/'); }}>
                Logout
              </button>
            </div>
          ) : (
            <Link className="topbar__profile" to="/login">
              Sign In
            </Link>
          )}

          <button
            className={`burger-button ${isMenuOpen ? 'burger-button--open' : ''}`}
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={onToggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <BurgerMenu navLinks={navLinks} isOpen={isMenuOpen} onClose={onToggleMenu} />
    </>
  );
}

export default Navbar;
