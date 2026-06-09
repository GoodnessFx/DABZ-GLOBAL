import { useState } from "react";
import { Heart, ShoppingBag, GitCompare } from "lucide-react";
import { useStore } from "./store/StoreContext";
import type { Product } from "./data/products";
import { formatPrice } from "./data/products";
import { useNavigate } from "react-router";

export function ProductCard({ product, onNavigate }: { product: Product; onNavigate?: () => void }) {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);
  const isWishlisted = state.wishlist.includes(product.id);
  const isCompared = state.compareList.includes(product.id);
  const isLowStock = product.stockCount <= 3;

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        product,
        quantity: 1,
        selectedStorage: product.storage?.[0],
        selectedColor: product.colors?.[0],
      },
    });
    dispatch({ type: "SET_CART_OPEN", payload: true });
  }

  function handleWishlist(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch({ type: "TOGGLE_WISHLIST", payload: product.id });
  }

  function handleCompare(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch({ type: "TOGGLE_COMPARE", payload: product.id });
  }

  function handleClick() {
    dispatch({ type: "ADD_TO_RECENTLY_VIEWED", payload: product.id });
    navigate(`/product/${product.id}`);
    onNavigate?.();
  }

  return (
    <div
      className="group relative cursor-pointer flex flex-col bg-background border border-transparent hover:border-border transition-all duration-300"
      onClick={handleClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-white aspect-[4/5] flex items-center justify-center p-6 border-b border-border">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-muted/10" />
        )}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
          onLoad={() => setImgLoaded(true)}
          style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 300ms" }}
        />
        
        {/* Hover Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white border-t border-black z-10">
          <button 
            className="w-full py-3 text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
            onClick={(e) => { e.stopPropagation(); handleAddToCart(e); }}
          >
            <ShoppingBag size={12} />
            QUICK VIEW
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.originalPrice && (
            <span className="px-2 py-1 bg-white border border-black text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm">
              On Sale
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-muted-foreground hover:text-primary transition-colors shadow-sm z-10"
        >
          <Heart size={14} className={isWishlisted ? "fill-primary text-primary" : ""} />
        </button>
      </div>

      {/* Info Section */}
      <div className="p-6 flex flex-col gap-3 text-center">
        {/* Colors Swatches (Placeholder) */}
        <div className="flex items-center gap-1.5 justify-center mb-1">
          {product.colors?.slice(0, 4).map((color, i) => (
            <div 
              key={i} 
              className="w-2.5 h-2.5 rounded-full border border-black/10"
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
        
        <h3 className="text-[13px] font-black uppercase tracking-tight text-black line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <div className="flex flex-col items-center gap-1">
          <p className="text-[14px] font-black text-black">
            {formatPrice(product.price)}
          </p>
          {product.originalPrice && (
            <p className="text-[11px] font-bold text-black/30 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
