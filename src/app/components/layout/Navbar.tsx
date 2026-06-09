import { useState, useEffect } from "react";
import { Search, Heart, ShoppingBag, User, Menu, X, MessageCircle, Phone } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { useNavigate, useLocation } from "react-router";
import { ModeToggle } from "../mode-toggle";

const navLinks = [
  { label: "Shop All", href: "/shop" },
  { label: "Phones", href: "/shop?category=iPhones" },
  { label: "Laptops", href: "/shop?category=Laptops" },
  { label: "Accessories", href: "/shop?category=Accessories" },
  { label: "Deals", href: "/shop?deals=true" },
  { label: "Swap", href: "/#swap" },
];

export function Navbar() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setQuery] = useState("");
  const cartCount = state.cart.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  function handleNav(href: string) {
    if (href.startsWith("/#")) {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(href.slice(2));
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(href);
    }
  }

  return (
    <>
      <div className="fixed top-8 left-0 right-0 z-50 bg-background border-b border-border">
        {/* Top Header */}
        <div className="h-20 flex items-center justify-between px-4 lg:px-8 max-w-[1440px] mx-auto gap-4 lg:gap-8">
          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex-shrink-0 group">
            <span className="font-sans font-black text-2xl lg:text-3xl tracking-tighter text-black group-hover:text-primary transition-colors">DABZ GLOBAL</span>
          </button>

          {/* Search Bar - Revenes Style */}
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <div className="w-full flex items-center bg-[#F8F8F8] rounded-full px-8 py-3.5 border-2 border-transparent focus-within:border-black focus-within:bg-white transition-all shadow-sm">
              <input
                type="text"
                placeholder="Find your dream device..."
                className="bg-transparent border-none outline-none flex-1 text-sm text-black font-black placeholder:text-black/20"
                value={searchQuery}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    dispatch({ type: "SET_SEARCH_OPEN", payload: true });
                  }
                }}
              />
              <button onClick={() => dispatch({ type: "TOGGLE_SEARCH" })}>
                <Search size={20} className="text-black/20 hover:text-black transition-colors" />
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 lg:gap-8">
            <div className="flex items-center gap-4 hidden sm:flex">
              <a href="tel:08144343028" className="text-black/40 hover:text-black transition-colors">
                <Phone size={22} strokeWidth={1.5} />
              </a>
              <a href="https://wa.me/2348144343028" target="_blank" rel="noreferrer" className="text-black/40 hover:text-[#25D366] transition-colors">
                <MessageCircle size={22} strokeWidth="1.5" />
              </a>
            </div>
            
            <button 
              onClick={() => navigate("/account")}
              className="px-6 py-2 bg-white text-black border border-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-black hover:text-white transition-all hidden lg:block"
            >
              LOGIN
            </button>

            <button 
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
              className="flex items-center gap-3 text-black/40 hover:text-black transition-colors group"
            >
              <div className="relative">
                <ShoppingBag size={22} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-black text-[10px] font-black rounded-full flex items-center justify-center border-2 border-black">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-start leading-none hidden sm:flex">
                <span className="text-[10px] font-black uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">CART</span>
                <span className="text-xs font-black text-black mt-0.5">₦{state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toLocaleString()}</span>
              </div>
            </button>

            <button
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center gap-10 py-4 border-t border-border/50">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="text-[11px] font-black uppercase tracking-[0.2em] text-black/40 hover:text-black transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile search bar - visible only on mobile */}
      <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-background px-4 py-3 border-b border-border">
        <div className="flex items-center bg-muted rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Find your dream device..."
            className="bg-transparent border-none outline-none flex-1 text-xs text-foreground"
            value={searchQuery}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search size={16} className="text-muted-foreground" />
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative flex flex-col w-72 h-full bg-white border-r border-border shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <svg height="24" viewBox="0 0 80 32" fill="none">
                <text x="0" y="26" className="font-sans font-black text-3xl fill-foreground" letterSpacing="-1">DG</text>
              </svg>
              <button onClick={() => setMobileOpen(false)} className="text-muted-foreground">
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col flex-1 p-6 gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="text-left text-sm font-semibold uppercase tracking-widest transition-colors text-foreground"
                  style={{ letterSpacing: "0.1em" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="p-6 border-t border-border">
              <a
                href="https://wa.me/2348144343028"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 py-3 px-4 rounded text-sm font-semibold bg-[#25D366] text-white"
              >
                <MessageCircle size={16} />
                WhatsApp Us
              </a>
              <p className="mt-3 text-xs text-center text-muted-foreground">
                Suite C3, New Banex Plaza, Abuja
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
