import { Truck, RefreshCw, Headphones } from "lucide-react";

export function TrustBar() {
  return (
    <div className="w-full bg-white border-b border-border py-20 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-32">
          {items.map(({ icon: Icon, label, sub }, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-6 lg:gap-10 group"
            >
              <div className="p-10 lg:p-12 bg-[#F8F8F8] rounded-full text-black transition-all duration-500 group-hover:bg-black group-hover:text-white group-hover:scale-110 shadow-sm">
                <Icon size={56} strokeWidth={1} />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-lg lg:text-xl font-black uppercase tracking-tight text-black">
                  {label}
                </span>
                <span className="text-xs lg:text-sm font-medium uppercase tracking-[0.2em] text-black/40 leading-relaxed max-w-[200px]">
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
