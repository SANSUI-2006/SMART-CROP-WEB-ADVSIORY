import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { CloudRain, Sun, Thermometer, Wind, AlertTriangle, CheckCircle, ChevronRight, Activity, TrendingUp, Camera, MapPin, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { Link } from "react-router";
import * as Popover from "@radix-ui/react-popover";
import * as Dialog from "@radix-ui/react-dialog";

const priceData = [
  { name: "Mon", Nashik: 4000, Ratnagiri: 2400 },
  { name: "Tue", Nashik: 3000, Ratnagiri: 1398 },
  { name: "Wed", Nashik: 2000, Ratnagiri: 9800 },
  { name: "Thu", Nashik: 2780, Ratnagiri: 3908 },
  { name: "Fri", Nashik: 1890, Ratnagiri: 4800 },
  { name: "Sat", Nashik: 2390, Ratnagiri: 3800 },
  { name: "Sun", Nashik: 3490, Ratnagiri: 4300 },
];

const MAHARASHTRA_GEOJSON = "https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States/Maharashtra/Maharashtra.json";

function ScanCropModal({ children, t, language }: { children: React.ReactNode, t: any, language: string }) {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(false);

  const startScan = () => {
    setScanning(true);
    setResult(false);
    setTimeout(() => {
      setScanning(false);
      setResult(true);
    }, 2500);
  };

  return (
    <Dialog.Root onOpenChange={(open) => { if (!open) { setScanning(false); setResult(false); } }}>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white shadow-2xl z-50 outline-none flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
            <h2 className="text-xl font-bold text-emerald-900 flex items-center gap-2">
              <Camera className="text-emerald-600" />
              {language === 'en' ? 'AI Crop Analysis' : 'AI पीक विश्लेषण'}
            </h2>
            <Dialog.Close className="text-stone-400 hover:text-stone-600">
              <span className="sr-only">Close</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </Dialog.Close>
          </div>

          <div className="p-6 overflow-y-auto bg-white flex flex-col items-center">
            {!result ? (
              <div className="w-full flex flex-col items-center">
                <div className="relative w-full max-w-sm h-64 bg-stone-100 rounded-xl overflow-hidden mb-6 border border-stone-200 shadow-sm">
                  <img src="https://images.unsplash.com/photo-1662608293877-7cb290f14a36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nbyUyMGxlYWZ8ZW58MXx8fHwxNzc1MTkzMzkzfDA&ixlib=rb-4.1.0&q=80&w=600" alt="Mango Leaf" className="w-full h-full object-cover" />
                  
                  {scanning && (
                    <motion.div 
                      className="absolute inset-0 bg-emerald-500/20 border-b-2 border-emerald-500"
                      initial={{ y: "-100%" }}
                      animate={{ y: "100%" }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                  )}
                  {scanning && (
                    <div className="absolute inset-0 flex items-center justify-center bg-stone-900/40 backdrop-blur-[2px]">
                      <div className="text-white font-bold flex items-center gap-2">
                        <Activity className="animate-pulse" />
                        {language === 'en' ? 'Analyzing Image...' : 'प्रतिमा विश्लेषित करत आहे...'}
                      </div>
                    </div>
                  )}
                </div>

                {!scanning ? (
                  <button 
                    onClick={startScan}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md transition flex items-center justify-center gap-2"
                  >
                    <Camera size={20} />
                    {language === 'en' ? 'Scan & Analyze' : 'स्कॅन करा आणि विश्लेषित करा'}
                  </button>
                ) : (
                  <p className="text-stone-500 text-sm animate-pulse">{language === 'en' ? 'Checking for diseases, pests, and nutrient deficiencies...' : 'रोग, कीड आणि पोषक तत्त्वांच्या कमतरतेची तपासणी करत आहे...'}</p>
                )}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                <div className="flex gap-4 items-start mb-6">
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 border-2 border-orange-200 shadow-sm relative">
                    <img src="https://images.unsplash.com/photo-1662608293877-7cb290f14a36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nbyUyMGxlYWZ8ZW58MXx8fHwxNzc1MTkzMzkzfDA&ixlib=rb-4.1.0&q=80&w=200" alt="Mango Leaf" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 border-2 border-orange-500 rounded-lg"></div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-stone-900 mb-1">{language === 'en' ? 'Alphonso Mango' : 'हापूस आंबा'}</h3>
                    <div className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2 py-0.5 rounded text-sm font-bold border border-red-200">
                      <AlertTriangle size={14} />
                      {language === 'en' ? 'Unhealthy: Mango Hopper Detected' : 'अस्वस्थ: आंबा तुडतुडे आढळले'}
                    </div>
                    <p className="text-sm text-stone-500 mt-2">
                      {language === 'en' ? 'Accuracy: 94.2%' : 'अचूकता: ९४.२%'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                    <h4 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                      <AlertTriangle size={18} />
                      {language === 'en' ? 'Detailed Diagnosis' : 'सविस्तर निदान'}
                    </h4>
                    <p className="text-sm text-orange-800 leading-relaxed">
                      {language === 'en' 
                        ? 'Image analysis reveals sap-sucking activity indicative of Mango Hoppers on the tender inflorescence. If left untreated, this will cause flower drop and reduce yield.' 
                        : 'प्रतिमा विश्लेषणात कोवळ्या मोहोरावर आंबा तुडतुड्यांचा प्रादुर्भाव दिसून येतो. उपचार न केल्यास मोहोर गळेल आणि उत्पादनात घट होईल.'}
                    </p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                    <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                      <ShieldCheck size={18} />
                      {language === 'en' ? 'Recommended Precautions & Treatment' : 'सुचविलेली खबरदारी आणि उपचार'}
                    </h4>
                    <ul className="space-y-2 text-sm text-emerald-800 font-medium">
                      <li className="flex gap-2 items-start">
                        <span className="mt-0.5 text-emerald-600">•</span>
                        {language === 'en' ? 'Immediate Action: Spray organic Dashparni Ark or 5% Neem seed extract.' : 'तातडीची कृती: सेंद्रिय दशपर्णी अर्क किंवा ५% निंबोळी अर्क फवारणी करा.'}
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="mt-0.5 text-emerald-600">•</span>
                        {language === 'en' ? 'Cultural Control: Prune dense overlapping branches to allow sunlight and airflow.' : 'व्यवस्थापन: सूर्यप्रकाश आणि हवा खेळती राहण्यासाठी दाट फांद्यांची छाटणी करा.'}
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="mt-0.5 text-emerald-600">•</span>
                        {language === 'en' ? 'Monitoring: Hang yellow sticky traps (5-7 per acre).' : 'देखरेख: पिवळे चिकट सापळे लावा (एकरी ५-७).'}
                      </li>
                    </ul>
                  </div>
                </div>

                <button 
                  onClick={() => setResult(false)}
                  className="w-full mt-6 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold transition"
                >
                  {language === 'en' ? 'Scan Another Plant' : 'दुसरी वनस्पती स्कॅन करा'}
                </button>
              </motion.div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function Dashboard() {
  const { t, tNum, language } = useLanguage();

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900 mb-2">{t("dash.summary")}</h1>
          <p className="text-stone-500">{language === 'en' ? 'Overview of Nashik & Ratnagiri districts' : 'नाशिक आणि रत्नागिरी जिल्ह्यांचा आढावा'}</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <ScanCropModal t={t} language={language}>
            <button className="px-4 py-2 bg-emerald-800 text-white rounded-lg shadow-sm font-bold hover:bg-emerald-900 transition flex items-center justify-center gap-2 flex-1 md:flex-none">
              <Camera size={20} />
              {t("dash.scanCrop")}
            </button>
          </ScanCropModal>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow-sm font-medium hover:bg-orange-600 transition flex items-center justify-center gap-2 flex-1 md:flex-none">
            <Activity size={18} />
            {language === 'en' ? 'Quick Action' : 'त्वरित कृती'}
          </button>
        </div>
      </div>

      {/* Weather & Impact Map Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-emerald-900">{t("dash.weatherMap")}</h2>
        </div>
        
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <div className="relative w-full h-64 bg-stone-100 rounded-3xl overflow-hidden border border-stone-200 shadow-sm cursor-pointer group hover:border-emerald-500 transition-all">
              {/* Decorative map background */}
              <div className="absolute inset-0 bg-emerald-900/5 group-hover:bg-emerald-900/10 transition-colors z-0" />
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10l80 0l0 80l-80 0z' fill='none' stroke='%23000' stroke-width='1' stroke-dasharray='5,5' /%3E%3C/svg%3E")`,
                backgroundSize: "100px 100px"
              }} />
              
              {/* Stylized State outline hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <svg viewBox="0 0 400 300" className="w-full h-full max-w-lg fill-stone-300 stroke-stone-400 stroke-2">
                  <path d="M50 150 Q100 120 150 140 T250 100 Q300 150 350 180 T280 250 Q200 280 150 260 T80 200 Z" />
                </svg>
              </div>

              {/* Markers for districts */}
              <div className="absolute top-[35%] left-[25%] z-10 flex flex-col items-center group-hover:scale-110 transition-transform">
                <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_0_6px_rgba(16,185,129,0.2)] animate-pulse"></div>
                <span className="mt-2 text-xs font-bold text-stone-800 bg-white/90 px-2 py-0.5 rounded shadow-sm">Nashik</span>
              </div>
              <div className="absolute top-[65%] left-[20%] z-10 flex flex-col items-center group-hover:scale-110 transition-transform delay-75">
                <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_0_6px_rgba(16,185,129,0.2)]"></div>
                <span className="mt-2 text-xs font-bold text-stone-800 bg-white/90 px-2 py-0.5 rounded shadow-sm">Ratnagiri</span>
              </div>
              <div className="absolute top-[50%] left-[45%] z-10 flex flex-col items-center group-hover:scale-110 transition-transform delay-150">
                <div className="w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_0_6px_rgba(249,115,22,0.2)]"></div>
                <span className="mt-2 text-xs font-bold text-stone-800 bg-white/90 px-2 py-0.5 rounded shadow-sm">Pune</span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors">
                <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-full font-bold text-emerald-800 shadow-md flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                  <MapPin size={20} />
                  {language === 'en' ? 'Open Interactive Maharashtra Map' : 'परस्परसंवादी महाराष्ट्र नकाशा उघडा'}
                </div>
              </div>

              <div className="absolute top-4 left-4 z-20">
                <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-sm border border-stone-200">
                  <h3 className="font-bold text-emerald-900 flex items-center gap-2">
                    <MapPin size={18} className="text-emerald-600" />
                    {language === 'en' ? 'Maharashtra State View' : 'महाराष्ट्र राज्य दृश्य'}
                  </h3>
                  <p className="text-xs text-stone-500 font-medium mt-1">
                    {language === 'en' ? 'Click to view borders, weather & precautions' : 'सीमा, हवामान आणि खबरदारी पाहण्यासाठी क्लिक करा'}
                  </p>
                </div>
              </div>
            </div>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 animate-in fade-in" />
            <Dialog.Content className="fixed top-[50%] left-[50%] h-[90vh] w-[95vw] max-w-6xl translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-stone-50 shadow-2xl z-50 outline-none flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-stone-200">
              <div className="p-4 border-b border-stone-200 flex justify-between items-center bg-white shrink-0">
                <div>
                  <h2 className="text-2xl font-bold text-emerald-900">{language === 'en' ? 'Maharashtra District Intelligence' : 'महाराष्ट्र जिल्हा बुद्धिमत्ता'}</h2>
                  <p className="text-sm text-stone-500">{language === 'en' ? 'Interactive taluka-level weather, warnings, and precautions' : 'परस्परसंवादी तालुका-स्तरीय हवामान, इशारे आणि खबरदारी'}</p>
                </div>
                <Dialog.Close className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full transition">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </Dialog.Close>
              </div>

              <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
                {/* Map Area */}
                <div className="flex-1 bg-sky-50 relative overflow-hidden border-r border-stone-200">
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20z' fill='%239CA3AF' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
                  }} />
                  <ComposableMap 
                    projection="geoMercator" 
                    projectionConfig={{ scale: 3500, center: [76.5, 19.5] }}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <ZoomableGroup zoom={1}>
                      <Geographies geography={MAHARASHTRA_GEOJSON}>
                        {({ geographies }) =>
                          geographies.map((geo) => {
                            const distName = (geo.properties.NAME_2 || geo.properties.dt_name || geo.properties.district || geo.properties.District || "").toLowerCase();
                            
                            const isNashik = distName.includes("nashik") || distName.includes("nasik");
                            const isRatnagiri = distName.includes("ratnagiri");
                            
                            return (
                              <Geography 
                                key={geo.rsmKey} 
                                geography={geo} 
                                fill={isNashik ? "#a7f3d0" : isRatnagiri ? "#fef08a" : "#e5e7eb"} 
                                stroke="#ffffff"
                                strokeWidth={1}
                                style={{
                                  default: { outline: "none" },
                                  hover: { fill: "#34d399", outline: "none", cursor: "pointer", stroke: "#047857", strokeWidth: 2 },
                                  pressed: { outline: "none" },
                                }}
                                onClick={() => console.log("Clicked Region:", geo.properties)}
                              />
                            );
                          })
                        }
                      </Geographies>
                    </ZoomableGroup>
                  </ComposableMap>
                  
                  {/* Legend overlay */}
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-stone-200">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500 mb-3">{language === 'en' ? 'Active Alerts' : 'सक्रिय इशारे'}</h4>
                    <div className="space-y-2 text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#a7f3d0] border border-[#047857]"></span>
                        {language === 'en' ? 'Nashik (Rain Alert)' : 'नाशिक (पावसाचा इशारा)'}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#fef08a] border border-[#ca8a04]"></span>
                        {language === 'en' ? 'Ratnagiri (Optimal)' : 'रत्नागिरी (अनुकूल)'}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#e5e7eb] border border-stone-400"></span>
                        {language === 'en' ? 'Normal Status' : 'सामान्य स्थिती'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar Info Panel */}
                <div className="w-full lg:w-96 bg-white overflow-y-auto shrink-0 flex flex-col">
                  <div className="p-6 border-b border-stone-100 bg-stone-50/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-stone-900">{language === 'en' ? 'Nashik' : 'नाशिक'}</h3>
                        <p className="text-emerald-700 font-medium text-sm">{language === 'en' ? 'Selected District' : 'निवडलेला जिल्हा'}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
                        <p className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-1">{language === 'en' ? 'Avg Temp' : 'सरासरी तापमान'}</p>
                        <p className="text-xl font-bold text-stone-800">{tNum("32°C")}</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
                        <p className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-1">{language === 'en' ? 'Humidity' : 'आर्द्रता'}</p>
                        <p className="text-xl font-bold text-blue-600">{tNum("85%")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6 flex-1">
                    <div>
                      <h4 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
                        <AlertTriangle className="text-red-500" size={18} />
                        {language === 'en' ? 'Weather Warnings' : 'हवामानाचे इशारे'}
                      </h4>
                      <div className="bg-red-50 text-red-800 p-4 rounded-xl text-sm border border-red-100">
                        <p className="font-bold mb-1">{language === 'en' ? 'Heavy Rainfall Expected' : 'मुसळधार पावसाचा अंदाज'}</p>
                        <p>{language === 'en' ? 'Next 48 hours in Malegaon, Niphad, and Sinnar talukas.' : 'मालेगाव, निफाड आणि सिन्नर तालुक्यांमध्ये पुढील ४८ तास.'}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
                        <ShieldCheck className="text-emerald-600" size={18} />
                        {language === 'en' ? 'Precautions & Measures' : 'खबरदारी आणि उपाय'}
                      </h4>
                      <div className="space-y-3">
                        <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-sm">
                          <p className="font-bold text-stone-800 text-sm mb-1">{language === 'en' ? 'Grapes (Thompson)' : 'द्राक्षे (थॉम्पसन)'}</p>
                          <p className="text-sm text-stone-600">
                            {language === 'en' ? 'High risk of Downy Mildew due to humidity. Ensure canopy is ventilated. Apply organic Jeevamrut spray.' : 'आर्द्रतेमुळे दावण्या रोगाचा धोका. वेलीतील हवा खेळती ठेवा. सेंद्रिय जीवामृत फवारणी करा.'}
                          </p>
                        </div>
                        <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-sm">
                          <p className="font-bold text-stone-800 text-sm mb-1">{language === 'en' ? 'Onion (Rabi)' : 'कांदा (रब्बी)'}</p>
                          <p className="text-sm text-stone-600">
                            {language === 'en' ? 'Ensure proper drainage in fields to prevent bulb rot. Use organic Trichoderma root treatment.' : 'कांदा सड टाळण्यासाठी शेतातून पाणी वाहून जाण्याची व्यवस्था करा. सेंद्रिय ट्रायकोडर्मा वापरा.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Weather & Impact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 flex gap-4"
        >
          <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 shrink-0">
            <Sun size={32} />
          </div>
          <div>
            <h3 className="font-semibold text-stone-800 text-lg">Nashik</h3>
            <p className="text-2xl font-bold text-stone-900">32°C <span className="text-sm font-normal text-stone-500 ml-1">Clear</span></p>
            <div className="flex items-center gap-4 mt-2 text-xs text-stone-500 font-medium">
              <span className="flex items-center gap-1"><Wind size={14}/> 12 km/h</span>
              <span className="flex items-center gap-1"><CloudRain size={14}/> 0%</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 flex gap-4"
        >
          <div className="w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 shrink-0">
            <Thermometer size={32} />
          </div>
          <div>
            <h3 className="font-semibold text-stone-800 text-lg">Ratnagiri</h3>
            <p className="text-2xl font-bold text-stone-900">34°C <span className="text-sm font-normal text-stone-500 ml-1">Humid</span></p>
            <div className="flex items-center gap-4 mt-2 text-xs text-stone-500 font-medium">
              <span className="flex items-center gap-1"><Wind size={14}/> 8 km/h</span>
              <span className="flex items-center gap-1"><CloudRain size={14}/> 20%</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-50 rounded-2xl p-6 shadow-sm border border-red-100 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-red-900">Alerts</h3>
            <AlertTriangle className="text-red-500" size={24} />
          </div>
          <div>
            <p className="text-red-800 font-medium text-sm mb-1">Downy Mildew Risk</p>
            <p className="text-red-600 text-xs">High humidity in Nashik vineyards. Preventive spray recommended.</p>
          </div>
        </motion.div>
      </div>

      {/* Main Grid: Top Crops & Market Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Crops */}
        <div className="col-span-1 lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-emerald-900">{t("dash.topCrops")}</h2>
            <Link to="/crops" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Nashik Grapes */}
            <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition cursor-pointer">
              <div className="h-32 bg-stone-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1695220773314-020c94a4cab6?auto=format&fit=crop&q=80&w=400" 
                  alt="Grapes" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-emerald-800">
                  Nashik
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg text-stone-800">{language === 'en' ? 'Thompson Grapes' : 'थॉम्पसन द्राक्षे'}</h3>
                  <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-medium">
                    {language === 'en' ? 'Harvesting' : 'काढणी'}
                  </span>
                </div>
                <p className="text-stone-500 text-sm">{tNum("₹80-120/kg")} {language === 'en' ? 'Mandi Avg' : 'मंडी सरासरी'}</p>
                <div className="mt-4 flex gap-2">
                  <div className="flex-1 bg-stone-50 rounded-lg p-2 text-center border border-stone-100">
                    <p className="text-xs text-stone-500 uppercase tracking-wide">{language === 'en' ? 'Risk' : 'धोका'}</p>
                    <p className="font-semibold text-red-600">{language === 'en' ? 'High' : 'उच्च'}</p>
                  </div>
                  <div className="flex-1 bg-stone-50 rounded-lg p-2 text-center border border-stone-100">
                    <p className="text-xs text-stone-500 uppercase tracking-wide">{language === 'en' ? 'Demand' : 'मागणी'}</p>
                    <p className="font-semibold text-emerald-600">{language === 'en' ? 'Strong' : 'मजबूत'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ratnagiri Mangoes */}
            <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition cursor-pointer">
              <div className="h-32 bg-stone-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1761116324295-2b62f9d2bcae?auto=format&fit=crop&q=80&w=400" 
                  alt="Mango" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-orange-600">
                  {language === 'en' ? 'Ratnagiri' : 'रत्नागिरी'}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg text-stone-800">{language === 'en' ? 'Alphonso Mango' : 'हापूस आंबा'}</h3>
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                    {language === 'en' ? 'Flowering' : 'मोहोर'}
                  </span>
                </div>
                <p className="text-stone-500 text-sm">{tNum("₹500-800/doz")} {language === 'en' ? 'Expected' : 'अपेक्षित'}</p>
                <div className="mt-4 flex gap-2">
                  <div className="flex-1 bg-stone-50 rounded-lg p-2 text-center border border-stone-100">
                    <p className="text-xs text-stone-500 uppercase tracking-wide">{language === 'en' ? 'Risk' : 'धोका'}</p>
                    <p className="font-semibold text-orange-500">{language === 'en' ? 'Medium' : 'मध्यम'}</p>
                  </div>
                  <div className="flex-1 bg-stone-50 rounded-lg p-2 text-center border border-stone-100">
                    <p className="text-xs text-stone-500 uppercase tracking-wide">{language === 'en' ? 'Demand' : 'मागणी'}</p>
                    <p className="font-semibold text-emerald-600">{language === 'en' ? 'Export' : 'निर्यात'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Trends Mini */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-emerald-900">Price Movement</h2>
            <Link to="/market" className="p-2 bg-stone-100 rounded-full hover:bg-stone-200 transition text-stone-500">
              <TrendingUp size={16} />
            </Link>
          </div>
          
          <div className="flex-1 min-h-[200px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceData}>
                <defs>
                  <linearGradient id="colorNashik" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRatna" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{fontSize: 12, fill: '#78716c'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="Nashik" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorNashik)" />
                <Area type="monotone" dataKey="Ratnagiri" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorRatna)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-stone-600">Onion (Nashik)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500"></span>
              <span className="text-stone-600">Mango (Ratnagiri)</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Offline sync area */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <CheckCircle className="text-emerald-500" size={24} />
          <div>
            <h4 className="font-bold text-emerald-900">Offline Intelligence Ready</h4>
            <p className="text-sm text-emerald-700">All local datasets are cached and ready for offline field visits.</p>
          </div>
        </div>
        <Link to="/settings" className="px-4 py-2 bg-white text-emerald-700 rounded-lg text-sm font-bold shadow-sm hover:bg-emerald-50 transition">
          Manage Sync
        </Link>
      </div>

    </div>
  );
}
