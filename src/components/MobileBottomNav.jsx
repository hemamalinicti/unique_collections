import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Compass, Search, Heart, ShoppingBag } from "lucide-react";
import { useShop } from "../context/ShopContext";

export const MobileBottomNav = () => {
  const location = useLocation();
  const { totalCartCount, wishlist, setIsCartOpen } = useShop();

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Shop", path: "/shop", icon: Compass },
    { label: "Search", path: "/search", icon: Search },
    {
      label: "Wishlist",
      path: "/wishlist",
      icon: Heart,
      badge: wishlist.length > 0 ? wishlist.length : null
    },
    {
      label: "Bag",
      action: () => setIsCartOpen(true),
      icon: ShoppingBag,
      badge: totalCartCount > 0 ? totalCartCount : null,
      isCart: true
    }
  ];

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className="fixed bottom-0 inset-x-0 z-40 bg-[#28170F]/95 backdrop-blur-md border-t border-[#3B2418] lg:hidden safe-area-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.25)]"
    >
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto items-center px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path && (
            item.path === "/" 
              ? location.pathname === "/" 
              : location.pathname.startsWith(item.path)
          );

          if (item.action) {
            return (
              <button
                key={item.label}
                onClick={item.action}
                aria-label="Open Shopping Bag"
                className="flex flex-col items-center justify-center h-full py-1 text-[#F8F3EA]/70 hover:text-[#D8BD96] active:scale-95 transition-all relative cursor-pointer"
              >
                <div className="relative">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2 bg-[#D6B77A] text-[#28170F] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] tracking-wider uppercase font-medium mt-1">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center justify-center h-full py-1 transition-all relative active:scale-95 ${
                isActive
                  ? "text-[#D6B77A] font-semibold"
                  : "text-[#F8F3EA]/70 hover:text-[#D8BD96]"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 stroke-[1.8] ${
                    isActive ? "stroke-[#D6B77A]" : ""
                  }`}
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-[#D6B77A] text-[#28170F] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-wider uppercase font-medium mt-1">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#D6B77A]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
