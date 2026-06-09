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
        p.brand.toLowerCase().includes(query.toLowerCase())
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
      className="fixed inset-0 z-50 flex flex-col bg-background/97 backdrop-blur-md"
    >
      <div className="flex items-center justify-end px-6 pt-6">
        <button onClick={close} className="p-2 transition-colors text-muted-foreground hover:text-foreground">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-10">
        <div className="max-w-2xl mx-auto">
          {/* Search Input */}
          <div className="flex items-center gap-4 pb-4 border-b-2 border-border">
            <Search size={24} className="text-muted-foreground flex-shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent outline-none text-foreground text-2xl font-sans font-medium"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-muted-foreground">
                <X size={18} />
              </button>
            )}
          </div>

          {/* Popular searches */}
          {!query && (
            <div className="mt-8">
              <p className="text-xs uppercase tracking-widest mb-4 text-muted-foreground">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {popular.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 text-sm font-medium transition-all duration-200 bg-muted text-foreground border border-border hover:border-primary"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {query && (
            <div className="mt-8">
              {results.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No products found. Try "iPhone 16" or "AirPods".
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {results.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProduct(product.id)}
                      className="flex items-center gap-3 p-3 text-left transition-all duration-200 bg-card border border-border hover:border-primary"
                    >
                      <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-background">
                        <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-contain" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate text-foreground">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.condition}</p>
                        <p className="text-xs font-bold mt-0.5 font-mono text-primary">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </button>
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
