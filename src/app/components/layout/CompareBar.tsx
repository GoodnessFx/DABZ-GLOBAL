import { X, GitCompare } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { products } from "../data/products";
import { useState } from "react";
import { formatPrice } from "../data/products";

export function CompareBar() {
  const { state, dispatch } = useStore();
  const [modalOpen, setModalOpen] = useState(false);

  if (state.compareList.length === 0) return null;

  const compareProducts = products.filter((p) => state.compareList.includes(p.id));

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between bg-white border-t border-black shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <GitCompare size={16} className="text-black" />
          <span className="text-sm font-black uppercase tracking-widest text-black">
            Compare ({state.compareList.length}/3)
          </span>
          <div className="flex items-center gap-2 ml-2">
            {compareProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-1 px-3 py-1 text-[10px] font-bold uppercase bg-muted text-black rounded">
                {p.name.split(" ").slice(0, 2).join(" ")}
                <button onClick={() => dispatch({ type: "TOGGLE_COMPARE", payload: p.id })} className="ml-1 hover:text-red-500">
                  <X size={10} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-2 text-xs font-black uppercase tracking-widest bg-white text-black border border-black rounded hover:bg-black hover:text-white transition-all"
          >
            Compare Now
          </button>
          <button onClick={() => dispatch({ type: "CLEAR_COMPARE" })} className="text-black/20 hover:text-black transition-colors">
            <X size={20} />
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-4xl bg-white border border-border rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-8 border-b border-border bg-[#F8F8F8]">
              <h2 className="text-xl font-black uppercase tracking-tight text-black">Product Comparison</h2>
              <button onClick={() => setModalOpen(false)} className="text-black/40 hover:text-black transition-colors"><X size={24} /></button>
            </div>
            <div className="overflow-x-auto p-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <td className="py-4 pr-8 text-[10px] font-black uppercase tracking-[0.2em] text-black/30 border-b border-border" style={{ width: "160px" }}>Feature</td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="py-4 px-6 text-center border-b border-border">
                        <img src={p.images[0]} alt={p.name} className="w-24 h-24 object-contain mx-auto mb-4" />
                        <p className="text-xs font-bold uppercase tracking-tight text-black">{p.name}</p>
                        <p className="text-sm font-black mt-2 text-black">{formatPrice(p.price)}</p>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {["Condition", "Brand", "Category"].map((label) => (
                    <tr key={label}>
                      <td className="py-5 pr-8 text-[10px] font-black uppercase tracking-[0.2em] text-black/30 border-b border-border">{label}</td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="py-5 px-6 text-center text-xs font-bold uppercase text-black border-b border-border">
                          {label === "Condition" ? p.condition : label === "Brand" ? p.brand : p.category}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {compareProducts[0]?.specs.map((spec) => (
                    <tr key={spec.label}>
                      <td className="py-5 pr-8 text-[10px] font-black uppercase tracking-[0.2em] text-black/30 border-b border-border">{spec.label}</td>
                      {compareProducts.map((p) => {
                        const s = p.specs.find((s) => s.label === spec.label);
                        return (
                          <td key={p.id} className="py-5 px-6 text-center text-xs font-medium text-black border-b border-border">
                            {s?.value ?? "—"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
