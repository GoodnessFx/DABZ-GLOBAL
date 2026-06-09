import { Twitter, Instagram, MessageCircle, Phone } from "lucide-react";
import { useNavigate } from "react-router";

const XIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933zm-1.292 19.489h2.039L6.486 3.24H4.298l13.311 17.402z" />
  </svg>
);

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-24">
          {/* Col 1 */}
          <div className="flex flex-col gap-10">
            <span className="font-sans font-black text-4xl tracking-tighter text-white">DABZ GLOBAL</span>
            <p className="text-[13px] leading-relaxed text-white/50 uppercase tracking-[0.2em] font-black">
              Sales of phone (iPhones,Samsung), Laptop (MacBook,Hp,Dell) & Accessories (speakers, airPods) We Swap🔀. <br /><br />
              Suite C3, New Banex Plaza, Wuse 2, Abuja.
            </p>
            <div className="flex items-center gap-8">
              <a href="https://twitter.com/dabz_global" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-all hover:scale-110">
                <XIcon size={20} />
              </a>
              <a href="https://instagram.com/dabz_global_official" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-all hover:scale-110">
                <Instagram size={22} />
              </a>
              <a href="https://wa.me/2348144343028" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#25D366] transition-all hover:scale-110">
                <MessageCircle size={22} />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-8">
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white/30">My Account</h4>
            <div className="flex flex-col gap-5">
              {["Login/Register", "My Orders", "My Wishlist", "My Account Details"].map((label) => (
                <button
                  key={label}
                  onClick={() => navigate("/account")}
                  className="text-left text-[12px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-8">
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white/30">Customer Service</h4>
            <div className="flex flex-col gap-5">
              {["Warranty", "Payments", "Shipping & Delivery", "Returns & Exchanges"].map((label) => (
                <button
                  key={label}
                  onClick={() => navigate("/about")}
                  className="text-left text-[12px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-8">
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white/30">Direct Support</h4>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30">CALL US</p>
                <a href="tel:08144343028" className="text-sm font-black text-white hover:text-primary transition-colors">08144343028</a>
                <a href="tel:09078333831" className="text-sm font-black text-white hover:text-primary transition-colors">09078333831</a>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30">WHATSAPP</p>
                <a href="https://wa.me/2348144343028" target="_blank" rel="noreferrer" className="text-sm font-black text-[#25D366] hover:brightness-125 transition-all">08144343028</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/30">
            © 2026 DABZ GLOBAL. ABUJA'S MOST TRUSTED GADGET STORE.
          </p>
          <div className="flex items-center gap-6">
            <img src="https://img.icons8.com/color/48/ffffff/visa.png" className="h-6 grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all" alt="Visa" />
            <img src="https://img.icons8.com/color/48/ffffff/mastercard.png" className="h-6 grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all" alt="Mastercard" />
          </div>
        </div>
      </div>
    </footer>
  );
}
