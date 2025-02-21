import { DollarSign, Shield, Timer, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReactNode, useState } from "react"

interface CreateTransactionFormProps {
  description?: ReactNode
  showFeatures?: boolean
  onSubmit?: (data: {
    walletAddress: string
    amount: string
    currency: string
  }) => void
}

export function CreateTransactionForm({ 
  description = "Enter your details to purchase USDT",
  showFeatures = true,
  onSubmit 
}: CreateTransactionFormProps) {
  const [currency, setCurrency] = useState('TTD')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    if (onSubmit) {
      onSubmit({
        walletAddress: formData.get('walletAddress') as string,
        amount: formData.get('amount') as string,
        currency: currency
      })
    }
  }

  return (
    <Card className="mx-auto max-w-2xl border-slate-800 bg-slate-900/90 shadow-lg backdrop-blur">
      <CardHeader>
        <CardTitle className="text-slate-100">Create Transaction</CardTitle>
        <CardDescription className="text-slate-400">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="walletAddress" className="text-slate-200">
                USDT Wallet Address
              </Label>
              <div className="relative">
                <Wallet className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="walletAddress"
                  name="walletAddress"
                  className="border-slate-800 bg-slate-950 pl-9 text-slate-200 placeholder:text-slate-500"
                  placeholder="Enter your USDT wallet address"
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label className="text-slate-200">Amount</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="number"
                    name="amount"
                    placeholder="0.00"
                    className="border-slate-800 bg-slate-950 pl-9 text-slate-200 placeholder:text-slate-500"
                    required
                  />
                </div>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="border-slate-800 bg-slate-950 text-slate-200">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="border-slate-800 bg-slate-950 text-slate-200">
                    <SelectItem value="TTD">TTD</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-slate-400">You will receive USDT at the current market rate</p>
            </div>

            {showFeatures && (
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  <div>
                    <h3 className="font-medium text-slate-200">Secure</h3>
                    <p className="text-sm text-slate-400">Protected transactions</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                  <Timer className="h-5 w-5 text-emerald-400" />
                  <div>
                    <h3 className="font-medium text-slate-200">Fast</h3>
                    <p className="text-sm text-slate-400">Quick processing</p>
                  </div>
                </div>
              </div>
            )}

            <Button 
              type="submit"
              style={{
                backgroundColor: '#00FFA3',
                color: '#000',
                fontWeight: 500,
              }}
              className="w-full bg-emerald-500 text-white hover:bg-[#00FFA3]/90"
            >
              Create Transaction
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
