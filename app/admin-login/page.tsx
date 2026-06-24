'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const ADMIN_EMAIL = 'jebal.ads@gmail.com';
const ADMIN_PASSWORD = '91037366Asd';
const AUTH_STORAGE_KEY = 'swift_auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedPassword = password.trim();

      if (trimmedEmail === ADMIN_EMAIL && trimmedPassword === ADMIN_PASSWORD) {
        const adminUser = {
          id: 'admin-001',
          email: ADMIN_EMAIL,
          username: 'admin',
          role: 'admin',
          createdAt: new Date().toISOString(),
        };

        const token = btoa(JSON.stringify({ ...adminUser, timestamp: Date.now() }));
        localStorage.setItem(AUTH_STORAGE_KEY, token);
        
        setTimeout(() => {
          router.push('/dashboard');
        }, 100);
      } else {
        setError('بريد إلكتروني أو كلمة مرور غير صحيحة');
        setIsLoading(false);
      }
    } catch (err) {
      setError('حدث خطأ أثناء تسجيل الدخول');
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-black text-lg">⚙️</span>
            </div>
            <h1 className="text-3xl font-black text-foreground">لوحة التحكم</h1>
            <p className="text-muted-foreground mt-2">دخول المسؤول</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pr-10 pl-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary text-right"
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pr-10 pl-12 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary text-right"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                  title={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'جاري الدخول...' : 'دخول'}
            </button>
          </form>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-primary hover:text-primary/80 text-sm font-semibold transition-colors"
            >
              العودة للدخول العام
            </Link>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="text-sm text-blue-900 font-semibold mb-2">بيانات دخول المسؤول:</p>
            <p className="text-xs text-blue-800 font-mono select-all">jebal.ads@gmail.com</p>
            <p className="text-xs text-blue-800 font-mono select-all mt-1">91037366Asd</p>
          </div>
        </div>
      </div>
    </div>
  );
}
