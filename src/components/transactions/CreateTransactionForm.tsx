import { CreditCard, DollarSign, Shield, Timer, Wallet } from "lucide-react"
import { useAuth } from "@/lib/auth/auth-context"
import { usePaymentMethods } from "@/hooks/use-payment-methods"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ReactNode, useState } from "react"
import { useCreateTransaction } from "@/hooks/use-transactions"
import { toast } from "sonner"
import { PaymentMethod } from "@/services/payment-methods"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CreateTransactionFormProps {
  description?: ReactNode
  showFeatures?: boolean
  onSubmit?: (data: {
    walletAddress: string
    amount: string
    currency: string
    paymentMethodId: string
  }) => void
}

export function CreateTransactionForm({ 
  description = "Enter your details to purchase USDT",
  showFeatures = true,
  onSubmit 
}: CreateTransactionFormProps) {
  const { user } = useAuth()
  const [currency, setCurrency] = useState('TTD')
  const [paymentMethodId, setPaymentMethodId] = useState('')
  const createTransaction = useCreateTransaction()

  const { data: paymentMethods, isLoading: isLoadingPaymentMethods } = usePaymentMethods({
    $sort: { id: -1 },
    userId: user.id
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    try {
      // Validate form data
      const amount = Number(formData.get('amount'))
      const walletAddress = formData.get('walletAddress') as string

      if (!amount || amount <= 0) {
        toast.error('Please enter a valid amount')
        return
      }

      if (!walletAddress) {
        toast.error('Please enter a wallet address')
        return
      }

      if (!paymentMethodId) {
        toast.error('Please select a payment method')
        return
      }

      // Create transaction
      const result = await createTransaction.mutateAsync({
        amount,
        userId: user.id,
        paymentMethodId: Number(paymentMethodId),
        walletAddress,
        currency
      })

      toast.success('Transaction created successfully')
      
      if (onSubmit) {
        onSubmit({
          walletAddress,
          amount: amount.toString(),
          currency,
          paymentMethodId
        })
      }

      // Reset form
      // e.currentTarget.reset()
      // setPaymentMethodId('')
      // setCurrency('TTD')

    } catch (error: any) {
      console.error('Error creating transaction:', error)
      toast.error(
        error?.response?.data?.message ||
        'Failed to create transaction. Please try again.'
      )
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
              <Label className="text-slate-200">
                Payment Method
              </Label>
              <div className="space-y-2">
                {isLoadingPaymentMethods ? (
                  <div className="text-sm text-slate-400">Loading payment methods...</div>
                ) : !paymentMethods?.total ? (
                  <div className="text-sm text-slate-400">No payment methods available</div>
                ) : (
                  <RadioGroup
                    value={paymentMethodId}
                    onValueChange={setPaymentMethodId}
                    className="space-y-2"
                  >
                    {paymentMethods.data.map((method: PaymentMethod) => (
                      <div
                        key={method.id}
                        className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${paymentMethodId === method.id ? 'border-[#00FFA3] bg-[#00FFA3]/5' : 'border-slate-800 bg-slate-950'}`}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem
                            value={method.id}
                            id={method.id}
                            className="border-slate-600 text-[#00FFA3]"
                          />
                          <div className="grid gap-1">
                            <Label
                              htmlFor={method.id}
                              className="text-base font-medium text-slate-200"
                            >
                              {method.alias}
                            </Label>
                            <div className="text-sm text-slate-400">
                              **** {method.cardNumber.slice(-4)}
                            </div>
                          </div>
                        </div>
                        <CreditCard className="h-4 w-4 text-slate-400" />
                      </div>
                    ))}
                  </RadioGroup>
                )}
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
                opacity: (!paymentMethodId || isLoadingPaymentMethods) ? 0.7 : 1
              }}
              className="w-full bg-emerald-500 text-white hover:bg-[#00FFA3]/90"
              disabled={!paymentMethodId || isLoadingPaymentMethods || createTransaction.isPending}
            >
              {isLoadingPaymentMethods
                ? 'Loading Payment Methods...'
                : createTransaction.isPending
                ? 'Creating Transaction...'
                : 'Create Transaction'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
