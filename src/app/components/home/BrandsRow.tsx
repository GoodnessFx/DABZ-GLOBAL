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
    <section className="py-12" style={{ background: "#0A0A0A", borderTop: "1px solid #2A2A2A", borderBottom: "1px solid #2A2A2A", overflow: "hidden" }}>
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-8 px-6 lg:px-10" style={{ color: "#B0B0B0" }}>
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
              className="flex-shrink-0 transition-all duration-200 text-xl font-black uppercase tracking-wider"
              style={{ color: "#2A2A2A", letterSpacing: "0.05em", fontFamily: "Inter, sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#2A2A2A")}
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
