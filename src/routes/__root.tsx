import { Outlet, createRootRoute } from '@tanstack/react-router'
import { AuthProvider } from '@/lib/auth/auth-context'

export interface AuthContext {
  auth: {
    isAuthenticated: boolean;
  };
}

export const Route = createRootRoute<AuthContext>({
  component: () => (
    <AuthProvider>
      <div className="min-h-screen">
        <Outlet />
      </div>
    </AuthProvider>
  ),
})
