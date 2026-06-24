'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authUtils } from '@/lib/auth';
import { Mail, ArrowRight } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await authUtils.resetPassword(email);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.message);
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
            <p className="text-muted-foreground">استرجاع كلمة المرور</p>
          </div>

          {!submitted ? (
            <>
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    البريد الإلكتروني المسجل
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
                  <p className="text-xs text-muted-foreground mt-2">
                    سنرسل لك رابطاً لاستعادة كلمة المرور على هذا البريد
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 mt-6"
                >
                  {isLoading ? 'جاري الإرسال...' : 'إرسال رابط الاستعادة'}
                </button>
              </form>

              {/* Back Link */}
              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                  العودة إلى تسجيل الدخول
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-foreground">تم إرسال البريد بنجاح</h2>
                <p className="text-muted-foreground">
                  تحقق من بريدك الإلكتروني للحصول على رابط استعادة كلمة المرور. قد يستغرق الأمر بعض الدقائق حتى يصل البريد.
                </p>

                <Link
                  href="/login"
                  className="inline-block py-3 px-8 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors mt-6"
                >
                  العودة إلى تسجيل الدخول
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
