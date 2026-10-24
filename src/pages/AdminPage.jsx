import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import {
  Package,
  ShoppingBag,
  Building2,
  TrendingUp,
  Search,
  Plus,
  Edit2,
  Trash2,
  Unlock,
  LogOut,
  Eye,
  EyeOff,
  CheckCircle2,
  ExternalLink,
  RotateCcw,
  Tag,
  Percent,
  X,
  AlertTriangle,
  MessageCircle,
  IndianRupee,
  Shield
} from "lucide-react";

export const AdminPage = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStock,
    updateProductStockQuantity,
    resetProductsToDefault,
    orders,
    updateOrderStatus,
    wholesaleInquiries,
    updateWholesaleInquiryStatus
  } = useShop();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("unique_collections_admin_auth") === "true";
  });
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Active Tab: 'inventory' | 'orders' | 'wholesale' | 'analytics'
  const [activeTab, setActiveTab] = useState("inventory");

  // Search & Filters
  const [inventorySearch, setInventorySearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [wholesaleSearch, setWholesaleSearch] = useState("");

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);

  // Preset Catalog Images for easy selection when adding products
  const PRESET_IMAGES = [
    { label: "Deep Aubergine Executive Shirt", url: "/formals/deep-aubergine-executive-shirt.png" },
    { label: "Crisp Oxford Shirt", url: "/formals/crisp-oxford-formal-shirt.png" },
    { label: "Tartan Twill Casual Shirt", url: "/casuals/indigo-tartan-twill-shirt.png" },
    { label: "Vintage Knit Resort Shirt", url: "/casuals/vintage-knit-striped-resort-shirt.png" },
    { label: "Slate Grey Tailored Trousers", url: "/trousers/slate-grey-tailored-trousers.png" },
    { label: "Midnight Black Trousers", url: "/trousers/midnight-black-stretch-trousers.png" },
    { label: "Savile Tailored Trousers", url: "/trousers/savile-tailored-dress-trousers.png" }
  ];

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: "",
    category: "Formal Shirts",
    price: 899,
    originalPrice: 1499,
    wholesalePrice: 499,
    stockCount: 50,
    image: "/formals/deep-aubergine-executive-shirt.png",
    fabric: "100% Egyptian Giza Compact Combed Cotton",
    description: "Tailored to perfection with reinforced collars and breathable weave.",
    inStock: true
  });

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode.trim() === "admin123" || passcode.trim() === "unique2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("unique_collections_admin_auth", "true");
      setPasscodeError("");
    } else {
      setPasscodeError("Invalid password. Please try again.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("unique_collections_admin_auth");
    setPasscode("");
  };

  // Open Edit Modal
  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice || Math.round(product.price * 1.5),
      wholesalePrice: product.wholesalePrice || Math.round(product.price * 0.55),
      stockCount: product.stockCount !== undefined ? product.stockCount : 50,
      image: product.image,
      fabric: product.fabric || "100% Compact Combed Cotton",
      description: product.description || "Precision tailored menswear piece.",
      inStock: product.inStock !== undefined ? product.inStock : true
    });
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "Formal Shirts",
      price: 899,
      originalPrice: 1499,
      wholesalePrice: 499,
      stockCount: 50,
      image: "/formals/deep-aubergine-executive-shirt.png",
      fabric: "100% Certified Combed Cotton",
      description: "Designed for sharp drape and everyday comfort across Indian climates.",
      inStock: true
    });
    setIsAddModalOpen(true);
  };

  // Save Add / Edit
  const handleSaveProduct = (e) => {
    e.preventDefault();
    const priceNum = Number(formData.price);
    if (priceNum >= 1000) {
      alert("Please ensure the price is strictly under ₹1,000 as per store policy.");
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
      setEditingProduct(null);
    } else {
      addProduct(formData);
      setIsAddModalOpen(false);
    }
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const name = (p.name || "").toLowerCase();
      const id = (p.id || "").toLowerCase();
      const q = inventorySearch.toLowerCase();
      const matchesSearch = name.includes(q) || id.includes(q);
      const matchesCategory =
        categoryFilter === "all"
          ? true
          : categoryFilter === "out_of_stock"
          ? !p.inStock
          : p.category === categoryFilter ||
            (p.categorySlug && p.categorySlug.toLowerCase().includes(categoryFilter.toLowerCase().replace(/[^a-z0-9]/g, "")));
      return matchesSearch && matchesCategory;
    });
  }, [products, inventorySearch, categoryFilter]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.customer.toLowerCase().includes(orderSearch.toLowerCase()) ||
        (o.phone && o.phone.includes(orderSearch));
      const matchesStatus = orderStatusFilter === "all" || o.status.toLowerCase() === orderStatusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  // Filtered Wholesale Leads
  const filteredWholesale = useMemo(() => {
    return wholesaleInquiries.filter((w) => {
      return (
        w.company.toLowerCase().includes(wholesaleSearch.toLowerCase()) ||
        w.contact.toLowerCase().includes(wholesaleSearch.toLowerCase()) ||
        (w.city && w.city.toLowerCase().includes(wholesaleSearch.toLowerCase()))
      );
    });
  }, [wholesaleInquiries, wholesaleSearch]);

  // Metrics
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
  }, [orders]);

  const totalWarehouseUnits = useMemo(() => {
    return products.reduce((sum, p) => sum + (Number(p.stockCount) || 0), 0);
  }, [products]);

  const outOfStockCount = useMemo(() => {
    return products.filter((p) => !p.inStock || p.stockCount === 0).length;
  }, [products]);

  // --- PASSCODE / AUTHENTICATION SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="bg-[#FFF8ED] min-h-screen py-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#FAF4E9] rounded-3xl p-8 sm:p-10 border border-[#D6B77A] shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <img
              src="/logo-icon.jpg"
              alt="Unique Collection Logo"
              className="w-20 h-20 rounded-2xl border-2 border-[#D6B77A] object-cover shadow-xl mx-auto"
            />
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#D6B77A] bg-[#2B211B] px-3 py-1 rounded-full inline-block mt-2">
              Management Portal
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B211B]">
              Executive Dashboard
            </h1>
            <p className="text-xs text-[#2B211B]/80 leading-relaxed">
              Enter your store management security PIN to access live catalog pricing, stock controls, and customer order fulfillment.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#2B211B] uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setPasscodeError("");
                  }}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 bg-[#FFF8ED] border border-[#D6B77A]/70 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#D6B77A] text-[#2B211B]"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#2B211B]/60 hover:text-[#2B211B] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passcodeError && (
                <div className="text-xs text-[#B71C1C] font-semibold mt-1.5 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{passcodeError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#2B211B] hover:bg-[#3D2F27] text-[#FFF8ED] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Unlock className="w-4 h-4 text-[#D6B77A]" />
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>


        </div>
      </div>
    );
  }

  // --- AUTHENTICATED DASHBOARD VIEW ---
  return (
    <div className="bg-[#FFF8ED] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D6B77A]/40">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#2B211B]/70 mb-1">
              <Link to="/" className="hover:text-[#2B211B]">Home</Link>
              <span>/</span>
              <span className="text-[#2B211B] font-semibold">Store Management</span>
            </div>
            <div className="flex items-center gap-3.5">
              <img
                src="/logo-icon.jpg"
                alt="Unique Collection Logo"
                className="w-11 h-11 rounded-full border border-[#D6B77A] shadow-md object-cover"
              />
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B211B] leading-tight">
                  Store Administration
                </h1>
                <div className="text-[9px] uppercase tracking-widest text-[#7C5329] font-bold">
                  Unique Collection Executive Suite
                </div>
              </div>
              <span className="text-[11px] bg-[#1B5E20] text-white px-2.5 py-0.5 rounded-full font-semibold inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Live Sync
              </span>
            </div>
            <p className="text-xs text-[#2B211B] mt-1">
              Direct live catalog editing, stock allocation, retail order processing, and wholesale pipeline.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/shop"
              target="_blank"
              className="px-4 py-2 bg-[#FAF4E9] border border-[#D6B77A] hover:bg-[#FFF8ED] text-[#2B211B] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#D6B77A]" />
              <span>Preview Live Store</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-[#2B211B] hover:bg-[#3D2F27] text-[#FFF8ED] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-[#D6B77A]" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* 4 Metric KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-[#FAF4E9] border border-[#D6B77A]/40 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#2B211B] tracking-wider">Gross Sales</span>
              <div className="font-serif text-lg sm:text-2xl font-bold text-[#2B211B] mt-0.5">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </div>
              <span className="text-[10px] text-[#1B5E20] font-semibold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> Across {orders.length} customer orders
              </span>
            </div>
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-[#2B211B] text-[#D6B77A] flex items-center justify-center shadow-xs">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF4E9] border border-[#D6B77A]/40 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#2B211B] tracking-wider">Retail Orders</span>
              <div className="font-serif text-lg sm:text-2xl font-bold text-[#2B211B] mt-0.5">
                {orders.length} Orders
              </div>
              <span className="text-[10px] text-[#D6B77A] font-semibold mt-1 block">
                {orders.filter((o) => o.status === "Processing").length} pending dispatch
              </span>
            </div>
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-[#2B211B] text-[#D6B77A] flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF4E9] border border-[#D6B77A]/40 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#2B211B] tracking-wider">Catalog Garments</span>
              <div className="font-serif text-lg sm:text-2xl font-bold text-[#2B211B] mt-0.5">
                {products.length} Styles
              </div>
              <span className="text-[10px] text-[#2B211B] mt-1 block">
                {totalWarehouseUnits} total warehouse units
              </span>
            </div>
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-[#2B211B] text-[#D6B77A] flex items-center justify-center shadow-xs">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF4E9] border border-[#D6B77A]/40 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#2B211B] tracking-wider">Wholesale Leads</span>
              <div className="font-serif text-lg sm:text-2xl font-bold text-[#2B211B] mt-0.5">
                {wholesaleInquiries.length} Inquiries
              </div>
              <span className="text-[10px] text-[#1B5E20] font-semibold mt-1 block">
                Direct retail partner inquiries
              </span>
            </div>
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-[#2B211B] text-[#D6B77A] flex items-center justify-center shadow-xs">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#D6B77A]/30 gap-2 sm:gap-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab("inventory")}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "inventory"
                ? "border-[#2B211B] text-[#2B211B]"
                : "border-transparent text-[#2B211B]/60 hover:text-[#2B211B]"
            }`}
          >
            <Package className="w-4 h-4 text-[#D6B77A]" />
            <span>Product Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "orders"
                ? "border-[#2B211B] text-[#2B211B]"
                : "border-transparent text-[#2B211B]/60 hover:text-[#2B211B]"
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#D6B77A]" />
            <span>Retail Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("wholesale")}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "wholesale"
                ? "border-[#2B211B] text-[#2B211B]"
                : "border-transparent text-[#2B211B]/60 hover:text-[#2B211B]"
            }`}
          >
            <Building2 className="w-4 h-4 text-[#D6B77A]" />
            <span>Wholesale Leads ({wholesaleInquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "analytics"
                ? "border-[#2B211B] text-[#2B211B]"
                : "border-transparent text-[#2B211B]/60 hover:text-[#2B211B]"
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#D6B77A]" />
            <span>Vouchers & Analytics</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: PRODUCT CATALOG MANAGEMENT */}
        {/* ============================================================== */}
        {activeTab === "inventory" && (
          <div className="space-y-4">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-1 items-center gap-2 max-w-md">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#D6B77A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inventorySearch}
                    onChange={(e) => setInventorySearch(e.target.value)}
                    placeholder="Search by garment title or ID..."
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF4E9] border border-[#D6B77A]/60 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#D6B77A] text-[#2B211B]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 bg-[#FAF4E9] border border-[#D6B77A]/60 rounded-xl text-xs font-semibold text-[#2B211B] focus:outline-none cursor-pointer"
                >
                  <option value="all">All Categories ({products.length})</option>
                  <option value="Formal Shirts">Formal Shirts</option>
                  <option value="Casual Shirts">Casual Shirts</option>
                  <option value="Tailored Trousers">Tailored Trousers</option>
                  <option value="Chinos & Pants">Chinos & Pants</option>
                  <option value="out_of_stock">Out of Stock ({outOfStockCount})</option>
                </select>

                <button
                  onClick={handleOpenAdd}
                  className="px-4 py-2 bg-[#2B211B] hover:bg-[#3D2F27] text-[#FFF8ED] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5 text-[#D6B77A]" />
                  <span>Add New Garment</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Reset catalog back to the 19 standard products?")) {
                      resetProductsToDefault();
                    }
                  }}
                  className="p-2 bg-[#FAF4E9] hover:bg-[#FFF8ED] text-[#2B211B] border border-[#D6B77A]/50 rounded-xl text-xs cursor-pointer"
                  title="Reset to Initial Catalog"
                >
                  <RotateCcw className="w-4 h-4 text-[#D6B77A]" />
                </button>
              </div>
            </div>

            {/* Mobile Garment Cards (< md) */}
            <div className="md:hidden space-y-3">
              {filteredProducts.map((item) => (
                <div key={item.id} className="bg-[#FAF4E9] rounded-2xl p-4 border border-[#D6B77A]/50 shadow-xs space-y-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover object-top rounded-xl bg-white shrink-0 border border-[#D6B77A]/40"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] text-[#2B211B]/60 font-mono font-bold">{item.id}</span>
                        <button
                          onClick={() => toggleProductStock(item.id)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                            item.inStock
                              ? "bg-[#E8F5E9] text-[#1B5E20] border border-[#A5D6A7]"
                              : "bg-[#FFEBEE] text-[#B71C1C] border border-[#EF9A9A]"
                          }`}
                        >
                          {item.inStock ? "● In Stock" : "○ Out"}
                        </button>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#2B211B] leading-tight line-clamp-2">
                        {item.name}
                      </h4>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-[#FFF8ED] border border-[#D6B77A]/40 text-[10px] font-semibold text-[#2B211B]">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-[#FFF8ED] p-2.5 rounded-xl border border-[#D6B77A]/30 text-center">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#2B211B]/60 block">Retail</span>
                      <span className="font-bold text-sm text-[#2B211B]">₹{item.price.toLocaleString("en-IN")}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#2B211B]/60 block">Wholesale</span>
                      <span className="font-semibold text-xs text-[#2B211B]/90">
                        ₹{(item.wholesalePrice || Math.round(item.price * 0.55)).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#2B211B]/60 block">Stock Units</span>
                      <div className="flex items-center justify-center gap-1 mt-0.5">
                        <button
                          onClick={() => updateProductStockQuantity(item.id, -5)}
                          className="w-5 h-5 rounded bg-white border border-[#D6B77A]/60 flex items-center justify-center font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="font-bold text-xs min-w-5">{item.stockCount || 0}</span>
                        <button
                          onClick={() => updateProductStockQuantity(item.id, 5)}
                          className="w-5 h-5 rounded bg-white border border-[#D6B77A]/60 flex items-center justify-center font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-[#D6B77A]/20">
                    <Link
                      to={`/product/${item.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1.5 rounded-lg border border-[#D6B77A]/60 text-[11px] font-semibold text-[#2B211B] flex items-center gap-1 hover:bg-[#FFF8ED]"
                    >
                      <ExternalLink className="w-3 h-3 text-[#D6B77A]" />
                      <span>View</span>
                    </Link>
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="px-3 py-1.5 rounded-lg bg-[#2B211B] text-[#FFF8ED] text-[11px] font-bold flex items-center gap-1 shadow-xs cursor-pointer hover:bg-[#3D2F27]"
                    >
                      <Edit2 className="w-3 h-3 text-[#D6B77A]" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeletingProductId(item.id)}
                      className="p-1.5 rounded-lg border border-[#B71C1C]/40 text-[#B71C1C] hover:bg-[#FFEBEE] cursor-pointer"
                      title="Delete Garment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Products Table (hidden on mobile, visible on md+) */}
            <div className="hidden md:block bg-[#FAF4E9] rounded-3xl p-5 sm:p-6 border border-[#D6B77A]/40 shadow-xs overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-xs">
                <thead>
                  <tr className="border-b border-[#D6B77A]/30 text-[#2B211B] uppercase text-[10px] tracking-wider">
                    <th className="py-3">Garment</th>
                    <th>Category</th>
                    <th>Retail Price</th>
                    <th>Wholesale Rate</th>
                    <th>Stock Units</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D6B77A]/20">
                  {filteredProducts.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FFF8ED]/60 transition-colors">
                      <td className="py-3 font-semibold text-[#2B211B] flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-14 object-cover object-top rounded-lg bg-white shrink-0 border border-[#D6B77A]/40"
                        />
                        <div>
                          <div className="font-serif font-bold text-sm text-[#2B211B]">{item.name}</div>
                          <div className="text-[10px] text-[#2B211B]/60 font-mono mt-0.5">{item.id}</div>
                        </div>
                      </td>
                      <td className="text-[#2B211B]">
                        <span className="px-2 py-0.5 rounded-md bg-[#FFF8ED] border border-[#D6B77A]/40 text-[10px] font-semibold">
                          {item.category}
                        </span>
                      </td>
                      <td className="font-bold text-sm text-[#2B211B]">
                        ₹{item.price.toLocaleString("en-IN")}
                      </td>
                      <td className="text-[#2B211B]/80 font-medium">
                        ₹{(item.wholesalePrice || Math.round(item.price * 0.55)).toLocaleString("en-IN")}
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateProductStockQuantity(item.id, -5)}
                            className="w-6 h-6 rounded-md bg-[#FFF8ED] border border-[#D6B77A]/60 flex items-center justify-center font-bold text-[#2B211B] hover:bg-[#FAF4E9] cursor-pointer"
                            title="-5 Units"
                          >
                            -
                          </button>
                          <span className="font-bold text-[#2B211B] min-w-9 text-center">
                            {item.stockCount || 0}
                          </span>
                          <button
                            onClick={() => updateProductStockQuantity(item.id, 5)}
                            className="w-6 h-6 rounded-md bg-[#FFF8ED] border border-[#D6B77A]/60 flex items-center justify-center font-bold text-[#2B211B] hover:bg-[#FAF4E9] cursor-pointer"
                            title="+5 Units"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => toggleProductStock(item.id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                            item.inStock
                              ? "bg-[#E8F5E9] text-[#1B5E20] border border-[#A5D6A7]"
                              : "bg-[#FFEBEE] text-[#B71C1C] border border-[#EF9A9A]"
                          }`}
                        >
                          {item.inStock ? "● Active In Stock" : "○ Out of Stock"}
                        </button>
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 hover:bg-[#FFF8ED] text-[#2B211B] rounded-lg transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-[#2B211B]" />
                          </button>

                          <Link
                            to={`/product/${item.id}`}
                            target="_blank"
                            className="p-1.5 hover:bg-[#FFF8ED] text-[#2B211B] rounded-lg transition-colors"
                            title="View Product Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-[#D6B77A]" />
                          </Link>

                          <button
                            onClick={() => setDeletingProductId(item.id)}
                            className="p-1.5 hover:bg-[#FFEBEE] text-[#B71C1C] rounded-lg transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-[#B71C1C]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProducts.length === 0 && (
                <div className="py-12 text-center text-xs text-[#2B211B]/70">
                  No products found matching your search or category filter.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: RETAIL CUSTOMER ORDERS */}
        {/* ============================================================== */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#D6B77A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search by order ID, customer name, or phone..."
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF4E9] border border-[#D6B77A]/60 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#D6B77A] text-[#2B211B]"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-[#FAF4E9] border border-[#D6B77A]/60 rounded-xl text-xs font-semibold text-[#2B211B] focus:outline-none cursor-pointer"
                >
                  <option value="all">All Orders ({orders.length})</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            {/* Mobile Order Cards (< md) */}
            <div className="md:hidden space-y-3">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-[#FAF4E9] rounded-2xl p-4 border border-[#D6B77A]/50 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#D6B77A]/20">
                    <div>
                      <span className="font-mono font-bold text-xs text-[#2B211B]">{order.id}</span>
                      <div className="text-[10px] text-[#2B211B]/60">{order.date}</div>
                    </div>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#FFF8ED] border border-[#D6B77A]/40 text-[#2B211B]">
                      {order.payment}
                    </span>
                  </div>

                  <div>
                    <div className="font-semibold text-xs text-[#2B211B]">{order.customer}</div>
                    <div className="text-[11px] text-[#2B211B]/80">{order.phone}</div>
                    <div className="text-[10px] text-[#2B211B]/60 truncate">{order.city}</div>
                  </div>

                  <div className="bg-[#FFF8ED] p-2.5 rounded-xl border border-[#D6B77A]/30 text-xs space-y-1">
                    {Array.isArray(order.items) ? (
                      order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between text-[11px] text-[#2B211B]">
                          <span>{it.quantity}x {it.name} ({it.size})</span>
                          <span className="font-bold">₹{it.price}</span>
                        </div>
                      ))
                    ) : (
                      <span>{order.items}</span>
                    )}
                    <div className="pt-1.5 border-t border-[#D6B77A]/20 flex justify-between font-bold text-xs text-[#2B211B]">
                      <span>Total Amount:</span>
                      <span>₹{Number(order.amount).toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-bold text-[#2B211B]">Status:</span>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border cursor-pointer ${
                        order.status === "Delivered"
                          ? "bg-[#E8F5E9] text-[#1B5E20] border-[#A5D6A7]"
                          : order.status === "Dispatched"
                          ? "bg-[#E3F2FD] text-[#0D47A1] border-[#90CAF9]"
                          : "bg-[#FFF8E1] text-[#E65100] border-[#FFE082]"
                      }`}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Orders Table */}
            <div className="hidden md:block bg-[#FAF4E9] rounded-3xl p-5 sm:p-6 border border-[#D6B77A]/40 shadow-xs overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-xs">
                <thead>
                  <tr className="border-b border-[#D6B77A]/30 text-[#2B211B] uppercase text-[10px] tracking-wider">
                    <th className="py-3">Order ID</th>
                    <th>Customer & Address</th>
                    <th>Garments Ordered</th>
                    <th>Total Amount</th>
                    <th>Payment</th>
                    <th>Fulfillment Status</th>
                    <th className="text-right">Customer Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D6B77A]/20">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#FFF8ED]/60 transition-colors">
                      <td className="py-3">
                        <div className="font-mono font-bold text-[#2B211B]">{order.id}</div>
                        <div className="text-[10px] text-[#2B211B]/60 mt-0.5">{order.date}</div>
                      </td>
                      <td>
                        <div className="font-semibold text-[#2B211B]">{order.customer}</div>
                        <div className="text-[10px] text-[#2B211B]/80">{order.phone}</div>
                        <div className="text-[10px] text-[#2B211B]/60 max-w-xs truncate">{order.city}</div>
                      </td>
                      <td className="max-w-xs">
                        {Array.isArray(order.items) ? (
                          <div className="space-y-1">
                            {order.items.map((it, idx) => (
                              <div key={idx} className="text-[11px] text-[#2B211B]">
                                <span className="font-semibold">{it.quantity}x</span> {it.name}{" "}
                                <span className="text-[#2B211B]/60">({it.size})</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[#2B211B]">{order.items}</span>
                        )}
                      </td>
                      <td className="font-bold text-sm text-[#2B211B]">
                        ₹{Number(order.amount).toLocaleString("en-IN")}
                      </td>
                      <td>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#FFF8ED] border border-[#D6B77A]/40 text-[#2B211B]">
                          {order.payment}
                        </span>
                      </td>
                      <td>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border cursor-pointer ${
                            order.status === "Delivered"
                              ? "bg-[#E8F5E9] text-[#1B5E20] border-[#A5D6A7]"
                              : order.status === "Dispatched"
                              ? "bg-[#E3F2FD] text-[#0D47A1] border-[#90CAF9]"
                              : "bg-[#FFF9C4] text-[#F57F17] border-[#FFF59D]"
                          }`}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="text-right">
                        <a
                          href={`https://wa.me/${(order.phone || "").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                            `Hello ${order.customer}, this is UNIQUE Collections regarding your order #${order.id}. Current status: ${order.status}.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E8F5E9] text-[#1B5E20] hover:bg-[#C8E6C9] font-bold text-[11px] transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredOrders.length === 0 && (
                <div className="py-12 text-center text-xs text-[#2B211B]/70">
                  No orders found. Customer orders placed on the checkout page will appear here immediately.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: WHOLESALE LEADS */}
        {/* ============================================================== */}
        {activeTab === "wholesale" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#D6B77A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={wholesaleSearch}
                  onChange={(e) => setWholesaleSearch(e.target.value)}
                  placeholder="Search by company, contact person, or city..."
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF4E9] border border-[#D6B77A]/60 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#D6B77A] text-[#2B211B]"
                />
              </div>
            </div>

            {/* Mobile Wholesale Inquiry Cards (< md) */}
            <div className="md:hidden space-y-3">
              {filteredWholesale.map((lead) => (
                <div key={lead.id} className="bg-[#FAF4E9] rounded-2xl p-4 border border-[#D6B77A]/50 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#D6B77A]/20">
                    <div>
                      <span className="font-mono font-bold text-xs text-[#2B211B]">{lead.id}</span>
                      <span className="ml-2 text-[10px] font-bold text-[#D6B77A] bg-[#2B211B] px-2 py-0.5 rounded-full">
                        {lead.quantity}
                      </span>
                    </div>
                    <select
                      value={lead.status}
                      onChange={(e) => updateWholesaleInquiryStatus(lead.id, e.target.value)}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md border bg-[#FFF8ED] text-[#2B211B] border-[#D6B77A]/60"
                    >
                      <option value="New Inquiry">New Inquiry</option>
                      <option value="Quotation Sent">Quotation Sent</option>
                      <option value="In Negotiation">In Negotiation</option>
                      <option value="Order Confirmed">Order Confirmed</option>
                    </select>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-[#2B211B]">{lead.company}</h4>
                    <div className="text-[11px] text-[#2B211B]/80">{lead.contact} • {lead.city}</div>
                    <div className="text-[10px] text-[#2B211B]/60 mt-0.5">{lead.phone}</div>
                  </div>

                  <div className="bg-[#FFF8ED] p-2.5 rounded-xl border border-[#D6B77A]/30 text-xs">
                    <div className="font-semibold text-[11px] text-[#2B211B]">Category: {lead.category}</div>
                    {lead.notes && (
                      <div className="text-[10px] text-[#2B211B]/70 mt-1 italic">"{lead.notes}"</div>
                    )}
                  </div>

                  <div className="flex justify-end pt-1">
                    <a
                      href={`https://wa.me/${(lead.phone || "").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        `Hello ${lead.contact}, this is UNIQUE Collections regarding your wholesale inquiry for ${lead.quantity} of ${lead.category}.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2 bg-[#2B211B] text-[#D6B77A] hover:bg-[#3D2F27] rounded-xl text-xs font-bold text-center transition-colors shadow-xs"
                    >
                      Send WhatsApp Quotation
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Wholesale Table */}
            <div className="hidden md:block bg-[#FAF4E9] rounded-3xl p-5 sm:p-6 border border-[#D6B77A]/40 shadow-xs overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-xs">
                <thead>
                  <tr className="border-b border-[#D6B77A]/30 text-[#2B211B] uppercase text-[10px] tracking-wider">
                    <th className="py-3">Lead ID</th>
                    <th>Firm & City</th>
                    <th>Contact Person</th>
                    <th>Product Category</th>
                    <th>Batch Volume</th>
                    <th>Notes</th>
                    <th>Status</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D6B77A]/20">
                  {filteredWholesale.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#FFF8ED]/60 transition-colors">
                      <td className="py-3 font-mono font-bold text-[#2B211B]">{lead.id}</td>
                      <td>
                        <div className="font-semibold text-[#2B211B]">{lead.company}</div>
                        <div className="text-[10px] text-[#2B211B]/60">{lead.city}</div>
                      </td>
                      <td>
                        <div className="font-medium text-[#2B211B]">{lead.contact}</div>
                        <div className="text-[10px] text-[#2B211B]/70">{lead.phone}</div>
                      </td>
                      <td className="text-[#2B211B] font-medium">{lead.category}</td>
                      <td className="font-bold text-[#2B211B]">{lead.quantity}</td>
                      <td className="text-[#2B211B]/70 max-w-xs truncate text-[11px]">{lead.notes || "-"}</td>
                      <td>
                        <select
                          value={lead.status}
                          onChange={(e) => updateWholesaleInquiryStatus(lead.id, e.target.value)}
                          className="text-[11px] font-bold px-2 py-1 rounded-lg border bg-[#FFF8ED] text-[#2B211B] border-[#D6B77A]/60 cursor-pointer"
                        >
                          <option value="New Inquiry">New Inquiry</option>
                          <option value="Quotation Sent">Quotation Sent</option>
                          <option value="In Negotiation">In Negotiation</option>
                          <option value="Order Confirmed">Order Confirmed</option>
                        </select>
                      </td>
                      <td className="text-right">
                        <a
                          href={`https://wa.me/${(lead.phone || "").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                            `Hello ${lead.contact}, this is UNIQUE Collections regarding your wholesale inquiry for ${lead.quantity} of ${lead.category}.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 bg-[#2B211B] text-[#D6B77A] hover:bg-[#3D2F27] rounded-lg text-[11px] font-bold transition-colors"
                        >
                          <span>Send Quote</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredWholesale.length === 0 && (
                <div className="py-12 text-center text-xs text-[#2B211B]/70">
                  No wholesale inquiries recorded yet.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: VOUCHERS & ANALYTICS */}
        {/* ============================================================== */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FAF4E9] rounded-3xl p-6 border border-[#D6B77A]/40 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#D6B77A]" />
                <h3 className="font-serif font-bold text-lg text-[#2B211B]">Active Discount Vouchers</h3>
              </div>
              <p className="text-xs text-[#2B211B]/80 leading-relaxed">
                These promotional codes are currently active for retail customers in the bag and checkout pages.
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#FFF8ED] border border-[#D6B77A]/50 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-sm text-[#2B211B]">WELCOME10</span>
                    <span className="block text-xs text-[#1B5E20] font-semibold mt-0.5">10% Instant Discount</span>
                    <span className="text-[10px] text-[#2B211B]/70">Valid across entire menswear catalog</span>
                  </div>
                  <span className="text-xs bg-[#E8F5E9] text-[#1B5E20] px-2.5 py-1 rounded-full font-bold">
                    Active
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFF8ED] border border-[#D6B77A]/50 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-sm text-[#2B211B]">SARTORIAL</span>
                    <span className="block text-xs text-[#1B5E20] font-semibold mt-0.5">₹500 Flat Savings</span>
                    <span className="text-[10px] text-[#2B211B]/70">VIP voucher code for loyal patrons</span>
                  </div>
                  <span className="text-xs bg-[#E8F5E9] text-[#1B5E20] px-2.5 py-1 rounded-full font-bold">
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF4E9] rounded-3xl p-6 border border-[#D6B77A]/40 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-[#D6B77A]" />
                <h3 className="font-serif font-bold text-lg text-[#2B211B]">Wholesale Tier Policies</h3>
              </div>
              <p className="text-xs text-[#2B211B]/80 leading-relaxed">
                Active bulk discount slabs implemented across the wholesale booking portal:
              </p>

              <div className="space-y-3 text-xs text-[#2B211B]">
                <div className="p-3 bg-[#FFF8ED] rounded-xl border border-[#D6B77A]/40 flex justify-between items-center">
                  <span><strong>Tier 1:</strong> 20 to 49 Pieces</span>
                  <span className="font-bold text-[#D6B77A] bg-[#2B211B] px-2 py-0.5 rounded">25% Discount</span>
                </div>
                <div className="p-3 bg-[#FFF8ED] rounded-xl border border-[#D6B77A]/40 flex justify-between items-center">
                  <span><strong>Tier 2:</strong> 50 to 199 Pieces</span>
                  <span className="font-bold text-[#D6B77A] bg-[#2B211B] px-2 py-0.5 rounded">37% Discount</span>
                </div>
                <div className="p-3 bg-[#FFF8ED] rounded-xl border border-[#D6B77A]/40 flex justify-between items-center">
                  <span><strong>Tier 3:</strong> 200+ Pieces</span>
                  <span className="font-bold text-[#D6B77A] bg-[#2B211B] px-2 py-0.5 rounded">49% Discount</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ============================================================== */}
      {/* ADD / EDIT PRODUCT MODAL */}
      {/* ============================================================== */}
      {(isAddModalOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => {
              setIsAddModalOpen(false);
              setEditingProduct(null);
            }}
          />
          <div className="relative bg-[#FAF4E9] rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#D6B77A] shadow-2xl z-10 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#D6B77A]/30">
              <h3 className="font-serif font-bold text-xl text-[#2B211B]">
                {editingProduct ? "Edit Garment Details" : "Add New Garment to Catalog"}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingProduct(null);
                }}
                className="p-1 text-[#2B211B]/60 hover:text-[#2B211B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#2B211B] mb-1">Garment Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sovereign Sky Blue Oxford Shirt"
                  className="w-full px-3 py-2 bg-[#FFF8ED] border border-[#D6B77A]/60 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D6B77A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#2B211B] mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFF8ED] border border-[#D6B77A]/60 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D6B77A]"
                  >
                    <option value="Formal Shirts">Formal Shirts</option>
                    <option value="Casual Shirts">Casual Shirts</option>
                    <option value="Tailored Trousers">Tailored Trousers</option>
                    <option value="Chinos & Pants">Chinos & Pants</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#2B211B] mb-1">Warehouse Stock Units</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stockCount}
                    onChange={(e) => setFormData({ ...formData, stockCount: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFF8ED] border border-[#D6B77A]/60 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-[#2B211B] mb-1">
                    Retail Price (₹) <span className="text-[#B71C1C]">*Must be &lt; ₹1,000</span>
                  </label>
                  <input
                    type="number"
                    max="999"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFF8ED] border border-[#D6B77A]/60 rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#2B211B] mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFF8ED] border border-[#D6B77A]/60 rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#2B211B] mb-1">Wholesale Rate (₹)</label>
                  <input
                    type="number"
                    value={formData.wholesalePrice}
                    onChange={(e) => setFormData({ ...formData, wholesalePrice: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFF8ED] border border-[#D6B77A]/60 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#2B211B] mb-1">Garment Image</label>
                <div className="space-y-2">
                  <select
                    onChange={(e) => {
                      if (e.target.value) setFormData({ ...formData, image: e.target.value });
                    }}
                    className="w-full px-3 py-2 bg-[#FFF8ED] border border-[#D6B77A]/60 rounded-xl focus:outline-none"
                  >
                    <option value="">Select from uploaded catalogue photos...</option>
                    {PRESET_IMAGES.map((img, idx) => (
                      <option key={idx} value={img.url}>
                        {img.label} ({img.url})
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Or enter direct image URL (/formals/...)"
                    className="w-full px-3 py-2 bg-[#FFF8ED] border border-[#D6B77A]/60 rounded-xl focus:outline-none font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#2B211B] mb-1">Fabric & Mill Details</label>
                <input
                  type="text"
                  value={formData.fabric}
                  onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                  placeholder="e.g. 100% Egyptian Giza Cotton"
                  className="w-full px-3 py-2 bg-[#FFF8ED] border border-[#D6B77A]/60 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#2B211B] mb-1">Short Description</label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FFF8ED] border border-[#D6B77A]/60 rounded-xl focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-4 h-4 accent-[#2B211B] rounded cursor-pointer"
                />
                <label htmlFor="inStockCheck" className="text-xs font-semibold text-[#2B211B] cursor-pointer">
                  Available in Store (In Stock)
                </label>
              </div>

              <div className="pt-3 border-t border-[#D6B77A]/30 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 border border-[#D6B77A]/60 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2B211B] text-[#FFF8ED] rounded-xl font-bold uppercase tracking-wider hover:bg-[#3D2F27] cursor-pointer shadow-sm"
                >
                  {editingProduct ? "Save Changes" : "Add to Store"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ============================================================== */}
      {deletingProductId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={() => setDeletingProductId(null)} />
          <div className="relative bg-[#FAF4E9] rounded-2xl p-6 border border-[#B71C1C]/40 shadow-2xl max-w-sm w-full z-10 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#FFEBEE] text-[#B71C1C] flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2B211B]">Delete This Product?</h3>
            <p className="text-xs text-[#2B211B]/80 leading-relaxed">
              This will remove the garment from your active store catalog. You can always re-add it or use "Reset to Default" later.
            </p>
            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => setDeletingProductId(null)}
                className="px-4 py-2 border border-[#D6B77A]/60 rounded-xl text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProduct(deletingProductId);
                  setDeletingProductId(null);
                }}
                className="px-4 py-2 bg-[#B71C1C] hover:bg-[#8B0000] text-white rounded-xl text-xs font-bold cursor-pointer shadow-sm"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
