import { useState } from "react";
import { MessageCircle, Phone, Instagram, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const XIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933zm-1.292 19.489h2.039L6.486 3.24H4.298l13.311 17.402z" />
  </svg>
);

const WhatsAppIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 448 512" fill="currentColor">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.4-8.6-44.6-27.6-16.5-14.7-27.6-32.8-30.8-38.4-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.7 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

export function ContactFAB() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: <Phone size={20} />,
      href: "tel:08144343028",
      color: "bg-black",
      label: "Call Us",
    },
    {
      icon: <WhatsAppIcon size={24} />,
      href: "https://wa.me/2348144343028",
      color: "bg-[#25D366]",
      label: "WhatsApp",
    },
    {
      icon: <Instagram size={20} />,
      href: "https://instagram.com/dabz_global_official",
      color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
      label: "Instagram",
    },
    {
      icon: <XIcon size={18} />,
      href: "https://x.com/dabz_global",
      color: "bg-black",
      label: "Twitter / X",
    },
  ];

  return (
    <div className="fixed bottom-8 right-6 lg:right-12 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end gap-4 mb-2">
            {actions.map((action, index) => (
              <motion.a
                key={index}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: index * 0.05 
                }}
                className="flex items-center gap-3 group pointer-events-auto"
              >
                <div className="flex flex-col items-end gap-1">
                    <span className="px-4 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl border border-black/5 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        {action.label}
                    </span>
                </div>
                <div className={`w-14 h-14 ${action.color} text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:scale-110 transition-transform active:scale-95`}>
                  {action.icon}
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full flex items-center justify-center z-10 relative group text-white outline-none bg-black shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all"
      >
        <motion.div
            animate={{ 
              rotate: isOpen ? 90 : 0,
              scale: isOpen ? 1 : 1,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex items-center justify-center w-full h-full"
        >
            {isOpen ? <X size={28} /> : (
                <div className="relative flex items-center justify-center">
                    <WhatsAppIcon size={32} />
                </div>
            )}
        </motion.div>
      </button>

      {/* Overlay when open to close on click anywhere */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[-1]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
