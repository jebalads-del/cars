'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { CarCard } from '@/components/car-card';
import { initialCars } from '@/lib/car-data';
import { Search } from 'lucide-react';
import { AR_TRANSLATIONS } from '@/lib/types';

export default function CarsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('all');

  const filteredCars = initialCars.filter((car) => {
    const matchesSearch =
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFuel = selectedFuel === 'all' || car.fuelType === selectedFuel;
    return matchesSearch && matchesFuel;
  });

  const fuelTypes = Array.from(new Set(initialCars.map((car) => car.fuelType)));

  return (
    <>
      <Header />
      <main className="bg-background min-h-screen pb-20">
        {/* Page Header */}
        <section className="py-16 px-4 border-b border-border bg-secondary/30">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">{AR_TRANSLATIONS.allVehicles}</h1>
            <p className="text-lg text-muted-foreground">
              {AR_TRANSLATIONS.browseOurFullInventory}
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 px-4 border-b border-border">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  {AR_TRANSLATIONS.search}
                </label>
                <div className="relative">
                  <Search className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="BMW, Mercedes, Porsche..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-right"
                  />
                </div>
              </div>

              {/* Fuel Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  نوع الوقود
                </label>
                <select
                  value={selectedFuel}
                  onChange={(e) => setSelectedFuel(e.target.value)}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer text-right"
                >
                  <option value="all">جميع أنواع الوقود</option>
                  {fuelTypes.map((fuel) => (
                    <option key={fuel} value={fuel}>
                      {fuel}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Cars Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            {filteredCars.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-8">
                  يتم عرض <span className="text-primary font-bold">{filteredCars.length}</span> سيارة
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                  {filteredCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">{AR_TRANSLATIONS.noResults}</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedFuel('all');
                  }}
                  className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  مسح المرشحات
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-border bg-secondary/30">
          <div className="container mx-auto text-center text-muted-foreground">
            <p>© 2024 سويفت موتورز. جميع الحقوق محفوظة.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
