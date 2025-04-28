import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginView } from '@/components/auth/LoginView'

export const Route = createFileRoute('/auth/login')({
  component: LoginView,
  beforeLoad: () => {
    // Redirect to dashboard - login functionality is disabled
    return redirect({ to: '/' })
  }
})
