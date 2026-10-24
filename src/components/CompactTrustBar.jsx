import React from "react";
import { Truck, ShieldCheck, Crown } from "lucide-react";

// Elegant Thin-Line Clothes Hanger Icon
const HangerIcon = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Hanger Hook */}
    <path d="M12 3a2.5 2.5 0 0 1 2.5 2.5c0 1.2-.8 2.2-1.9 2.5L12 8.2" />
    {/* Hanger Body */}
    <path d="M12 8.2 2.8 14.5a1.5 1.5 0 0 0-.8 1.3v.7a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-.7a1.5 1.5 0 0 0-.8-1.3L12 8.2z" />
  </svg>
);

export const CompactTrustBar = () => {
  const benefits = [
    {
      icon: HangerIcon,
      heading: "PREMIUM QUALITY",
      description: "Only the finest fabrics"
    },
    {
      icon: Truck,
      heading: "FAST & RELIABLE SHIPPING",
      description: "To your doorstep"
    },
    {
      icon: ShieldCheck,
      heading: "SECURE PAYMENTS",
      description: "Shop with confidence"
    },
    {
      icon: Crown,
      heading: "STYLISH FOR EVERY MAN",
      description: "From casual to formal"
    }
  ];

  return (
    <section className="w-full bg-[#F8F3EA] border-b border-[#D8BD96]/50 py-8 sm:py-10">
      <div className="w-full max-w-[1536px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center sm:items-start lg:items-center gap-4 px-2 lg:px-8 ${
                  idx !== benefits.length - 1
                    ? "lg:border-r lg:border-[#D8BD96]/60"
                    : ""
                }`}
              >
                {/* Elegant Thin-Line Espresso Icon */}
                <div className="w-12 h-12 rounded-none bg-[#EFE3D2]/70 border border-[#D8BD96]/40 flex items-center justify-center shrink-0 text-[#3B2418] transition-transform duration-300 hover:scale-105">
                  <Icon className="w-6 h-6 stroke-[1.6]" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col text-left">
                  <h3 className="font-sans font-bold text-xs sm:text-sm tracking-[0.16em] uppercase text-[#28170F] leading-tight mb-1">
                    {item.heading}
                  </h3>
                  <p className="font-serif text-xs sm:text-sm text-[#2B211B] leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

