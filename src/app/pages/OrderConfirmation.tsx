import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { MessageCircle } from "lucide-react";
import { formatPrice } from "../components/data/products";

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { form, total } = (location.state as any) || {};
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    setTimeout(() => setDrawn(true), 200);
  }, []);

  const orderNum = `DG-2025-${Math.floor(1000 + Math.random() * 9000)}`;
  const waMessage = encodeURIComponent(`Hi Dabz Global, I just placed order ${orderNum}. Please confirm my delivery.`);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center bg-background">
      {/* Animated checkmark */}
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mb-8">
        <circle cx="40" cy="40" r="38" className="stroke-primary" strokeWidth="3" opacity="0.3" />
        <circle
          cx="40" cy="40" r="38"
          className="stroke-primary"
          strokeWidth="3"
          strokeDasharray="238.76"
          strokeDashoffset={drawn ? 0 : 238.76}
          style={{ transition: "stroke-dashoffset 0.8s ease", transformOrigin: "center", transform: "rotate(-90deg)" }}
        />
        <path
          d="M24 42l12 12 20-24"
          className="stroke-primary"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="50"
          strokeDashoffset={drawn ? 0 : 50}
          style={{ transition: "stroke-dashoffset 0.5s ease 0.6s" }}
        />
      </svg>

      <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3 text-primary">Payment Received</p>
      <h1 className="text-4xl font-black uppercase tracking-tight mb-4 text-foreground" style={{ letterSpacing: "-0.02em" }}>
        ORDER CONFIRMED
      </h1>
      <p className="text-base max-w-sm mb-2 text-muted-foreground">
        We'll contact you on {form?.phone || "your number"} to arrange delivery.
      </p>
      {total && (
        <p className="text-sm mb-6 text-muted-foreground">
          Order total: <span className="font-mono text-primary">{formatPrice(total)}</span>
        </p>
      )}

      <div
        className="px-6 py-3 mb-8 text-sm font-bold bg-card border border-border text-foreground tracking-widest"
      >
        Order Reference: <span className="text-primary">{orderNum}</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/shop")}
          className="px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 bg-primary text-primary-foreground hover:opacity-90"
        >
          Continue Shopping
        </button>
        <a
          href={`https://wa.me/2348144343028?text=${waMessage}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 bg-[#25D366] text-white hover:opacity-90"
        >
          <MessageCircle size={16} />
          Track via WhatsApp
        </a>
      </div>
    </div>
  );
}
