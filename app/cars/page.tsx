'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { CarCard } from '@/components/car-card';
import { AdvancedSearch } from '@/components/advanced-search';
import { initialCars } from '@/lib/car-data';
import { AR_TRANSLATIONS } from '@/lib/types';
import type { Car } from '@/lib/types';

interface SearchFilters {
  keyword: string;
  make: string;
  model: string;
  minYear: number;
  maxYear: number;
  maxMileage: number;
}

export default function CarsPage() {
  const [filteredCars, setFilteredCars] = useState<Car[]>(initialCars.filter((c) => c.isApproved));

  const handleSearch = (filters: SearchFilters) => {
    const results = initialCars.filter((car) => {
      const matchesKeyword =
        filters.keyword === '' ||
        car.make.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        car.model.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        car.description.toLowerCase().includes(filters.keyword.toLowerCase());

      const matchesMake = filters.make === '' || car.make === filters.make;
      const matchesModel = filters.model === '' || car.model === filters.model;
      const matchesYear = car.year >= filters.minYear && car.year <= filters.maxYear;
      const matchesMileage = car.mileage <= filters.maxMileage;
      const isApproved = car.isApproved;

      return matchesKeyword && matchesMake && matchesModel && matchesYear && matchesMileage && isApproved;
    });

    setFilteredCars(results);
  };

  return (
    <>
      <Header />
      <AdvancedSearch onSearch={handleSearch} />
      <main className="bg-background min-h-screen pb-20">
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
                  onClick={() => setFilteredCars(initialCars.filter((c) => c.isApproved))}
                  className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  إعادة تحميل
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
