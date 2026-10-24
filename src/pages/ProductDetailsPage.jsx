import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import {
  Star,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Truck,
  RotateCcw,
  Ruler,
  Check,
  Building2,
  ChevronRight,
  Heart
} from "lucide-react";
import { ProductCard } from "../components/ProductCard";

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isWishlisted, openWholesaleModal } = useShop();

  const product = products.find((p) => p.id === id) || products[0];

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [isAdded, setIsAdded] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
    .concat(products.filter((p) => p.id !== product.id && p.categorySlug !== product.categorySlug))
    .slice(0, 3);

  const handleAddToCart = () => {
    const defaultColor = product.colors && product.colors[0] ? product.colors[0] : { name: "Standard", hex: "#3B2418" };
    addToCart(product, selectedSize, defaultColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hello UNIQUE Collections, I would like to order:\n- Item: ${product.name}\n- Size: ${selectedSize}\n- Quantity: ${quantity}\n- Retail Price: ₹${(product.price * quantity).toLocaleString("en-IN")}`
    );
    window.open(`https://wa.me/917598723245?text=${text}`, "_blank");
  };

  return (
    <div className="bg-[#FFF8ED] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#2B211B] mb-8 pb-4 border-b border-[#D6B77A]/30">
          <Link to="/" className="hover:text-[#2B211B]">Home</Link>
          <ChevronRight className="w-3 h-3 text-[#D6B77A]" />
          <Link to="/shop" className="hover:text-[#2B211B]">Collections</Link>
          <ChevronRight className="w-3 h-3 text-[#D6B77A]" />
          <span className="text-[#2B211B] font-semibold">{product.name}</span>
        </div>

        {/* Product Showcase: Gallery + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Single Product Image */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden bg-[#2B211B]/5 border-2 border-[#D6B77A]/40 shadow-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
              />

              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#D6B77A] text-[#2B211B] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow">
                  {product.badge}
                </span>
              )}

              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist toggle"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#FFF8ED]/90 backdrop-blur-xs flex items-center justify-center text-[#2B211B] shadow-md hover:bg-[#FFF8ED] cursor-pointer"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-[#3B2418] text-[#2B211B]" : ""}`} />
              </button>
            </div>
          </div>

          {/* Right Column: Pricing, Specs & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-[#2B211B] mb-1.5">
                <span className="font-bold uppercase tracking-widest text-[11px] text-[#2B211B]">
                  {product.category}
                </span>
                <span className="flex items-center gap-1 font-semibold text-[#2B211B]">
                  <Star className="w-4 h-4 fill-[#D6B77A] text-[#D6B77A]" />
                  {product.rating} ({product.reviewsCount} customer reviews)
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B211B] leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-[#2B211B] mt-1.5 font-medium">
                {product.tagline}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF4E9] border border-[#D6B77A]/50 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase font-bold text-[#2B211B] block">Retail Price</span>
                <div className="flex items-baseline gap-2.5 mt-0.5">
                  <span className="font-serif text-3xl font-bold text-[#2B211B]">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-[#2B211B]/60 line-through">
                      ₹{Number(product.originalPrice).toLocaleString("en-IN")}
                    </span>
                  )}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xs font-bold text-[#1B5E20] bg-[#E8F5E9] px-2 py-0.5 rounded">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
              </div>

              <div>
                {product.inStock ? (
                  <span className="text-xs bg-[#E8F5E9] text-[#1B5E20] border border-[#A5D6A7] font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#1B5E20] animate-pulse" />
                    In Stock ({product.stockCount || 50} units)
                  </span>
                ) : (
                  <span className="text-xs bg-[#FFEBEE] text-[#B71C1C] border border-[#EF9A9A] font-bold px-3 py-1 rounded-full">
                    ○ Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Size Selection & Guide */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-[#2B211B]">
                  Collar / Waist Size: <strong className="text-[#2B211B]">{selectedSize}</strong>
                </span>
                <button
                  onClick={() => setShowSizeChart(!showSizeChart)}
                  className="text-xs font-semibold text-[#D6B77A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>{showSizeChart ? "Close Measurements" : "Measurement Guide"}</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      selectedSize === s
                        ? "bg-[#2B211B] text-[#FFF8ED] border-[#2B211B] shadow-sm"
                        : "bg-[#FAF4E9] text-[#2B211B] border-[#D6B77A]/50 hover:border-[#2B211B]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Collapsible Measurement Chart */}
              {showSizeChart && (
                <div className="mt-3 p-4 bg-[#FAF4E9] rounded-2xl border border-[#D6B77A]/50 text-xs animate-fadeIn">
                  <div className="font-bold text-[#2B211B] mb-1.5">Garment Tailoring Dimensions (Inches):</div>
                  <table className="w-full text-center text-xs">
                    <thead>
                      <tr className="border-b border-[#D6B77A]/40 text-[#2B211B]">
                        <th className="py-1.5">Size</th>
                        <th>Chest</th>
                        <th>Shoulder</th>
                        <th>Length</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D6B77A]/20">
                      <tr><td className="py-1.5 font-bold">38 (S)</td><td>39.5"</td><td>17.5"</td><td>29.0"</td></tr>
                      <tr><td className="py-1.5 font-bold">40 (M)</td><td>41.5"</td><td>18.2"</td><td>29.5"</td></tr>
                      <tr><td className="py-1.5 font-bold">42 (L)</td><td>43.5"</td><td>19.0"</td><td>30.0"</td></tr>
                      <tr><td className="py-1.5 font-bold">44 (XL)</td><td>45.5"</td><td>19.8"</td><td>30.5"</td></tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quantity Modifier */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#2B211B]">Quantity:</span>
              <div className="flex items-center border border-[#D6B77A]/60 rounded-xl bg-[#FAF4E9]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-1.5 text-sm font-semibold hover:bg-[#FFF8ED] rounded-l cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold text-[#2B211B]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-1.5 text-sm font-semibold hover:bg-[#FFF8ED] rounded-r cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTAs: Side by Side */}
            <div className="pt-4 border-t border-[#D6B77A]/30">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={product.inStock ? handleAddToCart : undefined}
                  disabled={!product.inStock}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all ${
                    !product.inStock
                      ? "bg-[#D6B77A]/30 text-[#2B211B]/50 cursor-not-allowed border border-[#D6B77A]/30"
                      : isAdded
                      ? "bg-[#1B5E20] text-white cursor-pointer"
                      : "bg-[#2B211B] hover:bg-[#3D2F27] text-[#FFF8ED] cursor-pointer"
                  }`}
                >
                  {!product.inStock ? (
                    <span>Currently Out of Stock</span>
                  ) : isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#D6B77A]" />
                      <span>Add to Bag • ₹{(Number(product.price) * quantity).toLocaleString("en-IN")}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 px-4 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#1B5E20] border border-[#25D366]/40 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                  <span>Instant WhatsApp Order</span>
                </button>
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#D6B77A]/30 text-center text-xs text-[#2B211B]">
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-[#D6B77A] mb-1" />
                <span className="font-semibold text-[#2B211B]">Free Express Delivery</span>
                <span className="text-[10px]">On orders &gt; ₹999</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-4 h-4 text-[#D6B77A] mb-1" />
                <span className="font-semibold text-[#2B211B]">7-Day Fit Guarantee</span>
                <span className="text-[10px]">Hassle-free exchange</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-[#D6B77A] mb-1" />
                <span className="font-semibold text-[#2B211B]">Certified Authentic</span>
                <span className="text-[10px]">100% Giza / Flax / Wool</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info: Tailoring Specs / Fabric / Care */}
        <div className="mt-16 pt-10 border-t border-[#D6B77A]/30">
          <div className="flex gap-4 border-b border-[#D6B77A]/30 pb-3">
            <button
              onClick={() => setActiveTab("description")}
              className={`text-sm font-bold pb-2 border-b-2 transition-all cursor-pointer ${
                activeTab === "description"
                  ? "border-[#2B211B] text-[#2B211B]"
                  : "border-transparent text-[#2B211B] hover:text-[#2B211B]"
              }`}
            >
              Garment Narrative
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`text-sm font-bold pb-2 border-b-2 transition-all cursor-pointer ${
                activeTab === "specs"
                  ? "border-[#2B211B] text-[#2B211B]"
                  : "border-transparent text-[#2B211B] hover:text-[#2B211B]"
              }`}
            >
              Tailoring & Material Specs
            </button>
          </div>

          <div className="py-6 text-sm text-[#2B211B] leading-relaxed max-w-4xl">
            {activeTab === "description" && (
              <div className="space-y-3">
                <p>{product.description}</p>
                <p>
                  Cut to modern proportions that balance formal authority with contemporary comfort. Hand-finished collar stays ensure crisp roll without collapsing throughout long boardroom sessions or evening dinners.
                </p>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#FAF4E9] rounded-xl border border-[#D6B77A]/40">
                  <span className="font-bold text-[#2B211B] block mb-1">Fabric Composition:</span>
                  <span>{product.fabric}</span>
                </div>
                <div className="p-4 bg-[#FAF4E9] rounded-xl border border-[#D6B77A]/40">
                  <span className="font-bold text-[#2B211B] block mb-1">Silhouette Profile:</span>
                  <span>{product.fit}</span>
                </div>
                <div className="p-4 bg-[#FAF4E9] rounded-xl border border-[#D6B77A]/40">
                  <span className="font-bold text-[#2B211B] block mb-1">Buttons & Fasteners:</span>
                  <span>Natural Mother-of-Pearl Shell / Brass Side Buckles</span>
                </div>
                <div className="p-4 bg-[#FAF4E9] rounded-xl border border-[#D6B77A]/40">
                  <span className="font-bold text-[#2B211B] block mb-1">Care Guidelines:</span>
                  <span>Machine wash gentle 30°C / Dry clean recommended for wool trousers</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Menswear Garments */}
        <div className="mt-16 pt-10 border-t border-[#D6B77A]/30">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#2B211B]">Recommended</span>
              <h2 className="font-serif text-2xl font-bold text-[#2B211B]">Complete Your Ensemble</h2>
            </div>
            <Link to="/shop" className="text-xs font-bold text-[#D6B77A] hover:underline">
              View All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
