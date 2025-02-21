import { useState } from 'react'
import { useAuth } from '@/lib/auth/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Bitcoin } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function LoginView() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    error: null as string | null,
    isLoading: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setFormData(prev => ({ ...prev, isLoading: true, error: null }));
      await login(formData.email, formData.password);
    } catch (err) {
      let errorMessage = 'An error occurred during sign in';
      
      if (err instanceof Error) {
        if (err.message.includes('401')) {
          errorMessage = 'Invalid email or password';
        } else {
          errorMessage = err.message;
        }
      }
      
      setFormData(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Only clear error if user is typing
      error: prev.error && value !== prev[name as keyof typeof prev] ? null : prev.error
    }));
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
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border-slate-800 bg-slate-950 text-slate-200 placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="border-slate-800 bg-slate-950 text-slate-200 placeholder:text-slate-500"
                />
              </div>

              {formData.error && (
                <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-400">
                  {formData.error}
                </div>
              )}

              <Button 
                type="submit"
                size="lg"
                className="w-full"
                disabled={formData.isLoading}
                style={{
                  backgroundColor: '#00FFA3',
                  color: '#000',
                  fontWeight: 500,
                  opacity: formData.isLoading ? 0.7 : 1,
                }}
              >
                {formData.isLoading ? 'Signing in...' : 'Sign in'}
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
