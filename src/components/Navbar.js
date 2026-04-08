import BurgerMenu from './BurgerMenu';

function Navbar({ navLinks, onToggleMenu, isMenuOpen }) {
  return (
    <>
      <header className="topbar">
        <a className="topbar__logo" href="#hero" aria-label="NovaPlay home">
          <span className="topbar__logo-mark">N</span>
          <div>
            <strong>NovaPlay</strong>
            <span>Game Store</span>
          </div>
        </a>

        <nav className="topbar__nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="topbar__actions">
          <label className="topbar__search" aria-label="Search games">
            <span>⌕</span>
            <input type="text" placeholder="Search games, genres, creators" />
          </label>

          <a className="topbar__profile" href="#recommendations">
            Sign In
          </a>

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
