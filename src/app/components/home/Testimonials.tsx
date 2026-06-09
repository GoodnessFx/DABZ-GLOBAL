const testimonials = [
  {
    name: "Chukwuemeka A.",
    product: "iPhone 15 Pro 256GB",
    text: "Got my iPhone 15 Pro from Dabz Global and the experience was flawless. Sealed box, delivered same day in Abuja. These guys are legit.",
    date: "March 2025",
  },
  {
    name: "Fatima M.",
    product: "MacBook Air M2",
    text: "Swapped my old MacBook and got a great deal. The team at Suite C3 were super helpful and transparent about the price. Will definitely be back.",
    date: "January 2025",
  },
  {
    name: "David O.",
    product: "Samsung Galaxy S25 Ultra",
    text: "Ordered via WhatsApp, paid on delivery. The S25 Ultra came sealed and verified. Dabz Global is hands down the best in Abuja.",
    date: "February 2025",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" className="fill-primary">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="px-6 lg:px-12 py-32 bg-white border-y border-border">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center text-center">
        <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-black mb-4">
          Customer Reviews.
        </h2>
        <div className="w-24 h-1.5 bg-black mb-12" />

        <div className="flex flex-col items-center gap-2 mb-12">
          <span className="text-sm font-black uppercase tracking-[0.2em] text-foreground">EXCELLENT</span>
          <Stars />
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Based on 150+ reviews</p>
          <div className="mt-2">
            <span className="text-xl font-black font-sans tracking-tighter">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 bg-background shadow-sm flex flex-col gap-4 text-left border border-border/50 group hover:border-primary transition-all duration-500">
              <Stars />
              <p className="text-sm leading-relaxed text-foreground font-medium italic">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-foreground">{t.name}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{t.date}</p>
                </div>
                <div className="w-5 h-5 bg-[#4285F4] rounded-full flex items-center justify-center text-[10px] font-bold text-white">G</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
