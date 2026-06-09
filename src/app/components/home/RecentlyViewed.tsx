import { useStore } from "../store/StoreContext";
import { products } from "../data/products";
import { ProductCard } from "../ProductCard";

export function RecentlyViewed() {
  const { state } = useStore();
  const recent = state.recentlyViewed
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  if (recent.length === 0) return null;

  return (
    <section className="px-6 lg:px-10 py-16 bg-background border-t border-border">
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-8 text-muted-foreground">
        Recently Viewed
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {recent.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
