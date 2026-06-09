import { useState } from "react";
import { useNavigate } from "react-router";
import { useStore, useCartTotal } from "../components/store/StoreContext";
import { formatPrice } from "../components/data/products";
import { Lock, CheckCircle, Phone } from "lucide-react";

const steps = ["Contact", "Delivery", "Payment"];

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  delivery: "same-day" | "nationwide" | "pickup";
  payment: "transfer" | "cod" | "card";
};

export default function Checkout() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const total = useCartTotal(state.cart);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    fullName: "", phone: "", email: "",
    address: "", city: "", state: "Abuja",
    delivery: "same-day", payment: "transfer",
  });

  if (state.cart.length === 0) {
    navigate("/shop");
    return null;
  }

  const deliveryFee = form.delivery === "same-day" ? (total >= 50000 ? 0 : 2000) : form.delivery === "pickup" ? 0 : 5000;

  function update(key: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit() {
    if (step < 2) { setStep((s) => s + 1); return; }
    setLoading(true);
    setTimeout(() => {
      dispatch({ type: "CLEAR_CART" });
      navigate("/order-confirmation", { state: { form, total: total + deliveryFee } });
    }, 1800);
  }

  const inputClass = "w-full px-4 py-3 text-sm outline-none transition-all duration-200 bg-muted text-foreground border border-border focus:border-primary";

  return (
    <div className="min-h-screen pt-28 pb-16 bg-background">
      {/* Logo */}
      <div className="text-center mb-10">
        <svg height="24" viewBox="0 0 80 32" fill="none" className="inline-block">
          <text x="0" y="26" className="font-sans font-black text-3xl fill-foreground" letterSpacing="-1">DG</text>
        </svg>
      </div>

      {/* Trust bar */}
      <div className="max-w-3xl mx-auto px-6 mb-8">
        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Lock size={12} className="text-primary" /> Secure Checkout</span>
          <span className="flex items-center gap-1.5"><CheckCircle size={12} className="text-primary" /> 100% Trusted</span>
          <a href="tel:08144343028" className="flex items-center gap-1.5 transition-colors hover:text-foreground">
            <Phone size={12} className="text-primary" /> Need help? Call 08144343028
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Form */}
        <div>
          {/* Step progress */}
          <div className="flex items-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                    i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < step ? <CheckCircle size={14} /> : i + 1}
                </div>
                <span className={`text-xs font-semibold uppercase tracking-wider ${i === step ? "text-foreground" : "text-muted-foreground"}`}>
                  {s}
                </span>
                {i < steps.length - 1 && <div className="w-8 h-px bg-border" />}
              </div>
            ))}
          </div>

          {/* Step 0: Contact */}
          {step === 0 && (
            <div className="flex flex-col gap-4">
              <input className={inputClass} placeholder="Full Name" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
              <input className={inputClass} placeholder="Phone Number" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              <input className={inputClass} placeholder="Email Address" value={form.email} onChange={(e) => update("email", e.target.value)} />
              <div className="text-center mt-2">
                <a
                  href="https://wa.me/2348144343028?text=Hi%20Dabz%20Global%2C%20I%27d%20like%20to%20place%20an%20order."
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs underline text-primary"
                >
                  Or order directly via WhatsApp
                </a>
              </div>
            </div>
          )}

          {/* Step 1: Delivery */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <input className={inputClass} placeholder="Address Line 1" value={form.address} onChange={(e) => update("address", e.target.value)} />
              <input className={inputClass} placeholder="City" value={form.city} onChange={(e) => update("city", e.target.value)} />
              <input className={inputClass} placeholder="State" value={form.state} onChange={(e) => update("state", e.target.value)} />
              <div className="flex flex-col gap-2 mt-2">
                {[
                  { key: "same-day", label: "Same-Day Abuja", badge: "FREE (orders ₦50k+)", color: "bg-green-600" },
                  { key: "nationwide", label: "Nationwide", badge: "₦5,000", color: "" },
                  { key: "pickup", label: "Pick Up at Store — Suite C3 New Banex", badge: "FREE", color: "bg-green-600" },
                ].map(({ key, label, badge, color }) => (
                  <button
                    key={key}
                    onClick={() => update("delivery", key)}
                    className={`flex items-center justify-between px-4 py-3 text-sm text-left transition-all duration-200 border ${
                      form.delivery === key ? "bg-muted border-primary" : "bg-transparent border-border"
                    }`}
                  >
                    <span className="text-foreground">{label}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 ${color || "bg-muted text-muted-foreground"}`}>
                      {badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="flex flex-col gap-3">
              {[
                { key: "transfer", label: "Bank Transfer", detail: "Account: 0123456789 — Guaranty Trust Bank — Dabz Global Ltd" },
                { key: "cod", label: "Pay on Delivery", detail: "Cash or transfer on arrival. Abuja only." },
                { key: "card", label: "Card Payment", detail: "Coming Soon", disabled: true },
              ].map(({ key, label, detail, disabled }) => (
                <button
                  key={key}
                  onClick={() => !disabled && update("payment", key)}
                  className={`flex flex-col gap-1 px-4 py-4 text-left transition-all duration-200 border ${
                    form.payment === key ? "bg-muted border-primary" : "bg-transparent border-border"
                  } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">{label}</span>
                    {disabled && <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground">Coming Soon</span>}
                  </div>
                  {form.payment === key && !disabled && (
                    <p className="text-xs mt-1 text-primary">{detail}</p>
                  )}
                  {!disabled && form.payment !== key && (
                    <p className="text-xs text-muted-foreground">{detail.split("—")[0]}</p>
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button onClick={() => setStep((s) => s - 1)} className="px-6 py-3 text-sm font-semibold bg-muted text-foreground">
                Back
              </button>
            )}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-4 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 bg-white text-black border-2 border-black h-[60px] rounded-full shadow-xl hover:bg-black hover:text-white"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : step < 2 ? "Continue" : "Place Order"}
            </button>
          </div>
        </div>

        {/* Right: Order Summary (sticky) */}
        <div className="lg:sticky lg:top-28 self-start">
          <div className="p-6 bg-card border border-border">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-6 text-foreground">Order Summary</h2>
            <div className="flex flex-col gap-4 mb-6 border-b border-border pb-6">
              {state.cart.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="w-14 h-14 flex-shrink-0 bg-muted">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate text-foreground">{item.product.name}</p>
                    {item.selectedStorage && <p className="text-xs text-muted-foreground">{item.selectedStorage}</p>}
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-xs font-bold flex-shrink-0 font-mono text-foreground">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 text-sm border-b border-border pb-4 mb-4">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground font-mono">{formatPrice(total)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className={`font-mono ${deliveryFee === 0 ? "text-primary" : "text-foreground"}`}>{deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}</span></div>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-bold uppercase tracking-wider text-foreground">Total</span>
              <span className="text-xl font-bold font-mono text-primary">{formatPrice(total + deliveryFee)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
