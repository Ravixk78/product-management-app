"use client";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:scale-[1.02] hover:shadow-xl transition-all duration-300 group flex flex-col h-full border-b-2 border-b-transparent hover:border-b-blue-600/40">
      <div className="aspect-[4/3] w-full bg-slate-50 relative overflow-hidden border-b border-slate-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80";
              e.target.onerror = null;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 italic text-5xl font-black bg-slate-50/50 uppercase tracking-widest">
            {product.name.charAt(0)}
          </div>
        )}
        <div className="absolute top-3 right-3">
           <span className="bg-white/90 backdrop-blur-sm text-blue-600 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm border border-slate-200/50">
            LKR {parseFloat(product.price).toLocaleString()}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </div>
        
        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-6 font-medium flex-1">
          {product.description || "Detailed specifications not available for this item."}
        </p>

        <div className="flex gap-2.5">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 text-xs bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-2.5 rounded-xl transition-all border border-slate-200/60 flex items-center justify-center gap-1.5"
          >
             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 text-xs bg-red-50/30 hover:bg-red-500 hover:text-white text-red-500 font-bold py-2.5 rounded-xl transition-all border border-red-100 flex items-center justify-center gap-1.5"
          >
             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
