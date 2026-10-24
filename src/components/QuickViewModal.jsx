import React, { useState } from "react";
import { X, Star, ShoppingBag, MessageCircle, ShieldCheck, Check, Building2, Ruler } from "lucide-react";
import { useShop } from "../context/ShopContext";

export const QuickViewModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    openWholesaleModal
  } = useShop();

  const [selectedSize, setSelectedSize] = useState(
    quickViewProduct ? quickViewProduct.sizes[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentSize = selectedSize || product.sizes[0];

  const handleAdd = () => {
    const defaultColor = product.colors && product.colors[0] ? product.colors[0] : { name: "Standard", hex: "#3B2418" };
    addToCart(product, currentSize, defaultColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello UNIQUE Collections, I would like to order:\n- Item: ${product.name}\n- Size: ${currentSize}\n- Qty: ${quantity}\n- Retail Price: ₹${(product.price * quantity).toLocaleString("en-IN")}`
    );
    window.open(`https://wa.me/917598723245?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative bg-[#FFF8ED] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#D6B77A] z-10 my-8">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#2B211B] text-[#FFF8ED] flex items-center justify-center hover:bg-[#6F5142] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Single Product Photo */}
          <div className="md:col-span-6 bg-[#FAF4E9] p-5 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#D6B77A]/30">
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-md border border-[#D6B77A]/40">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#D6B77A] text-[#2B211B] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Tailoring Specs & Ordering */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-[#2B211B] mb-1">
                <span className="uppercase tracking-widest font-semibold text-[11px]">
                  {product.category}
                </span>
                <span className="flex items-center gap-1 font-semibold text-[#2B211B]">
                  <Star className="w-3.5 h-3.5 fill-[#D6B77A] text-[#D6B77A]" />
                  {product.rating} ({product.reviewsCount} verified reviews)
                </span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B211B]">
                {product.name}
              </h2>

              <p className="text-xs text-[#2B211B] mt-1 font-medium">
                {product.tagline}
              </p>

              {/* Price Banner */}
              <div className="mt-3 flex items-baseline gap-3 p-3 bg-[#FAF4E9] rounded-xl border border-[#D6B77A]/40">
                <div>
                  <span className="text-[10px] text-[#2B211B] uppercase tracking-wider block font-semibold">
                    Retail Price
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-bold text-[#2B211B]">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-[#2B211B]/60 line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description & Tailoring Specs */}
              <div className="mt-4 space-y-2 text-xs text-[#2B211B]">
                <p className="leading-relaxed text-[#2B211B]">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                  <div className="p-2 bg-[#FAF4E9] rounded-lg">
                    <span className="text-[#2B211B] block">Fabric:</span>
                    <strong className="text-[#2B211B]">{product.fabric}</strong>
                  </div>
                  <div className="p-2 bg-[#FAF4E9] rounded-lg">
                    <span className="text-[#2B211B] block">Silhouette Fit:</span>
                    <strong className="text-[#2B211B]">{product.fit}</strong>
                  </div>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-[#2B211B]">
                    Select Fit Size: <span className="text-[#2B211B] font-normal">{currentSize}</span>
                  </span>
                  <button
                    onClick={() => setShowSizeChart(!showSizeChart)}
                    className="text-[11px] font-semibold text-[#D6B77A] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>{showSizeChart ? "Hide Size Chart" : "View Size Chart"}</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        currentSize === s
                          ? "bg-[#2B211B] text-[#FFF8ED] border-[#2B211B]"
                          : "bg-[#FAF4E9] text-[#2B211B] border-[#D6B77A]/50 hover:border-[#2B211B]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Collapsible Size Chart Table */}
                {showSizeChart && (
                  <div className="mt-3 p-3 bg-[#FAF4E9] rounded-xl border border-[#D6B77A]/50 text-[10px] animate-fadeIn">
                    <div className="font-bold text-[#2B211B] mb-1">Standard Tailoring Dimensions (Inches):</div>
                    <table className="w-full text-center">
                      <thead>
                        <tr className="border-b border-[#D6B77A]/30 text-[#2B211B]">
                          <th className="py-1">Size</th>
                          <th>Chest</th>
                          <th>Shoulder</th>
                          <th>Length</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#D6B77A]/20">
                        <tr><td className="py-1 font-semibold">38 (S)</td><td>39.5"</td><td>17.5"</td><td>29.0"</td></tr>
                        <tr><td className="py-1 font-semibold">40 (M)</td><td>41.5"</td><td>18.2"</td><td>29.5"</td></tr>
                        <tr><td className="py-1 font-semibold">42 (L)</td><td>43.5"</td><td>19.0"</td><td>30.0"</td></tr>
                        <tr><td className="py-1 font-semibold">44 (XL)</td><td>45.5"</td><td>19.8"</td><td>30.5"</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Quantity Counter */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs font-bold text-[#2B211B]">Quantity:</span>
                <div className="flex items-center border border-[#D6B77A]/60 rounded-lg bg-[#FAF4E9]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-[#2B211B] hover:bg-[#FFF8ED] rounded-l"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-[#2B211B]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-[#2B211B] hover:bg-[#FFF8ED] rounded-r"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs: Side by Side */}
            <div className="space-y-2 pt-4 border-t border-[#D6B77A]/30">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={handleAdd}
                  className={`w-full py-3 px-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    isAdded
                      ? "bg-[#1B5E20] text-white"
                      : "bg-[#2B211B] hover:bg-[#3D2F27] text-[#FFF8ED]"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#D6B77A]" />
                      <span>Add to Bag • ₹{(product.price * quantity).toLocaleString("en-IN")}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="w-full py-3 px-3 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#1B5E20] border border-[#25D366]/40 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1 text-[10px] text-[#2B211B] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D6B77A]" />
                <span>Complimentary Shipping Over ₹999 • Express Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
