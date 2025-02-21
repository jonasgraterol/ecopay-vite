import { createFileRoute } from '@tanstack/react-router'
import { Bitcoin, CreditCard, DollarSign, Shield, Timer, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: LandingPage
})

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-20 text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-emerald-500/10 p-4">
              <Bitcoin className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl">
            Buy USDT Instantly
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">
            Fast, secure, and easy way to purchase USDT using TTC. Get started in minutes.
          </p>
        </div>

        {/* Transaction Form */}
        <Card className="mx-auto max-w-2xl border-slate-800 bg-slate-900/90 shadow-lg backdrop-blur">
          <CardHeader>
            <CardTitle className="text-slate-100">Create Transaction</CardTitle>
            <CardDescription className="text-slate-400">
              <Link 
                to="/auth/login"
                className="text-emerald-400 hover:text-emerald-300"
              >
                Sign in
              </Link>
              {" "}or enter your details to purchase USDT
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-slate-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="you@example.com"
                    type="email"
                    className="border-slate-800 bg-slate-950 text-slate-200 placeholder:text-slate-500"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="wallet" className="text-slate-200">
                    USDT Wallet Address
                  </Label>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="wallet"
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
                        placeholder="0.00"
                        className="border-slate-800 bg-slate-950 pl-9 text-slate-200 placeholder:text-slate-500"
                        required
                      />
                    </div>
                    <div className="flex items-center rounded-md border border-slate-800 bg-slate-950 px-3 text-slate-200">
                      TTC
                    </div>
                  </div>
                  <p className="text-sm text-slate-400">You will receive USDT at the current market rate</p>
                </div>

                {/* Features Section */}
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

                <Button 
                  type="submit"
                  className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  Create Transaction
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
