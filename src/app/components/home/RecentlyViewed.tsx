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
    <section className="px-6 lg:px-12 py-20 bg-background border-t border-border">
      <div className="flex flex-col items-center gap-6 mb-12">
        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-black">
          RECENTLY VIEWED
        </h2>
        <div className="w-20 h-1 bg-black" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        {recent.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
