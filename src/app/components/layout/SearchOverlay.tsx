import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { products } from "../data/products";
import { formatPrice } from "../data/products";
import { useNavigate } from "react-router";

const popular = ["iPhone 16", "MacBook Air", "AirPods Pro", "Samsung S25"];

export function SearchOverlay() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
    }
  }, [state.isSearchOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch({ type: "SET_SEARCH_OPEN", payload: false });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [dispatch]);

  if (!state.isSearchOpen) return null;

  const results = query.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.specs.some(s => s.value.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  function close() {
    dispatch({ type: "SET_SEARCH_OPEN", payload: false });
  }

  function handleProduct(id: string) {
    dispatch({ type: "ADD_TO_RECENTLY_VIEWED", payload: id });
    navigate(`/product/${id}`);
    close();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-white"
    >
      <div className="flex items-center justify-end p-8">
        <button onClick={close} className="text-black/40 hover:text-black transition-colors">
          <X size={32} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Search Input */}
          <div className="flex items-center gap-6 pb-8 border-b-2 border-black">
            <Search size={32} className="text-black/20 flex-shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="flex-1 bg-transparent outline-none text-black text-3xl lg:text-5xl font-black uppercase tracking-tight placeholder:text-black/5"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-black/20 hover:text-black">
                <X size={24} />
              </button>
            )}
          </div>

          {/* Popular searches */}
          {!query && (
            <div className="mt-12">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-black/40">Popular Searches</p>
              <div className="flex flex-wrap gap-3">
                {popular.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-8 py-3 text-xs font-black uppercase tracking-widest transition-all duration-300 bg-[#F8F8F8] text-black hover:bg-black hover:text-white rounded-full border border-transparent hover:border-black"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {query && (
            <div className="mt-16">
              {results.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-xl font-black uppercase tracking-tight text-black/20">
                    No products found for "{query}"
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
                  {results.map((product) => (
                    <ProductCard key={product.id} product={product} onNavigate={close} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
