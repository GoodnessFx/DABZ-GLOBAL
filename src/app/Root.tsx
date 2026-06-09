import { Outlet } from "react-router";
import { AnnouncementBar } from "./components/layout/AnnouncementBar";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { CartDrawer } from "./components/layout/CartDrawer";
import { SearchOverlay } from "./components/layout/SearchOverlay";
import { CompareBar } from "./components/layout/CompareBar";
import { StoreProvider } from "./components/store/StoreContext";
import { ThemeProvider } from "./components/theme-provider";

export default function Root() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <StoreProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
          <CompareBar />
        </div>
      </StoreProvider>
    </ThemeProvider>
  );
}
