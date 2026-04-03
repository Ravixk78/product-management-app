"use client";

import { useState, useEffect, useMemo } from "react";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import { getProducts, saveProducts, generateId } from "@/utils/storage";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setProducts(getProducts());
    setIsLoaded(true);
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const handleAddProduct = (data) => {
    const newProduct = { ...data, id: generateId() };
    const updated = [newProduct, ...products];
    setProducts(updated);
    saveProducts(updated);
    showToast("Product added successfully!");
  };

  const handleUpdateProduct = (data) => {
    const updated = products.map((p) => (p.id === data.id ? data : p));
    setProducts(updated);
    saveProducts(updated);
    setIsEditing(null);
    showToast("Product updated successfully!");
  };

  const handleDeleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      saveProducts(updated);
      showToast("Product deleted.", "error");
    }
  };

  if (!isLoaded) return null;

  return (
    <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 animate-in">
      <header className="mb-16 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Inventory <span className="text-blue-600">Manager Pro</span>
            </h1>
            <p className="mt-3 text-slate-500 text-lg font-medium max-w-lg leading-relaxed">
              Efficiently handle your catalog with <span className="text-slate-900 font-bold decoration-blue-600 decoration-2 underline underline-offset-4"></span> precision.
            </p>
          </div>
          <div className="flex items-center gap-6 bg-white px-8 py-4 rounded-[2rem] border-2 border-blue-50 shadow-2xl shadow-blue-900/10">
            <div className="flex flex-col items-center">
              <span className="text-blue-600 font-black text-4xl tracking-tighter leading-none">{products.length}</span>
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Active Units</span>
            </div>
          </div>
        </div>

        <div className="relative max-w-xl group">
          <input
            type="text"
            placeholder="Search catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-900 shadow-sm placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-600 transition-all font-medium"
          />
          <svg className="absolute left-4 top-4 h-6 w-6 text-slate-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
        <aside className="xl:col-span-4 sticky top-8">
          <ProductForm
            onSubmit={isEditing ? handleUpdateProduct : handleAddProduct}
            initialProduct={isEditing}
            onCancel={isEditing ? () => setIsEditing(null) : null}
          />
        </aside>

        <section className="xl:col-span-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              {searchQuery ? `Search Results` : "Stock Inventory"}
            </h2>
            <div className="h-0.5 flex-1 bg-slate-100 ml-6 rounded-full"></div>
          </div>

          <ProductList
            products={filteredProducts}
            onEdit={(p) => {
              setIsEditing(p);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onDelete={handleDeleteProduct}
          />
        </section>
      </div>

      {toast && (
        <div className={`fixed bottom-8 right-8 px-8 py-5 rounded-2xl shadow-2xl border animate-in flex items-center gap-4 z-50 ${toast.type === "error"
            ? "bg-white border-red-100 text-red-600"
            : "bg-slate-900 border-slate-800 text-white"
          }`}>
          {toast.type !== "error" && <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-lg" />}
          <span className="font-bold text-sm tracking-tight">{toast.message}</span>
        </div>
      )}
    </main>
  );
}
