import { useNavigate } from "react-router";

export function CollectionsShowcase() {
  const navigate = useNavigate();

  return (
    <section className="px-6 lg:px-12 py-24 bg-[#F8F8F8]">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 flex flex-col gap-8">
            <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-black leading-none">
              Premium Tech,<br />Curated for You.
            </h2>
            <p className="text-lg text-black/60 font-medium max-w-lg leading-relaxed">
              From the latest iPhone 16 Pro to high-performance MacBooks and premium accessories. 
              We bring you the best of Apple and Samsung with verified quality.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <button 
                onClick={() => navigate("/shop?category=iPhones")}
                className="px-8 py-4 bg-black text-white font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-black/80 transition-all"
              >
                Shop iPhones
              </button>
              <button 
                onClick={() => navigate("/shop?category=Laptops")}
                className="px-8 py-4 bg-white text-black border border-black font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-black hover:text-white transition-all"
              >
                Explore Laptops
              </button>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative group">
            <div className="absolute -inset-4 bg-black/5 rounded-[2rem] blur-2xl group-hover:bg-black/10 transition-all duration-500" />
            <img 
              src="/one of the hero section iamge.jfif" 
              alt="Premium Tech Collection" 
              className="relative w-full h-auto rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
