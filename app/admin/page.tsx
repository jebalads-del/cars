'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import type { Car, Currency, CURRENCIES } from '@/lib/types';
import { initialCars } from '@/lib/car-data';
import { Trash2, Edit2, Plus, LogOut } from 'lucide-react';
import { formatPrice, getCurrencyName } from '@/lib/currency';
import { AR_TRANSLATIONS } from '@/lib/types';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'swift2024';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cars, setCars] = useState<Car[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Car>>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    currency: 'KWD',
    mileage: 0,
    color: '',
    transmission: 'أوتوماتيك',
    fuelType: 'بنزين',
    engineSize: '',
    horsepower: 0,
    features: [],
    description: '',
    status: 'available',
  });

  // Load data from localStorage
  useEffect(() => {
    const savedCars = localStorage.getItem('cars');
    if (savedCars) {
      setCars(JSON.parse(savedCars));
    } else {
      setCars(initialCars);
      localStorage.setItem('cars', JSON.stringify(initialCars));
    }

    const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (isAdminLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  // Save cars to localStorage
  useEffect(() => {
    if (cars.length > 0) {
      localStorage.setItem('cars', JSON.stringify(cars));
    }
  }, [cars]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      localStorage.setItem('adminLoggedIn', 'true');
      setUsername('');
      setPassword('');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
  };

  const handleAddCar = () => {
    if (!formData.make || !formData.model) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingId) {
      setCars(
        cars.map((car) =>
          car.id === editingId
            ? {
                ...car,
                ...formData,
                updatedAt: new Date().toISOString(),
              }
            : car
        )
      );
      setEditingId(null);
    } else {
      const newCar: Car = {
        id: Date.now().toString(),
        make: formData.make || '',
        model: formData.model || '',
        year: formData.year || new Date().getFullYear(),
        price: formData.price || 0,
        mileage: formData.mileage || 0,
        color: formData.color || '',
        transmission: formData.transmission || 'Automatic',
        fuelType: formData.fuelType || 'Gasoline',
        engineSize: formData.engineSize || '',
        horsepower: formData.horsepower || 0,
        features: formData.features || [],
        image: '/cars/default.jpg',
        images: ['/cars/default.jpg'],
        description: formData.description || '',
        status: formData.status || 'available',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setCars([...cars, newCar]);
    }

    setFormData({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      color: '',
      transmission: 'Automatic',
      fuelType: 'Gasoline',
      engineSize: '',
      horsepower: 0,
      features: [],
      description: '',
      status: 'available',
    });
    setShowForm(false);
  };

  const handleEditCar = (car: Car) => {
    setFormData(car);
    setEditingId(car.id);
    setShowForm(true);
  };

  const handleDeleteCar = (id: string) => {
    if (confirm('Are you sure you want to delete this car?')) {
      setCars(cars.filter((car) => car.id !== id));
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <main className="bg-background min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className="bg-secondary border border-border rounded-lg p-8 space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-black text-foreground mb-2">Admin Login</h1>
                <p className="text-muted-foreground">Access the management dashboard</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="admin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Login
                </button>
              </form>

              <div className="text-center text-sm text-muted-foreground">
                <p>Demo credentials: admin / swift2024</p>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-background min-h-screen pb-20">
        {/* Header */}
        <section className="py-6 px-4 border-b border-border bg-secondary/30 flex justify-between items-center">
          <div className="container mx-auto w-full flex justify-between items-center">
            <h1 className="text-3xl font-black text-foreground">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </section>

        <section className="py-8 px-4">
          <div className="container mx-auto">
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-secondary border border-border rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-2">Total Vehicles</p>
                <p className="text-3xl font-black text-primary">{cars.length}</p>
              </div>
              <div className="bg-secondary border border-border rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-2">Available</p>
                <p className="text-3xl font-black text-primary">{cars.filter((c) => c.status === 'available').length}</p>
              </div>
              <div className="bg-secondary border border-border rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-2">Sold</p>
                <p className="text-3xl font-black text-primary">{cars.filter((c) => c.status === 'sold').length}</p>
              </div>
            </div>

            {/* Add Button */}
            <div className="mb-8">
              {!showForm && (
                <button
                  onClick={() => {
                    setShowForm(true);
                    setEditingId(null);
                    setFormData({
                      make: '',
                      model: '',
                      year: new Date().getFullYear(),
                      price: 0,
                      mileage: 0,
                      color: '',
                      transmission: 'Automatic',
                      fuelType: 'Gasoline',
                      engineSize: '',
                      horsepower: 0,
                      features: [],
                      description: '',
                      status: 'available',
                    });
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add New Vehicle
                </button>
              )}
            </div>

            {/* Form */}
            {showForm && (
              <div className="bg-secondary border border-border rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {editingId ? 'Edit Vehicle' : 'Add New Vehicle'}
                </h2>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Make *</label>
                    <input
                      type="text"
                      value={formData.make || ''}
                      onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="BMW, Mercedes..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Model *</label>
                    <input
                      type="text"
                      value={formData.model || ''}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Model name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Year</label>
                    <input
                      type="number"
                      value={formData.year || ''}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Price</label>
                    <input
                      type="number"
                      value={formData.price || ''}
                      onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Color</label>
                    <input
                      type="text"
                      value={formData.color || ''}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Color"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Fuel Type</label>
                    <select
                      value={formData.fuelType || 'Gasoline'}
                      onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option>Gasoline</option>
                      <option>Diesel</option>
                      <option>Electric</option>
                      <option>Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Status</label>
                    <select
                      value={formData.status || 'available'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="available">Available</option>
                      <option value="sold">Sold</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddCar}
                    className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    {editingId ? 'Update' : 'Add'} Vehicle
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                    }}
                    className="px-6 py-3 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Cars Table */}
            <div className="overflow-x-auto border border-border rounded-lg">
              <table className="w-full">
                <thead className="bg-secondary border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Make & Model</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Year</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {cars.map((car) => (
                    <tr key={car.id} className="hover:bg-secondary/50 transition-colors">
                      <td className="px-6 py-4 text-foreground font-semibold">
                        {car.make} {car.model}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{car.year}</td>
                      <td className="px-6 py-4 text-primary font-bold">${(car.price / 1000).toFixed(0)}K</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold capitalize">
                          {car.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => handleEditCar(car)}
                          className="p-2 hover:bg-secondary rounded-lg transition-colors text-primary"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCar(car.id)}
                          className="p-2 hover:bg-secondary rounded-lg transition-colors text-destructive"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
