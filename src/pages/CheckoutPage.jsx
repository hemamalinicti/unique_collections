import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { ShieldCheck, Check, MessageCircle, ArrowLeft, Truck, CreditCard, Banknote, QrCode } from "lucide-react";

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, subtotal, totalSavings, clearCart, freeShippingRemaining, addOrder } = useShop();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMode, setPaymentMode] = useState("cod");
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderId, setOrderId] = useState("");

  const shippingCost = freeShippingRemaining === 0 ? 0 : 149;
  const grandTotal = subtotal + shippingCost;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newId = `UC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newId);

    addOrder({
      id: newId,
      customer: fullName,
      phone,
      email,
      address,
      city: `${city}, ${state} - ${pincode}`,
      items: cart.map((item) => ({
        name: item.name,
        size: item.selectedSize,
        color: item.selectedColor?.name || "Standard",
        quantity: item.quantity,
        price: item.price
      })),
      amount: grandTotal,
      payment: paymentMode.toUpperCase(),
      status: "Processing"
    });

    setIsCompleted(true);
    clearCart();
  };

  const handleWhatsAppOrderConfirmation = () => {
    const text = encodeURIComponent(
      `*UNIQUE COLLECTIONS - ORDER CONFIRMATION*\n\n*Order ID:* ${orderId}\n*Customer:* ${fullName}\n*Phone:* ${phone}\n*City:* ${city}, ${state} - ${pincode}\n*Total Paid/Due:* ₹${grandTotal.toLocaleString("en-IN")}\n*Payment Mode:* ${paymentMode.toUpperCase()}\n\nPlease send dispatch tracking details!`
    );
    window.open(`https://wa.me/917598723245?text=${text}`, "_blank");
  };

  if (isCompleted) {
    return (
      <div className="bg-[#FFF8ED] min-h-screen py-16 flex items-center justify-center">
        <div className="max-w-lg w-full mx-4 bg-[#FAF4E9] rounded-3xl p-8 sm:p-10 border border-[#D6B77A] shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#1B5E20] text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
            <Check className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-[#D6B77A] bg-[#2B211B] px-3 py-1 rounded-full">
            Order Confirmed
          </span>

          <h2 className="font-serif text-3xl font-bold text-[#2B211B]">
            Thank You, {fullName}!
          </h2>

          <p className="text-xs sm:text-sm text-[#2B211B] leading-relaxed">
            Your sartorial garments are being inspected and prepared for express dispatch. An invoice and SMS confirmation have been generated.
          </p>

          <div className="p-4 bg-[#FFF8ED] rounded-2xl border border-[#D6B77A]/50 text-xs text-left space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[#2B211B]">Order Reference:</span>
              <strong className="text-[#2B211B] font-mono">{orderId}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2B211B]">Payment Method:</span>
              <strong className="text-[#2B211B] uppercase">{paymentMode}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2B211B]">Total Amount:</span>
              <strong className="text-[#2B211B]">₹{grandTotal.toLocaleString("en-IN")}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2B211B]">Estimated Delivery:</span>
              <strong className="text-[#1B5E20]">3 - 5 Business Days</strong>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={handleWhatsAppOrderConfirmation}
              className="w-full py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Get Live Tracking Updates on WhatsApp</span>
            </button>

            <Link
              to="/shop"
              className="block w-full py-2.5 bg-[#2B211B] hover:bg-[#3D2F27] text-[#FFF8ED] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8ED] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 pb-4 border-b border-[#D6B77A]/30">
          <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2B211B] hover:text-[#2B211B] mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Shopping Bag</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-[#2B211B]">
            Checkout & Delivery Information
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form: Shipping & Payment */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact & Shipping Address */}
            <div className="bg-[#FAF4E9] p-6 sm:p-8 rounded-3xl border border-[#D6B77A]/40 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2B211B]">
                <Truck className="w-4 h-4 text-[#D6B77A]" />
                <span>1. Shipping & Delivery Address</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Singhania"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D6B77A]/60 bg-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                    Mobile / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D6B77A]/60 bg-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vikram@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D6B77A]/60 bg-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                  Street Address, Apartment, Landmark *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="House / Flat No., Road Name, Landmark"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D6B77A]/60 bg-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Mumbai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#D6B77A]/60 bg-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Maharashtra"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#D6B77A]/60 bg-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="400001"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#D6B77A]/60 bg-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method */}
            <div className="bg-[#FAF4E9] p-6 sm:p-8 rounded-3xl border border-[#D6B77A]/40 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2B211B]">
                <CreditCard className="w-4 h-4 text-[#D6B77A]" />
                <span>2. Payment Option</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => setPaymentMode("cod")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMode === "cod"
                      ? "bg-[#2B211B] text-[#FFF8ED] border-[#2B211B] shadow-md"
                      : "bg-[#FFF8ED] text-[#2B211B] border-[#D6B77A]/50"
                  }`}
                >
                  <Banknote className="w-5 h-5 mb-2 text-[#D6B77A]" />
                  <div className="font-bold text-xs">Cash on Delivery</div>
                  <div className="text-[10px] opacity-75 mt-0.5">Pay upon delivery</div>
                </div>

                <div
                  onClick={() => setPaymentMode("upi")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMode === "upi"
                      ? "bg-[#2B211B] text-[#FFF8ED] border-[#2B211B] shadow-md"
                      : "bg-[#FFF8ED] text-[#2B211B] border-[#D6B77A]/50"
                  }`}
                >
                  <QrCode className="w-5 h-5 mb-2 text-[#D6B77A]" />
                  <div className="font-bold text-xs">UPI / QR Code</div>
                  <div className="text-[10px] opacity-75 mt-0.5">Instant GPay, PhonePe, Paytm</div>
                </div>

                <div
                  onClick={() => setPaymentMode("card")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMode === "card"
                      ? "bg-[#2B211B] text-[#FFF8ED] border-[#2B211B] shadow-md"
                      : "bg-[#FFF8ED] text-[#2B211B] border-[#D6B77A]/50"
                  }`}
                >
                  <CreditCard className="w-5 h-5 mb-2 text-[#D6B77A]" />
                  <div className="font-bold text-xs">Debit / Credit Card</div>
                  <div className="text-[10px] opacity-75 mt-0.5">Visa, Mastercard, RuPay</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-[#FAF4E9] p-6 sm:p-8 rounded-3xl border border-[#D6B77A]/40 shadow-sm space-y-5 sticky top-24">
            <h3 className="font-serif font-bold text-lg text-[#2B211B] pb-3 border-b border-[#D6B77A]/30">
              Bag Summary
            </h3>

            {/* Small list of items */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-[#D6B77A]/20">
              {cart.map((item) => (
                <div key={item.key} className="pt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img src={item.image} alt="" className="w-10 h-12 object-cover rounded" />
                    <div>
                      <div className="font-serif font-bold text-[#2B211B] line-clamp-1">{item.name}</div>
                      <div className="text-[10px] text-[#2B211B]">Qty: {item.quantity} | {item.selectedSize}</div>
                    </div>
                  </div>
                  <div className="font-bold text-[#2B211B]">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#D6B77A]/30 space-y-2 text-xs text-[#2B211B]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#2B211B]">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-[#1B5E20]">
                  <span>Catalog Savings</span>
                  <span>-₹{totalSavings.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Shipping</span>
                <span className="font-bold text-[#2B211B]">
                  {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                </span>
              </div>
              <div className="pt-3 border-t border-[#D6B77A]/30 flex justify-between text-lg font-serif font-bold text-[#2B211B]">
                <span>Grand Total</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#D6B77A] hover:bg-[#E9D7AE] text-[#2B211B] rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
            >
              Complete Order • ₹{grandTotal.toLocaleString("en-IN")}
            </button>

            <div className="text-[10px] text-center text-[#2B211B] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D6B77A]" />
              <span>SSL Encryption • 7-Day Fit Guarantee</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
