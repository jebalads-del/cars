'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { authUtils, type User } from '@/lib/auth';
import type { Car } from '@/lib/types';
import { initialCars } from '@/lib/car-data';
import { LogOut, CheckCircle, XCircle, Star, Trash2, Eye, Settings, CreditCard, AlertCircle, DollarSign } from 'lucide-react';

interface SiteSettings {
  defaultCurrency: string;
  maintenanceMode: boolean;
  paymentMethods: {
    paypal: boolean;
    westernUnion: boolean;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'ads' | 'settings' | 'payments' | 'currency'>('ads');
  
  const [settings, setSettings] = useState<SiteSettings>({
    defaultCurrency: 'KWD',
    maintenanceMode: false,
    paymentMethods: {
      paypal: true,
      westernUnion: false,
    },
  });

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
      
      const savedSettings = localStorage.getItem('swift_settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.log('[v0] Could not load data from localStorage');
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

  const saveSettings = () => {
    localStorage.setItem('swift_settings', JSON.stringify(settings));
    alert('تم حفظ الإعدادات بنجاح');
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

        {/* Tabs */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-4 border-b border-border mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('ads')}
              className={`px-6 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'ads'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              إدارة الإعلانات
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'settings'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Settings className="w-4 h-4" />
              إعدادات الموقع
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-6 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'payments'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              طرق الدفع
            </button>
            <button
              onClick={() => setActiveTab('currency')}
              className={`px-6 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'currency'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              العملات
            </button>
          </div>

          {/* Ads Tab */}
          {activeTab === 'ads' && (
            <div>
              {/* Stats */}
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

              {/* Pending Ads */}
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
                                  className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
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
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white border border-border rounded-lg p-6">
                <h3 className="text-xl font-black text-foreground mb-6">إعدادات الموقع</h3>
                
                <div className="space-y-4">
                  {/* Maintenance Mode */}
                  <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-6 h-6 text-yellow-600" />
                      <div>
                        <p className="font-semibold text-foreground">وضع الصيانة</p>
                        <p className="text-sm text-muted-foreground">إغلاق الموقع مؤقتاً للصيانة</p>
                      </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.maintenanceMode}
                        onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                        className="w-5 h-5 rounded"
                      />
                      <span className="text-sm font-semibold">{settings.maintenanceMode ? 'مُفعّل' : 'معطّل'}</span>
                    </label>
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={saveSettings}
                    className="w-full px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    حفظ الإعدادات
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="bg-white border border-border rounded-lg p-6">
                <h3 className="text-xl font-black text-foreground mb-6">طرق الدفع</h3>
                
                <div className="space-y-4">
                  {/* PayPal */}
                  <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">PayPal</p>
                      <p className="text-sm text-muted-foreground">تفعيل/تعطيل الدفع عبر PayPal</p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.paymentMethods.paypal}
                        onChange={(e) => setSettings({
                          ...settings,
                          paymentMethods: { ...settings.paymentMethods, paypal: e.target.checked }
                        })}
                        className="w-5 h-5 rounded"
                      />
                      <span className="text-sm font-semibold">{settings.paymentMethods.paypal ? 'مفعّل' : 'معطّل'}</span>
                    </label>
                  </div>

                  {/* Western Union */}
                  <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">Western Union</p>
                      <p className="text-sm text-muted-foreground">تفعيل/تعطيل الدفع عبر Western Union</p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.paymentMethods.westernUnion}
                        onChange={(e) => setSettings({
                          ...settings,
                          paymentMethods: { ...settings.paymentMethods, westernUnion: e.target.checked }
                        })}
                        className="w-5 h-5 rounded"
                      />
                      <span className="text-sm font-semibold">{settings.paymentMethods.westernUnion ? 'مفعّل' : 'معطّل'}</span>
                    </label>
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={saveSettings}
                    className="w-full px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors mt-6"
                  >
                    حفظ طرق الدفع
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Currency Tab */}
          {activeTab === 'currency' && (
            <div className="space-y-6">
              <div className="bg-white border border-border rounded-lg p-6">
                <h3 className="text-xl font-black text-foreground mb-6">اختيار العملة الافتراضية</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">العملة الافتراضية</label>
                    <select
                      value={settings.defaultCurrency}
                      onChange={(e) => setSettings({ ...settings, defaultCurrency: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary text-right"
                    >
                      <option value="KWD">الدينار الكويتي (د.ك)</option>
                      <option value="AED">درهم إماراتي (د.إ)</option>
                      <option value="SAR">ريال سعودي (ر.س)</option>
                      <option value="BHD">دينار بحريني (د.ب)</option>
                      <option value="OMR">ريال عماني (ر.ع)</option>
                      <option value="QAR">ريال قطري (ر.ق)</option>
                    </select>
                    <p className="text-sm text-muted-foreground mt-2">العملة المختارة ستكون الافتراضية عند إضافة سيارات جديدة</p>
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={saveSettings}
                    className="w-full px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors mt-6"
                  >
                    حفظ العملة الافتراضية
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
