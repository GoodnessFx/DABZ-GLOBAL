import { useState, useEffect } from "react";
import { products } from "../data/products";
import { ProductCard } from "../ProductCard";

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    function calc() {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = Math.floor((midnight.getTime() - now.getTime()) / 1000);
      setTimeLeft({
        h: Math.floor(diff / 3600),
        m: Math.floor((diff % 3600) / 60),
        s: diff % 60,
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

export function HotDeals() {
  const deals = products.filter((p) => p.isHotDeal);
  const { h, m, s } = useCountdown();
  const pad = (n: number) => String(n).padStart(2, "0");

  if (deals.length === 0) return null;

  return (
    <section className="px-6 lg:px-10 py-16 bg-background border-t border-border">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Hot Deals</p>
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium mr-2 text-muted-foreground">Ends in:</span>
          {[pad(h), pad(m), pad(s)].map((v, i) => (
            <span key={i} className="flex items-center gap-1">
              <span
                className="inline-block px-2 py-1 text-sm font-bold bg-destructive text-white min-w-[36px] text-center"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {v}
              </span>
              {i < 2 && <span className="font-bold text-destructive">:</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {deals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
