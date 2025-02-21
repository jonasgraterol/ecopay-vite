import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Router } from './lib/router'
import { AuthProvider } from './lib/auth/auth-context'
import { QueryProvider } from './lib/query-provider'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <Router />
        <Toaster
          theme="dark"
          position="top-right"
          richColors
        />
      </AuthProvider>
    </QueryProvider>
  </StrictMode>,
)
