import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { AnnouncementBar } from "./components/layout/AnnouncementBar";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { CartDrawer } from "./components/layout/CartDrawer";
import { SearchOverlay } from "./components/layout/SearchOverlay";
import { CompareBar } from "./components/layout/CompareBar";
import { ContactFAB } from "./components/layout/ContactFAB";
import { StoreProvider } from "./components/store/StoreContext";
import { ThemeProvider } from "./components/theme-provider";

export default function Root() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 animate-pulse">
          <img src="/logo.jpg" alt="DABZ GLOBAL" className="w-48 h-auto grayscale invert" />
          <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white animate-progress" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <StoreProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
          <AnnouncementBar isScrolled={scrolled} />
          <Navbar isScrolled={scrolled} />
          <main className="flex-1 pt-[180px] lg:pt-[200px]">
            <Outlet />
          </main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
          <CompareBar />
          <ContactFAB />
        </div>
      </StoreProvider>
    </ThemeProvider>
  );
}
