"use client";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-600 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group">
      <div className="aspect-square w-full bg-slate-50 relative overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80";
              e.target.onerror = null;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 italic text-4xl font-bold bg-slate-50 uppercase tracking-widest">
            {product.name.charAt(0)}
          </div>
        )}
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-bold text-slate-900 text-lg leading-tight">
            {product.name}
          </h3>
          <span className="text-blue-600 font-extrabold text-lg">
            LKR {parseFloat(product.price).toLocaleString()}
          </span>
        </div>
        
        <p className="text-slate-500 text-sm line-clamp-2 min-h-[2.5rem] leading-relaxed">
          {product.description || "No description provided."}
        </p>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 text-sm bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 font-bold py-2.5 rounded-xl transition-all"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 text-sm bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 font-bold py-2.5 rounded-xl transition-all border border-slate-100"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
