'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authUtils } from '@/lib/auth';
import { Mail, Lock, User } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    setIsLoading(true);
    const result = await authUtils.register(email, username, password);

    if (result.success) {
      // Auto-login after registration
      const loginResult = await authUtils.login(email, password);
      if (loginResult.success) {
        router.push('/');
      } else {
        router.push('/login');
      }
    } else {
      setError(result.error || 'خطأ في التسجيل');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-foreground mb-2">سويفت موتورز</h1>
            <p className="text-muted-foreground">إنشاء حساب جديد</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
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
                  placeholder="example@email.com"
                  className="w-full pr-10 pl-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary text-right"
                  required
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                اسم المستخدم
              </label>
              <div className="relative">
                <User className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  className="w-full pr-10 pl-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary text-right"
                  required
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pr-10 pl-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary text-right"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pr-10 pl-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary text-right"
                  required
                />
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 mt-6"
            >
              {isLoading ? 'جاري التحميل...' : 'إنشاء حساب'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-sm text-muted-foreground">أو</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-muted-foreground">
            هل لديك حساب بالفعل؟{' '}
            <Link href="/login" className="text-primary hover:text-primary/80 font-semibold">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
