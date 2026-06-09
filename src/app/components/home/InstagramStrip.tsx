import { Instagram } from "lucide-react";
import { DGMark } from "../DGMark";

const tiles = [
  "https://images.unsplash.com/photo-1709178295038-acbeec786fcf?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1615788189819-bee84874da4b?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1707438095940-1eee18e85400?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1701680853149-1b5240a95eeb?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1615788236892-040dcc5c2bd0?w=400&q=80&auto=format&fit=crop",
];

export function InstagramStrip() {
  return (
    <section className="py-12 bg-background border-t border-border">
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-6 px-6 lg:px-10 text-muted-foreground">
        Follow @DABZ_GLOBAL_OF
      </p>
      <div className="flex gap-1 overflow-x-auto px-6 lg:px-10 pb-2">
        {tiles.map((src, i) => (
          <a
            key={i}
            href="https://instagram.com/dabz_global_of"
            target="_blank"
            rel="noreferrer"
            className="relative group flex-shrink-0 overflow-hidden w-40 h-40 bg-card"
          >
            <img src={src} alt={`Instagram post ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/70"
            >
              <Instagram size={28} className="text-foreground" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
