import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Bitcoin, CreditCard, DollarSign, Shield, Timer, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
          <CardDescription className="text-slate-400">Enter your details to purchase USDT</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
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

              {/* Payment Section */}
              <div className="space-y-4 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-emerald-400" />
                  <h3 className="font-medium text-slate-200">Payment Details</h3>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="card-name" className="text-slate-200">
                      Name on Card
                    </Label>
                    <Input
                      id="card-name"
                      placeholder="John Doe"
                      className="border-slate-800 bg-slate-950 text-slate-200 placeholder:text-slate-500"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="card-number" className="text-slate-200">
                      Card Number
                    </Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      className="border-slate-800 bg-slate-950 text-slate-200 placeholder:text-slate-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiry" className="text-slate-200">
                        Expiry Date
                      </Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        className="border-slate-800 bg-slate-950 text-slate-200 placeholder:text-slate-500"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvc" className="text-slate-200">
                        CVC
                      </Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        className="border-slate-800 bg-slate-950 text-slate-200 placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-emerald-500 text-white hover:bg-emerald-600" size="lg">
                Complete Purchase
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Trust Indicators */}
      <div className="mt-20 grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-emerald-500/10 p-3">
              <Shield className="h-6 w-6 text-emerald-400" />
            </div>
          </div>
          <h3 className="mb-2 font-medium text-slate-200">Secure Transactions</h3>
          <p className="text-sm text-slate-400">Your transactions are protected with industry-leading security</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-emerald-500/10 p-3">
              <Timer className="h-6 w-6 text-emerald-400" />
            </div>
          </div>
          <h3 className="mb-2 font-medium text-slate-200">Instant Processing</h3>
          <p className="text-sm text-slate-400">Get your USDT in minutes with our fast processing system</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-emerald-500/10 p-3">
              <Wallet className="h-6 w-6 text-emerald-400" />
            </div>
          </div>
          <h3 className="mb-2 font-medium text-slate-200">Best Market Rates</h3>
          <p className="text-sm text-slate-400">Get competitive USDT rates for your TTC</p>
        </div>
      </div>
    </section>
  </div>
  )
}

export default App
