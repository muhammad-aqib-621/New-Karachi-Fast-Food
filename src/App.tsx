import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { DealOfTheDay } from './components/deals/DealOfTheDay';
import { MenuSection } from './components/menu/MenuSection';
import { FaloodaSpotlight } from './components/menu/FaloodaSpotlight';
import { LocationSelector } from './components/locations/LocationSelector';
import { ReviewsSection } from './components/reviews/ReviewsSection';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { MobileBottomNav } from './components/layout/MobileBottomNav';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleOpenLocations = () => {
    const el = document.getElementById('locations-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header Navigation */}
      <Navbar onOpenLocationsModal={handleOpenLocations} />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Deal of the Day Banner */}
        <DealOfTheDay />

        {/* 3. Dynamic Interactive Menu Section */}
        <MenuSection />

        {/* 4. Famous Karachi Royal Falooda & Desserts Spotlight */}
        <FaloodaSpotlight />

        {/* 5. Locations & Delivery Coverage */}
        <LocationSelector />

        {/* 6. Customer Testimonials & Social Proof */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sliding Cart Drawer (Zustand State) */}
      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />

      {/* Checkout & Express Dispatch Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Mobile-Friendly Bottom Navigation Bar */}
      <MobileBottomNav onOpenLocations={handleOpenLocations} />
    </div>
  );
}
