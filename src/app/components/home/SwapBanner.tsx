import { MessageCircle, Phone } from "lucide-react";

export function SwapBanner() {
  return (
    <section
      id="swap"
      className="px-8 lg:px-20 py-32 flex flex-col lg:flex-row items-center justify-between gap-12 bg-white border-y border-border"
    >
      <div className="max-w-3xl">
        <h2
          className="leading-none uppercase text-black"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(36px, 6vw, 80px)",
            letterSpacing: "-0.04em",
            whiteSpace: "pre-line",
          }}
        >
          {"HAVE AN OLD DEVICE?\nLET'S MAKE A DEAL."}
        </h2>
        <p className="mt-8 text-sm lg:text-lg font-bold uppercase tracking-[0.3em] text-black/30">
          Instant Valuation • Best Trade-in Prices • Same Day Upgrade
        </p>
      </div>
      <div className="flex flex-col gap-4 flex-shrink-0 w-full lg:w-auto">
        <a
          href="https://wa.me/2348144343028?text=Hi%20Dabz%20Global%2C%20I%27m%20interested%20in%20swapping%20my%20device."
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-4 px-12 py-6 text-sm font-black uppercase tracking-[0.2em] transition-all duration-300 bg-black text-white hover:bg-primary hover:text-primary-foreground rounded-full shadow-2xl"
        >
          <MessageCircle size={20} />
          WhatsApp Us
        </a>
        <a
          href="tel:08144343028"
          className="flex items-center justify-center gap-4 px-12 py-6 text-sm font-black uppercase tracking-[0.2em] transition-all duration-300 bg-transparent text-black border-2 border-black hover:bg-black hover:text-white rounded-full"
        >
          <Phone size={20} />
          Call 08144343028
        </a>
      </div>
    </section>
  );
}
