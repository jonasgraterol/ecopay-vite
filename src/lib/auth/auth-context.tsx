import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { router } from '../router';
import { authService } from '@/services/auth';

interface RegisterData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  // Check for existing authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('feathers-jwt');
    if (token) {
      authService.getCurrentUser()
        .then(user => {
          setUser(user);
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem('feathers-jwt');
          setIsAuthenticated(false);
          setUser(null);
        });
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await authService.signIn({ email, password });
      if (response.accessToken) {
        localStorage.setItem('feathers-jwt', response.accessToken);
      }
      setUser(response.user);
      setIsAuthenticated(true);
      router.navigate({ to: '/dashboard' });
    } catch (error) {
      // Only reset auth state if the token is invalid
      if (error instanceof Error && error.message.includes('401')) {
        localStorage.removeItem('feathers-jwt');
        setUser(null);
        setIsAuthenticated(false);
      }
      throw error;
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      const user = await authService.signUp({
        email: data.email,
        password: data.password,
        name: data.name || '',
        phone: data.phone || '',
      });
      setUser(user);
      setIsAuthenticated(true);
      login(data.email, data.password);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('feathers-jwt');
    setIsAuthenticated(false);
    setUser(null);
    router.navigate({ to: '/auth/login' });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
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
