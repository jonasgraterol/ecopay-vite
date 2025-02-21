import { useState } from 'react'
import { useAuth } from '@/lib/auth/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Bitcoin } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function LoginView() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 to-black text-white">
      <div className="container mx-auto px-4 py-20 flex flex-col items-center">
        <Link to="/" className="mb-8">
          <div className="rounded-full bg-emerald-500/10 p-4">
            <Bitcoin className="h-8 w-8 text-[#00FFA3]" />
          </div>
        </Link>

        <Card className="w-full max-w-md border-slate-800 bg-slate-900/90 shadow-lg backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-slate-100">
              Sign in to your account
            </CardTitle>
            <CardDescription className="text-slate-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-slate-800 bg-slate-950 text-slate-200 placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-slate-800 bg-slate-950 text-slate-200 placeholder:text-slate-500"
                />
              </div>

              <Button 
                type="submit"
                size="lg"
                className="w-full"
                style={{
                  backgroundColor: '#00FFA3',
                  color: '#000',
                  fontWeight: 500,
                }}
              >
                Sign in
              </Button>

              <div className="text-center text-sm text-slate-400">
                Don't have an account?{' '}
                <Link to="/auth/register" className="text-[#00FFA3] hover:text-[#00FFA3]/90">
                  Create one
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
