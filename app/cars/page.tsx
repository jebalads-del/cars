'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { CarCard } from '@/components/car-card';
import { initialCars } from '@/lib/car-data';
import { Search } from 'lucide-react';

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
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">Our Inventory</h1>
            <p className="text-lg text-muted-foreground">
              Browse our complete collection of premium vehicles
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
                  Search by Make or Model
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="BMW, Mercedes, Porsche..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Fuel Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Fuel Type
                </label>
                <select
                  value={selectedFuel}
                  onChange={(e) => setSelectedFuel(e.target.value)}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                >
                  <option value="all">All Fuel Types</option>
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
                  Showing <span className="text-primary font-bold">{filteredCars.length}</span> vehicle
                  {filteredCars.length !== 1 ? 's' : ''}
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                  {filteredCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">No vehicles found matching your criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedFuel('all');
                  }}
                  className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-border bg-secondary/30">
          <div className="container mx-auto text-center text-muted-foreground">
            <p>© 2024 Swift Motors. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
