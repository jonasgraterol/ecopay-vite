import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Plus, Trash2 } from "lucide-react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { AddPaymentMethodForm } from "@/components/payment-methods/AddPaymentMethodForm"

import { usePaymentMethods, useCreatePaymentMethod, useRemovePaymentMethod } from '@/hooks/use-payment-methods'
import { PaymentMethod } from "@/services/payment-methods"
import { useAuth } from '@/lib/auth/auth-context'

export function PaymentMethods() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const { data: paymentMethods, isLoading } = usePaymentMethods({
    $sort: { id: -1 },
    userId: user.id
  })

  const createPaymentMethod = useCreatePaymentMethod()
  const removePaymentMethod = useRemovePaymentMethod()

  const handleSubmit = async (data: {
    alias: string
    cardNumber: string
    cardholderName: string
    expirationDate: string
    securityNumber: string
  }) => {
    try {
      await createPaymentMethod.mutateAsync({
        alias: data.alias,
        cardNumber: data.cardNumber,
        cardholderName: data.cardholderName,
        expirationDate: data.expirationDate,
        securityNumber: data.securityNumber,
        userId: user.id
      })
      setOpen(false)
    } catch (error) {
      console.error('Failed to create payment method:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await removePaymentMethod.mutateAsync(id)
    } catch (error) {
      console.error('Failed to delete payment method:', error)
    }
  }
  return (
    <Card className="border-slate-800 bg-slate-900/90 shadow-lg backdrop-blur">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold text-slate-100">Payment Methods</CardTitle>
          <CardDescription className="text-slate-400">Manage your payment methods</CardDescription>
        </div>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
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
          </DrawerTrigger>
          <DrawerContent className="border-slate-800 bg-slate-900">
            <DrawerHeader>
              <DrawerTitle className="text-slate-100">Add Payment Method</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-4">
              <AddPaymentMethodForm onSubmit={handleSubmit} />
            </div>
          </DrawerContent>
        </Drawer>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center text-slate-400 py-4">Loading payment methods...</div>
          ) : !paymentMethods?.total ? (
            <div className="text-center text-slate-400 py-4">No payment methods found</div>
          ) : paymentMethods?.data.map((method: PaymentMethod) => (
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
                    {method.alias}
                    {/* {method.isDefault && ( */}
                      <span className="ml-2 rounded-full bg-[#00FFA3]/10 px-2 py-1 text-xs text-[#00FFA3]">
                        Default
                      </span>
                    {/* )} */}
                  </p>
                  <p className="text-sm text-slate-400">**** {method.cardNumber.slice(-4)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!method && (
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
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDelete(method.id)}
                  disabled={removePaymentMethod.isPending}
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
