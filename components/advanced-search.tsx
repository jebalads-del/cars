'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { initialCars } from '@/lib/car-data';

interface SearchFilters {
  keyword: string;
  make: string;
  model: string;
  minYear: number;
  maxYear: number;
  maxMileage: number;
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
}

export function AdvancedSearch({ onSearch }: AdvancedSearchProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: '',
    make: '',
    model: '',
    minYear: 2000,
    maxYear: new Date().getFullYear(),
    maxMileage: 500000,
  });

  const makes = Array.from(new Set(initialCars.map((car) => car.make))).sort();
  const models = filters.make
    ? Array.from(new Set(initialCars.filter((car) => car.make === filters.make).map((car) => car.model))).sort()
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({
      keyword: '',
      make: '',
      model: '',
      minYear: 2000,
      maxYear: new Date().getFullYear(),
      maxMileage: 500000,
    });
  };

  return (
    <div className="w-full bg-white border-b border-border sticky top-0 z-40">
      <div className="container mx-auto px-4 py-6">
        {/* Main Search Bar */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-3.5 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="ابحث عن السيارات..."
                value={filters.keyword}
                onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                className="w-full pr-10 pl-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary text-right"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              بحث
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              {showFilters ? 'إغلاق' : 'تصفية'}
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              {/* Make */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  الماركة
                </label>
                <select
                  value={filters.make}
                  onChange={(e) => setFilters({ ...filters, make: e.target.value, model: '' })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary text-right"
                >
                  <option value="">جميع الماركات</option>
                  {makes.map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </select>
              </div>

              {/* Model */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  الموديل
                </label>
                <select
                  value={filters.model}
                  onChange={(e) => setFilters({ ...filters, model: e.target.value })}
                  disabled={!filters.make}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary text-right disabled:opacity-50"
                >
                  <option value="">جميع الموديلات</option>
                  {models.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Range */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  السنة من {filters.minYear} إلى {filters.maxYear}
                </label>
                <input
                  type="range"
                  min="2000"
                  max={new Date().getFullYear()}
                  value={filters.minYear}
                  onChange={(e) => setFilters({ ...filters, minYear: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              {/* Max Mileage */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  أقصى كيلومترات: {filters.maxMileage.toLocaleString('ar-SA')} كم
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="10000"
                  value={filters.maxMileage}
                  onChange={(e) => setFilters({ ...filters, maxMileage: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-2 md:col-span-3">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  تطبيق الفلاتر
                </button>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-4 py-2 border border-border text-foreground font-semibold rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
