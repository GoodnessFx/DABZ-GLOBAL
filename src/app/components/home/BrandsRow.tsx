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
    <section className="py-20 bg-white border-y border-border overflow-hidden">
      <div className="flex flex-col items-center gap-6 mb-12 px-6 lg:px-12 text-center">
        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-black">
          OUR PREMIUM BRANDS
        </h2>
        <div className="w-20 h-1 bg-black" />
      </div>
      <div className="relative">
        <div
          className="flex items-center gap-20 animate-marquee"
          style={{ width: "max-content" }}
        >
          {[...brands, ...brands].map((brand, i) => (
            <button
              key={i}
              onClick={() => navigate(`/shop?brand=${brand.filter}`)}
              className="flex-shrink-0 transition-all duration-300 text-3xl lg:text-5xl font-black uppercase tracking-tighter text-black/5 hover:text-black"
              style={{ fontFamily: "Inter, sans-serif" }}
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
