import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddPaymentMethodFormProps {
  onSubmit?: (data: {
    alias: string
    cardNumber: string
    cardholderName: string
    expirationDate: string
    securityNumber: string
  }) => void
}

export function AddPaymentMethodForm({ onSubmit }: AddPaymentMethodFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    if (onSubmit) {
      onSubmit({
        alias: formData.get('alias') as string,
        cardNumber: formData.get('cardNumber') as string,
        cardholderName: formData.get('cardholderName') as string,
        expirationDate: formData.get('expirationDate') as string,
        securityNumber: formData.get('securityNumber') as string
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="alias" className="text-slate-200">
            Alias
          </Label>
          <Input
            id="alias"
            name="alias"
            className="border-slate-800 bg-slate-950 text-slate-200 placeholder:text-slate-500"
            placeholder="e.g. My Personal Card"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="cardholderName" className="text-slate-200">
            Cardholder Name
          </Label>
          <Input
            id="cardholderName"
            name="cardholderName"
            className="border-slate-800 bg-slate-950 text-slate-200 placeholder:text-slate-500"
            placeholder="JOHN DOE"
            required
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase()
            }}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="cardNumber" className="text-slate-200">
            Card Number
          </Label>
          <Input
            id="cardNumber"
            name="cardNumber"
            className="border-slate-800 bg-slate-950 text-slate-200 placeholder:text-slate-500"
            placeholder="1234 5678 9012 3456"
            pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
            required
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, '')
              if (value.length > 0) {
                value = value.match(/.{1,4}/g)?.join(' ') || ''
              }
              e.target.value = value.slice(0, 19)
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="expirationDate" className="text-slate-200">
              Expiration Date
            </Label>
            <Input
              id="expirationDate"
              name="expirationDate"
              className="border-slate-800 bg-slate-950 text-slate-200 placeholder:text-slate-500"
              placeholder="MM/YY"
              pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
              required
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, '')
                if (value.length > 0) {
                  value = value.match(/.{1,2}/g)?.join('/') || ''
                }
                e.target.value = value.slice(0, 5)
              }}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="securityNumber" className="text-slate-200">
              Security Number
            </Label>
            <Input
              id="securityNumber"
              name="securityNumber"
              type="password"
              className="border-slate-800 bg-slate-950 text-slate-200 placeholder:text-slate-500"
              placeholder="123"
              pattern="[0-9]{3,4}"
              required
              maxLength={4}
            />
          </div>
        </div>
      </div>

      <Button 
        type="submit"
        style={{
          backgroundColor: '#00FFA3',
          color: '#000',
          fontWeight: 500,
        }}
        className="w-full hover:bg-[#00FFA3]/90"
      >
        Add Payment Method
      </Button>
    </form>
  )
}
