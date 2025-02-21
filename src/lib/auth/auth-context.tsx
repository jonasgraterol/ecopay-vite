import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { router } from '../router';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    // TODO: Implement actual authentication logic here
    console.log('Login attempt with email:', email, 'and password:', password);
    setIsAuthenticated(true);
    router.navigate({ to: '/dashboard' });
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    router.navigate({ to: '/auth/login' });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
