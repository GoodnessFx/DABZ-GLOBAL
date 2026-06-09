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
        className="fixed bottom-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{ background: "#161616", borderTop: "1px solid #D4AF37" }}
      >
        <div className="flex items-center gap-3">
          <GitCompare size={16} style={{ color: "#D4AF37" }} />
          <span className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
            Compare ({state.compareList.length}/3)
          </span>
          <div className="flex items-center gap-2 ml-2">
            {compareProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-1 px-2 py-1 text-xs" style={{ background: "#1E1E1E", color: "#B0B0B0" }}>
                {p.name.split(" ").slice(0, 2).join(" ")}
                <button onClick={() => dispatch({ type: "TOGGLE_COMPARE", payload: p.id })} className="ml-1">
                  <X size={10} style={{ color: "#B0B0B0" }} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider"
            style={{ background: "#D4AF37", color: "#0A0A0A" }}
          >
            Compare Now
          </button>
          <button onClick={() => dispatch({ type: "CLEAR_COMPARE" })} style={{ color: "#B0B0B0" }}>
            <X size={18} />
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.9)" }}>
          <div className="w-full max-w-4xl rounded" style={{ background: "#161616", border: "1px solid #2A2A2A" }}>
            <div className="flex items-center justify-between p-6" style={{ borderBottom: "1px solid #2A2A2A" }}>
              <h2 className="text-base font-bold uppercase tracking-wider" style={{ color: "#FFFFFF" }}>Product Comparison</h2>
              <button onClick={() => setModalOpen(false)} style={{ color: "#B0B0B0" }}><X size={20} /></button>
            </div>
            <div className="overflow-x-auto p-6">
              <table className="w-full">
                <thead>
                  <tr>
                    <td className="py-2 pr-6 text-xs uppercase tracking-widest" style={{ color: "#B0B0B0", width: "140px" }}>Feature</td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="py-2 px-4 text-center">
                        <img src={p.images[0]} alt={p.name} className="w-20 h-20 object-contain mx-auto" style={{ background: "#0A0A0A" }} />
                        <p className="text-sm font-semibold mt-2" style={{ color: "#FFFFFF" }}>{p.name}</p>
                        <p className="text-sm font-bold mt-1" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#D4AF37" }}>{formatPrice(p.price)}</p>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {["Condition", "Brand", "Category"].map((label) => (
                    <tr key={label} style={{ borderTop: "1px solid #2A2A2A" }}>
                      <td className="py-3 pr-6 text-xs uppercase tracking-widest" style={{ color: "#B0B0B0" }}>{label}</td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="py-3 px-4 text-center text-sm" style={{ color: "#FFFFFF" }}>
                          {label === "Condition" ? p.condition : label === "Brand" ? p.brand : p.category}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {compareProducts[0]?.specs.map((spec) => (
                    <tr key={spec.label} style={{ borderTop: "1px solid #2A2A2A" }}>
                      <td className="py-3 pr-6 text-xs uppercase tracking-widest" style={{ color: "#B0B0B0" }}>{spec.label}</td>
                      {compareProducts.map((p) => {
                        const s = p.specs.find((s) => s.label === spec.label);
                        return (
                          <td key={p.id} className="py-3 px-4 text-center text-sm" style={{ color: s ? "#FFFFFF" : "#2A2A2A" }}>
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
