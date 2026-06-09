# Dabz Global Storefront
Abuja's most trusted gadget store — online.
Dabz Global has been selling iPhones, Samsung phones, MacBooks, HP and Dell laptops, AirPods, speakers, and accessories from Suite C3, New Banex Plaza, Abuja since 2019. This storefront is the digital extension of that reputation — built to convert, not to impress engineers. Every design and engineering decision in this codebase traces back to one question: does this help someone in Abuja buy a phone today?

## What this is
A single-page ecommerce application purpose-built for Dabz Global. It is not a theme, not a WooCommerce install, and not a bootstrapped template. It is a focused conversion machine with Dabz Global's visual identity baked into every layer — the clean white palette, the high-contrast typography, the product-first layout, and the WhatsApp-first ordering flow that Nigerian consumers actually use.
The application covers the full purchase journey: landing page, product discovery, product detail, cart, checkout, order confirmation, and account management. It also covers the swap journey — Dabz Global's unique edge — with a dedicated conversion section and pre-filled WhatsApp flows that make it effortless for a customer to trade in an old device.

## Brand identity
The Dabz Global visual language is intentionally minimal and authoritative, inspired by premium white-theme aesthetics like Revenes.
The primary palette is pure white ( #FFFFFF ) as the site background, high-contrast black for all primary text and the DG logo. The design uses thin black borders and subtle grayscale stacks to create structure without clutter. Accent colors are used with extreme restraint — primarily black for call-to-action buttons (often with a white-to-black hover state) and #FF3B30 for real discounts or urgency labels.
The signature element is the DG geometric mark rendered as a large SVG watermark at very low opacity on hero and key section backgrounds. It is invisible at a glance but perceptible with attention, creating a sense of depth and brand ownership.
Typography uses Inter across all weights, sourced from Google Fonts with display=swap. Headlines run at weight 800–900 with tight letter-spacing. Body text runs at 400–500. Prices and numeric values use Inter Mono or JetBrains Mono so naira figures align in columns and read as financial data rather than prose.

## Architecture
The application is a single-page React application with hash-based routing or full section-scroll navigation. All state lives in React context and component-level hooks — no external state management library. Persistence for the cart and wishlist uses localStorage with try/catch wrappers so a storage failure never crashes the app.
There is no backend in the initial implementation. Product data is seeded from a local JavaScript array. The checkout flow collects customer information and displays an order confirmation with a unique order reference. Order fulfillment happens via WhatsApp — the confirmation page generates a pre-filled message the customer can send directly to Dabz Global with their order details.

### Pages and views:
- **The home page** contains the announcement bar, navigation, hero carousel, trust bar, category quick links, featured products grid, swap CTA banner, hot deals section, brand logo marquee, testimonials, and footer.
- **The shop page** contains the full product catalog with sidebar filters for condition (Brand New, UK Used), category, brand, and price range. Products load in an 8-item grid with a Load More button. Skeleton loaders appear while products are fetching so the layout does not shift.
- **The product detail page** contains a photo gallery with thumbnail strip, all variant selectors, the Add to Cart and WhatsApp Order buttons, a sticky mobile buy bar that appears when the primary button scrolls out of view, product tabs for description and specifications, and a related products section.
- **The cart** is a slide-in drawer accessible from the navigation icon. It shows all items with quantity controls and a summary with a proceed-to-checkout button. It does not navigate away from the current page.
- **The checkout page** is a distraction-free two-column layout with a step-by-step form on the left and a sticky order summary on the right. It accepts name, phone, email, delivery address, delivery method, and payment method. On submission it shows a loading state and redirects to the confirmation page.
- **The order confirmation page** renders an animated SVG checkmark, the order reference number, the customer's contact details, and a WhatsApp link pre-filled with the full order summary.
- **The account area** contains login, registration, order history, wishlist, profile editing, and saved address management.

### Routing:
- `/` Home
- `/shop` Product catalog
- `/product/:id` Product detail
- `/checkout` Checkout
- `/confirmation` Order confirmation
- `/account` Account dashboard

## Component inventory
- **AnnouncementBar**: rotates three messages on a 4-second interval. Now refined to a white background with black text to match the absolute white theme.
- **Navigation**: is sticky with a glassmorphism scroll effect. It contains the DG logo, integrated search bar, and a right-side icon cluster.
- **HeroCarousel**: runs at full viewport height with immersive product imagery on a white background. CTA buttons use the new white-with-black-border style.
- **TrustBar**: features large, high-impact icons representing core service values like express delivery and 24/7 support.
- **ProductCard**: features a "Quick View" hover bar that transitions from white to black. Includes "On Sale" badges with clean black borders.
- **SwapBanner**: a typographic section with large display text and high-contrast CTA buttons for device trade-ins.
- **HotDeals**: features a countdown timer with white boxes and black borders, creating urgency for active pricing changes.
- **SearchOverlay**: a full-screen white takeover that filters products live as the user types.

## Conversion system
- **WhatsApp ordering**: primary conversion path on product detail pages.
- **Sticky mobile buy bar**: eliminates friction on mobile devices.
- **Low-stock labels**: creates authentic urgency when stock is ≤3.
- **Condition filter prominence**: prioritizes the Brand New vs UK Used choice.
- **Price range filter**: dual-handle slider for budget-conscious shoppers.

## State management
All application state lives in React context providers (CartContext, UserContext, FilterContext, SearchContext). No external state management libraries like Redux or Zustand are used, keeping the bundle light and performance high.

## Performance
- Images use `loading="lazy"` (except hero).
- Skeleton loaders prevent layout shift.
- CSS transitions capped at 300ms for responsiveness.
- Zero unused dependencies.

## Responsive behavior
The application is fully responsive across mobile, tablet, and desktop. Navigation collapses to a hamburger menu on mobile, and the product grid adjusts from 4 columns on desktop to 2 columns on mobile.

## Tech stack
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS 4.0 (Absolute White aesthetic)
- **Icons**: Lucide React
- **State**: React Context API

## Contact and identity
Dabz Global — Suite C3, New Banex Plaza, Abuja
Phone: 08144343028 / 09078333831
WhatsApp: 08144343028
Twitter / X: @dabz_global
Instagram: @dabz_global_official
Established: February 2019
138,000+ followers. Real business. Real Abuja.
