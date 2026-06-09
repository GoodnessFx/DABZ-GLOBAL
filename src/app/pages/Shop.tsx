import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { products } from "../components/data/products";
import { ProductCard } from "../components/ProductCard";
import { SlidersHorizontal, X } from "lucide-react";

const categories = ["iPhones", "Samsung", "Laptops", "Accessories"] as const;
const conditions = ["Brand New", "UK Used"] as const;

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 2500000]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeCategory = searchParams.get("category") || "";
  const activeCondition = searchParams.get("condition") || "";
  const activeDeals = searchParams.get("deals") === "true";
  const activeBrand = searchParams.get("brand") || "";

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  }

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (activeCategory && p.category !== activeCategory) return false;
      if (activeCondition && p.condition !== activeCondition) return false;
      if (activeDeals && !p.isHotDeal) return false;
      if (activeBrand && p.brand !== activeBrand) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });
  }, [activeCategory, activeCondition, activeDeals, activeBrand, priceRange]);

  const hasFilters = activeCategory || activeCondition || activeDeals || activeBrand;

  const FiltersPanel = () => (
    <div className="flex flex-col gap-8">
      {/* Condition — primary filter */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-4 text-muted-foreground">Condition</p>
        <div className="flex flex-col gap-2">
          {conditions.map((c) => (
            <button
              key={c}
              onClick={() => setFilter("condition", activeCondition === c ? "" : c)}
              className={`flex items-center gap-3 py-2.5 px-4 text-sm font-semibold text-left transition-all duration-200 ${
                activeCondition === c 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-4 text-muted-foreground">Category</p>
        <div className="flex flex-col gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter("category", activeCategory === c ? "" : c)}
              className={`flex items-center justify-between py-2 px-4 text-sm transition-all duration-200 border-l-2 ${
                activeCategory === c 
                  ? "text-primary border-primary" 
                  : "text-muted-foreground border-transparent hover:text-foreground"
              } bg-transparent`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-4 text-muted-foreground">Price Range</p>
        <div className="px-2">
          <div className="flex justify-between text-xs mb-3 font-mono text-muted-foreground">
            <span>₦{priceRange[0].toLocaleString()}</span>
            <span>₦{priceRange[1].toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={0}
            max={2500000}
            step={50000}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-primary"
          />
        </div>
      </div>

      {/* Hot Deals */}
      <button
        onClick={() => setFilter("deals", activeDeals ? "" : "true")}
        className={`py-2.5 px-4 text-sm font-bold uppercase tracking-wider transition-all duration-200 text-left ${
          activeDeals ? "bg-destructive text-white" : "bg-muted text-foreground hover:bg-muted/80"
        }`}
      >
        🔥 Hot Deals Only
      </button>

      {hasFilters && (
        <button
          onClick={() => { setSearchParams({}); setPriceRange([0, 2500000]); }}
          className="text-xs flex items-center gap-1.5 transition-colors text-muted-foreground hover:text-foreground"
        >
          <X size={12} /> Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pt-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-foreground" style={{ letterSpacing: "-0.02em" }}>
              {activeDeals ? "Hot Deals" : activeCategory || "Shop All"}
            </h1>
            <p className="text-sm mt-1 text-muted-foreground">{filtered.length} products</p>
          </div>
          <button
            className="lg:hidden flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-muted text-foreground"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        <div className="flex gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-32 self-start">
            <FiltersPanel />
          </aside>

          {/* Grid */}
          <main className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <p className="text-lg font-semibold text-foreground">No products found</p>
                <button
                  onClick={() => { setSearchParams({}); setPriceRange([0, 2500000]); }}
                  className="px-6 py-2 text-sm font-semibold bg-primary text-primary-foreground"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/70" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ml-auto h-full w-72 overflow-y-auto p-6 bg-card">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm font-bold uppercase tracking-widest text-foreground">Filters</p>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            <FiltersPanel />
          </div>
        </div>
      )}
    </div>
  );
}
