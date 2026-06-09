import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    headline: "GALAXY S26 SERIES.\nGALAXY AI IS HERE.",
    subline: "Experience the future of mobile with the new S26 Ultra.",
    cta: "Order Now",
    ctaHref: "/shop?category=Samsung",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1920&q=80&auto=format&fit=crop",
    imageAlt: "Samsung Galaxy S26 Ultra",
  },
  {
    headline: "IPHONE 16 PRO.\nHELLO, APPLE INTELLIGENCE.",
    subline: "The most powerful iPhone ever. Grade A+++++ available now.",
    cta: "Shop iPhones",
    ctaHref: "/shop?category=iPhones",
    image: "https://images.unsplash.com/photo-1727281146398-e506691c28c3?w=1920&q=80&auto=format&fit=crop",
    imageAlt: "iPhone 16 Pro",
  },
  {
    headline: "PREMIUM LAPTOPS.\nBUILT FOR PROS.",
    subline: "MacBook, HP EliteBook, and Dell XPS. Best prices in Abuja.",
    cta: "Shop Laptops",
    ctaHref: "/shop?category=Laptops",
    image: "https://images.unsplash.com/photo-1615788189819-bee84874da4b?w=1920&q=80&auto=format&fit=crop",
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
    <section className="relative w-full h-[80vh] lg:h-[95vh] overflow-hidden bg-white">
      <div className="absolute inset-0 flex transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1)" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((s, i) => (
          <div key={i} className="min-w-full h-full relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={s.image}
                alt={s.imageAlt}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] lg:bg-transparent lg:backdrop-blur-none" />
            </div>

            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 h-full flex items-center">
              {/* Text Content */}
              <div className="flex flex-col gap-6 lg:gap-10 max-w-2xl animate-in fade-in slide-in-from-left-12 duration-1000">
                <h1
                  className="leading-[1.1] uppercase text-black"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(48px, 8vw, 100px)",
                    letterSpacing: "-0.05em",
                    whiteSpace: "pre-line",
                    textShadow: "0 2px 40px rgba(255,255,255,0.8)"
                  }}
                >
                  {s.headline}
                </h1>
                <p className="text-base lg:text-xl font-black text-black uppercase tracking-[0.3em] drop-shadow-sm">
                  {s.subline}
                </p>
                <div className="flex mt-4">
                  <button
                    onClick={handleCta}
                    className="px-16 py-6 bg-white text-black border-2 border-black font-black text-sm uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-500 rounded-full shadow-2xl hover:scale-105"
                  >
                    {s.cta}
                  </button>
                </div>
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
              i === current ? "w-24 bg-black" : "w-12 bg-black/20 hover:bg-black/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      
      {/* Floating Chat Icon - Bottom Right */}
      <a 
        href="https://wa.me/2348144343028" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group"
      >
        <MessageCircle size={32} fill="currentColor" />
        <span className="absolute right-full mr-4 px-4 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
          Chat with us
        </span>
      </a>
    </section>
  );
}
