import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

interface Transaction {
  id: string
  type: 'Buy' | 'Sell'
  amount: number
  usdt: number
  status: 'Completed' | 'Pending'
  date: string
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'Buy',
    amount: 1000.00,
    usdt: 950.25,
    status: 'Completed',
    date: '2/19/2024'
  },
  {
    id: '2',
    type: 'Buy',
    amount: 500.00,
    usdt: 475.50,
    status: 'Pending',
    date: '2/18/2024'
  },
  {
    id: '3',
    type: 'Buy',
    amount: 2000.00,
    usdt: 1900.75,
    status: 'Completed',
    date: '2/17/2024'
  }
]

export function TransactionList() {
  return (
    <Card className="border-slate-800 bg-slate-900/90 shadow-lg backdrop-blur">
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
              {mockTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-t border-slate-800">
                  <td className="py-4">{transaction.date}</td>
                  <td>{transaction.type}</td>
                  <td className="text-right">{transaction.amount.toFixed(2)}</td>
                  <td className="text-right">{transaction.usdt.toFixed(2)}</td>
                  <td className="text-right">
                    <span className={`inline-block rounded-full px-3 py-1 text-sm ${
                      transaction.status === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-400'
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
