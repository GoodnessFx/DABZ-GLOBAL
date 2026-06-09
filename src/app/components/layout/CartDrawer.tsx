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
      <div className="absolute inset-0 bg-black/70" onClick={close} />
      <div
        className="relative flex flex-col w-full max-w-md h-full bg-card border-l border-border"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-base font-bold uppercase tracking-wider text-foreground">
            Your Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
          </h2>
          <button onClick={close} className="p-1 transition-colors text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {state.cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <ShoppingBag size={48} className="text-border" />
              <p className="text-sm text-muted-foreground">Your cart is empty</p>
              <button
                onClick={close}
                className="px-6 py-2 text-sm font-semibold uppercase tracking-wider bg-primary text-primary-foreground"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            state.cart.map((item) => (
              <div key={item.product.id + (item.selectedStorage || "") + (item.selectedColor || "")} className="flex gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded flex items-center justify-center bg-background">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-14 object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-snug truncate text-foreground">{item.product.name}</p>
                  {item.selectedStorage && (
                    <p className="text-xs mt-0.5 text-muted-foreground">{item.selectedStorage} · {item.selectedColor}</p>
                  )}
                  <p className="text-sm font-bold mt-1 font-mono text-primary">
                    {formatPrice(item.product.price)}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.product.id, quantity: item.quantity - 1 } })}
                        className="w-7 h-7 flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-foreground">{item.quantity}</span>
                      <button
                        onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.product.id, quantity: item.quantity + 1 } })}
                        className="w-7 h-7 flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.product.id })}
                      className="p-1 transition-colors text-muted-foreground hover:text-destructive"
                      aria-label="Remove"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {state.cart.length > 0 && (
          <div className="p-6 flex flex-col gap-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Subtotal</span>
              <span className="text-lg font-bold font-mono text-primary">
                {formatPrice(total)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Free delivery in Abuja on orders ₦50,000+
            </p>
            <button
              onClick={toCheckout}
              className="w-full py-4 text-sm font-bold uppercase tracking-widest transition-all duration-200 bg-primary text-primary-foreground hover:opacity-90"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={close}
              className="text-xs text-center font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
