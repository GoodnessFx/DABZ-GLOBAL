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
    <section className="px-6 lg:px-12 py-20 bg-background border-t border-border">
      <div className="flex flex-col items-center text-center gap-4 mb-16">
        <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-black">
          Hot Deals.
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Ends in:</span>
          {[pad(h), pad(m), pad(s)].map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="inline-block px-3 py-1.5 text-sm font-black bg-black text-white min-w-[40px] rounded shadow-lg"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {v}
              </span>
              {i < 2 && <span className="font-black text-black">:</span>}
            </div>
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
