import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    headline: "GALAXY S26 SERIES.\nGALAXY AI IS HERE.",
    subline: "Experience the future of mobile with the new S26 Ultra.",
    cta: "Order Now",
    ctaHref: "/shop?category=Samsung",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=900&q=80&auto=format&fit=crop",
    imageAlt: "Samsung Galaxy S26 Ultra",
  },
  {
    headline: "IPHONE 16 PRO.\nHELLO, APPLE INTELLIGENCE.",
    subline: "The most powerful iPhone ever. Grade A+++++ available now.",
    cta: "Shop iPhones",
    ctaHref: "/shop?category=iPhones",
    image: "https://images.unsplash.com/photo-1727281146398-e506691c28c3?w=900&q=80&auto=format&fit=crop",
    imageAlt: "iPhone 16 Pro",
  },
  {
    headline: "PREMIUM LAPTOPS.\nBUILT FOR PROS.",
    subline: "MacBook, HP EliteBook, and Dell XPS. Best prices in Abuja.",
    cta: "Shop Laptops",
    ctaHref: "/shop?category=Laptops",
    image: "https://images.unsplash.com/photo-1615788189819-bee84874da4b?w=900&q=80&auto=format&fit=crop",
    imageAlt: "Premium Laptops",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const INTERVAL = 6000;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  function handleCta() {
    if (slide.ctaHref.startsWith('http')) {
      window.open(slide.ctaHref, "_blank", "noreferrer");
    } else {
      navigate(slide.ctaHref);
    }
  }

  return (
    <section className="relative w-full h-[70vh] lg:h-[85vh] overflow-hidden bg-[#F2F2F2] mt-16 md:mt-0">
      <div className="absolute inset-0 flex transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1)" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((s, i) => (
          <div key={i} className="min-w-full h-full relative flex items-center justify-center overflow-hidden">
            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 h-full py-12 lg:py-0">
              {/* Text Content */}
              <div className="flex flex-col gap-4 lg:gap-8 max-w-xl text-center lg:text-left order-2 lg:order-1 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <h1
                  className="leading-[1.1] uppercase text-black"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(36px, 6vw, 80px)",
                    letterSpacing: "-0.05em",
                    whiteSpace: "pre-line",
                  }}
                >
                  {s.headline}
                </h1>
                <p className="text-sm lg:text-lg font-medium text-black/60 uppercase tracking-[0.2em]">
                  {s.subline}
                </p>
                <div className="flex justify-center lg:justify-start mt-4">
                  <button
                    onClick={handleCta}
                    className="px-12 py-5 bg-black text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-full shadow-2xl"
                  >
                    {s.cta}
                  </button>
                </div>
              </div>

              {/* Prominent Image */}
              <div className="flex-1 flex items-center justify-center h-full max-h-[40vh] lg:max-h-[70vh] order-1 lg:order-2 animate-in fade-in zoom-in-95 duration-1000">
                <img
                  src={s.image}
                  alt={s.imageAlt}
                  className="w-full h-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
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
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 p-4 text-black/20 hover:text-black transition-colors hidden lg:block"
      >
        <ChevronLeft size={64} strokeWidth={1} />
      </button>
      <button 
        onClick={() => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1))}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 p-4 text-black/20 hover:text-black transition-colors hidden lg:block"
      >
        <ChevronRight size={64} strokeWidth={1} />
      </button>

      {/* Navigation Bars */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 transition-all duration-500 rounded-full ${
              i === current ? "w-24 bg-black" : "w-12 bg-black/10 hover:bg-black/20"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
