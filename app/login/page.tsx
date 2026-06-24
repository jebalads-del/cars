'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authUtils } from '@/lib/auth';
import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await authUtils.login(email, password);

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'خطأ في تسجيل الدخول');
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
            <p className="text-muted-foreground">تسجيل الدخول إلى حسابك</p>
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
                البريد الإلكتروني أو اسم المستخدم
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
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

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-primary hover:text-primary/80 text-sm font-semibold transition-colors"
              >
                هل نسيت كلمة المرور؟
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 mt-6"
            >
              {isLoading ? 'جاري التحميل...' : 'تسجيل الدخول'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-sm text-muted-foreground">أو</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-muted-foreground">
            ليس لديك حساب؟{' '}
            <Link href="/register" className="text-primary hover:text-primary/80 font-semibold">
              أنشئ حساباً جديداً
            </Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-sm text-blue-900 font-semibold mb-2">بيانات اختبار للمسؤول:</p>
          <p className="text-xs text-blue-800">البريد: admin@swiftmotors.com</p>
          <p className="text-xs text-blue-800">كلمة المرور: swift2024</p>
        </div>
      </div>
    </div>
  );
}
