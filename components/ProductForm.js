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
    <form onSubmit={handleSubmit} className="bg-white border-2 border-slate-900 p-8 rounded-3xl shadow-2xl shadow-slate-200/40 space-y-8">
      <h2 className="text-3xl font-black text-slate-950 leading-none tracking-tighter">
        {initialProduct ? "Modify Details" : "Add New Item"}
      </h2>
      
      <div className="space-y-2">
        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Title</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ex: Smart Projector"
          required
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-bold"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Price (LKR)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0"
            step="1"
            required
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-bold"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Asset Link</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="URL Here"
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-bold"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Detailed specs…"
          rows="5"
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 transition-all resize-none font-bold leading-relaxed"
        />
      </div>

      <div className="flex flex-col gap-4 pt-4">
        <button
          type="submit"
          className="w-full bg-slate-950 hover:bg-blue-600 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-slate-900/20 active:scale-[0.98] tracking-tighter text-xl uppercase"
        >
          {initialProduct ? "Apply Changes" : "Confirm Addition"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-5 border-2 border-slate-900 text-slate-900 font-black hover:bg-slate-50 rounded-2xl transition-all text-sm uppercase tracking-widest"
          >
            Go Back
          </button>
        )}
      </div>
    </form>
  );
}
