import React, { useState, useEffect } from "react";
import { Sparkles, PhoneCall, Package, ChevronRight, X } from "lucide-react";
import { useShop } from "../context/ShopContext";

export const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { openWholesaleModal } = useShop();

  const announcements = [
    {
      icon: Sparkles,
      text: "Crafted for Distinction • Complimentary Express Shipping on Orders Above ₹999",
      actionText: "Shop Now",
      actionLink: "#featured-collections"
    },
    {
      icon: Package,
      text: "Wholesale & Bulk Orders Available • Factory Direct Rates & Custom Batch Tailoring",
      actionText: "Request Quote",
      isWholesale: true
    },
    {
      icon: PhoneCall,
      text: "Personal Menswear Concierge & WhatsApp Ordering: +91 98765 43210",
      actionText: "Chat Now",
      actionLink: "https://wa.me/917598723245?text=Hello%20UNIQUE%20Collections,%20I%20have%20an%20enquiry"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  if (!isVisible) return null;

  const current = announcements[currentIndex];
  const Icon = current.icon;

  return (
    <aside aria-label="Announcements and Special Offers" className="bg-[#2B211B] text-[#FFF8ED] text-xs font-medium border-b border-[#6F5142]/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
        {/* Left filler for desktop balance */}
        <div className="hidden lg:flex items-center space-x-4 text-[#D6B77A] text-[11px] uppercase tracking-wider font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6B77A] animate-pulse"></span>
            Exclusive Luxury Menswear
          </span>
          <span className="text-[#2B211B]">|</span>
          <span className="text-[#FFF8ED]/70">Retail & Bulk Supply</span>
        </div>

        {/* Center announcement carousel */}
        <div className="flex-1 flex items-center justify-center text-center px-2">
          <div className="flex items-center justify-center gap-2 animate-fadeIn transition-all">
            <Icon className="w-3.5 h-3.5 text-[#D6B77A] shrink-0" />
            <span className="tracking-wide text-[12px] sm:text-xs">
              {current.text}
            </span>
            {current.isWholesale ? (
              <button
                onClick={() => openWholesaleModal()}
                className="inline-flex items-center gap-0.5 text-[#D6B77A] font-semibold underline underline-offset-2 hover:text-[#FFF8ED] transition-colors ml-1.5 cursor-pointer"
              >
                {current.actionText}
                <ChevronRight className="w-3 h-3" />
              </button>
            ) : (
              <a
                href={current.actionLink}
                target={current.actionLink.startsWith("http") ? "_blank" : "_self"}
                rel={current.actionLink.startsWith("http") ? "noreferrer" : undefined}
                className="inline-flex items-center gap-0.5 text-[#D6B77A] font-semibold underline underline-offset-2 hover:text-[#FFF8ED] transition-colors ml-1.5"
              >
                {current.actionText}
                <ChevronRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Right close button & support hotline */}
        <div className="flex items-center space-x-3 text-right">
          <a
            href="https://wa.me/917598723245"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1 text-[11px] text-[#D6B77A] hover:text-[#FFF8ED] transition-colors"
          >
            <span>Support: +91 98765 43210</span>
          </a>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss Announcement"
            className="text-[#FFF8ED]/50 hover:text-[#D6B77A] transition-colors p-0.5 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
