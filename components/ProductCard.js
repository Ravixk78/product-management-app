"use client";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all group backdrop-blur-sm">
      <div className="aspect-video w-full bg-gray-800 relative overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80";
              e.target.onerror = null;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 italic text-sm bg-gradient-to-br from-gray-800 to-gray-900 uppercase tracking-widest">
            {product.name.charAt(0)}
          </div>
        )}
      </div>
      
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-white text-lg leading-tight group-hover:text-indigo-400 transition-colors">
            {product.name}
          </h3>
          <span className="text-indigo-400 font-bold text-lg">
            ${parseFloat(product.price).toFixed(2)}
          </span>
        </div>
        
        <p className="text-gray-400 text-sm line-clamp-2 min-h-[2.5rem]">
          {product.description || "No description provided."}
        </p>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 text-sm bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium py-2 rounded-lg transition-colors border border-gray-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 text-sm bg-red-900/20 hover:bg-red-900/40 text-red-400 font-medium py-2 rounded-lg transition-colors border border-red-900/30"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
