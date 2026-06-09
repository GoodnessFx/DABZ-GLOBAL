import { useState } from "react";
import { Heart, Star } from "lucide-react";
import { useStore } from "./store/StoreContext";
import type { Product } from "./data/products";
import { formatPrice } from "./data/products";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const COLOR_MAP: Record<string, string> = {
  "Black": "#1A1A1A",
  "White": "#F5F5F5",
  "Blue": "#1D4ED8",
  "Green": "#16A34A",
  "Purple": "#7C3AED",
  "Red": "#DC2626",
  "Yellow": "#CA8A04",
  "Pink": "#EC4899",
  "Gold": "#D4AF37",
  "Natural Titanium": "#A6A196",
  "Desert Titanium": "#DDBEAA",
  "Space Black": "#1C1C1C",
  "Deep Purple": "#4B3E51",
  "Midnight Green": "#4E5851",
  "Sierra Blue": "#9BB5CE",
  "Graphite": "#41424C",
  "Midnight": "#191970",
  "Starlight": "#F8F0E3",
};

export function ProductCard({ product, onNavigate }: { product: Product; onNavigate?: () => void }) {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);
  const isWishlisted = state.wishlist.includes(product.id);
  
  // Dummy rating for design consistency
  const rating = 5;
  const ratingCount = Math.floor(Math.random() * 50) + 10;

  function handleWishlist(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch({ type: "TOGGLE_WISHLIST", payload: product.id });
  }

  function handleClick() {
    dispatch({ type: "ADD_TO_RECENTLY_VIEWED", payload: product.id });
    navigate(`/product/${product.id}`);
    onNavigate?.();
  }

  const hasPriceRange = product.originalPrice && product.originalPrice > product.price + 100000;

  return (
    <div
      className="group relative cursor-pointer flex flex-col bg-white border border-transparent hover:border-black/5 transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] rounded-none overflow-hidden"
      onClick={handleClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full bg-white flex items-center justify-center p-8 overflow-hidden">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-black/[0.02]" />
        )}
        <ImageWithFallback
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
          onLoad={() => setImgLoaded(true)}
          style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 500ms" }}
        />
        
        {/* On Sale Badge - Black Pill Style */}
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-black text-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full z-10 shadow-xl">
            On Sale
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-md text-black/20 hover:text-black transition-all z-10 border border-black/5"
        >
          <Heart size={14} className={isWishlisted ? "fill-black text-black" : ""} />
        </button>

        {/* Quick View Bar - Appears on Hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-black z-20">
          <button className="w-full py-3.5 text-white text-[10px] font-black uppercase tracking-[0.3em]">
            QUICK VIEW
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6 flex flex-col gap-4 items-center">
        {/* Color Swatches */}
        <div className="flex items-center gap-[8px] justify-center">
          {product.colors?.slice(0, 5).map((color, i) => {
            const hex = COLOR_MAP[color] || color;
            return (
              <div 
                key={i} 
                className="w-[12px] h-[12px] rounded-full border border-black/10 shadow-sm"
                style={{ backgroundColor: hex }}
                title={color}
              />
            );
          })}
        </div>
        
        {/* Product Name */}
        <h3 className="text-[14px] font-bold text-black text-center line-clamp-2 min-h-[40px] leading-relaxed tracking-tight">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={i < rating ? "fill-black text-black" : "text-black/10"} 
              />
            ))}
          </div>
          <span className="text-[10px] font-bold text-black/20">({ratingCount})</span>
        </div>
        
        {/* Price */}
        <div className="flex flex-col items-center">
          <p className="text-[15px] font-black text-black tracking-tight">
            {hasPriceRange ? (
              <>
                {formatPrice(product.price)} &mdash; {formatPrice(product.price + 150000)}
              </>
            ) : (
              formatPrice(product.price)
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
