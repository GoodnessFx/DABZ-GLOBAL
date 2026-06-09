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
    <section className="px-6 lg:px-12 py-24 bg-[#F8F8F8]">
      <div className="max-w-[1200px] mx-auto bg-white p-12 lg:p-20 shadow-2xl border border-border">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-black mb-4">
            Customer Reviews.
          </h2>
          <p className="text-sm font-medium text-black/40 mb-12">What our customers are saying on our <a href="https://google.com" target="_blank" rel="noreferrer" className="text-blue-600 underline">Google Business Profile</a>.</p>
          
          <div className="flex flex-col items-center gap-2 mb-16">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-black">EXCELLENT</span>
            <Stars />
            <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Based on 150+ reviews</p>
            <div className="mt-4">
              <span className="text-3xl font-black font-sans tracking-tighter">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 bg-black text-white rounded-2xl flex flex-col gap-6 text-left border border-white/10 group transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-sm font-black text-white uppercase">{t.name[0]}</div>
                    <div>
                      <p className="text-[12px] font-black uppercase tracking-widest text-white">{t.name}</p>
                      <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-0.5">{t.product}</p>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-0.5">{t.date}</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-[#4285F4] rounded-full flex items-center justify-center text-[10px] font-bold text-white">G</div>
                </div>
                <Stars />
                <p className="text-sm leading-relaxed text-white/80 font-medium italic">&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
