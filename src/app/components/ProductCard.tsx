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
      {/* Image */}
      <div className="relative overflow-hidden bg-muted/30 aspect-square flex items-center justify-center p-4">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-muted" />
        )}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          onLoad={() => setImgLoaded(true)}
          style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 300ms" }}
        />
        
        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-background/80 backdrop-blur-sm hidden lg:block">
          <button 
            className="w-full py-2 bg-foreground text-background text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all"
            onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
          >
            QUICK ADD
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground truncate">
          {product.brand}
        </p>
        <h3 className="text-sm font-bold text-foreground truncate uppercase tracking-tight">
          {product.name}
        </h3>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-sm font-black text-foreground font-sans">
            ₦{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ₦{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-1">
        {product.isHotDeal && (
          <span className="px-2 py-0.5 bg-[#FF3B30] text-white text-[9px] font-black uppercase tracking-widest">
            HOT
          </span>
        )}
        {product.isNew && (
          <span className="px-2 py-0.5 bg-foreground text-background text-[9px] font-black uppercase tracking-widest">
            NEW
          </span>
        )}
      </div>
    </div>
  );
        {/* Compare */}
        <button
          onClick={handleCompare}
          className="absolute bottom-2 right-2 p-1.5 rounded-full transition-colors opacity-0 group-hover:opacity-100"
          style={{ background: isCompared ? "#D4AF37" : "rgba(10,10,10,0.7)" }}
          aria-label="Add to compare"
          title="Compare"
        >
          <GitCompare size={14} style={{ color: isCompared ? "#0A0A0A" : "#B0B0B0" }} />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "#B0B0B0" }}>
            {product.condition}
          </p>
          <h3
            className="text-sm font-semibold leading-snug mt-0.5"
            style={{ color: "#FFFFFF", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
          >
            {product.name}
          </h3>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="font-bold text-base" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#FFFFFF" }}>
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs line-through" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#B0B0B0" }}>
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 mt-1"
          style={{ background: "#1E1E1E", color: "#FFFFFF", borderRadius: "2px" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#D4AF37";
            e.currentTarget.style.color = "#0A0A0A";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#1E1E1E";
            e.currentTarget.style.color = "#FFFFFF";
          }}
        >
          <ShoppingBag size={13} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
