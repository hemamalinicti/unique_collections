import React from "react";
import { Link } from "react-router-dom";

export const BrandLogo = ({
  variant = "navbar", // "navbar" | "footer" | "icon" | "crest" | "admin"
  className = "",
  showSubtitle = true
}) => {
  if (variant === "icon") {
    return (
      <img
        src="/logo-icon.jpg"
        alt="Unique Collection Crest"
        className={"w-10 h-10 rounded-full border border-[#D6B77A]/60 shadow-sm object-cover " + className}
      />
    );
  }

  if (variant === "crest") {
    return (
      <div className={"flex flex-col items-center text-center " + className}>
        <img
          src="/logo-crest.jpg"
          alt="Unique Collection Royal Crest"
          className="w-48 sm:w-56 h-auto rounded-2xl border border-[#D6B77A]/40 shadow-xl object-contain"
        />
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <Link to="/" className={"flex items-center gap-3.5 group " + className}>
        <img
          src="/logo-icon.jpg"
          alt="Unique Collection Crest"
          className="w-12 h-12 rounded-full border border-[#D6B77A]/70 shadow-lg object-cover transition-transform group-hover:scale-105 shrink-0"
        />
        <div>
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase text-[#F8F3EA] group-hover:text-[#FFFFFF] transition-colors block">
            UNIQUE COLLECTION
          </span>
          {showSubtitle && (
            <div className="text-[10px] uppercase tracking-widest text-[#D6B77A] font-semibold mt-0.5">
              Luxury Sartorial Menswear • Tirupur, Tamil Nadu
            </div>
          )}
        </div>
      </Link>
    );
  }

  if (variant === "admin") {
    return (
      <div className={"flex items-center gap-3 " + className}>
        <img
          src="/logo-icon.jpg"
          alt="Unique Collection Crest"
          className="w-10 h-10 rounded-full border border-[#D6B77A] shadow-md object-cover shrink-0"
        />
        <div>
          <div className="font-serif text-base sm:text-lg font-bold tracking-[0.18em] text-[#28170F] uppercase">
            UNIQUE COLLECTION
          </div>
          <div className="text-[9px] uppercase tracking-widest text-[#7C5329] font-bold">
            Executive Portal
          </div>
        </div>
      </div>
    );
  }

  // Default: "navbar"
  return (
    <Link to="/" className={"flex items-center gap-2.5 sm:gap-3 group " + className}>
      <img
        src="/logo-icon.jpg"
        alt="Unique Collection Crest"
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D6B77A]/70 shadow-sm object-cover transition-transform group-hover:scale-105 shrink-0"
      />
      <div className="flex flex-col justify-center">
        <span className="font-serif text-sm sm:text-lg lg:text-xl font-bold tracking-[0.14em] sm:tracking-[0.22em] text-[#F8F3EA] uppercase group-hover:text-[#FFFFFF] transition-colors leading-tight">
          UNIQUE COLLECTION
        </span>
        {showSubtitle && (
          <span className="text-[8px] sm:text-[9px] tracking-[0.28em] text-[#D6B77A] font-semibold uppercase hidden sm:block leading-none mt-0.5">
            Sartorial Menswear
          </span>
        )}
      </div>
    </Link>
  );
};

export default BrandLogo;
