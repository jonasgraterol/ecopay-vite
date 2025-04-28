import { createFileRoute, redirect } from '@tanstack/react-router'
import { RegisterView } from '@/components/auth/RegisterView'

export const Route = createFileRoute('/auth/register')({
  component: RegisterView,
  beforeLoad: () => {
    // Redirect to dashboard - login functionality is disabled
    return redirect({ to: '/' })
  }
})
