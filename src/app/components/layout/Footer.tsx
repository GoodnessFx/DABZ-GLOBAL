import { Twitter, Instagram, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router";

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
          {/* Col 1 */}
          <div className="flex flex-col gap-8">
            <span className="font-sans font-black text-3xl tracking-tighter text-white">DABZ GLOBAL</span>
            <p className="text-xs leading-relaxed text-muted-foreground uppercase tracking-widest font-bold">
              Suite C3, New Banex Plaza, Wuse 2, Abuja. <br />
              Nigeria's #1 Gadget Hub.
            </p>
            <div className="flex items-center gap-6">
              <a href="https://twitter.com/dabz_global" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com/dabz_global_of" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/2348144343028" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-[#25D366] transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">My Account</h4>
            <div className="flex flex-col gap-4">
              {["Login/Register", "My Orders", "My Wishlist", "My Account Details"].map((label) => (
                <button
                  key={label}
                  onClick={() => navigate("/account")}
                  className="text-left text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Customer Service</h4>
            <div className="flex flex-col gap-4">
              {["Warranty", "Payments", "Shipping & Delivery", "Returns & Exchanges"].map((label) => (
                <button
                  key={label}
                  onClick={() => navigate("/about")}
                  className="text-left text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Support</h4>
            <div className="flex flex-col gap-4">
              {["FAQs", "About Us", "Contact Us"].map((label) => (
                <button
                  key={label}
                  onClick={() => navigate(label === "About Us" ? "/about" : "/about")}
                  className="text-left text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            © 2025 DABZ GLOBAL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-4">
            <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-6 grayscale hover:grayscale-0 transition-all" alt="Visa" />
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-6 grayscale hover:grayscale-0 transition-all" alt="Mastercard" />
          </div>
        </div>
      </div>
    </footer>
  );
}
