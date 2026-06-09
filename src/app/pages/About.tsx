import { MapPin, Phone, MessageCircle, Twitter, Instagram, RefreshCw, Truck, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pt-28 pb-16 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        {/* Hero */}
        <div className="mb-16 border-b border-border pb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-4 text-primary">About Us</p>
          <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight mb-6 text-foreground" style={{ letterSpacing: "-0.03em" }}>
            ABUJA'S MOST<br />TRUSTED GADGET STORE
          </h1>
          <p className="text-base leading-relaxed max-w-2xl text-muted-foreground">
            Since 2019, Dabz Global has been Abuja's go-to destination for premium phones, laptops, and accessories.
            Operating from Suite C3, New Banex Plaza, we've built a community of over 138,000 loyal customers across Nigeria.
          </p>
        </div>

        {/* Why Dabz */}
        <div className="mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-8 text-muted-foreground">Why Dabz Global</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Verified & Trusted", desc: "Every device is inspected and verified. We carry only authentic Apple, Samsung, HP, and Dell products." },
              { icon: RefreshCw, title: "Device Swap", desc: "Bring in your old device and upgrade to something new. We offer fair prices for phones and laptops." },
              { icon: Truck, title: "Same-Day Delivery", desc: "Order before 2pm and receive your device the same day within Abuja. Free on orders ₦50,000+." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 bg-card">
                <Icon size={24} className="text-primary mb-4" />
                <h3 className="text-sm font-bold mb-2 text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How to Swap */}
        <div className="mb-16 border-t border-border pt-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-8 text-muted-foreground">How to Swap</p>
          <div className="flex flex-col gap-4">
            {[
              "Contact us via WhatsApp or call 08144343028 with your device details.",
              "Our team will assess your device and provide a fair trade-in value.",
              "Visit Suite C3, New Banex Plaza with your device, or arrange a meetup in Abuja.",
              "Complete the swap and pick up your new device same day.",
            ].map((step, i) => (
              <div key={i} className="flex gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm font-bold bg-primary text-primary-foreground"
                >
                  {i + 1}
                </div>
                <p className="text-sm pt-1 leading-relaxed text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-border pt-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-8 text-muted-foreground">Get in Touch</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Store Location</p>
                  <p className="text-sm mt-1 text-muted-foreground">Suite C3, New Banex Plaza, Wuse 2, Abuja</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Phone</p>
                  <a href="tel:08144343028" className="text-sm mt-1 block transition-colors text-muted-foreground hover:text-primary">08144343028</a>
                  <a href="tel:09078333831" className="text-sm block transition-colors text-muted-foreground hover:text-primary">09078333831</a>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/2348144343028"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 bg-[#25D366] text-white"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
              <a
                href="https://twitter.com/dabz_global"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200"
                style={{ background: "#1E1E1E", color: "#FFFFFF", border: "1px solid #2A2A2A" }}
              >
                <Twitter size={16} />
                @dabz_global
              </a>
              <a
                href="https://instagram.com/dabz_global_of"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200"
                style={{ background: "#1E1E1E", color: "#FFFFFF", border: "1px solid #2A2A2A" }}
              >
                <Instagram size={16} />
                @dabz_global_of
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
