"use client";

import ProductCard from "./ProductCard";

export default function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 border border-dashed border-gray-800 rounded-xl bg-gray-900/20">
        <p className="text-gray-500 font-medium text-lg">No products found</p>
        <p className="text-gray-600 text-sm">Add some products to see them here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
