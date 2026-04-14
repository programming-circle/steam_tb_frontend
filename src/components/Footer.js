import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>NovaPlay</strong>
        <p>Discover premium releases, curated collections, and community-driven recommendations.</p>
      </div>
      <div className="footer__links">
        <Link to="/">Store</Link>
        <Link to="/library">Library</Link>
        <Link to="/news">News</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <div className="footer__credit">
        <span>Made by <strong>TripleBrain</strong></span>
      </div>
    </footer>
  );
}

export default Footer;
