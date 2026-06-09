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
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        {/* Top Header */}
        <div className="h-16 flex items-center justify-between px-4 lg:px-8 max-w-[1440px] mx-auto gap-4 lg:gap-8">
          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex-shrink-0">
            <span className="font-sans font-black text-2xl tracking-tighter text-foreground">DABZ GLOBAL</span>
          </button>

          {/* Search Bar - Revenes Style */}
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <div className="w-full flex items-center bg-muted rounded-full px-5 py-2.5 border border-transparent focus-within:border-primary transition-all">
              <input
                type="text"
                placeholder="Find your dream device..."
                className="bg-transparent border-none outline-none flex-1 text-sm text-foreground placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={() => dispatch({ type: "TOGGLE_SEARCH" })}>
                <Search size={18} className="text-muted-foreground hover:text-foreground transition-colors" />
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3 lg:gap-5">
            <a href="tel:08144343028" className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
              <Phone size={20} />
            </a>
            <a href="https://wa.me/2348144343028" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-[#25D366] transition-colors hidden sm:block">
              <MessageCircle size={20} />
            </a>
            
            <button 
              onClick={() => navigate("/account")}
              className="px-4 py-1.5 bg-muted text-foreground text-xs font-bold uppercase rounded hover:bg-primary hover:text-primary-foreground transition-all hidden lg:block"
            >
              LOGIN
            </button>

            <button 
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <div className="relative">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold hidden sm:block">CART / ₦{state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toLocaleString()}</span>
            </button>

            <button
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Bottom Nav Links - Revenes Style */}
        <div className="hidden lg:flex items-center justify-center gap-8 py-3 border-t border-border/50">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
          <ModeToggle />
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
          <div className="absolute inset-0 bg-black/70" onClick={() => setMobileOpen(false)} />
          <div className="relative flex flex-col w-72 h-full bg-card border-r border-border">
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
