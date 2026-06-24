import { Header } from '@/components/header';
import { CarCard } from '@/components/car-card';
import { initialCars } from '@/lib/car-data';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react';
import { AR_TRANSLATIONS } from '@/lib/types';

export const metadata = {
  title: 'سويفت موتورز - وكالة السيارات الفاخرة',
  description: 'اكتشف السيارات الفاخرة والأداء العالي في سويفت موتورز',
};

export default function Home() {
  const featuredCars = initialCars.filter((c) => c.isFeatured && c.isApproved).slice(0, 3);

  return (
    <>
      <Header />
      
      <main className="bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32 px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-primary font-semibold text-sm">{AR_TRANSLATIONS.welcomeToSwiftMotors}</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black leading-tight text-foreground">
                اختبر الفخامة و
                <span className="text-primary"> الأداء العالي</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {AR_TRANSLATIONS.discover}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href="/cars"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors gap-2 group"
                >
                  {AR_TRANSLATIONS.browseInventory}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#featured"
                  className="inline-flex items-center justify-center px-8 py-4 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors"
                >
                  {AR_TRANSLATIONS.viewFeaturedCars}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-secondary/30 border-y border-border">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{AR_TRANSLATIONS.premiumSelection}</h3>
                <p className="text-muted-foreground">{AR_TRANSLATIONS.handpicked}</p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{AR_TRANSLATIONS.guaranteedQuality}</h3>
                <p className="text-muted-foreground">{AR_TRANSLATIONS.qualityGuarantee}</p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{AR_TRANSLATIONS.fastService}</h3>
                <p className="text-muted-foreground">{AR_TRANSLATIONS.expertSupport}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Cars Section */}
        <section id="featured" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">{AR_TRANSLATIONS.featuredVehicles}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {AR_TRANSLATIONS.exploreOurCollection}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/cars"
                className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors gap-2 group"
              >
                عرض جميع السيارات
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-primary/5 border-t border-border">
          <div className="container mx-auto text-center max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{AR_TRANSLATIONS.readyToFind}</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {AR_TRANSLATIONS.ourTeam}
            </p>
            <Link
              href="/cars"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors gap-2 group"
            >
              {AR_TRANSLATIONS.getStartedNow}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
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
