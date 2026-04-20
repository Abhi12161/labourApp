import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password, type, options = {}) => {
    const mockUser = {
      id: 1,
      name: type === 'consumer' ? 'Rahul Kumar' : 'Ramesh Sharma',
      email,
      phone: '+91 9876543210',
      type,
      location: options.location || 'Muzaffarpur',
      ...(type === 'laborer' && {
        skills: options.skills || ['Raj Mistri', 'Construction'],
        experience: options.experience ?? 5,
        rating: 4.7,
      }),
    };

    setUser(mockUser);
  };

  const signup = (data) => {
    setUser(data);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
