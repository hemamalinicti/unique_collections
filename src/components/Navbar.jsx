import { BrandLogo } from "./BrandLogo";
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Shirt,
  User
} from "lucide-react";
import { useShop } from "../context/ShopContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clothingDropdownOpen, setClothingDropdownOpen] = useState(false);

  const {
    totalCartCount,
    setIsCartOpen,
    wishlist,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    isSearchOpen,
    setIsSearchOpen
  } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryNav = (categorySlug) => {
    setActiveCategory(categorySlug);
    setClothingDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/shop");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("/shop");
    }
  };

  return (
    <>
      <header
        className="sticky top-0 z-40 transition-all duration-300 w-full h-[72px] sm:h-[75px] bg-[#28170F] border-b border-[#3B2418] flex items-center shadow-md select-none"
      >
        {/* Full-width container with generous luxury spacing - aligned with site grid */}
        <div className="w-full max-w-[1536px] mx-auto px-3.5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-2 sm:gap-6">
            
            {/* Mobile menu hamburger button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open Navigation Menu"
                className="p-1.5 text-[#F8F3EA] hover:text-[#D8BD96] transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Left: Brand Name in elegant uppercase serif typography with ivory text */}
            <div className="flex items-center shrink-0">
              <Link to="/" className="flex items-center group">
                <span className="font-serif text-lg sm:text-xl lg:text-2xl font-bold tracking-[0.22em] sm:tracking-[0.25em] text-[#F8F3EA] uppercase group-hover:text-[#FFFFFF] transition-colors">
                  UNIQUE COLLECTIONS
                </span>
              </Link>
            </div>

            {/* Center: Navigation Links (HOME, COLLECTIONS, BULK ORDERS, ABOUT US, CONTACT) */}
            <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8 text-xs tracking-[0.2em] font-medium uppercase font-sans">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `transition-all py-1.5 border-b-2 ${
                    isActive
                      ? "text-[#F8F3EA] border-[#F8F3EA] font-semibold"
                      : "text-[#F8F3EA]/80 border-transparent hover:text-[#FFFFFF] hover:border-[#D8BD96]/60"
                  }`
                }
              >
                HOME
              </NavLink>

              <NavLink
                to="/collections"
                className={({ isActive }) =>
                  `transition-all py-1.5 border-b-2 ${
                    isActive
                      ? "text-[#F8F3EA] border-[#F8F3EA] font-semibold"
                      : "text-[#F8F3EA]/80 border-transparent hover:text-[#FFFFFF] hover:border-[#D8BD96]/60"
                  }`
                }
              >
                COLLECTIONS
              </NavLink>

              <NavLink
                to="/bulk-orders"
                className={({ isActive }) =>
                  `transition-all py-1.5 border-b-2 ${
                    isActive
                      ? "text-[#F8F3EA] border-[#F8F3EA] font-semibold"
                      : "text-[#F8F3EA]/80 border-transparent hover:text-[#FFFFFF] hover:border-[#D8BD96]/60"
                  }`
                }
              >
                BULK ORDERS
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `transition-all py-1.5 border-b-2 ${
                    isActive
                      ? "text-[#F8F3EA] border-[#F8F3EA] font-semibold"
                      : "text-[#F8F3EA]/80 border-transparent hover:text-[#FFFFFF] hover:border-[#D8BD96]/60"
                  }`
                }
              >
                ABOUT US
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `transition-all py-1.5 border-b-2 ${
                    isActive
                      ? "text-[#F8F3EA] border-[#F8F3EA] font-semibold"
                      : "text-[#F8F3EA]/80 border-transparent hover:text-[#FFFFFF] hover:border-[#D8BD96]/60"
                  }`
                }
              >
                CONTACT
              </NavLink>
            </nav>

            {/* Right: Search, Wishlist, and Cart Pages in the Nav Bar */}
            <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
              {/* Search Page Link */}
              <NavLink
                to="/search"
                title="Search Products"
                aria-label="Search"
                className={({ isActive }) =>
                  `p-2 transition-colors relative flex items-center ${
                    isActive
                      ? "text-[#FFFFFF]"
                      : "text-[#F8F3EA] hover:text-[#D8BD96]"
                  }`
                }
              >
                <Search className="w-5 h-5 stroke-[1.75]" />
              </NavLink>

              {/* Wishlist Page Link */}
              <NavLink
                to="/wishlist"
                title="Saved Wishlist"
                aria-label="Wishlist"
                className={({ isActive }) =>
                  `p-2 transition-colors relative flex items-center ${
                    isActive
                      ? "text-[#FFFFFF]"
                      : "text-[#F8F3EA] hover:text-[#D8BD96]"
                  }`
                }
              >
                <Heart className="w-5 h-5 stroke-[1.75]" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D8BD96] text-[#28170F] text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </NavLink>

              {/* Cart Page Link */}
              <NavLink
                to="/cart"
                title="Shopping Cart"
                aria-label="Cart"
                className={({ isActive }) =>
                  `p-2 transition-colors relative flex items-center ${
                    isActive
                      ? "text-[#FFFFFF]"
                      : "text-[#F8F3EA] hover:text-[#D8BD96]"
                  }`
                }
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
                {totalCartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D8BD96] text-[#28170F] text-[10px] font-bold flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </NavLink>

              {/* Admin Portal Quick Link */}
              <NavLink
                to="/admin"
                title="Admin Management Dashboard"
                aria-label="Admin Dashboard"
                className={({ isActive }) =>
                  `p-2 transition-colors relative flex items-center ${
                    isActive
                      ? "text-[#FFFFFF]"
                      : "text-[#F8F3EA]/80 hover:text-[#D8BD96]"
                  }`
                }
              >
                <User className="w-5 h-5 stroke-[1.75]" />
              </NavLink>
            </div>
          </div>

          {/* Inline Search Bar Drawer */}
          {isSearchOpen && (
            <div className="pt-3 pb-2 border-t border-[#3B2418] mt-3 animate-fadeIn">
              <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-[#C6AD8D]" />
                <input
                  type="text"
                  placeholder="Search shirts, trousers, chinos, fabrics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-[#3B2418] border border-[#D8BD96]/40 text-[#F8F3EA] placeholder-[#C6AD8D]/70 rounded-none pl-10 pr-12 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#D8BD96]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 text-xs text-[#D8BD96] hover:text-[#FFFFFF]"
                  >
                    Clear
                  </button>
                )}
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#28170F] text-[#F8F3EA] h-full shadow-2xl flex flex-col p-6 z-10 overflow-y-auto border-r border-[#3B2418]">
            <div className="flex items-center justify-between pb-4 border-b border-[#3B2418]">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-widest text-[#F8F3EA] uppercase">
                  UNIQUE COLLECTIONS
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-[#F8F3EA] hover:text-[#D8BD96]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-3 font-sans uppercase tracking-[0.18em] text-xs font-medium">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#F8F3EA] hover:text-[#D8BD96] py-2 border-b border-[#3B2418]/60"
              >
                HOME
              </Link>

              <Link
                to="/collections"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#F8F3EA] hover:text-[#D8BD96] py-2 border-b border-[#3B2418]/60"
              >
                COLLECTIONS
              </Link>

              <Link
                to="/bulk-orders"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#F8F3EA] hover:text-[#D8BD96] py-2 border-b border-[#3B2418]/60"
              >
                BULK ORDERS
              </Link>

              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#F8F3EA] hover:text-[#D8BD96] py-2 border-b border-[#3B2418]/60"
              >
                ABOUT US
              </Link>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#F8F3EA] hover:text-[#D8BD96] py-2 border-b border-[#3B2418]/60"
              >
                CONTACT
              </Link>

              <div className="pt-2 border-t border-[#3B2418] space-y-2">
                <Link
                  to="/search"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-[#D8BD96] hover:text-[#FFFFFF] py-2 border-b border-[#3B2418]/60"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    SEARCH
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-[#D8BD96] hover:text-[#FFFFFF] py-2 border-b border-[#3B2418]/60"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    WISHLIST
                  </span>
                  {wishlist.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#D8BD96] text-[#28170F] text-[10px] font-bold">
                      {wishlist.length}
                    </span>
                  )}
                </Link>

                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-[#D8BD96] hover:text-[#FFFFFF] py-2 border-b border-[#3B2418]/60"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    SHOPPING CART
                  </span>
                  {totalCartCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#D8BD96] text-[#28170F] text-[10px] font-bold">
                      {totalCartCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-[#D8BD96] hover:text-[#FFFFFF] py-2 border-b border-[#3B2418]/60"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    ADMIN DASHBOARD
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-[#3B2418]">
              <a
                href="https://wa.me/917598723245"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#D8BD96] text-[#28170F] py-3 rounded-none text-xs font-bold tracking-wider uppercase shadow-md hover:bg-[#EFE3D2] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

