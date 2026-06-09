import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useStore, useCartTotal } from "../store/StoreContext";
import { formatPrice } from "../data/products";
import { useNavigate } from "react-router";

export function CartDrawer() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const total = useCartTotal(state.cart);
  const itemCount = state.cart.reduce((s, i) => s + i.quantity, 0);

  if (!state.isCartOpen) return null;

  function close() {
    dispatch({ type: "SET_CART_OPEN", payload: false });
  }

  function toCheckout() {
    close();
    navigate("/checkout");
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" onClick={close} />
      <div
        className="relative flex flex-col w-full max-w-md h-full bg-white border-l border-border shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-border bg-white">
          <h2 className="text-xl font-black uppercase tracking-tight text-black">
            Your Cart ({itemCount})
          </h2>
          <button onClick={close} className="text-black/40 hover:text-black transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
          {state.cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <div className="p-12 bg-[#F8F8F8] rounded-full text-black/10">
                <ShoppingBag size={80} strokeWidth={1} />
              </div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-black/40">Your cart is empty</p>
              <button
                onClick={close}
                className="px-12 py-4 text-xs font-black uppercase tracking-[0.3em] bg-white text-black border-2 border-black rounded-full hover:bg-black hover:text-white transition-all shadow-xl"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            state.cart.map((item) => (
              <div key={item.product.id + (item.selectedStorage || "") + (item.selectedColor || "")} className="flex gap-6 group">
                <div className="flex-shrink-0 w-24 h-24 rounded-lg flex items-center justify-center bg-[#F8F8F8] border border-border group-hover:border-black transition-colors overflow-hidden">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 object-contain transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold uppercase tracking-tight text-black leading-tight group-hover:text-primary transition-colors">{item.product.name}</p>
                  {item.selectedStorage && (
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mt-1">{item.selectedStorage} · {item.selectedColor}</p>
                  )}
                  <p className="text-sm font-black mt-2 text-black">
                    {formatPrice(item.product.price)}
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center bg-[#F8F8F8] rounded-full px-2">
                      <button
                        onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.product.id, quantity: item.quantity - 1 } })}
                        className="w-8 h-8 flex items-center justify-center text-black/40 hover:text-black transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-xs font-black text-black">{item.quantity}</span>
                      <button
                        onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.product.id, quantity: item.quantity + 1 } })}
                        className="w-8 h-8 flex items-center justify-center text-black/40 hover:text-black transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.product.id })}
                      className="text-[10px] font-black uppercase tracking-widest text-black/20 hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {state.cart.length > 0 && (
          <div className="p-8 border-t border-border bg-white">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-black/40">Subtotal</span>
              <span className="text-2xl font-black text-black">
                {formatPrice(total)}
              </span>
            </div>
            <button
              onClick={toCheckout}
              className="w-full py-5 text-xs font-black uppercase tracking-[0.3em] transition-all duration-300 bg-white text-black border-2 border-black hover:bg-black hover:text-white rounded-full shadow-2xl hover:scale-[1.02]"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
