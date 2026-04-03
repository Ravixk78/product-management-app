"use client";

import ProductCard from "./ProductCard";

export default function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <p className="text-slate-900 font-bold text-lg tracking-tight">No products found</p>
        <p className="text-slate-500 text-sm font-medium mt-1">Try adjusting your search or add a new item to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
