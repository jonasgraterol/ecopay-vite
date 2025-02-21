import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

interface Transaction {
  id: string
  type: 'send' | 'receive'
  amount: number
  currency: string
  status: 'completed' | 'pending' | 'failed'
  date: string
  description: string
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'send',
    amount: 1000,
    currency: 'TTD',
    status: 'completed',
    date: '2024-02-20',
    description: 'Payment to John Doe'
  },
  {
    id: '2',
    type: 'receive',
    amount: 500,
    currency: 'USDT',
    status: 'completed',
    date: '2024-02-19',
    description: 'Payment from Jane Smith'
  },
  {
    id: '3',
    type: 'send',
    amount: 750,
    currency: 'TTD',
    status: 'pending',
    description: 'Payment to Alice Johnson',
    date: '2024-02-18'
  }
]

export function TransactionList() {
  return (
    <Card className="border-slate-800 bg-slate-900/90 shadow-lg backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-100">Recent Transactions</CardTitle>
        <CardDescription className="text-slate-400">Your latest payment activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-4"
            >
              <div className="flex items-center gap-4">
                <div className={`rounded-full p-2 ${
                  transaction.type === 'receive' 
                    ? 'bg-emerald-500/10 text-[#00FFA3]' 
                    : 'bg-red-500/10 text-red-400'
                }`}>
                  {transaction.type === 'receive' ? <ArrowDownIcon /> : <ArrowUpIcon />}
                </div>
                <div>
                  <p className="font-medium text-slate-200">{transaction.description}</p>
                  <p className="text-sm text-slate-400">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  transaction.type === 'receive' 
                    ? 'text-[#00FFA3]' 
                    : 'text-red-400'
                }`}>
                  {transaction.type === 'receive' ? '+' : '-'} {transaction.amount} {transaction.currency}
                </p>
                <p className={`text-sm ${
                  transaction.status === 'completed' 
                    ? 'text-[#00FFA3]' 
                    : transaction.status === 'pending' 
                    ? 'text-yellow-400' 
                    : 'text-red-400'
                }`}>
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
