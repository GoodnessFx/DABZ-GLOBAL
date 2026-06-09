import { MessageCircle, Phone } from "lucide-react";

export function SwapBanner() {
  return (
    <section
      id="swap"
      className="px-8 lg:px-20 py-20 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10 bg-card border-t border-b border-border"
    >
      <div>
        <p
          className="leading-none uppercase text-foreground"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(28px, 4.5vw, 56px)",
            letterSpacing: "-0.02em",
            whiteSpace: "pre-line",
          }}
        >
          {"HAVE AN OLD DEVICE?\nLET'S MAKE A DEAL."}
        </p>
      </div>
      <div className="flex flex-col gap-3 flex-shrink-0">
        <a
          href="https://wa.me/2348144343028?text=Hi%20Dabz%20Global%2C%20I%27m%20interested%20in%20swapping%20my%20device."
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-200 bg-primary text-primary-foreground hover:opacity-90"
        >
          <MessageCircle size={16} />
          WhatsApp Us
        </a>
        <a
          href="tel:08144343028"
          className="flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-200 bg-transparent text-foreground border border-foreground hover:border-primary hover:text-primary"
        >
          <Phone size={16} />
          Call 08144343028
        </a>
      </div>
    </section>
  );
}
