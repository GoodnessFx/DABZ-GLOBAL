import { useState } from "react";
import { useStore } from "../components/store/StoreContext";
import { products, formatPrice } from "../components/data/products";
import { useNavigate } from "react-router";
import { Package, Heart, User, MapPin, Eye, EyeOff } from "lucide-react";
import { ProductCard } from "../components/ProductCard";

const tabs = ["Login", "Register"] as const;
const dashTabs = ["My Orders", "Wishlist", "Profile"] as const;

const mockOrders = [
  { id: "DG-2025-7842", product: "iPhone 16 128GB", date: "Jan 15, 2025", total: 950000, status: "Delivered" },
  { id: "DG-2025-6391", product: "AirPods Pro 2nd Gen", date: "Feb 2, 2025", total: 165000, status: "Shipped" },
  { id: "DG-2025-5104", product: "MacBook Air M2", date: "Mar 8, 2025", total: 750000, status: "Processing" },
];

const statusColors: Record<string, string> = {
  Delivered: "#1A6B2F",
  Shipped: "#1A4B8B",
  Processing: "#6B4A1A",
};

export default function Account() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const [authTab, setAuthTab] = useState<typeof tabs[number]>("Login");
  const [dashTab, setDashTab] = useState<typeof dashTabs[number]>("My Orders");
  const [showPw, setShowPw] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [regForm, setRegForm] = useState({ name: "", phone: "", email: "", password: "", confirm: "" });
  const [profileForm, setProfileForm] = useState({ name: "John Doe", phone: "08012345678", email: "john@example.com" });

  const wishlisted = products.filter((p) => state.wishlist.includes(p.id));

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    dispatch({ type: "SET_USER", payload: { name: "John Doe", email: loginForm.email, phone: "08012345678" } });
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    dispatch({ type: "SET_USER", payload: { name: regForm.name, email: regForm.email, phone: regForm.phone } });
  }

  if (!state.user) {
    return (
      <div className="min-h-screen pt-40 pb-20 bg-background">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          {/* Social Login */}
          <div className="flex justify-center mb-16">
            <button className="flex items-center gap-3 px-8 py-3 bg-[#EA4335] text-white font-black text-xs uppercase tracking-widest rounded shadow-lg hover:opacity-90 transition-all">
              <span className="text-lg">G+</span> LOGIN WITH GOOGLE
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32">
            {/* Login Column */}
            <div className="flex flex-col gap-8">
              <h2 className="text-xl font-black uppercase tracking-widest text-foreground">LOGIN</h2>
              <form onSubmit={handleLogin} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground">
                    Username or email address <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border bg-background text-foreground outline-none focus:border-primary transition-all"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground">
                    Password <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-border bg-background text-foreground outline-none focus:border-primary transition-all"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border" />
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Remember me</span>
                  </label>
                </div>
                <button type="submit" className="w-fit px-12 py-3.5 bg-muted-foreground/50 text-white font-black text-xs uppercase tracking-widest hover:bg-foreground transition-all">
                  LOG IN
                </button>
                <button type="button" className="text-xs font-bold text-foreground hover:text-primary transition-colors text-left">
                  Lost your password?
                </button>
              </form>
            </div>

            {/* Register Column */}
            <div className="flex flex-col gap-8">
              <h2 className="text-xl font-black uppercase tracking-widest text-foreground">REGISTER</h2>
              <form onSubmit={handleRegister} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground">
                    Email address <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-border bg-background text-foreground outline-none focus:border-primary transition-all"
                    value={regForm.email}
                    onChange={(e) => setRegForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground">
                    Password <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-border bg-background text-foreground outline-none focus:border-primary transition-all"
                    value={regForm.password}
                    onChange={(e) => setRegForm((f) => ({ ...f, password: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border" defaultChecked />
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Subscribe to our newsletter</span>
                  </label>
                  <p className="text-[11px] leading-relaxed text-muted-foreground italic">
                    Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
                  </p>
                </div>
                <button type="submit" className="w-fit px-12 py-3.5 bg-muted-foreground/50 text-white font-black text-xs uppercase tracking-widest hover:bg-foreground transition-all">
                  REGISTER
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
              {[
                { label: "Full Name", key: "name", type: "text" },
                { label: "Phone Number", key: "phone", type: "tel" },
                { label: "Email Address", key: "email", type: "email" },
                { label: "Password", key: "password", type: "password" },
                { label: "Confirm Password", key: "confirm", type: "password" },
              ].map(({ label, key, type }) => (
                <input
                  key={key}
                  type={type}
                  className="px-4 py-3 text-sm outline-none"
                  style={inputStyle}
                  placeholder={label}
                  value={regForm[key as keyof typeof regForm]}
                  onChange={(e) => setRegForm((f) => ({ ...f, [key]: e.target.value }))}
                />
              ))}
              <button type="submit" className="w-full py-3 text-sm font-bold uppercase tracking-widest mt-2" style={{ background: "#D4AF37", color: "#0A0A0A" }}>
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16" style={{ background: "#0A0A0A" }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight" style={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}>
              My Account
            </h1>
            <p className="text-sm mt-1" style={{ color: "#B0B0B0" }}>Welcome back, {state.user.name}</p>
          </div>
          <button
            onClick={() => dispatch({ type: "SET_USER", payload: null })}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider"
            style={{ background: "#1E1E1E", color: "#B0B0B0" }}
          >
            Sign Out
          </button>
        </div>

        {/* Dash tabs */}
        <div className="flex" style={{ borderBottom: "1px solid #2A2A2A", marginBottom: "32px" }}>
          {dashTabs.map((tab) => {
            const icons = { "My Orders": Package, Wishlist: Heart, Profile: User };
            const Icon = icons[tab];
            return (
              <button
                key={tab}
                onClick={() => setDashTab(tab)}
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all duration-200"
                style={{
                  color: dashTab === tab ? "#FFFFFF" : "#B0B0B0",
                  borderBottom: dashTab === tab ? "2px solid #D4AF37" : "2px solid transparent",
                }}
              >
                <Icon size={14} />
                {tab}
              </button>
            );
          })}
        </div>

        {/* My Orders */}
        {dashTab === "My Orders" && (
          <div className="flex flex-col gap-4">
            {mockOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-5" style={{ background: "#161616", border: "1px solid #2A2A2A" }}>
                <div>
                  <p className="text-sm font-bold" style={{ color: "#FFFFFF" }}>{order.product}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#B0B0B0" }}>Order #{order.id} · {order.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#FFFFFF" }}>
                    {formatPrice(order.total)}
                  </p>
                  <span
                    className="px-3 py-1 text-xs font-bold uppercase"
                    style={{ background: statusColors[order.status] || "#2A2A2A", color: "#FFFFFF" }}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Wishlist */}
        {dashTab === "Wishlist" && (
          wishlisted.length === 0 ? (
            <div className="text-center py-20">
              <Heart size={48} style={{ color: "#2A2A2A", margin: "0 auto 16px" }} />
              <p className="text-sm" style={{ color: "#B0B0B0" }}>Your wishlist is empty</p>
              <button onClick={() => navigate("/shop")} className="mt-4 px-6 py-2 text-sm font-bold" style={{ background: "#D4AF37", color: "#0A0A0A" }}>
                Browse Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {wishlisted.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )
        )}

        {/* Profile */}
        {dashTab === "Profile" && (
          <div className="max-w-sm flex flex-col gap-4">
            {[
              { label: "Full Name", key: "name" },
              { label: "Phone Number", key: "phone" },
              { label: "Email Address", key: "email" },
            ].map(({ label, key }) => (
              <div key={key}>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#B0B0B0" }}>{label}</p>
                <input
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={{ background: "#1E1E1E", color: "#FFFFFF", border: "1px solid #2A2A2A" }}
                  value={profileForm[key as keyof typeof profileForm]}
                  onChange={(e) => setProfileForm((f) => ({ ...f, [key]: e.target.value }))}
                />
              </div>
            ))}
            <button className="py-3 text-sm font-bold uppercase tracking-wider mt-2" style={{ background: "#D4AF37", color: "#0A0A0A" }}>
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
