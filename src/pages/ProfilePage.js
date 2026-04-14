import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnimatedSection from '../components/AnimatedSection';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { navLinks } from '../data/storeData';
import '../App.css';

function ProfilePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, updateProfile } = useAuth();
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  if (!user) return null;

  const recentActivity = [
    { game: 'Neon Frontier', hours: '3.2h', date: 'Today' },
    { game: 'Skyline Protocol', hours: '1.5h', date: 'Yesterday' },
    { game: 'Eclipse Raiders', hours: '5.8h', date: '2 days ago' }
  ];

  return (
    <div className="store-shell">
      <div className="store-shell__bg" />
      <Navbar
        navLinks={navLinks}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((open) => !open)}
      />

      <main className="store-main">
        <AnimatedSection className="section profile-section" delay={0}>
          <div className="profile-header">
            <img className="profile-avatar" src={user.avatar} alt={user.displayName} />
            <div className="profile-info">
              <h1>{user.displayName}</h1>
              <span className="profile-level">Level {user.level}</span>
            </div>
          </div>

          <div className="profile-stats">
            <article className="profile-stat">
              <strong>{user.gamesOwned}</strong>
              <span>Games Owned</span>
            </article>
            <article className="profile-stat">
              <strong>{user.hoursPlayed}</strong>
              <span>Hours Played</span>
            </article>
            <article className="profile-stat">
              <strong>{user.achievements}</strong>
              <span>Achievements</span>
            </article>
          </div>

          <div className="profile-overview">
            <div className="profile-overview__item">
              <strong>{cartItems.length}</strong>
              <span>In Cart</span>
            </div>
            <div className="profile-overview__item">
              <strong>{wishlistItems.length}</strong>
              <span>Wishlist</span>
            </div>
          </div>

          <div className="profile-activity">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {recentActivity.map((activity) => (
                <article key={activity.game} className="activity-item">
                  <div className="activity-info">
                    <strong>{activity.game}</strong>
                    <span>{activity.hours}</span>
                  </div>
                  <span className="activity-date">{activity.date}</span>
                </article>
              ))}
            </div>
          </div>

          <button className="hero__cta profile-logout" onClick={() => { logout(); navigate('/'); }}>
            Sign Out
          </button>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
}

export default ProfilePage;
