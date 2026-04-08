function BurgerMenu({ navLinks, isOpen, onClose }) {
  return (
    <aside className={`mobile-drawer ${isOpen ? 'mobile-drawer--open' : ''}`}>
      <div className="mobile-drawer__panel">
        <div className="mobile-drawer__header">
          <span>Browse Store</span>
          <button type="button" onClick={onClose} aria-label="Close menu">
            ✕
          </button>
        </div>

        <nav className="mobile-drawer__nav" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={onClose}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default BurgerMenu;
