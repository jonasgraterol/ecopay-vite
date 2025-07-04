import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuth } from '@/lib/auth/auth-context'
import { LogOut, Plus } from 'lucide-react'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { TransactionList } from '@/components/dashboard/TransactionList'
import { PaymentMethods } from '@/components/dashboard/PaymentMethods'
import { CreateTransactionForm } from '@/components/transactions/CreateTransactionForm'
import { Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardView,
  beforeLoad: () => {
    // Redirect to home page - dashboard is disabled
    return redirect({ to: '/' })
  }
})

function DashboardView() {
  const { logout, user } = useAuth()
  if(!user) {
    return <Navigate to="/auth/login" />
  }

  const displayName = user?.name || user?.email || 'User'

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 to-black text-white">
      <nav className="border-b border-slate-800 bg-slate-900/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Logo size="xxs" />
            <h4 className="font-bold text-slate-100">Von-Exchange</h4>
          </div>
          <Button
            onClick={logout}
            size="sm"
            variant="ghost"
            className="text-slate-400 hover:text-slate-100"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-4 sm:flex sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h4 className="font-bold text-slate-100">Hi, {displayName}! 👋</h4>
            <p className="text-slate-400">Welcome back to your dashboard</p>
          </div>
          <Button
            size="lg"
            style={{
              backgroundColor: '#00FFA3',
              color: '#000',
              fontWeight: 500,
            }}
            className="w-full sm:w-auto hover:bg-[#00FFA3]/90"
            onClick={() => {
              const createTransactionForm = document.querySelector('.create-transaction-form')
              if (createTransactionForm) {
                createTransactionForm.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Transaction
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <TransactionList />
            <PaymentMethods />
          </div>
          <div>
            <CreateTransactionForm />
          </div>
        </div>
      </main>
    </div>
  )
}
