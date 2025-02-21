import { createRouter, RouterProvider } from '@tanstack/react-router'
import { useAuth } from './auth/auth-context'

// Import the generated route tree
import { routeTree } from '../routeTree.gen'

export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // Will be provided by RouterProvider
  },
  defaultPreload: 'intent',
  defaultErrorComponent: ({ error }) => {
    console.error(error)
    return <div>Error: {error.message}</div>
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function Router() {
  const auth = useAuth()
  
  return (
    <RouterProvider 
      router={router} 
      context={{ auth }}
    />
  )
}
