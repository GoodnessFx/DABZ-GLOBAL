import { Truck, RefreshCw, ShieldCheck } from "lucide-react";

const items = [
  { icon: Truck, label: "Express Delivery", sub: "Same day in Abuja" },
  { icon: RefreshCw, label: "Fuss Free Returns", sub: "7 days policy" },
  { icon: ShieldCheck, label: "Secure Payment", sub: "100% verified" },
];

export function TrustBar() {
  return (
    <div className="w-full bg-background border-b border-border py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          {items.map(({ icon: Icon, label, sub }, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-4 lg:gap-6"
            >
              <div className="p-6 bg-muted rounded-full text-foreground transition-transform hover:scale-110 duration-300">
                <Icon size={40} strokeWidth={1} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm lg:text-base font-black uppercase tracking-widest text-foreground">
                  {label}
                </span>
                <span className="text-[11px] lg:text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {sub || "Trusted Service"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
