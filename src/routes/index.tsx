import { createFileRoute } from '@tanstack/react-router'
import { Shield, Timer, CreditCard, DollarSign } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  component: LandingPage
})

function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 to-black text-white">
      {/* Hero Section */}
      <section className="w-full px-4 py-20">
        <div className="mb-20 text-center">
          <div className="mb-8 flex justify-center">
            <Logo size="lg" />
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl">
            Buy USDT Instantly
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-300 mb-8">
            Fast, secure, and easy way to purchase USDT using Fiat. Get started in minutes.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/auth/login">
              <Button 
                size="lg"
                style={{
                  backgroundColor: '#00FFA3',
                  color: '#000',
                  fontWeight: 500,
                }}
                className="hover:bg-[#00FFA3]/90"
              >
                Get Started
              </Button>
            </Link>
            <a href="#features">
              <Button 
                size="lg"
                style={{
                  borderColor: '#00FFA3',
                  color: '#00FFA3',
                }}
                variant="outline"
                className="hover:bg-[#00FFA3]/10"
              >
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full px-4 py-20 border-t border-slate-800">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50">
            <Shield className="h-12 w-12 text-emerald-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
            <p className="text-slate-400">Your transactions are protected with state-of-the-art security measures.</p>
          </div>
          <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50">
            <Timer className="h-12 w-12 text-emerald-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quick Processing</h3>
            <p className="text-slate-400">Get your USDT in minutes with our fast processing system.</p>
          </div>
          <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50">
            <CreditCard className="h-12 w-12 text-emerald-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Payments</h3>
            <p className="text-slate-400">Multiple payment options to make your purchase convenient.</p>
          </div>
          <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50">
            <DollarSign className="h-12 w-12 text-emerald-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Best Rates</h3>
            <p className="text-slate-400">Competitive rates updated in real-time for maximum value.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
          Join thousands of users who trust our platform for their USDT purchases.
        </p>
        <Link to="/auth/login">
          <Button 
            size="lg"
            style={{
              backgroundColor: '#00FFA3',
              color: '#000',
              fontWeight: 500,
            }}
            className="hover:bg-[#00FFA3]/90"
          >
            Create Account
          </Button>
        </Link>
      </section>
    </div>
  )
}
