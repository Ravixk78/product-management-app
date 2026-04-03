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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in">
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200/60">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Inventory Dashboard
            </h1>
            <p className="mt-1 text-slate-500 font-medium tracking-wide leading-relaxed">
              Managing <span className="text-blue-600 font-semibold">{products.length} active items</span> across your catalog.
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm border-b-2 border-b-blue-600/20">
            <div className="flex flex-col">
              <span className="text-sm font-bold uppercase tracking-wider text-slate-400">Total Stock</span>
              <span className="text-2xl font-black text-slate-900 leading-none mt-1">{products.length}</span>
            </div>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:max-w-md group">
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/40 transition-all font-medium"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
        <aside className="xl:col-span-4 lg:sticky lg:top-24">
          <ProductForm
            onSubmit={isEditing ? handleUpdateProduct : handleAddProduct}
            initialProduct={isEditing}
            onCancel={isEditing ? () => setIsEditing(null) : null}
          />
        </aside>

        <section className="xl:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              {searchQuery ? `Search Results (${filteredProducts.length})` : "Current Catalog"}
            </h2>
            <div className="flex-1 h-px bg-slate-200/60 ml-6"></div>
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
        <div className={`fixed bottom-8 right-8 px-6 py-4 rounded-2xl shadow-2xl border animate-in flex items-center gap-4 z-50 backdrop-blur-md ${toast.type === "error"
            ? "bg-white border-red-100 text-red-600"
            : "bg-slate-900/95 border-slate-800 text-white"
          }`}>
          {toast.type !== "error" ? (
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
             <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          <span className="font-bold text-sm tracking-tight">{toast.message}</span>
        </div>
      )}
    </main>
  );
}
