import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('novaplay_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('novaplay_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('novaplay_user');
    }
  }, [user]);

  const login = (email, password) => {
    // Simulated auth — replace with real API call
    const mockUser = {
      id: '1',
      displayName: email.split('@')[0],
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      level: 42,
      gamesOwned: 156,
      hoursPlayed: '1,247',
      achievements: 89
    };
    setUser(mockUser);
    return mockUser;
  };

  const register = (displayName, email, password) => {
    const mockUser = {
      id: Date.now().toString(),
      displayName,
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=34f2de&color=021116&size=200`,
      level: 1,
      gamesOwned: 0,
      hoursPlayed: '0',
      achievements: 0
    };
    setUser(mockUser);
    return mockUser;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
