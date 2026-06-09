import { useNavigate } from "react-router";

const brands = [
  { name: "Apple", filter: "Apple" },
  { name: "Samsung", filter: "Samsung" },
  { name: "Dell", filter: "Dell" },
  { name: "HP", filter: "HP" },
  { name: "Sony", filter: "Sony" },
  { name: "JBL", filter: "JBL" },
  { name: "Oraimo", filter: "Oraimo" },
];

export function BrandsRow() {
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-background border-t border-border overflow-hidden">
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-8 px-6 lg:px-10 text-muted-foreground">
        Brands We Carry
      </p>
      <div className="relative">
        <div
          className="flex items-center gap-16 animate-marquee"
          style={{ width: "max-content" }}
        >
          {[...brands, ...brands].map((brand, i) => (
            <button
              key={i}
              onClick={() => navigate(`/shop?brand=${brand.filter}`)}
              className="flex-shrink-0 transition-all duration-200 text-xl font-black uppercase tracking-wider text-muted-foreground hover:text-foreground"
              style={{ letterSpacing: "0.05em", fontFamily: "Inter, sans-serif" }}
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
