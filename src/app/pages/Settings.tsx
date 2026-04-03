import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Database, Wifi, Globe, Users, HardDrive, Shield } from "lucide-react";

export function Settings() {
  const { language, toggleLanguage, t } = useLanguage();
  const [offlineSync, setOfflineSync] = useState(true);
  const [autoDownload, setAutoDownload] = useState(true);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-emerald-900 mb-2">Platform Settings</h1>
        <p className="text-stone-500">Manage offline datasets, user roles, and platform language.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        
        {/* Language & Profile */}
        <div className="p-6 border-b border-stone-200">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="text-blue-500" size={24} />
            <h2 className="text-xl font-bold text-stone-800">Language & Profile</h2>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-semibold text-stone-700">Interface Language</p>
              <p className="text-sm text-stone-500">Switch between English and Marathi seamlessly.</p>
            </div>
            <button 
              onClick={toggleLanguage}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg shadow-sm font-medium transition flex items-center gap-2"
            >
              <span>{language === "en" ? "Switch to Marathi" : "Switch to English"}</span>
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-stone-100 mt-2">
            <div>
              <p className="font-semibold text-stone-700">User Role</p>
              <p className="text-sm text-stone-500">Currently set to Farmer (Nashik).</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
              Farmer Mode
            </span>
          </div>
        </div>

        {/* Offline Sync & Data */}
        <div className="p-6 border-b border-stone-200">
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-orange-500" size={24} />
            <h2 className="text-xl font-bold text-stone-800">Offline Intelligence Center</h2>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-semibold text-stone-700">Enable Offline Mode</p>
              <p className="text-sm text-stone-500">Cache crop intelligence and advisory data.</p>
            </div>
            <button 
              onClick={() => setOfflineSync(!offlineSync)}
              className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${offlineSync ? "bg-emerald-500" : "bg-stone-300"}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${offlineSync ? "translate-x-6" : "translate-x-0"}`} />
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-stone-100 mt-2">
            <div>
              <p className="font-semibold text-stone-700">Auto-Download Local Datasets</p>
              <p className="text-sm text-stone-500">Nashik & Ratnagiri datasets update when online.</p>
            </div>
            <button 
              onClick={() => setAutoDownload(!autoDownload)}
              className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${autoDownload ? "bg-emerald-500" : "bg-stone-300"}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${autoDownload ? "translate-x-6" : "translate-x-0"}`} />
            </button>
          </div>

          <div className="bg-stone-50 rounded-lg p-4 mt-4 border border-stone-200 flex justify-between items-center">
            <div className="flex gap-3">
              <HardDrive className="text-stone-400" />
              <div>
                <p className="font-semibold text-stone-700">Local Storage Usage</p>
                <p className="text-xs text-stone-500">45 MB / 500 MB used for cached crops.</p>
              </div>
            </div>
            <button className="text-sm font-semibold text-red-600 hover:text-red-700">Clear Cache</button>
          </div>
        </div>

        {/* Admin Section */}
        <div className="p-6 bg-stone-50">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-stone-600" size={24} />
            <h2 className="text-xl font-bold text-stone-800">Admin Controls</h2>
          </div>
          <p className="text-sm text-stone-500 mb-4">
            Dataset import center for CSV, Excel, government agriculture data sheets, mandi price files, and local survey uploads.
          </p>
          <button className="px-4 py-2 bg-stone-800 text-white rounded-lg shadow-sm font-medium hover:bg-stone-900 transition flex items-center gap-2">
            <Users size={18} />
            Access Admin Panel
          </button>
        </div>
      </div>
    </div>
  );
}
