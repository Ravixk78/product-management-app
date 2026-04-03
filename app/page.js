"use client";

import { useState, useEffect } from "react";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import { getProducts, saveProducts, generateId } from "@/utils/storage";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProducts(getProducts());
    setIsLoaded(true);
  }, []);

  const handleAddProduct = (data) => {
    const newProduct = { ...data, id: generateId() };
    const updated = [newProduct, ...products];
    setProducts(updated);
    saveProducts(updated);
  };

  const handleUpdateProduct = (data) => {
    const updated = products.map((p) => (p.id === data.id ? data : p));
    setProducts(updated);
    saveProducts(updated);
    setIsEditing(null);
  };

  const handleDeleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      saveProducts(updated);
    }
  };

  if (!isLoaded) return null;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12 border-b border-gray-800 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Inventory <span className="text-indigo-500">Manager</span>
          </h1>
          <p className="mt-2 text-gray-400 text-lg">
            Effortlessly track and manage your product catalog in real-time.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-gray-900/50 px-4 py-2 rounded-lg border border-gray-800">
          <span className="text-indigo-400 font-bold">{products.length}</span>
          <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Products</span>
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
            <h2 className="text-2xl font-bold text-white">Product Catalog</h2>
            <div className="h-px flex-1 bg-gray-800 ml-6 hidden sm:block"></div>
          </div>
          
          <ProductList
            products={products}
            onEdit={setIsEditing}
            onDelete={handleDeleteProduct}
          />
        </section>
      </div>
    </main>
  );
}
