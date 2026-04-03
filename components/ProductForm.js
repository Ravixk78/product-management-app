"use client";

import { useState, useEffect } from "react";

export default function ProductForm({ onSubmit, initialProduct = null, onCancel = null }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (initialProduct) {
      setFormData(initialProduct);
    } else {
      setFormData({ name: "", price: "", description: "", image: "" });
    }
  }, [initialProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    onSubmit(formData);
    if (!initialProduct) {
      setFormData({ name: "", price: "", description: "", image: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-lg space-y-6">
      <div className="pb-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          {initialProduct ? "Edit Product" : "New Product"}
        </h2>
        <p className="text-sm text-slate-500 font-medium">
          {initialProduct ? "Update product information" : "Create a new catalog item"}
        </p>
      </div>
      
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Wireless Headphones"
          required
          className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/40 transition-all font-medium"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Price (LKR)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            required
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/40 transition-all font-medium"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/40 transition-all font-medium"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description of the product..."
          rows="4"
          className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/40 transition-all resize-none font-medium leading-relaxed"
        />
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-[0.98] tracking-tight flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {initialProduct ? "Update Product" : "Create Product"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-3 border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-all text-sm tracking-tight"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
