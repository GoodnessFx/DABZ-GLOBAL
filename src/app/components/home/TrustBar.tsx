import { Truck, RefreshCw, Headphones } from "lucide-react";

export function TrustBar() {
  return (
    <div className="w-full bg-white border-b border-border py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {items.map(({ icon: Icon, label, sub }, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-4 group"
            >
              <div className="text-black transition-all duration-500 group-hover:scale-110">
                <Icon size={72} strokeWidth={1} />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-lg lg:text-xl font-black uppercase tracking-tight text-black">
                  {label}
                </span>
                <span className="text-xs lg:text-sm font-medium uppercase tracking-[0.2em] text-black/40 leading-relaxed max-w-[250px] mx-auto">
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

const items = [
  { icon: Truck, label: "Express Delivery", sub: "Get your items the Same Day you order them.*" },
  { icon: RefreshCw, label: "Fuss Free Returns", sub: "Easily return items that do not work as stated." },
  { icon: Headphones, label: "24/7 Support", sub: "Get help and find answers to questions in real time." },
];
