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

      <aside className={`mobile-drawer ${isMenuOpen ? 'mobile-drawer--open' : ''}`}>
        <div className="mobile-drawer__panel">
          <div className="mobile-drawer__header">
            <span>Browse Store</span>
            <button type="button" onClick={onToggleMenu} aria-label="Close menu">
              ✕
            </button>
          </div>

          <nav className="mobile-drawer__nav" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={onToggleMenu}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
