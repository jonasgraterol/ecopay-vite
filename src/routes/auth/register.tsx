import { createFileRoute } from '@tanstack/react-router'
import { RegisterView } from '@/components/auth/RegisterView'

export const Route = createFileRoute('/auth/register')({
  component: RegisterView,
})
