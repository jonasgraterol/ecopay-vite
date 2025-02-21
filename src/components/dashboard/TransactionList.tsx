import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTransactions } from "@/hooks/use-transactions"
import { Transaction } from "@/services/transactions";
import { format } from "date-fns"
import { useAuth } from '@/lib/auth/auth-context'

export function TransactionList() {
  const { user } = useAuth()
  const { data: transactionData, isLoading, error } = useTransactions({
    $sort: { id: -1 },
    $limit: 10,
    userId: user.id
  });

  if (isLoading) {
    return (
      <Card className="transaction-list border-slate-800 bg-slate-900/90 shadow-lg backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-100">Transaction History</CardTitle>
          <CardDescription className="text-slate-400">Loading transactions...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="transaction-list border-slate-800 bg-slate-900/90 shadow-lg backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-100">Transaction History</CardTitle>
          <CardDescription className="text-slate-400 text-red-400">Error loading transactions</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const transactions = transactionData?.data || [];

  return (
    <Card className="transaction-list border-slate-800 bg-slate-900/90 shadow-lg backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-100">Transaction History</CardTitle>
        <CardDescription className="text-slate-400">Your recent transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-sm text-slate-400">
              <tr>
                <th className="pb-4">Date</th>
                <th className="pb-4">Type</th>
                <th className="pb-4 text-right">Amount (TTC)</th>
                <th className="pb-4 text-right">USDT</th>
                <th className="pb-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-200">
              {transactions.map((transaction: Transaction) => (
                <tr key={transaction.id} className="border-t border-slate-800">
                  <td className="py-4">{format(new Date(transaction.createdAt), 'dd/MM/yyyy')}</td>
                  <td>{transaction.currency}</td>
                  <td className="text-right">{Number(transaction.amount).toFixed(2)}</td>
                  <td className="text-right">{Number(transaction.cryptoAmount).toFixed(2)}</td>
                  <td className="text-right">
                    <span className={`inline-block rounded-full px-3 py-1 text-sm ${
                      transaction.status === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : transaction.status === 'Cancelled' ? 'bg-red-500/20 text-red-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
