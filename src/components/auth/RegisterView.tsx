import { useState } from 'react'
import { useAuth } from '@/lib/auth/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Bitcoin } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function RegisterView() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      setIsLoading(true);
      await register({
        email,
        password,
        fullName: fullName || undefined,
        phone: phone || undefined
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
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
              Create your account
            </CardTitle>
            <CardDescription className="text-slate-400">
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-slate-800 bg-slate-950 text-slate-200 placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Full name (optional)"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border-slate-800 bg-slate-950 text-slate-200 placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="tel"
                  placeholder="Phone number (optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="border-slate-800 bg-slate-950 text-slate-200 placeholder:text-slate-500"
                />
              </div>

              {error && (
                <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <Button 
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading}
                style={{
                  backgroundColor: '#00FFA3',
                  color: '#000',
                  fontWeight: 500,
                  opacity: isLoading ? 0.7 : 1,
                }}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <div className="text-center text-sm text-slate-400">
                Already have an account?{' '}
                <Link to="/auth/login" className="text-[#00FFA3] hover:text-[#00FFA3]/90">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
