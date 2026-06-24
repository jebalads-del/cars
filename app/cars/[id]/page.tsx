'use client';

import { Header } from '@/components/header';
import { initialCars } from '@/lib/car-data';
import { notFound } from 'next/navigation';
import { ArrowLeft, Zap, Check } from 'lucide-react';
import Link from 'next/link';

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const car = initialCars.find((c) => c.id === params.id);

  if (!car) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="bg-background min-h-screen pb-20">
        {/* Back Button */}
        <section className="py-4 px-4 border-b border-border">
          <div className="container mx-auto">
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Inventory
            </Link>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Image Section */}
              <div>
                <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 via-secondary to-background aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <Zap className="w-24 h-24 text-primary mx-auto mb-4 opacity-50" />
                    <p className="text-lg text-muted-foreground">{car.make} {car.model}</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-secondary rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Vehicle Status</p>
                  <p className="text-lg font-bold text-primary capitalize">{car.status}</p>
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-8">
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-4xl font-black text-foreground">
                        {car.make} {car.model}
                      </h1>
                      <p className="text-lg text-muted-foreground mt-2">{car.year} • {car.color}</p>
                    </div>
                    <div className="text-right bg-primary/10 border border-primary/30 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Price</p>
                      <p className="text-3xl font-black text-primary">
                        ${(car.price / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-lg text-muted-foreground leading-relaxed">{car.description}</p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-2">Transmission</p>
                    <p className="font-bold text-foreground">{car.transmission}</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-2">Fuel Type</p>
                    <p className="font-bold text-foreground">{car.fuelType}</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-2">Engine</p>
                    <p className="font-bold text-foreground">{car.engineSize}</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-2">Horsepower</p>
                    <p className="font-bold text-foreground">{car.horsepower} HP</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-2">Mileage</p>
                    <p className="font-bold text-foreground">{car.mileage.toLocaleString()} miles</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-2">Year</p>
                    <p className="font-bold text-foreground">{car.year}</p>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">Key Features</h3>
                  <div className="space-y-3">
                    {car.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-6 space-y-3 border-t border-border">
                  <button className="w-full px-6 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors text-lg">
                    Contact for More Info
                  </button>
                  <Link
                    href="/cars"
                    className="block w-full text-center px-6 py-3 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    View Other Vehicles
                  </Link>
                </div>
              </div>
            </div>
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
