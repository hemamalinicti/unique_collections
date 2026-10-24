import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS } from "../data/products";

const ShopContext = createContext();

export const getCategorySlug = (category) => {
  if (!category) return "casual-shirts";
  const cat = category.toLowerCase();
  if (cat.includes("formal")) return "formal-shirts";
  if (cat.includes("casual")) return "casual-shirts";
  if (cat.includes("trouser")) return "tailored-trousers";
  if (cat.includes("chino") || cat.includes("pant")) return "chinos-pants";
  return cat.replace(/[^a-z0-9]+/g, "-");
};

const INITIAL_ORDERS = [
  {
    id: "UC-839201",
    customer: "Vikramaditya S.",
    phone: "+91 98201 44321",
    email: "vikram@example.com",
    city: "Mumbai, MH",
    address: "Flat 402, Sea Crest Towers, Worli",
    items: [
      { name: "Sovereign Royal Aubergine Executive Shirt", size: "40 (M)", color: "Royal Aubergine", quantity: 1, price: 899 }
    ],
    amount: 899,
    payment: "COD",
    status: "Dispatched",
    date: "22 Oct 2026, 02:45 PM"
  },
  {
    id: "UC-618492",
    customer: "Arjun K. Nair",
    phone: "+91 94481 99201",
    email: "arjun.nair@example.com",
    city: "Bengaluru, KA",
    address: "Villa 14, Palm Meadows, Whitefield",
    items: [
      { name: "Mayfair Slate Grey Modern Tailored Trousers", size: "32", color: "Slate Grey", quantity: 1, price: 949 }
    ],
    amount: 949,
    payment: "UPI",
    status: "Delivered",
    date: "21 Oct 2026, 11:20 AM"
  },
  {
    id: "UC-948102",
    customer: "Kunal Verma",
    phone: "+91 98765 43210",
    email: "kunal.v@example.com",
    city: "Surat, GJ",
    address: "704, Diamond City Heights, Ring Road",
    items: [
      { name: "Highland Indigo Tartan Twill Casual Shirt", size: "40 (M)", color: "Indigo Navy", quantity: 2, price: 699 }
    ],
    amount: 1398,
    payment: "UPI",
    status: "Processing",
    date: "22 Oct 2026, 05:15 PM"
  }
];

const INITIAL_WHOLESALE_LEADS = [
  {
    id: "WS-101",
    company: "Rajesh Textiles & Retail",
    contact: "Rajesh Parekh",
    phone: "+91 98251 11223",
    email: "rajesh.textiles@example.com",
    city: "Surat, Gujarat",
    category: "Chinos & Casual Pants",
    quantity: "250 Pieces",
    notes: "Requires customized boutique tagging and weekly dispatch.",
    status: "Quotation Sent",
    date: "22 Oct 2026"
  },
  {
    id: "WS-102",
    company: "Sovereign Men's Boutique",
    contact: "Karan Johar",
    phone: "+91 98192 33445",
    email: "karan.sovereign@example.com",
    city: "South Mumbai",
    category: "Formal Oxford Shirts",
    quantity: "100 Pieces",
    notes: "Mix of size 38, 40, and 42 in white and aubergine.",
    status: "In Negotiation",
    date: "21 Oct 2026"
  },
  {
    id: "WS-103",
    company: "The Gentleman Lounge",
    contact: "Aditya Roy",
    phone: "+91 99001 77889",
    email: "aditya.roy@example.com",
    city: "Indiranagar, Bengaluru",
    category: "Tailored Pleated Trousers",
    quantity: "50 Pieces",
    notes: "Starter order with sample swatches.",
    status: "Order Confirmed",
    date: "20 Oct 2026"
  }
];

