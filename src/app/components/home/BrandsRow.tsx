import { useNavigate } from "react-router";

const brands = [
  { 
    name: "Apple", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    filter: "Apple" 
  },
  { 
    name: "Samsung", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    filter: "Samsung" 
  },
  { 
    name: "JBL", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/JBL_logo.svg",
    filter: "JBL" 
  },
  { 
    name: "Infinix", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Infinix_Logo.svg",
    filter: "Infinix" 
  },
  { 
    name: "Oppo", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/Oppo_logo_2019.svg",
    filter: "Oppo" 
  },
  { 
    name: "Nokia", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/Nokia_logo.svg",
    filter: "Nokia" 
  },
  { 
    name: "itel", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Itel_Logo.svg",
    filter: "itel" 
  },
  { 
    name: "HP", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg",
    filter: "HP" 
  },
  { 
    name: "Dell", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg",
    filter: "Dell" 
  }
];

export function BrandsRow() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white border-t border-black/5 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-12 flex flex-col items-center">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 mb-2">
          Authorized Partners
        </h2>
        <div className="w-12 h-[2px] bg-black/10" />
      </div>

      <div className="relative group">
        <div
          className="flex items-center gap-24 animate-marquee"
          style={{ width: "max-content" }}
        >
          {[...brands, ...brands].map((brand, i) => (
            <button
              key={i}
              onClick={() => navigate(`/shop?brand=${brand.filter}`)}
              className="flex-shrink-0 flex items-center justify-center min-w-[120px] transition-all duration-500 hover:scale-110"
            >
              {brand.logo ? (
                <div className="h-10 w-32 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="max-h-full max-w-full object-contain pointer-events-none"
                    onError={(e) => {
                      // If logo fails to load, replace with name text
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="text-lg font-black uppercase tracking-widest text-black/20 hover:text-black transition-colors">${brand.name}</span>`;
                      }
                    }}
                  />
                </div>
              ) : (
                <span className="text-lg font-black uppercase tracking-widest text-black/20 hover:text-black transition-colors">
                  {brand.name}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
