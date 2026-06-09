import { useState } from "react";
import { categories } from "../data/products";
import { useNavigate } from "react-router";

export function CategoryLinks() {
  const navigate = useNavigate();

  return (
    <section className="px-6 lg:px-12 py-20 bg-background border-t border-border">
      <div className="flex flex-col items-center gap-6 mb-16 text-center">
        <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-black">
          Shop by Category.
        </h2>
        <div className="w-20 h-1 bg-black" />
      </div>
      <div className="flex gap-4 lg:gap-8 overflow-x-auto pb-8 scrollbar-hide">
        {categories.map((cat) => (
          <CategoryCard key={cat.slug} cat={cat} onClick={() => navigate(`/shop?category=${cat.filter}`)} />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ cat, onClick }: { cat: typeof categories[0]; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex-shrink-0 relative overflow-hidden flex flex-col items-center justify-end rounded-lg border-2 transition-all duration-500 ${
        hovered ? "border-black scale-[1.02] shadow-2xl" : "border-border shadow-sm"
      } bg-white`}
      style={{
        width: "220px",
        height: "220px",
      }}
    >
      <img
        src={cat.image}
        alt={cat.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-700"
        style={{
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}
      />
      <div className="relative z-10 w-full px-4 pb-6 pt-12 bg-gradient-to-t from-white via-white/80 to-transparent">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-black">{cat.name}</p>
      </div>
    </button>
  );
}
