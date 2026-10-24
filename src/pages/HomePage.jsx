import React from "react";
import { Hero } from "../components/Hero";
import { CompactTrustBar } from "../components/CompactTrustBar";
import { CategoryHighlights } from "../components/CategoryHighlights";
import { FeaturedArrivals } from "../components/FeaturedArrivals";
import { WholesaleTeaser } from "../components/WholesaleTeaser";
import { Testimonials } from "../components/Testimonials";

export const HomePage = () => {
  return (
    <div>
      {/* 1. Sleek Editorial Hero */}
      <Hero />

      {/* 2. Compact 4-Pillar Trust Strip */}
      <CompactTrustBar />

      {/* 3. Shop By Category (4 visual cards) */}
      <CategoryHighlights />

      {/* 4. Top 4 Featured Pieces */}
      <FeaturedArrivals />

      {/* 5. Minimalist B2B Wholesale Strip */}
      <WholesaleTeaser />

      {/* 6. Client Endorsements */}
      <Testimonials />
    </div>
  );
};
