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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in">
      <header className="mb-12 border-b border-gray-800 pb-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Inventory <span className="text-indigo-500">Manager</span>
            </h1>
            <p className="mt-2 text-gray-400 text-lg">
              Manage your product catalog with precision.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-gray-900/50 px-4 py-2 rounded-lg border border-gray-800">
            <span className="text-indigo-400 font-bold">{products.length}</span>
            <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Items</span>
          </div>
        </div>

        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
          />
          <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
            <h2 className="text-2xl font-bold text-white">
              {searchQuery ? `Results for "${searchQuery}"` : "Product Catalog"}
            </h2>
            <div className="h-px flex-1 bg-gray-800 ml-6 hidden sm:block"></div>
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
        <div className={`fixed bottom-8 right-8 px-6 py-3 rounded-lg shadow-2xl border backdrop-blur-md animate-in flex items-center gap-3 z-50 ${
          toast.type === "error" 
            ? "bg-red-950/80 border-red-900 text-red-200" 
            : "bg-indigo-950/80 border-indigo-900 text-indigo-100"
        }`}>
          <div className={`w-2 h-2 rounded-full ${toast.type === "error" ? "bg-red-500" : "bg-indigo-500"}`} />
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </main>
  );
}
