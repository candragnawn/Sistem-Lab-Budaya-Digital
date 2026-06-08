import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'sonner';
import { Button } from '../components/UI/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/UI/Card';
import { Database, Loader2 } from 'lucide-react';
import { handleApiError } from '../lib/axios';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Login berhasil!');
      navigate('/');
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage || 'Email atau password salah');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-page-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-surface-dark border-border-dark">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-info rounded-[4px] flex items-center justify-center mx-auto mb-3">
            <Database className="w-6 h-6 text-brand-card" strokeWidth={2} />
          </div>
          <CardTitle className="text-base text-gray">Digital Cultural Heritage</CardTitle>
          <p className="text-xs text-text-placeholder mt-1">Sistem Informasi Penelitian Dosen</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-xs mb-1.5 text-text-placeholder">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-1.5 text-sm bg-surface-darker border border-border-dark rounded focus:outline-none focus:ring-2 focus:ring-info placeholder:text-text-placeholder text-brand-card"
                required
              />
            </div>
            <div>
              <label className="block text-xs mb-1.5 text-text-placeholder">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-1.5 text-sm bg-surface-darker border border-border-dark rounded focus:outline-none focus:ring-2 focus:ring-info placeholder:text-text-placeholder text-brand-card"
                required
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 text-text-placeholder">
                <input type="checkbox" className="rounded" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-info hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-3 py-2 bg-info text-brand-card rounded-[4px] text-xs hover:bg-info-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2} />
                  Loading...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          <div className="mt-4 pt-4 border-t border-border-dark">
            <p className="text-center text-xs text-text-placeholder">
              Akses publik? Anda dapat melihat semua data tanpa login
            </p>
            <Link
              to="/"
              className="block text-center text-xs text-info hover:underline mt-2"
            >
              Lihat sebagai publik →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
