import { HeroCarousel } from "../components/home/HeroCarousel";
import { TrustBar } from "../components/home/TrustBar";
import { CategoryLinks } from "../components/home/CategoryLinks";
import { FeaturedGrid } from "../components/home/FeaturedGrid";
import { SwapBanner } from "../components/home/SwapBanner";
import { HotDeals } from "../components/home/HotDeals";
import { BrandsRow } from "../components/home/BrandsRow";
import { Testimonials } from "../components/home/Testimonials";
import { InstagramStrip } from "../components/home/InstagramStrip";
import { RecentlyViewed } from "../components/home/RecentlyViewed";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <TrustBar />
      <CategoryLinks />
      <FeaturedGrid />
      <SwapBanner />
      <HotDeals />
      <BrandsRow />
      <Testimonials />
      <InstagramStrip />
      <RecentlyViewed />
    </>
  );
}
