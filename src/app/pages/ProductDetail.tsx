import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { products, formatPrice } from "../components/data/products";
import { useStore } from "../components/store/StoreContext";
import { Heart, MessageCircle, ChevronRight, Plus, Minus, ShoppingBag } from "lucide-react";
import { ProductCard } from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const product = products.find((p) => p.id === id);
  const [mainImage, setMainImage] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedStorage(product.storage?.[0] || "");
      setSelectedColor(product.colors?.[0] || "");
      dispatch({ type: "ADD_TO_RECENTLY_VIEWED", payload: product.id });
      window.scrollTo({ top: 0 });
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28 bg-background">
        <div className="text-center">
          <p className="text-xl font-bold mb-4 text-foreground">Product not found</p>
          <button onClick={() => navigate("/shop")} className="px-6 py-2 text-sm font-bold bg-primary text-primary-foreground">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const isWishlisted = state.wishlist.includes(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const waMessage = encodeURIComponent(`Hi Dabz Global, I'm interested in ${product.name}. Please confirm availability and price.`);
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  function handleAddToCart() {
    if (!product) return;
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity, selectedStorage, selectedColor } });
    setAdded(true);
    dispatch({ type: "SET_CART_OPEN", payload: true });
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="min-h-screen pt-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-xs text-muted-foreground">
          <button onClick={() => navigate("/")} className="hover:text-foreground transition-colors">Home</button>
          <ChevronRight size={12} />
          <button onClick={() => navigate(`/shop?category=${product.category}`)} className="hover:text-foreground transition-colors">
            {product.category}
          </button>
          <ChevronRight size={12} />
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div
              className="relative overflow-hidden flex items-center justify-center bg-background border border-border aspect-square"
            >
              <img
                src={product.images[mainImage]}
                alt={product.name}
                loading="eager"
                className="w-full h-full object-contain p-8 transition-transform duration-300 hover:scale-105"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(i)}
                    className={`flex-shrink-0 overflow-hidden w-[72px] h-[72px] bg-background border transition-all duration-200 ${
                      i === mainImage ? "border-primary border-2" : "border-border"
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-contain p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest mb-1 text-muted-foreground">{product.brand}</p>
              <h1 className="text-2xl font-black uppercase tracking-tight text-foreground" style={{ letterSpacing: "-0.02em" }}>
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <span
                  className={`px-3 py-1 text-xs font-bold uppercase border ${
                    product.condition === "Brand New" 
                      ? "bg-card text-primary border-primary" 
                      : "bg-muted text-muted-foreground border-border"
                  }`}
                >
                  {product.condition}
                </span>
                {product.stockCount <= 3 && (
                  <span className="px-3 py-1 text-xs font-bold uppercase bg-destructive text-white">
                    Only {product.stockCount} left
                  </span>
                )}
              </div>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" className="fill-primary">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="text-xs text-muted-foreground">(24 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold font-mono text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg line-through font-mono text-muted-foreground">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-sm font-bold text-primary">Save {formatPrice(savings)}</span>
                </>
              )}
            </div>

            {/* Storage */}
            {product.storage && product.storage.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-widest mb-3 text-muted-foreground">Storage</p>
                <div className="flex flex-wrap gap-2">
                  {product.storage.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedStorage(s)}
                      className={`px-4 py-2 text-xs font-semibold transition-all duration-200 border ${
                        selectedStorage === s 
                          ? "bg-primary text-primary-foreground border-primary" 
                          : "bg-muted text-foreground border-border hover:bg-muted/80"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-widest mb-3 text-muted-foreground">Color</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-4 py-2 text-xs font-semibold transition-all duration-200 border ${
                        selectedColor === c 
                          ? "bg-primary text-primary-foreground border-primary" 
                          : "bg-muted text-foreground border-border hover:bg-muted/80"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="text-xs uppercase tracking-widest mb-3 text-muted-foreground">Quantity</p>
              <div className="flex items-center border border-border w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center font-bold text-sm text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                className={`w-full h-14 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                  added ? "bg-green-600 text-white" : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                <ShoppingBag size={16} />
                {added ? "Added to Cart!" : "Add to Cart"}
              </button>
              <a
                href={`https://wa.me/2348144343028?text=${waMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full h-14 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all duration-200 bg-[#25D366] text-white hover:opacity-90"
              >
                <MessageCircle size={16} />
                Order via WhatsApp
              </a>
              <button
                onClick={() => dispatch({ type: "TOGGLE_WISHLIST", payload: product.id })}
                className={`flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                  isWishlisted ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart size={16} className={isWishlisted ? "fill-current" : ""} />
                {isWishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16 border-t border-border">
          <div className="flex overflow-x-auto">
            {(["desc", "specs", "reviews"] as const).map((tab) => {
              const labels = { desc: "Description", specs: "Specifications", reviews: "Reviews" };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-black uppercase tracking-widest transition-all duration-200 border-b-2 whitespace-nowrap ${
                    activeTab === tab ? "text-foreground border-primary" : "text-muted-foreground border-transparent hover:text-foreground"
                  }`}
                >
                  {labels[tab]}
                </button>
              );
            })}
          </div>

          <div className="py-8">
            {activeTab === "desc" && (
              <p className="text-sm leading-relaxed max-w-2xl text-muted-foreground">{product.description}</p>
            )}
            {activeTab === "specs" && (
              <div className="max-w-xl flex flex-col gap-0">
                {product.specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex border-b border-border ${i === product.specs.length - 1 ? "border-none" : ""}`}
                  >
                    <span className="w-40 flex-shrink-0 py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{spec.label}</span>
                    <span className="flex-1 py-3 text-sm text-foreground font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "reviews" && (
              <p className="text-sm text-muted-foreground">24 verified reviews. Average 5.0 stars. Contact us via WhatsApp for review details.</p>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-border pt-12">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-muted-foreground">You Might Also Like</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky mobile bar */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 flex gap-2 p-4 bg-card border-t border-border"
      >
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <p className="text-xs font-bold truncate text-foreground">{product.name}</p>
          <p className="text-sm font-black text-primary font-mono">{formatPrice(product.price)}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="px-8 py-3 bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest flex items-center gap-2"
        >
          <ShoppingBag size={14} />
          ADD
        </button>
      </div>
    </div>
  );
}
