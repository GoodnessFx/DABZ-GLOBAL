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
      <div className="relative overflow-hidden bg-muted/10 aspect-[3/4] flex items-center justify-center p-4">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-muted/20" />
        )}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
          onLoad={() => setImgLoaded(true)}
          style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 300ms" }}
        />
        
        {/* Hover Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black z-10">
          <button 
            className="w-full py-3 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2"
            onClick={(e) => { e.stopPropagation(); handleAddToCart(e); }}
          >
            <ShoppingBag size={12} />
            QUICK VIEW
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.originalPrice && (
            <span className="px-2 py-1 bg-black text-white text-[9px] font-black uppercase tracking-widest rounded-full">
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
      <div className="p-4 flex flex-col gap-3">
        {/* Colors Swatches (Placeholder) */}
        <div className="flex items-center gap-1.5 justify-center mb-1">
          {product.colors?.slice(0, 4).map((color, i) => (
            <div 
              key={i} 
              className="w-3 h-3 rounded-full border border-border shadow-sm"
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>

        <div className="flex flex-col gap-1 text-center">
          <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors uppercase tracking-tight">
            {product.name}
          </h3>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-black text-foreground font-sans">
              ₦{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through font-medium">
                ₦{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
