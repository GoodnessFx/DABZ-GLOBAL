import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { DGMark } from "../DGMark";
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    headline: "TITANIUM.\nREDEFINED.",
    subline: "iPhone 17 Pro. Now in Abuja. Brand new, sealed.",
    cta: "Shop iPhones",
    ctaHref: "/shop?category=iPhones",
    image: "https://images.unsplash.com/photo-1709178295038-acbeec786fcf?w=900&q=80&auto=format&fit=crop",
    imageAlt: "iPhone Pro",
  },
  {
    headline: "POWER IN\nYOUR HANDS.",
    subline: "MacBook Air, HP, Dell — new and UK used. Built for work.",
    cta: "Shop Laptops",
    ctaHref: "/shop?category=Laptops",
    image: "https://images.unsplash.com/photo-1615788189819-bee84874da4b?w=900&q=80&auto=format&fit=crop",
    imageAlt: "MacBook laptop",
  },
  {
    headline: "YOUR OLD PHONE\nHAS VALUE.",
    subline: "Swap your device and upgrade today. Call us or slide in our DMs.",
    cta: "Start a Swap",
    ctaHref: "https://wa.me/2348144343028?text=Hi%20Dabz%20Global%2C%20I%27m%20interested%20in%20swapping%20my%20device.",
    ctaExternal: true,
    image: "https://images.unsplash.com/photo-1707438095940-1eee18e85400?w=900&q=80&auto=format&fit=crop",
    imageAlt: "Smartphones for swap",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const INTERVAL = 5000;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const raf = requestAnimationFrame(function tick() {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / INTERVAL) * 100, 100));
      if (elapsed < INTERVAL) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [current]);

  const slide = slides[current];

  function handleCta() {
    if (slide.ctaExternal) {
      window.open(slide.ctaHref, "_blank", "noreferrer");
    } else {
      navigate(slide.ctaHref);
    }
  }

  return (
    <section className="relative w-full h-[60vh] lg:h-[80vh] overflow-hidden bg-background pt-32 lg:pt-0">
      <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide, i) => (
          <div key={i} className="min-w-full h-full relative flex items-center justify-center overflow-hidden">
            {/* Background Image/Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-background z-0" />
            
            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 h-full">
              {/* Text Content */}
              <div className="flex flex-col gap-4 lg:gap-6 max-w-xl text-center lg:text-left order-2 lg:order-1">
                <p className="text-xs lg:text-sm font-black uppercase tracking-[0.3em] text-primary">
                  {slide.subline.split('.')[0]}
                </p>
                <h1
                  className="leading-none uppercase text-foreground"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(32px, 5vw, 64px)",
                    letterSpacing: "-0.04em",
                    whiteSpace: "pre-line",
                  }}
                >
                  {slide.headline}
                </h1>
                <div className="flex justify-center lg:justify-start mt-2">
                  <button
                    onClick={handleCta}
                    className="flex items-center gap-2 px-10 py-4 bg-foreground text-background font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    {slide.cta}
                  </button>
                </div>
              </div>

              {/* Prominent Phone Image */}
              <div className="flex-1 flex items-center justify-center h-full max-h-[40vh] lg:max-h-full order-1 lg:order-2">
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  className="w-full h-full object-contain transform scale-110 lg:scale-125 hover:scale-110 transition-transform duration-700"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={() => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-muted-foreground hover:text-foreground transition-colors hidden lg:block"
      >
        <ChevronLeft size={48} strokeWidth={1} />
      </button>
      <button 
        onClick={() => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1))}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-muted-foreground hover:text-foreground transition-colors hidden lg:block"
      >
        <ChevronRight size={48} strokeWidth={1} />
      </button>

      {/* Progress Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setProgress(0); }}
            className={`h-1 transition-all duration-300 ${
              i === current ? "w-12 bg-foreground" : "w-6 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
