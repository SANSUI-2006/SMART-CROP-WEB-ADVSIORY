import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "mr";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  tNum: (text: string | number) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "app.title": "AgriSetu",
    "nav.dashboard": "Dashboard",
    "nav.crops": "Crop Intelligence",
    "nav.advisory": "Advisory",
    "nav.market": "Market Trends",
    "nav.settings": "Settings",
    "status.online": "Online",
    "status.offline": "Offline Mode",
    "status.syncing": "Syncing Data...",
    "status.synced": "All data synced",
    "dash.summary": "Regional Summary",
    "dash.topCrops": "Top Crops in District",
    "dash.weather": "Weather Impact",
    "dash.alerts": "Disease Alerts",
    "dash.scanCrop": "Scan Crop (AI)",
    "dash.weatherMap": "Regional Weather & Taluka Map",
    "action.compare": "Compare",
    "action.viewProfile": "View Profile",
    "role.farmer": "Farmer",
    "role.officer": "Field Officer",
  },
  mr: {
    "app.title": "कृषीसेतू",
    "nav.dashboard": "डॅशबोर्ड",
    "nav.crops": "पीक बुद्धिमत्ता",
    "nav.advisory": "सल्लागार",
    "nav.market": "बाजार कल",
    "nav.settings": "सेटिंग्ज",
    "status.online": "ऑनलाइन",
    "status.offline": "ऑफलाइन मोड",
    "status.syncing": "डेटा सिंक होत आहे...",
    "status.synced": "सर्व डेटा सिंक झाला",
    "dash.summary": "प्रादेशिक सारांश",
    "dash.topCrops": "जिल्ह्यातील प्रमुख पिके",
    "dash.weather": "हवामानाचा प्रभाव",
    "dash.alerts": "रोग सूचना",
    "dash.scanCrop": "पीक स्कॅन करा (AI)",
    "dash.weatherMap": "प्रादेशिक हवामान आणि तालुके नकाशा",
    "action.compare": "तुलना करा",
    "action.viewProfile": "प्रोफाइल पहा",
    "role.farmer": "शेतकरी",
    "role.officer": "क्षेत्र अधिकारी",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "mr" : "en"));
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const tNum = (text: string | number): string => {
    let str = String(text);
    if (language === "mr") {
      const mrDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
      str = str.replace(/\d/g, d => mrDigits[parseInt(d)]);
      str = str.replace('/kg', '/किग्रॅ')
               .replace('/doz', '/डझन')
               .replace('/Qtl', '/क्विंटल')
               .replace('Avg', 'सरासरी')
               .replace('Expected', 'अपेक्षित');
    }
    return str;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, tNum }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
