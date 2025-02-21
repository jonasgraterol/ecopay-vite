import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Plus, Trash2 } from "lucide-react"

interface PaymentMethod {
  id: string
  type: 'bank' | 'card'
  name: string
  lastFour: string
  isDefault: boolean
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'bank',
    name: 'Republic Bank',
    lastFour: '4321',
    isDefault: true
  },
  {
    id: '2',
    type: 'bank',
    name: 'First Citizens',
    lastFour: '8765',
    isDefault: false
  }
]

export function PaymentMethods() {
  return (
    <Card className="border-slate-800 bg-slate-900/90 shadow-lg backdrop-blur">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold text-slate-100">Payment Methods</CardTitle>
          <CardDescription className="text-slate-400">Manage your payment methods</CardDescription>
        </div>
        <Button
          size="sm"
          style={{
            backgroundColor: '#00FFA3',
            color: '#000',
            fontWeight: 500,
          }}
          className="hover:bg-[#00FFA3]/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockPaymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-emerald-500/10 p-2 text-[#00FFA3]">
                  <CreditCard />
                </div>
                <div>
                  <p className="font-medium text-slate-200">
                    {method.name}
                    {method.isDefault && (
                      <span className="ml-2 rounded-full bg-[#00FFA3]/10 px-2 py-1 text-xs text-[#00FFA3]">
                        Default
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-slate-400">**** {method.lastFour}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!method.isDefault && (
                  <Button
                    size="sm"
                    style={{
                      backgroundColor: '#00FFA3',
                      color: '#000',
                      fontWeight: 500,
                    }}
                    className="hover:bg-[#00FFA3]/90"
                  >
                    Make Default
                  </Button>
                )}
                <Button 
                  variant="outline"
                  size="icon"
                  className="border-red-800/50 bg-transparent text-red-400 hover:bg-red-950 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
