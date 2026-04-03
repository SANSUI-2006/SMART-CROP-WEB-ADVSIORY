import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Search, MapPin, Droplets, Sun, Wind, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const cropsData = [
  {
    id: "c1",
    name: "Red Onion",
    nameMr: "लाल कांदा",
    region: "Nashik",
    image: "https://images.unsplash.com/photo-1639172486437-28d0e1ce6493?auto=format&fit=crop&q=80&w=600",
    season: "Rabi",
    waterNeed: "Low",
    soil: "Loamy",
    risk: "Medium",
    price: "₹18-24/kg",
  },
  {
    id: "c2",
    name: "Alphonso Mango",
    nameMr: "हापूस आंबा",
    region: "Ratnagiri",
    image: "https://images.unsplash.com/photo-1761116324295-2b62f9d2bcae?auto=format&fit=crop&q=80&w=600",
    season: "Summer",
    waterNeed: "Medium",
    soil: "Laterite",
    risk: "Low",
    price: "₹600-900/doz",
  },
  {
    id: "c3",
    name: "Thompson Grapes",
    nameMr: "थॉम्पसन द्राक्षे",
    region: "Nashik",
    image: "https://images.unsplash.com/photo-1695220773314-020c94a4cab6?auto=format&fit=crop&q=80&w=600",
    season: "Winter-Summer",
    waterNeed: "High",
    soil: "Black Soil",
    risk: "High",
    price: "₹80-120/kg",
  },
  {
    id: "c4",
    name: "Tomato",
    nameMr: "टोमॅटो",
    region: "Nashik",
    image: "https://images.unsplash.com/photo-1727128814873-3b16b64c84af?auto=format&fit=crop&q=80&w=600",
    season: "Kharif",
    waterNeed: "High",
    soil: "Sandy Loam",
    risk: "High",
    price: "₹20-30/kg",
  },
  {
    id: "c5",
    name: "Cashew Nut",
    nameMr: "काजू",
    region: "Ratnagiri",
    image: "https://images.unsplash.com/photo-1754449503068-43215deac414?auto=format&fit=crop&q=80&w=600",
    season: "Spring-Summer",
    waterNeed: "Low",
    soil: "Laterite",
    risk: "Low",
    price: "₹800-1100/kg",
  },
];

export function CropIntelligence() {
  const { language, t, tNum } = useLanguage();
  const [filterRegion, setFilterRegion] = useState<"All" | "Nashik" | "Ratnagiri">("All");
  const [search, setSearch] = useState("");

  const filteredCrops = cropsData.filter((c) => {
    if (filterRegion !== "All" && c.region !== filterRegion) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.nameMr.includes(search)) return false;
    return true;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900 mb-2">Crop Intelligence</h1>
          <p className="text-stone-500 max-w-2xl">Regional crop datasets for Nashik and Ratnagiri, available offline with complete agronomic profiles.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition font-medium border border-stone-200 shadow-sm">
            <Download size={18} />
            Download Offline Dataset
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-stone-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
          <input 
            type="text" 
            placeholder={language === "en" ? "Search crops..." : "पिके शोधा..."}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {["All", "Nashik", "Ratnagiri"].map((reg) => (
            <button
              key={reg}
              onClick={() => setFilterRegion(reg as any)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterRegion === reg 
                  ? "bg-emerald-800 text-white shadow-sm" 
                  : "bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              {reg === "All" ? (language === "en" ? "All Regions" : "सर्व प्रदेश") : reg}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredCrops.map((crop) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={crop.id}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="h-48 relative overflow-hidden bg-stone-100">
                <img 
                  src={crop.image} 
                  alt={crop.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold backdrop-blur-md ${
                    crop.region === "Nashik" ? "bg-emerald-900/80 text-white" : "bg-orange-600/80 text-white"
                  }`}>
                    {crop.region}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-stone-900">
                    {language === "en" ? crop.name : crop.nameMr}
                  </h3>
                  <span className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                    {crop.season}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-y-3 mt-4 text-sm border-t border-stone-100 pt-4">
                  <div className="flex items-center gap-2 text-stone-600">
                    <Droplets size={16} className="text-blue-500" />
                    <span>{language === 'en' ? 'Water:' : 'पाणी:'} <strong className="text-stone-800">{language === 'en' ? crop.waterNeed : (crop.waterNeed === 'Low' ? 'कमी' : crop.waterNeed === 'High' ? 'जास्त' : 'मध्यम')}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600">
                    <MapPin size={16} className="text-orange-500" />
                    <span>{language === 'en' ? 'Soil:' : 'माती:'} <strong className="text-stone-800">{crop.soil}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600">
                    <Wind size={16} className="text-stone-400" />
                    <span>{language === 'en' ? 'Risk:' : 'धोका:'} <strong className={
                      crop.risk === "High" ? "text-red-600" : crop.risk === "Medium" ? "text-orange-500" : "text-emerald-600"
                    }>{language === 'en' ? crop.risk : (crop.risk === 'Low' ? 'कमी' : crop.risk === 'High' ? 'उच्च' : 'मध्यम')}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600">
                    <Sun size={16} className="text-amber-500" />
                    <span>{language === 'en' ? 'Price:' : 'किंमत:'} <strong className="text-stone-800">{tNum(crop.price)}</strong></span>
                  </div>
                </div>

                <div className="mt-5 flex gap-2">
                  <button className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg font-medium transition text-sm">
                    {t("action.viewProfile")}
                  </button>
                  <button className="flex-1 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-medium transition text-sm">
                    {t("action.compare")}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
