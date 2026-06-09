import { Instagram } from "lucide-react";
import { DGMark } from "../DGMark";

const tiles = [
  "https://images.unsplash.com/photo-1709178295038-acbeec786fcf?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1707438095940-1eee18e85400?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1701680853149-1b5240a95eeb?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80&auto=format&fit=crop",
];

export function InstagramStrip() {
  return (
    <section className="py-24 bg-white">
      <div className="flex flex-col items-center gap-6 mb-12 px-6 lg:px-12 text-center">
        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-black">
          FOLLOW @DABZ_GLOBAL_OFFICIAL
        </h2>
        <div className="w-20 h-1 bg-black" />
      </div>
      <div className="flex gap-2 overflow-x-auto px-6 lg:px-12 pb-4 scrollbar-hide">
        {tiles.map((src, i) => (
          <a
            key={i}
            href="https://instagram.com/dabz_global_official"
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
