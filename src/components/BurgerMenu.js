import { Link } from 'react-router-dom';

function BurgerMenu({ navLinks, isOpen, onClose }) {
  return (
    <aside className={`mobile-drawer ${isOpen ? 'mobile-drawer--open' : ''}`}>
      <div className="mobile-drawer__panel">
        <div className="mobile-drawer__header">
          <span>Browse</span>
          <button type="button" onClick={onClose} aria-label="Close menu">✕</button>
        </div>
        <nav className="mobile-drawer__nav" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} onClick={onClose}>{link.label}</Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default BurgerMenu;
