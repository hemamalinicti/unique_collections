import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, ChevronRight, Sparkles, Check } from "lucide-react";

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalSavings,
    totalCartCount,
    freeShippingThreshold,
    freeShippingRemaining,
    freeShippingProgress
  } = useShop();

  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "WELCOME10") {
      setPromoDiscount(Math.round(subtotal * 0.1));
      setPromoApplied(true);
      setPromoError("");
    } else if (promoCode.trim().toUpperCase() === "SARTORIAL") {
      setPromoDiscount(500);
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try 'WELCOME10' for 10% off or 'SARTORIAL' for ₹500 off.");
      setPromoDiscount(0);
      setPromoApplied(false);
    }
  };

  const shippingCost = freeShippingRemaining === 0 ? 0 : 149;
  const finalTotal = Math.max(0, subtotal - promoDiscount + shippingCost);

  return (
    <div className="bg-[#FFF8ED] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#2B211B] mb-8 pb-4 border-b border-[#D6B77A]/30">
          <Link to="/" className="hover:text-[#2B211B]">Home</Link>
          <ChevronRight className="w-3 h-3 text-[#D6B77A]" />
          <Link to="/shop" className="hover:text-[#2B211B]">Collections</Link>
          <ChevronRight className="w-3 h-3 text-[#D6B77A]" />
          <span className="text-[#2B211B] font-semibold">Shopping Bag ({totalCartCount})</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B211B] mb-8">
          Your Sartorial Selection
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-24 bg-[#FAF4E9] rounded-3xl border border-[#D6B77A]/40 max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FFF8ED] border border-[#D6B77A] mx-auto flex items-center justify-center text-[#2B211B]">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#2B211B]">
              Your Shopping Bag is Currently Empty
            </h2>
            <p className="text-xs text-[#2B211B] max-w-sm mx-auto">
              Explore our handcrafted shirts, tailored trousers, and chinos to add pieces to your bag.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2B211B] text-[#FFF8ED] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#3D2F27] transition-colors"
            >
              <span>Browse Catalog</span>
              <ArrowRight className="w-4 h-4 text-[#D6B77A]" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Delivery Bar */}
              <div className="p-4 rounded-2xl bg-[#2B211B] text-[#FFF8ED] text-xs">
                <div className="flex items-center justify-between mb-2">
                  <span>
                    {freeShippingRemaining === 0 ? (
                      <strong className="text-[#D6B77A] inline-flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#D6B77A]" /> Complimentary Express Delivery Unlocked!
                      </strong>
                    ) : (
                      <span>
                        Add <strong className="text-[#D6B77A]">₹{freeShippingRemaining.toLocaleString("en-IN")}</strong> more for Free Shipping
                      </span>
                    )}
                  </span>
                  <span className="font-semibold text-[#D6B77A]">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#3D2F27] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D6B77A] rounded-full transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="bg-[#FAF4E9] rounded-3xl p-6 border border-[#D6B77A]/40 divide-y divide-[#D6B77A]/30">
                {cart.map((item) => (
                  <div key={item.key} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover object-top rounded-xl bg-white shrink-0 border border-[#D6B77A]/30"
                    />

                    <div className="flex-1 space-y-1">
                      <h3 className="font-serif font-bold text-base text-[#2B211B]">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-[#2B211B]">
                        <span>Size: <strong className="text-[#2B211B]">{item.selectedSize}</strong></span>
                        <span className="text-[#D6B77A] font-bold">•</span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border inline-block"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                      </div>
                      <div className="text-xs text-[#2B211B] font-semibold pt-1">
                        ₹{item.price.toLocaleString("en-IN")} each
                      </div>
                    </div>

                    {/* Quantity modifier */}
                    <div className="flex items-center border border-[#D6B77A]/60 rounded-xl bg-[#FFF8ED]">
                      <button
                        onClick={() => updateQuantity(item.key, -1)}
                        className="p-1.5 text-[#2B211B] hover:bg-[#FAF4E9] rounded-l cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-[#2B211B]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.key, 1)}
                        className="p-1.5 text-[#2B211B] hover:bg-[#FAF4E9] rounded-r cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right sm:min-w-24">
                      <div className="font-serif font-bold text-base text-[#2B211B]">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        className="text-[11px] text-[#B71C1C] hover:underline flex items-center gap-1 ml-auto mt-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Order Summary & Checkout Action */}
            <div className="lg:col-span-4 space-y-5 sticky top-24">
              {/* Promo Code Box */}
              <div className="bg-[#FAF4E9] rounded-2xl p-5 border border-[#D6B77A]/40 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2B211B] mb-2">
                  <Tag className="w-3.5 h-3.5 text-[#D6B77A]" />
                  <span>Promo / VIP Discount Voucher</span>
                </div>
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. WELCOME10"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs uppercase rounded-lg border border-[#D6B77A]/60 bg-[#FFF8ED] focus:outline-none focus:ring-1 focus:ring-[#D6B77A]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#2B211B] text-[#FFF8ED] text-xs font-semibold rounded-lg hover:bg-[#3D2F27] cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {promoApplied && (
                  <div className="text-[11px] text-[#1B5E20] font-semibold mt-1.5 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-[#1B5E20]" />
                    <span>Code applied! You saved ₹{promoDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                {promoError && (
                  <div className="text-[11px] text-[#B71C1C] mt-1.5">{promoError}</div>
                )}
              </div>

              {/* Price Calculation Box */}
              <div className="bg-[#FAF4E9] rounded-3xl p-6 border border-[#D6B77A]/40 shadow-sm space-y-3.5">
                <h3 className="font-serif font-bold text-lg text-[#2B211B] pb-3 border-b border-[#D6B77A]/30">
                  Order Summary
                </h3>

                <div className="space-y-2 text-xs text-[#2B211B]">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalCartCount} items)</span>
                    <span className="font-semibold text-[#2B211B]">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="flex justify-between text-[#1B5E20]">
                      <span>Catalog Discount</span>
                      <span>-₹{totalSavings.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-[#1B5E20]">
                      <span>VIP Voucher Discount</span>
                      <span>-₹{promoDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-[#2B211B]">
                      {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-[#D6B77A]/30 flex justify-between text-base font-serif font-bold text-[#2B211B]">
                    <span>Total Amount</span>
                    <span>₹{finalTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full py-3.5 bg-[#2B211B] hover:bg-[#3D2F27] text-[#FFF8ED] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>Proceed to Delivery & Payment</span>
                    <ArrowRight className="w-4 h-4 text-[#D6B77A]" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#2B211B] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D6B77A]" />
                  <span>Secure 256-bit Encrypted Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
