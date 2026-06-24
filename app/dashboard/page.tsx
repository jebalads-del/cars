'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { authUtils, type User } from '@/lib/auth';
import type { Car } from '@/lib/types';
import { initialCars } from '@/lib/car-data';
import { LogOut, CheckCircle, XCircle, Star, Trash2, Edit2, Eye } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentUser = authUtils.getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/login');
      return;
    }
    setUser(currentUser);

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
    router.push('/login');
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

  if (!mounted || !user) {
    return null;
  }

  const pendingCars = cars.filter((c) => !c.isApproved);
  const approvedCars = cars.filter((c) => c.isApproved);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Dashboard Header */}
        <div className="bg-white border-b border-border py-6 px-4 sticky top-0 z-40">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">لوحة التحكم</h1>
              <p className="text-muted-foreground mt-1">مرحباً {user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-destructive text-white font-semibold rounded-lg hover:bg-destructive/90 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              تسجيل خروج
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg border border-border">
              <p className="text-muted-foreground text-sm font-semibold mb-2">إجمالي الإعلانات</p>
              <p className="text-4xl font-black text-primary">{cars.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-border">
              <p className="text-muted-foreground text-sm font-semibold mb-2">قيد الانتظار</p>
              <p className="text-4xl font-black text-yellow-600">{pendingCars.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-border">
              <p className="text-muted-foreground text-sm font-semibold mb-2">المعتمدة</p>
              <p className="text-4xl font-black text-green-600">{approvedCars.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-border">
              <p className="text-muted-foreground text-sm font-semibold mb-2">المميزة</p>
              <p className="text-4xl font-black text-blue-600">{cars.filter((c) => c.isFeatured).length}</p>
            </div>
          </div>

          {/* Pending Ads Section */}
          {pendingCars.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-black text-foreground mb-4">الإعلانات قيد الانتظار</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {pendingCars.map((car) => (
                  <div key={car.id} className="bg-white border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-xl font-black text-blue-600">{car.make}</p>
                        <p className="text-muted-foreground">{car.model}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-3">
                        <p className="font-black text-foreground text-lg">{car.make} {car.model}</p>
                        <p className="text-sm text-muted-foreground">{car.year} • {car.mileage.toLocaleString('ar-SA')} كم</p>
                        <p className="text-primary font-bold mt-2">{car.price.toLocaleString('ar-SA')} {car.currency}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveCar(car.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-100 text-green-700 font-semibold rounded hover:bg-green-200 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          موافقة
                        </button>
                        <button
                          onClick={() => handleRejectCar(car.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-700 font-semibold rounded hover:bg-red-200 transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                          رفض
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Approved Ads Table */}
          <div>
            <h2 className="text-2xl font-black text-foreground mb-4">الإعلانات المعتمدة</h2>
            <div className="bg-white border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-right font-bold text-foreground">السيارة</th>
                      <th className="px-4 py-3 text-right font-bold text-foreground">السعر</th>
                      <th className="px-4 py-3 text-right font-bold text-foreground">الحالة</th>
                      <th className="px-4 py-3 text-right font-bold text-foreground">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedCars.map((car) => (
                      <tr key={car.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-semibold text-foreground">{car.make} {car.model}</p>
                            <p className="text-xs text-muted-foreground">{car.year}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-foreground">{car.price.toLocaleString('ar-SA')} {car.currency}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2 flex-wrap">
                            {car.isFeatured && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                مميزة
                              </span>
                            )}
                            {car.status === 'sold' && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                                مباعة
                              </span>
                            )}
                            {car.status === 'available' && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                متاحة
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleFeatureCar(car.id)}
                              className={`p-2 rounded transition-colors ${
                                car.isFeatured
                                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                              title="تمييز"
                            >
                              <Star className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleMarkSold(car.id)}
                              className={`p-2 rounded transition-colors ${
                                car.status === 'sold'
                                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                              title={car.status === 'sold' ? 'إلغاء بيع' : 'تحديد كمباعة'}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCar(car.id)}
                              className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
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
        </div>
      </main>
    </>
  );
}
