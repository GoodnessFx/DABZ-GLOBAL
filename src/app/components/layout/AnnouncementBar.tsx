import { useState, useEffect } from "react";

const messages = [
  "Free delivery on orders above ₦50,000 in Abuja",
  "Swap your old device — DM or call 08144343028",
  "Verified seller since 2019 — Suite C3 New Banex Plaza",
];

export function AnnouncementBar() {
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
    <div className="w-full flex items-center justify-center text-center px-4 bg-foreground h-8 z-[60] relative">
      <p
        className="text-[10px] font-black uppercase tracking-[0.3em] text-background"
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
