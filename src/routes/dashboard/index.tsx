import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/lib/auth/auth-context'
import { Bitcoin, LogOut, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TransactionList } from '@/components/dashboard/TransactionList'
import { PaymentMethods } from '@/components/dashboard/PaymentMethods'
import { CreateTransactionForm } from '@/components/transactions/CreateTransactionForm'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardView,
})

function DashboardView() {
  const { logout, user } = useAuth()

  const displayName = user?.name || user?.email || 'User'

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 to-black text-white">
      <nav className="border-b border-slate-800 bg-slate-900/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-emerald-500/10 p-2">
              <Bitcoin className="h-6 w-6 text-[#00FFA3]" />
            </div>
            <h1 className="text-xl font-bold text-slate-100">EcoPay</h1>
          </div>
          <Button
            onClick={logout}
            size="sm"
            style={{
              backgroundColor: '#00FFA3',
              color: '#000',
              fontWeight: 500,
            }}
            className="hover:bg-[#00FFA3]/90"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Hi, {displayName}! 👋</h1>
            <p className="text-slate-400">Welcome back to your dashboard</p>
          </div>
          <Button
            size="lg"
            style={{
              backgroundColor: '#00FFA3',
              color: '#000',
              fontWeight: 500,
            }}
            className="hover:bg-[#00FFA3]/90"
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
