import { useState } from "react";
import { products } from "../data/products";
import { ProductCard } from "../ProductCard";

const tabs = ["All", "iPhones", "Samsung", "Laptops", "Accessories"] as const;
type Tab = typeof tabs[number];

export function FeaturedGrid() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [visibleCount, setVisibleCount] = useState(8);

  const featured = products.filter((p) => p.featured || p.isNew);
  const filtered = activeTab === "All" ? featured : featured.filter((p) => p.category === activeTab);
  const visible = filtered.slice(0, visibleCount);

  return (
    <section className="px-6 lg:px-12 py-16 bg-background">
      <div className="flex flex-col items-center gap-6 mb-12">
        <button 
          onClick={() => navigate("/shop")}
          className="group flex items-center gap-2 text-sm lg:text-base font-black uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors"
        >
          CHECK ALL LATEST ADDITIONS
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <div className="w-full max-w-xs h-0.5 bg-border" />
      </div>

      <div className="flex items-center justify-center gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setVisibleCount(8); }}
            className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 rounded-full border ${
              activeTab === tab 
                ? "bg-foreground text-background border-foreground" 
                : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleCount < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + 8)}
            className="px-10 py-3 text-sm font-semibold uppercase tracking-widest transition-all duration-200 bg-muted text-foreground border border-border hover:border-primary hover:text-primary"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
