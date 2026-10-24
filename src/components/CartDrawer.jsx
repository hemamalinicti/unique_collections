import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, ShieldCheck, Check } from "lucide-react";
import { useShop } from "../context/ShopContext";

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalSavings,
    totalCartCount,
    freeShippingThreshold,
    freeShippingProgress,
    freeShippingRemaining
  } = useShop();

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const itemList = cart
      .map(
        (item) =>
          `• ${item.name} (${item.selectedSize}, ${item.selectedColor.name}) x${item.quantity} = ₹${(
            item.price * item.quantity
          ).toLocaleString("en-IN")}`
      )
      .join("\n");

    const message = encodeURIComponent(
      `*UNIQUE COLLECTIONS - NEW RETAIL ORDER*\n\n*Cart Items:*\n${itemList}\n\n*Subtotal:* ₹${subtotal.toLocaleString(
        "en-IN"
      )}\n*Total Savings:* ₹${totalSavings.toLocaleString("en-IN")}\n\nPlease confirm availability and payment details.`
    );

    window.open(`https://wa.me/917598723245?text=${message}`, "_blank");
  };

  const handleSimulatedCheckout = (e) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      clearCart();
      setOrderSuccess(false);
      setCheckoutModalOpen(false);
      setIsCartOpen(false);
    }, 2800);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
          <div className="w-screen max-w-md bg-[#FFF8ED] shadow-2xl flex flex-col border-l border-[#D6B77A]/40">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-[#D6B77A]/30 flex items-center justify-between bg-[#FAF4E9]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#2B211B]" />
                <h3 className="font-serif font-bold text-lg text-[#2B211B]">
                  Your Shopping Bag
                </h3>
                <span className="text-xs font-semibold bg-[#2B211B] text-[#D6B77A] px-2 py-0.5 rounded-full">
                  {totalCartCount} items
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-[#2B211B] hover:text-[#2B211B] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="px-5 py-3 bg-[#2B211B] text-[#FFF8ED] text-xs">
              <div className="flex items-center justify-between mb-1.5 font-medium">
                {freeShippingRemaining === 0 ? (
                  <span className="text-[#D6B77A] font-bold">
                    🎉 You unlocked Complimentary Express Shipping!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#D6B77A]">₹{freeShippingRemaining.toLocaleString("en-IN")}</strong> more for Free Express Delivery
                  </span>
                )}
                <span>{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#3D2F27] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#D6B77A] transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#FAF4E9] border border-[#D6B77A]/40 mx-auto flex items-center justify-center text-[#2B211B]">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#2B211B]">
                    Your bag is currently empty
                  </h4>
                  <p className="text-xs text-[#2B211B] max-w-xs mx-auto">
                    Explore our curated collection of formal shirts, linen casuals, and tailored trousers.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-3 px-5 py-2.5 bg-[#2B211B] hover:bg-[#3D2F27] text-[#FFF8ED] text-xs font-semibold rounded-full shadow-sm cursor-pointer"
                  >
                    Start Browsing
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.key}
                    className="flex gap-3.5 p-3 rounded-xl bg-[#FAF4E9] border border-[#D6B77A]/40 shadow-xs"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover object-top rounded-lg bg-[#2B211B]/10 shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-serif font-bold text-xs sm:text-sm text-[#2B211B] line-clamp-1">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.key)}
                            aria-label={`Remove ${item.name} from cart`}
                            className="text-[#2B211B] hover:text-[#B71C1C] transition-colors p-0.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-[#2B211B] mt-1">
                          <span>Size: <strong className="text-[#2B211B]">{item.selectedSize}</strong></span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block border"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#D6B77A]/20">
                        {/* Quantity Modifier */}
                        <div className="flex items-center border border-[#D6B77A]/60 rounded-md bg-[#FFF8ED]">
                          <button
                            onClick={() => updateQuantity(item.key, -1)}
                            className="p-1 text-[#2B211B] hover:bg-[#FAF4E9] rounded-l cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-[#2B211B]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.key, 1)}
                            className="p-1 text-[#2B211B] hover:bg-[#FAF4E9] rounded-r cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="font-serif font-bold text-sm text-[#2B211B]">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </div>
                          {item.originalPrice > item.price && (
                            <div className="text-[10px] text-[#2B211B]/60 line-through">
                              ₹{(item.originalPrice * item.quantity).toLocaleString("en-IN")}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-[#D6B77A]/30 bg-[#FAF4E9] space-y-3">
                <div className="space-y-1.5 text-xs text-[#2B211B]">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#2B211B]">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex items-center justify-between text-[#1B5E20]">
                      <span>Catalog Savings</span>
                      <span className="font-semibold">
                        -₹{totalSavings.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-[#2B211B]">
                      {freeShippingRemaining === 0 ? "FREE" : "₹149"}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#D6B77A]/30 flex items-center justify-between text-base font-serif font-bold text-[#2B211B]">
                    <span>Total Amount</span>
                    <span>
                      ₹{(subtotal + (freeShippingRemaining === 0 ? 0 : 149)).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => setCheckoutModalOpen(true)}
                    className="w-full py-3 bg-[#2B211B] hover:bg-[#3D2F27] text-[#FFF8ED] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>Proceed to Fast Checkout</span>
                    <ArrowRight className="w-4 h-4 text-[#D6B77A]" />
                  </button>

                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Order via WhatsApp Assistant</span>
                  </button>
                </div>

                <div className="text-[10px] text-center text-[#2B211B] flex items-center justify-center gap-1 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D6B77A]" />
                  <span>Secure Checkout • 7-Day Fit Guarantee</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Simulated Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => !orderSuccess && setCheckoutModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-[#FFF8ED] rounded-2xl shadow-2xl p-6 sm:p-8 border border-[#D6B77A] z-10">
            {orderSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1B5E20] text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2B211B]">
                  Order Placed Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-[#2B211B] max-w-xs mx-auto">
                  Thank you for shopping with UNIQUE Collections. Your order details and tracking link have been dispatched.
                </p>
                <div className="text-xs font-mono font-semibold text-[#D6B77A] bg-[#2B211B] py-1.5 px-4 rounded-full inline-block">
                  Order ID: UC-{(Math.random() * 900000 + 100000).toFixed(0)}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#D6B77A]/30 mb-5">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-[#2B211B]">
                      Fast Retail Checkout
                    </h3>
                    <p className="text-xs text-[#2B211B]">
                      Total Payable: <strong className="text-[#2B211B]">₹{(subtotal + (freeShippingRemaining === 0 ? 0 : 149)).toLocaleString("en-IN")}</strong>
                    </p>
                  </div>
                  <button
                    onClick={() => setCheckoutModalOpen(false)}
                    className="p-1 text-[#2B211B] hover:text-[#2B211B]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSimulatedCheckout} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Singhania"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6B77A]/60 bg-[#FAF4E9] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6B77A]/60 bg-[#FAF4E9] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                        City & Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Mumbai, 400001"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6B77A]/60 bg-[#FAF4E9] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                      Delivery Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Flat / House No., Street, Landmark"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6B77A]/60 bg-[#FAF4E9] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2B211B] mb-1.5">
                      Payment Mode
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("cod")}
                        className={`p-2 rounded-lg text-xs font-semibold border text-center transition-all ${
                          paymentMethod === "cod"
                            ? "bg-[#2B211B] text-[#FFF8ED] border-[#2B211B]"
                            : "bg-[#FAF4E9] text-[#2B211B] border-[#D6B77A]/60"
                        }`}
                      >
                        Cash on Delivery
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("upi")}
                        className={`p-2 rounded-lg text-xs font-semibold border text-center transition-all ${
                          paymentMethod === "upi"
                            ? "bg-[#2B211B] text-[#FFF8ED] border-[#2B211B]"
                            : "bg-[#FAF4E9] text-[#2B211B] border-[#D6B77A]/60"
                        }`}
                      >
                        UPI / QR
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-2 rounded-lg text-xs font-semibold border text-center transition-all ${
                          paymentMethod === "card"
                            ? "bg-[#2B211B] text-[#FFF8ED] border-[#2B211B]"
                            : "bg-[#FAF4E9] text-[#2B211B] border-[#D6B77A]/60"
                        }`}
                      >
                        Card / NetBanking
                      </button>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#D6B77A] hover:bg-[#E9D7AE] text-[#2B211B] font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors cursor-pointer"
                    >
                      Confirm Order & Dispatch
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
