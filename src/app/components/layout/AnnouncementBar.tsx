import { useState, useEffect } from "react";

const messages = [
  "Free delivery on orders above ₦50,000 in Abuja",
  "Swap your old device — DM or call 08144343028",
  "Verified seller since 2019 — Suite C3 New Banex Plaza",
];

export function AnnouncementBar({ isScrolled }: { isScrolled?: boolean }) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % messages.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 w-full flex items-center justify-center text-center px-4 bg-white border-b border-border h-8 z-[60] transition-transform duration-300 ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}>
      <p
        className="text-[10px] font-black uppercase tracking-[0.3em] text-black"
        style={{
          transition: "opacity 400ms ease",
          opacity: visible ? 1 : 0,
        }}
      >
        {messages[current]}
      </p>
    </div>
  );
}
