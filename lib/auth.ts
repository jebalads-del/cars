'use client';

export interface User {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AUTH_STORAGE_KEY = 'swift_auth';

export const authUtils = {
  // User Registration
  register: async (email: string, username: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> => {
    try {
      const users = JSON.parse(localStorage.getItem('swift_users') || '[]');
      
      if (users.some((u: User) => u.email === email || u.username === username)) {
        return { success: false, error: 'البريد الإلكتروني أو اسم المستخدم موجود بالفعل' };
      }

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        username,
        role: 'user',
        createdAt: new Date().toISOString(),
      };

      // Simple password hashing (for demo only - use proper hashing in production)
      const userWithPassword = {
        ...newUser,
        password: btoa(password),
      };

      users.push(userWithPassword);
      localStorage.setItem('swift_users', JSON.stringify(users));

      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: 'حدث خطأ أثناء التسجيل' };
    }
  },

  // User Login
  login: async (email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> => {
    try {
      const users = JSON.parse(localStorage.getItem('swift_users') || '[]');
      const user = users.find((u: any) => (u.email === email || u.username === email) && u.password === btoa(password));

      if (!user) {
        return { success: false, error: 'بريد إلكتروني أو كلمة مرور غير صحيحة' };
      }

      const { password: _, ...userWithoutPassword } = user;
      const token = btoa(JSON.stringify({ ...userWithoutPassword, timestamp: Date.now() }));
      localStorage.setItem(AUTH_STORAGE_KEY, token);

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: 'حدث خطأ أثناء تسجيل الدخول' };
    }
  },

  // Admin Login
  adminLogin: async (email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> => {
    try {
      if (email === 'jebal.ads@gmail.com' && password === '91037366Asd') {
        const adminUser: User = {
          id: 'admin-001',
          email: 'jebal.ads@gmail.com',
          username: 'admin',
          role: 'admin',
          createdAt: new Date().toISOString(),
        };

        const token = btoa(JSON.stringify({ ...adminUser, timestamp: Date.now() }));
        localStorage.setItem(AUTH_STORAGE_KEY, token);

        return { success: true, user: adminUser };
      }

      return { success: false, error: 'بيانات الدخول غير صحيحة' };
    } catch (error) {
      return { success: false, error: 'حدث خطأ أثناء تسجيل الدخول' };
    }
  },

  // Get Current User
  getCurrentUser: (): User | null => {
    try {
      const token = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!token) return null;

      const user = JSON.parse(atob(token));
      return user;
    } catch {
      return null;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  // Password Reset (demo - sends to console)
  resetPassword: async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      const users = JSON.parse(localStorage.getItem('swift_users') || '[]');
      const userExists = users.some((u: User) => u.email === email);

      if (!userExists) {
        return { success: false, message: 'البريد الإلكتروني غير موجود' };
      }

      // In a real app, you would send an email
      console.log(`[Demo] Password reset link sent to ${email}`);

      return { success: true, message: 'تحقق من بريدك الإلكتروني للحصول على رابط إعادة تعيين كلمة المرور' };
    } catch (error) {
      return { success: false, message: 'حدث خطأ أثناء إعادة تعيين كلمة المرور' };
    }
  },
};
