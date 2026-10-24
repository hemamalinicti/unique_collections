import { MobileBottomNav } from "./components/MobileBottomNav";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ShopProvider, useShop } from "./context/ShopContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { QuickViewModal } from "./components/QuickViewModal";
import { WholesaleModal } from "./components/WholesaleModal";
import { WhatsAppFloating } from "./components/WhatsAppFloating";
import { ScrollToTop } from "./components/ScrollToTop";

// Multi-Page Routes
import { HomePage } from "./pages/HomePage";
import { ShopPage } from "./pages/ShopPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { WholesalePage } from "./pages/WholesalePage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { AdminPage } from "./pages/AdminPage";
import { WishlistPage } from "./pages/WishlistPage";
import { SearchPage } from "./pages/SearchPage";

import { CheckCircle2 } from "lucide-react";

const Toast = () => {
  const { toastMessage } = useShop();
  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#28170F] text-[#F8F3EA] px-5 py-2.5 rounded-none shadow-2xl border border-[#D8BD96] text-xs font-semibold flex items-center gap-2 animate-bounce">
      <CheckCircle2 className="w-4 h-4 text-[#D8BD96]" />
      <span>{toastMessage}</span>
    </div>
  );
};

const Layout = () => {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F8F3EA] text-[#2B211B] flex flex-col font-sans selection:bg-[#D8BD96] selection:text-[#28170F]">
      <ScrollToTop />
      {/* Main Navigation */}
      <Navbar />

      {/* Dynamic Route Content */}
      <main className="flex-1 pb-16 lg:pb-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<ShopPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/bulk-orders" element={<WholesalePage />} />
          <Route path="/wholesale" element={<WholesalePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <CartDrawer />
      <QuickViewModal />
      <WholesaleModal />
      <WhatsAppFloating />
      <MobileBottomNav />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <Layout />
      </ShopProvider>
    </BrowserRouter>
  );
}
