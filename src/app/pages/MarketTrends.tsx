import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { TrendingUp, TrendingDown, DollarSign, RefreshCcw } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const marketData = [
  { month: "Jan", NashikOnion: 2000, RatnagiriMango: 1500, Tomato: 800, Cashew: 900 },
  { month: "Feb", NashikOnion: 1800, RatnagiriMango: 2000, Tomato: 750, Cashew: 920 },
  { month: "Mar", NashikOnion: 2500, RatnagiriMango: 5000, Tomato: 1100, Cashew: 930 },
  { month: "Apr", NashikOnion: 3000, RatnagiriMango: 8000, Tomato: 1200, Cashew: 940 },
  { month: "May", NashikOnion: 2200, RatnagiriMango: 9000, Tomato: 900, Cashew: 950 },
  { month: "Jun", NashikOnion: 2800, RatnagiriMango: 4000, Tomato: 1050, Cashew: 960 },
];

const currentPrices = [
  { crop: "Red Onion", region: "Nashik", price: "₹2,500/Qtl", trend: "up", percent: "+5.2%", status: "High Demand" },
  { crop: "Tomato", region: "Nashik", price: "₹1,200/Qtl", trend: "down", percent: "-2.1%", status: "Stable" },
  { crop: "Alphonso", region: "Ratnagiri", price: "₹8,000/Doz", trend: "up", percent: "+12.4%", status: "Export Surge" },
  { crop: "Cashew", region: "Ratnagiri", price: "₹950/Kg", trend: "up", percent: "+1.5%", status: "Steady" },
];

export function MarketTrends() {
  const { language, tNum } = useLanguage();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900 mb-2">{language === 'en' ? 'Market Insights' : 'बाजार माहिती'}</h1>
          <p className="text-stone-500 max-w-2xl">{language === 'en' ? 'Mandi trends, price movement, and seasonal demand.' : 'मंडीतील कल आणि किमतीतील बदल.'}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-700 rounded-lg shadow-sm font-medium hover:bg-stone-200 transition">
          <RefreshCcw size={18} />
          {language === 'en' ? 'Sync Prices' : 'किमती सिंक करा'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentPrices.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                  {language === 'en' ? item.region : (item.region === 'Nashik' ? 'नाशिक' : 'रत्नागिरी')}
                </span>
                <h3 className="text-lg font-bold text-stone-800">
                  {language === 'en' ? item.crop : (item.crop === 'Red Onion' ? 'लाल कांदा' : item.crop === 'Tomato' ? 'टोमॅटो' : item.crop === 'Alphonso' ? 'हापूस' : 'काजू')}
                </h3>
              </div>
              <div className={`p-2 rounded-full ${item.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                {item.trend === "up" ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
              </div>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-bold text-stone-900">{tNum(item.price)}</p>
                <p className={`text-sm font-medium ${item.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                  {tNum(item.percent)} {language === 'en' ? 'this week' : 'या आठवड्यात'}
                </p>
              </div>
              <span className="text-xs font-semibold bg-stone-100 text-stone-600 px-2 py-1 rounded">
                {language === 'en' ? item.status : (item.status === 'High Demand' ? 'जास्त मागणी' : item.status === 'Stable' ? 'स्थिर' : item.status === 'Export Surge' ? 'निर्यात वाढ' : 'स्थिर')}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-stone-800 mb-6">6-Month Price Movement</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={marketData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#78716c", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#78716c", fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: "#f5f5f4" }}
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Bar dataKey="NashikOnion" name={language === 'en' ? "Nashik Onion (₹/Qtl)" : "नाशिक कांदा (₹/क्विं)"} fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="RatnagiriMango" name={language === 'en' ? "Ratnagiri Mango (₹/Doz)" : "रत्नागिरी हापूस (₹/डझन)"} fill="#f97316" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Tomato" name={language === 'en' ? "Tomato (₹/Qtl)" : "टोमॅटो (₹/क्विं)"} fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Cashew" name={language === 'en' ? "Cashew (₹/Kg)" : "काजू (₹/किग्रॅ)"} fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
