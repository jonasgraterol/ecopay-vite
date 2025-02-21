import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { useAuth } from '@/lib/auth/auth-context'

export const Route = createFileRoute('/dashboard/_layout')({
  beforeLoad: async () => {
    const auth = useAuth()
    if (!auth.isAuthenticated) {
      throw redirect({
        to: '/auth/login',
      })
    }
  },
  component: () => <Outlet />,
})
