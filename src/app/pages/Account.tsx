import { useState } from "react";
import { useStore } from "../components/store/StoreContext";
import { products, formatPrice } from "../components/data/products";
import { useNavigate } from "react-router";
import { Package, Heart, User, MapPin, Eye, EyeOff } from "lucide-react";
import { ProductCard } from "../components/ProductCard";

const tabs = ["Login", "Register"] as const;
const dashTabs = ["My Orders", "Wishlist", "Profile"] as const;

const mockOrders = [
  { id: "DG-2025-7842", product: "iPhone 16 Pro 256GB", date: "Jan 15, 2025", total: 1750000, status: "Delivered" },
  { id: "DG-2025-6391", product: "Redmi A7 Pro", date: "Feb 2, 2025", total: 126300, status: "Shipped" },
];

const statusColors: Record<string, string> = {
  Delivered: "#000000",
  Shipped: "#666666",
  Processing: "#999999",
};

export default function Account() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const [dashTab, setDashTab] = useState<typeof dashTabs[number]>("My Orders");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [regForm, setRegForm] = useState({ name: "", phone: "", email: "", password: "", confirm: "" });

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
      <div className="min-h-screen pt-40 pb-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          {/* Social Login */}
          <div className="flex justify-center mb-24">
            <button className="flex items-center gap-4 px-12 py-5 bg-[#EA4335] text-white font-black text-xs uppercase tracking-[0.3em] rounded-full shadow-2xl hover:scale-105 transition-all">
              <span className="text-xl">G+</span> LOGIN WITH GOOGLE
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 lg:gap-40">
            {/* Login Column */}
            <div className="flex flex-col gap-10">
              <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-black">LOGIN</h2>
              <form onSubmit={handleLogin} className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">
                    Username or email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 border-2 border-[#EEEEEE] bg-white text-black font-medium outline-none focus:border-black transition-all rounded-lg"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    className="w-full px-6 py-4 border-2 border-[#EEEEEE] bg-white text-black font-medium outline-none focus:border-black transition-all rounded-lg"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-2 border-[#EEEEEE] checked:bg-black" />
                    <span className="text-[10px] font-black text-black/40 group-hover:text-black uppercase tracking-[0.2em] transition-colors">Remember me</span>
                  </label>
                </div>
                <button type="submit" className="w-fit px-16 py-4 bg-white text-black border-2 border-black font-black text-xs uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all rounded-lg shadow-xl">
                  LOG IN
                </button>
                <button type="button" className="text-[10px] font-black text-black/40 hover:text-black uppercase tracking-[0.2em] transition-colors text-left">
                  Lost your password?
                </button>
              </form>
            </div>

            {/* Register Column */}
            <div className="flex flex-col gap-10">
              <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-black">REGISTER</h2>
              <form onSubmit={handleRegister} className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full px-6 py-4 border-2 border-[#EEEEEE] bg-white text-black font-medium outline-none focus:border-black transition-all rounded-lg"
                    value={regForm.email}
                    onChange={(e) => setRegForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    className="w-full px-6 py-4 border-2 border-[#EEEEEE] bg-white text-black font-medium outline-none focus:border-black transition-all rounded-lg"
                    value={regForm.password}
                    onChange={(e) => setRegForm((f) => ({ ...f, password: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-6">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-2 border-[#EEEEEE] checked:bg-black" defaultChecked />
                    <span className="text-[10px] font-black text-black/40 group-hover:text-black uppercase tracking-[0.2em] transition-colors">Subscribe to our newsletter</span>
                  </label>
                  <p className="text-[11px] leading-relaxed text-black/30 font-medium">
                    Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
                  </p>
                </div>
                <button type="submit" className="w-fit px-16 py-4 bg-white text-black border-2 border-black font-black text-xs uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all rounded-lg shadow-xl">
                  REGISTER
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-16 border-b-2 border-black pb-8">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-black">
              My Account.
            </h1>
            <p className="text-xs font-black uppercase tracking-[0.3em] mt-2 text-black/40">Welcome back, {state.user.name}</p>
          </div>
          <button
            onClick={() => dispatch({ type: "SET_USER", payload: null })}
            className="px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] bg-[#F8F8F8] text-black hover:bg-black hover:text-white transition-all rounded-full"
          >
            Sign Out
          </button>
        </div>

        {/* Dash tabs */}
        <div className="flex gap-8 mb-16 overflow-x-auto pb-4 scrollbar-hide">
          {dashTabs.map((tab) => {
            const icons = { "My Orders": Package, Wishlist: Heart, Profile: User };
            const Icon = icons[tab];
            return (
              <button
                key={tab}
                onClick={() => setDashTab(tab)}
                className={`flex items-center gap-3 px-8 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-full ${
                  dashTab === tab ? "bg-black text-white shadow-2xl" : "bg-[#F8F8F8] text-black/40 hover:text-black"
                }`}
              >
                <Icon size={16} />
                {tab}
              </button>
            );
          })}
        </div>

        {/* My Orders */}
        {dashTab === "My Orders" && (
          <div className="flex flex-col gap-6">
            {mockOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-8 bg-white border-2 border-[#EEEEEE] hover:border-black transition-all rounded-xl group shadow-sm">
                <div>
                  <p className="text-lg font-black uppercase tracking-tight text-black">{order.product}</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mt-2 text-black/30">Order #{order.id} · {order.date}</p>
                </div>
                <div className="flex items-center gap-8">
                  <p className="text-xl font-black text-black">
                    {formatPrice(order.total)}
                  </p>
                  <span
                    className="px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-full text-white"
                    style={{ background: statusColors[order.status] || "#000000" }}
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
            <div className="text-center py-32 flex flex-col items-center gap-8">
              <div className="p-12 bg-[#F8F8F8] rounded-full text-black/10">
                <Heart size={80} strokeWidth={1} />
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-xl font-black uppercase tracking-tight text-black">Your wishlist is empty.</p>
                <button 
                  onClick={() => navigate("/shop")} 
                  className="px-12 py-4 text-xs font-black uppercase tracking-[0.3em] bg-black text-white rounded-full hover:scale-105 transition-all shadow-2xl"
                >
                  Browse Products
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {wishlisted.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )
        )}
      </div>
    </div>
  );
}
