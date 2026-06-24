import { Header } from '@/components/header';
import { CarCard } from '@/components/car-card';
import { initialCars } from '@/lib/car-data';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react';

export const metadata = {
  title: 'Swift Motors - Premium Car Dealership',
  description: 'Discover luxury and performance vehicles at Swift Motors',
};

export default function Home() {
  const featuredCars = initialCars.slice(0, 3);

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
                <span className="text-primary font-semibold text-sm">Welcome to Swift Motors</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black leading-tight text-foreground">
                Experience Luxury & 
                <span className="text-primary"> Performance</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover our exclusive collection of premium vehicles. From legendary sports cars to modern electric powerhouses, find your perfect ride.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href="/cars"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors gap-2 group"
                >
                  Browse Inventory
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#featured"
                  className="inline-flex items-center justify-center px-8 py-4 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors"
                >
                  View Featured Cars
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
                <h3 className="text-lg font-bold text-foreground">Premium Selection</h3>
                <p className="text-muted-foreground">Handpicked vehicles from world-renowned manufacturers, each inspected for excellence.</p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Guaranteed Quality</h3>
                <p className="text-muted-foreground">Every vehicle comes with comprehensive inspections and warranty protection for peace of mind.</p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Fast Service</h3>
                <p className="text-muted-foreground">Expert support and quick processing to get you behind the wheel in no time.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Cars Section */}
        <section id="featured" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">Featured Vehicles</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore our handpicked collection of premium vehicles available right now
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
                View All Vehicles
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-primary/5 border-t border-border">
          <div className="container mx-auto text-center max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Ready to Find Your Perfect Car?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our expert team is here to help you find the vehicle that matches your dreams and lifestyle.
            </p>
            <Link
              href="/cars"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors gap-2 group"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
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
