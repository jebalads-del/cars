'use client';

import type { Car } from '@/lib/types';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import { formatPrice } from '@/lib/currency';
import { AR_TRANSLATIONS } from '@/lib/types';

export function CarCard({ car }: { car: Car }) {
  return (
    <Link href={`/cars/${car.id}`}>
      <div className="group cursor-pointer h-full">
        <div className="relative overflow-hidden rounded-lg bg-secondary mb-4 aspect-video">
          {/* Placeholder image with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary to-background flex items-center justify-center">
            <div className="text-center">
              <Zap className="w-16 h-16 text-primary mx-auto mb-2 opacity-50" />
              <p className="text-sm text-muted-foreground">{car.make} {car.model}</p>
            </div>
          </div>
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
            {car.year}
          </div>
          <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur text-primary px-3 py-1 rounded-full text-sm font-bold">
            {formatPrice(car.price, car.currency)}
          </div>
        </div>

        <div className="space-y-3 group-hover:translate-y-[-4px] transition-transform">
          <div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {car.make} {car.model}
            </h3>
            <p className="text-sm text-muted-foreground">{car.color}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div>
              <p className="text-xs text-muted-foreground/70">ناقل الحركة</p>
              <p className="text-foreground font-medium">{car.transmission}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground/70">نوع الوقود</p>
              <p className="text-foreground font-medium">{car.fuelType}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground/70">حجم المحرك</p>
              <p className="text-foreground font-medium">{car.engineSize}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground/70">قوة الحصان</p>
              <p className="text-foreground font-medium">{car.horsepower} HP</p>
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <p className="text-sm text-primary font-semibold hover:text-primary/80 transition-colors">
              عرض التفاصيل ←
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
