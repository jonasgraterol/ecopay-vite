import { createFileRoute } from '@tanstack/react-router'
import { LoginView } from '@/components/auth/LoginView'

export const Route = createFileRoute('/auth/login')({
  component: LoginView,
})
