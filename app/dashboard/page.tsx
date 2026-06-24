'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { authUtils, type User } from '@/lib/auth';
import type { Car } from '@/lib/types';
import { initialCars } from '@/lib/car-data';
import { Settings, Users, Car as CarIcon, LogOut, Plus, CheckCircle, XCircle, Star, Trash2, Edit2 } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'ads' | 'users' | 'settings'>('overview');
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  useEffect(() => {
    const currentUser = authUtils.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    if (currentUser.role !== 'admin') {
      router.push('/');
      return;
    }
    setUser(currentUser);

    // Load cars from localStorage
    try {
      const savedCars = localStorage.getItem('swift_cars');
      if (savedCars) {
        setCars(JSON.parse(savedCars));
      }
    } catch (error) {
      console.log('[v0] Could not load cars from localStorage');
    }
  }, [router]);

  const handleLogout = () => {
    authUtils.logout();
    router.push('/');
  };

  const handleApproveCar = (carId: string) => {
    const updatedCars = cars.map((car) =>
      car.id === carId ? { ...car, isApproved: true } : car
    );
    setCars(updatedCars);
    localStorage.setItem('swift_cars', JSON.stringify(updatedCars));
  };

  const handleRejectCar = (carId: string) => {
    const updatedCars = cars.filter((car) => car.id !== carId);
    setCars(updatedCars);
    localStorage.setItem('swift_cars', JSON.stringify(updatedCars));
  };

  const handleFeatureCar = (carId: string) => {
    const updatedCars = cars.map((car) =>
      car.id === carId ? { ...car, isFeatured: !car.isFeatured } : car
    );
    setCars(updatedCars);
    localStorage.setItem('swift_cars', JSON.stringify(updatedCars));
  };

  const handleMarkSold = (carId: string) => {
    const updatedCars = cars.map((car) =>
      car.id === carId ? { ...car, status: car.status === 'sold' ? 'available' : 'sold' } : car
    );
    setCars(updatedCars);
    localStorage.setItem('swift_cars', JSON.stringify(updatedCars));
  };

  const handleDeleteCar = (carId: string) => {
    const updatedCars = cars.filter((car) => car.id !== carId);
    setCars(updatedCars);
    localStorage.setItem('swift_cars', JSON.stringify(updatedCars));
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Dashboard Header */}
        <section className="bg-white border-b border-border py-6 px-4">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">لوحة التحكم</h1>
              <p className="text-muted-foreground mt-1">مرحباً {user.username}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              تسجيل خروج
            </button>
          </div>
        </section>

        {/* Tabs */}
        <section className="bg-white border-b border-border sticky top-16 z-30">
          <div className="container mx-auto px-4">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-4 font-semibold border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CarIcon className="w-5 h-5" />
                  نظرة عامة
                </div>
              </button>
              <button
                onClick={() => setActiveTab('ads')}
                className={`py-4 px-4 font-semibold border-b-2 transition-colors ${
                  activeTab === 'ads'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  إدارة الإعلانات
                </div>
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-4 font-semibold border-b-2 transition-colors ${
                  activeTab === 'users'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  المستخدمون
                </div>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-4 font-semibold border-b-2 transition-colors ${
                  activeTab === 'settings'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  الإعدادات
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="container mx-auto px-4 py-8">
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
                <p className="text-muted-foreground text-sm font-semibold mb-2">إجمالي الإعلانات</p>
                <p className="text-4xl font-black text-primary">{cars.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
                <p className="text-muted-foreground text-sm font-semibold mb-2">المعتمدة</p>
                <p className="text-4xl font-black text-green-600">{cars.filter((c) => c.isApproved).length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
                <p className="text-muted-foreground text-sm font-semibold mb-2">المميزة</p>
                <p className="text-4xl font-black text-blue-600">{cars.filter((c) => c.isFeatured).length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
                <p className="text-muted-foreground text-sm font-semibold mb-2">المباعة</p>
                <p className="text-4xl font-black text-gray-600">{cars.filter((c) => c.status === 'sold').length}</p>
              </div>
            </div>
          )}

          {activeTab === 'ads' && (
            <div>
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-black text-foreground">إدارة الإعلانات</h2>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  إعلان جديد
                </button>
              </div>

              {/* Ads Table */}
              <div className="bg-white rounded-lg border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-border">
                      <tr>
                        <th className="px-6 py-3 text-right font-semibold text-foreground">السيارة</th>
                        <th className="px-6 py-3 text-right font-semibold text-foreground">السعر</th>
                        <th className="px-6 py-3 text-right font-semibold text-foreground">الحالة</th>
                        <th className="px-6 py-3 text-right font-semibold text-foreground">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cars.map((car) => (
                        <tr key={car.id} className="border-b border-border hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-semibold text-foreground">{car.make} {car.model}</p>
                              <p className="text-sm text-muted-foreground">{car.year}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-foreground">
                              {car.price.toLocaleString('ar-SA')} {car.currency}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              {car.isApproved ? (
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                                  معتمدة
                                </span>
                              ) : (
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-full">
                                  معلقة
                                </span>
                              )}
                              {car.status === 'sold' && (
                                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
                                  مباعة
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-3">
                              {!car.isApproved && (
                                <>
                                  <button
                                    onClick={() => handleApproveCar(car.id)}
                                    className="p-2 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors"
                                    title="الموافقة"
                                  >
                                    <CheckCircle className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => handleRejectCar(car.id)}
                                    className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                                    title="الرفض"
                                  >
                                    <XCircle className="w-5 h-5" />
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => handleFeatureCar(car.id)}
                                className={`p-2 rounded transition-colors ${
                                  car.isFeatured
                                    ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                                title="مميز"
                              >
                                <Star className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleMarkSold(car.id)}
                                className={`p-2 rounded transition-colors ${
                                  car.status === 'sold'
                                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                }`}
                                title="مباعة"
                              >
                                <CarIcon className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDeleteCar(car.id)}
                                className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                                title="حذف"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-lg border border-border p-8 text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-foreground mb-2">إدارة المستخدمين</h3>
              <p className="text-muted-foreground">
                سيتم إضافة إدارة المستخدمين والصلاحيات قريباً
              </p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg border border-border p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">إعدادات الموقع</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    اسم الموقع
                  </label>
                  <input
                    type="text"
                    defaultValue="سويفت موتورز"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    البريد الإلكتروني للدعم
                  </label>
                  <input
                    type="email"
                    defaultValue="support@swiftmotors.com"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                  حفظ التغييرات
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
