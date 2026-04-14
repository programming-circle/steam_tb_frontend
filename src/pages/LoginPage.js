import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields'); return; }
    login(email, password);
    navigate('/profile');
  };

  return (
    <div className="auth-page">
      <div className="auth-shell__bg" />
      <main className="auth-main">
        <div className="auth-card">
          <Link to="/" className="auth-logo">
            <img src="https://via.placeholder.com/40x40/34f2de/021116?text=N" alt="NovaPlay" className="auth-logo-img" />
            <strong>NovaPlay</strong>
          </Link>

          <h2>Sign In</h2>
          <p className="auth-subtitle">Welcome back to your library</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label htmlFor="login-email">Email</label>
              <input id="login-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="auth-field">
              <label htmlFor="login-password">Password</label>
              <input id="login-password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="auth-submit">Sign In</button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
          <p className="auth-back">
            <Link to="/">← Back to Home</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
