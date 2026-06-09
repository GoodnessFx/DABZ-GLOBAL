import { useState } from "react";
import { categories } from "../data/products";
import { useNavigate } from "react-router";

export function CategoryLinks() {
  const navigate = useNavigate();

  return (
    <section className="px-6 lg:px-10 py-16 bg-background">
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-8 text-muted-foreground">
        Shop by Category
      </p>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
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
      className={`flex-shrink-0 relative overflow-hidden flex flex-col items-center justify-end rounded-sm border transition-all duration-200 ${
        hovered ? "border-primary" : "border-border"
      } bg-card`}
      style={{
        width: "160px",
        height: "160px",
      }}
    >
      <img
        src={cat.image}
        alt={cat.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-300"
        style={{
          transform: hovered ? "scale(1.04)" : "scale(1)",
        }}
      />
      <div className="relative z-10 w-full px-3 pb-3 pt-8 bg-gradient-to-t from-card/95 via-card/60 to-transparent">
        <p className="text-sm font-bold text-foreground">{cat.name}</p>
      </div>
    </button>
  );
}