export const ShopProvider = ({ children }) => {
  // Products state persisted in localStorage
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("unique_collections_products");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Error loading products from localStorage", e);
    }
    // Initialize with stockCount and inStock if missing
    return PRODUCTS.map((p, idx) => ({
      ...p,
      categorySlug: p.categorySlug || getCategorySlug(p.category),
      stockCount: p.stockCount !== undefined ? p.stockCount : (45 + (idx % 10) * 12),
      inStock: p.inStock !== undefined ? p.inStock : true
    }));
  });

  // Orders state persisted in localStorage
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("unique_collections_orders");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Error loading orders from localStorage", e);
    }
    return INITIAL_ORDERS;
  });

  // Wholesale inquiries state
  const [wholesaleInquiries, setWholesaleInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem("unique_collections_wholesale_inquiries");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Error loading inquiries from localStorage", e);
    }
    return INITIAL_WHOLESALE_LEADS;
  });

  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("unique_collections_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("unique_collections_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isWholesaleModalOpen, setIsWholesaleModalOpen] = useState(false);
  const [wholesaleSelectedProduct, setWholesaleSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("unique_collections_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("unique_collections_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("unique_collections_wholesale_inquiries", JSON.stringify(wholesaleInquiries));
  }, [wholesaleInquiries]);

  useEffect(() => {
    localStorage.setItem("unique_collections_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("unique_collections_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Real-time synchronization across browser tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "unique_collections_products" && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          if (Array.isArray(updated)) setProducts(updated);
        } catch (err) {
          console.error(err);
        }
      }
      if (e.key === "unique_collections_orders" && e.newValue) {
        try {
          const updatedOrders = JSON.parse(e.newValue);
          if (Array.isArray(updatedOrders)) setOrders(updatedOrders);
        } catch (err) {
          console.error(err);
        }
      }
      if (e.key === "unique_collections_wholesale_inquiries" && e.newValue) {
        try {
          const updatedWholesale = JSON.parse(e.newValue);
          if (Array.isArray(updatedWholesale)) setWholesaleInquiries(updatedWholesale);
        } catch (err) {
          console.error(err);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Toast handler
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Product CRUD methods for Admin
  const addProduct = (newProduct) => {
    const id = newProduct.id || ("uc-" + String(products.length + 1).padStart(2, "0"));
    const category = newProduct.category || "Formal Shirts";
    const categorySlug = newProduct.categorySlug || getCategorySlug(category);
    const price = Number(newProduct.price) || 899;
    const originalPrice = Number(newProduct.originalPrice) || Math.round(price * 1.5);
    const wholesalePrice = Number(newProduct.wholesalePrice) || Math.round(price * 0.55);
    const stockCount = newProduct.stockCount !== undefined ? Number(newProduct.stockCount) : 50;
    const inStock = newProduct.inStock !== undefined ? Boolean(newProduct.inStock) && stockCount > 0 : true;

    const productToAdd = {
      ...newProduct,
      id,
      name: newProduct.name || "Handcrafted Menswear Piece",
      category,
      categorySlug,
      price,
      originalPrice,
      wholesalePrice,
      stockCount,
      inStock,
      isFeatured: newProduct.isFeatured !== undefined ? newProduct.isFeatured : true,
      tagline: newProduct.tagline || newProduct.fabric || "Premium Handcrafted Menswear",
      fabric: newProduct.fabric || "100% Compact Combed Cotton",
      fit: newProduct.fit || "Tailored Modern Fit",
      description: newProduct.description || "Designed for sharp drape and everyday comfort across Indian climates.",
      image: newProduct.image || "/formals/deep-aubergine-executive-shirt.png",
      sizes: newProduct.sizes && newProduct.sizes.length ? newProduct.sizes : (
        categorySlug.includes("shirt")
          ? ["38 (S)", "40 (M)", "42 (L)", "44 (XL)", "46 (XXL)"]
          : ["30", "32", "34", "36", "38", "40"]
      ),
      colors: newProduct.colors && newProduct.colors.length ? newProduct.colors : [
        { name: "Signature", hex: "#2B211B", border: "#D6B77A" }
      ],
      rating: 4.85,
      reviewsCount: 12
    };

    setProducts((prev) => [productToAdd, ...prev]);
    showToast("Added \"" + productToAdd.name + "\" to catalog");
    return productToAdd;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const category = updatedFields.category || item.category;
          const categorySlug = updatedFields.categorySlug || getCategorySlug(category);
          const price = updatedFields.price !== undefined ? Number(updatedFields.price) : item.price;
          const originalPrice = updatedFields.originalPrice !== undefined ? Number(updatedFields.originalPrice) : item.originalPrice;
          const wholesalePrice = updatedFields.wholesalePrice !== undefined ? Number(updatedFields.wholesalePrice) : item.wholesalePrice;
          const stockCount = updatedFields.stockCount !== undefined ? Number(updatedFields.stockCount) : item.stockCount;
          const inStock = updatedFields.inStock !== undefined ? Boolean(updatedFields.inStock) : item.inStock;

          return {
            ...item,
            ...updatedFields,
            category,
            categorySlug,
            price,
            originalPrice,
            wholesalePrice,
            stockCount,
            inStock
          };
        }
        return item;
      })
    );
    showToast("Product updated successfully in store");
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    showToast("Product deleted from catalog");
  };

  const toggleProductStock = (id) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = !item.inStock;
          showToast("\"" + item.name + "\" marked " + (newStatus ? "In Stock" : "Out of Stock"));
          return { ...item, inStock: newStatus };
        }
        return item;
      })
    );
  };

  const updateProductStockQuantity = (id, delta) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newCount = Math.max(0, (item.stockCount || 0) + delta);
          return { ...item, stockCount: newCount, inStock: newCount > 0 ? item.inStock : false };
        }
        return item;
      })
    );
  };

  const resetProductsToDefault = () => {
    const defaults = PRODUCTS.map((p, idx) => ({
      ...p,
      categorySlug: p.categorySlug || getCategorySlug(p.category),
      stockCount: 45 + (idx % 10) * 12,
      inStock: true
    }));
    setProducts(defaults);
    localStorage.setItem("unique_collections_products", JSON.stringify(defaults));
    showToast("Catalog reset to initial products");
  };

  // Orders Management methods
  const addOrder = (orderData) => {
    const orderId = orderData.id || ("UC-" + Math.floor(100000 + Math.random() * 900000));
    const newOrder = {
      ...orderData,
      id: orderId,
      status: orderData.status || "Processing",
      date: orderData.date || new Date().toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast("Order " + orderId + " updated to " + newStatus);
  };

  // Wholesale Inquiries Management methods
  const addWholesaleInquiry = (inquiryData) => {
    const id = "WS-" + Math.floor(100 + Math.random() * 900);
    const newInquiry = {
      ...inquiryData,
      id,
      status: inquiryData.status || "New Inquiry",
      date: new Date().toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    };
    setWholesaleInquiries((prev) => [newInquiry, ...prev]);
    showToast("Wholesale inquiry submitted successfully");
    return newInquiry;
  };

  const updateWholesaleInquiryStatus = (id, newStatus) => {
    setWholesaleInquiries((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: newStatus } : w))
    );
    showToast("Inquiry " + id + " updated to " + newStatus);
  };

  // Cart operations
  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    const size = selectedSize || (product.sizes && product.sizes[0]) || "Standard";
    const color = selectedColor || (product.colors && product.colors[0]) || { name: "Standard", hex: "#2B211B" };
    const itemKey = product.id + "-" + size + "-" + color.name;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.key === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          key: itemKey,
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          selectedSize: size,
          selectedColor: color,
          quantity
        }
      ];
    });

    showToast("Added \"" + product.name + "\" (" + size + ") to your cart");
  };

  const updateQuantity = (key, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.key === key) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (key) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
    showToast("Item removed from cart");
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from Wishlist");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Saved to your Wishlist");
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // Wholesale modal trigger
  const openWholesaleModal = (product = null) => {
    setWholesaleSelectedProduct(product);
    setIsWholesaleModalOpen(true);
  };

  const closeWholesaleModal = () => {
    setIsWholesaleModalOpen(false);
    setWholesaleSelectedProduct(null);
  };

  // Totals calculations
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalSavings = cart.reduce(
    (sum, item) => sum + ((item.originalPrice || item.price) - item.price) * item.quantity,
    0
  );
  const freeShippingThreshold = 999;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <ShopContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStock,
        updateProductStockQuantity,
        resetProductsToDefault,
        orders,
        addOrder,
        updateOrderStatus,
        wholesaleInquiries,
        addWholesaleInquiry,
        updateWholesaleInquiryStatus,
        cart,
        wishlist,
        totalCartCount,
        subtotal,
        totalSavings,
        freeShippingThreshold,
        freeShippingProgress,
        freeShippingRemaining,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        isWholesaleModalOpen,
        openWholesaleModal,
        closeWholesaleModal,
        wholesaleSelectedProduct,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        toastMessage,
        showToast,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isWishlisted
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
