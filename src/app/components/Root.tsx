import { Outlet, NavLink } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  Home, Leaf, ShieldAlert, TrendingUp, Settings as SettingsIcon, 
  Wifi, WifiOff, Globe, Bell, UserCircle 
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

export function Root() {
  const { t, language, toggleLanguage } = useLanguage();
  const [isOffline, setIsOffline] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Mock offline behavior
  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => {
      setIsOffline(false);
      setIsSyncing(true);
      setTimeout(() => setIsSyncing(false), 2000);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  const navItems = [
    { to: "/", icon: Home, label: "nav.dashboard" },
    { to: "/crops", icon: Leaf, label: "nav.crops" },
    { to: "/advisory", icon: ShieldAlert, label: "nav.advisory" },
    { to: "/market", icon: TrendingUp, label: "nav.market" },
    { to: "/settings", icon: SettingsIcon, label: "nav.settings" },
  ];

  return (
    <div className="flex h-screen bg-stone-50 font-sans text-stone-900">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-900 text-stone-100 flex flex-col">
        <div className="p-6 border-b border-emerald-800 flex items-center gap-3">
          <div className="bg-orange-500 p-2 rounded-lg text-white">
            <Leaf size={24} />
          </div>
          <span className="text-xl font-bold tracking-wide">{t("app.title")}</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-emerald-800 text-orange-400 font-medium" 
                    : "hover:bg-emerald-800/50 text-emerald-100 hover:text-white"
                }`
              }
            >
              <item.icon size={20} />
              <span>{t(item.label)}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-emerald-800 text-sm">
          <div className="bg-emerald-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <UserCircle size={20} className="text-emerald-300" />
              <span className="font-medium">Ramesh Patil</span>
            </div>
            <p className="text-emerald-400/80 text-xs">Nashik District</p>
            <div className="mt-2 text-xs bg-emerald-950 inline-block px-2 py-1 rounded text-orange-300">
              {t("role.farmer")}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4">
            {isOffline ? (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-200">
                <WifiOff size={16} />
                <span>{t("status.offline")}</span>
              </div>
            ) : isSyncing ? (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Wifi size={16} />
                </motion.div>
                <span>{t("status.syncing")}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200">
                <Wifi size={16} />
                <span>{t("status.online")}</span>
              </div>
            )}
            
            <span className="text-xs text-stone-500">
              Last synced: Today, 09:41 AM
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-sm font-medium transition-colors"
            >
              <Globe size={16} />
              <span>{language === "en" ? "English" : "मराठी"}</span>
            </button>
            
            <button className="relative p-2 text-stone-400 hover:text-stone-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-auto relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
