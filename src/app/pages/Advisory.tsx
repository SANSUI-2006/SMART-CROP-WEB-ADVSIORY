import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { AlertTriangle, ShieldCheck, Beaker, Camera, Bell, Info, X } from "lucide-react";
import { motion } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";

const advisoryData = [
  {
    id: "a1",
    crop: { en: "Thompson Grapes", mr: "थॉम्पसन द्राक्षे" },
    region: { en: "Nashik", mr: "नाशिक" },
    disease: { en: "Downy Mildew", mr: "दावण्या रोग" },
    urgency: { en: "High", mr: "उच्च" },
    image: "https://images.unsplash.com/photo-1634377806286-5d791b783445?auto=format&fit=crop&q=80&w=400",
    symptoms: {
      en: "Yellow oily spots on upper leaf surface, white downy growth on lower surface.",
      mr: "पानांच्या वरच्या बाजूस पिवळे तेलकट डाग, खालच्या बाजूस पांढरी वाढ."
    },
    prevention: {
      en: "Improve canopy ventilation, avoid overhead irrigation, apply Jeevamrut (जीवामृत).",
      mr: "वेलीतील हवा खेळती ठेवा, जीवामृत (Jeevamrut) चा वापर करा."
    },
    treatment: {
      en: "Spray organic Trichoderma viride or Neem Oil (5% extract) immediately.",
      mr: "सेंद्रिय ट्रायकोडर्मा किंवा ५% निंबोळी अर्क (Neem Oil) फवारणी तातडीने करा."
    },
    date: { en: "2 Days Ago", mr: "२ दिवसांपूर्वी" }
  },
  {
    id: "a2",
    crop: { en: "Alphonso Mango", mr: "हापूस आंबा" },
    region: { en: "Ratnagiri", mr: "रत्नागिरी" },
    disease: { en: "Mango Hopper", mr: "आंबा तुडतुडे" },
    urgency: { en: "Medium", mr: "मध्यम" },
    image: "https://images.unsplash.com/photo-1774428988892-328eae996c15?auto=format&fit=crop&q=80&w=400",
    symptoms: {
      en: "Nymphs and adults suck sap from tender leaves and inflorescence, causing them to wither.",
      mr: "पिल्ले आणि प्रौढ कीटक कोवळी पाने आणि मोहोरातील रस शोषतात."
    },
    prevention: {
      en: "Prune dense orchards to allow sunlight. Hang yellow sticky traps.",
      mr: "सूर्यप्रकाशासाठी बागेची छाटणी करा. पिवळे चिकट सापळे लावा."
    },
    treatment: {
      en: "Dashparni Ark (दशपर्णी अर्क) spray or Verticillium lecanii to control hopper population.",
      mr: "दशपर्णी अर्क (Dashparni Ark) किंवा व्हर्टिसिलियम लेकानी (Verticillium lecanii) फवारणी करा."
    },
    date: { en: "Today", mr: "आज" }
  },
  {
    id: "a3",
    crop: { en: "Rabi Onion", mr: "रब्बी कांदा" },
    region: { en: "Nashik", mr: "नाशिक" },
    disease: { en: "Purple Blotch", mr: "करपा रोग (पर्पल ब्लॉच)" },
    urgency: { en: "High", mr: "उच्च" },
    image: "https://images.unsplash.com/photo-1625944111320-c75c87556f88?auto=format&fit=crop&q=80&w=400",
    symptoms: {
      en: "Small water-soaked lesions with white centers appear on leaves, later turning purple.",
      mr: "पानांवर पांढऱ्या मध्यभागी असलेले लहान पाण्यासारखे डाग दिसतात, जे नंतर जांभळे होतात."
    },
    prevention: {
      en: "Use wide spacing. Ensure good soil drainage. Treat seedlings with Trichoderma before planting.",
      mr: "लागवडीत योग्य अंतर ठेवा. जमिनीत पाण्याचा निचरा चांगला करा. रोपांवर ट्रायकोडर्मा प्रक्रिया करा."
    },
    treatment: {
      en: "Spray Pseudomonas fluorescens or sour buttermilk (आंबट ताक) at 5 days interval.",
      mr: "स्युडोमोनास किंवा आंबट ताक (Sour Buttermilk) ५ दिवसांच्या अंतराने फवारा."
    },
    date: { en: "Yesterday", mr: "काल" }
  },
  {
    id: "a4",
    crop: { en: "Cashew", mr: "काजू" },
    region: { en: "Ratnagiri", mr: "रत्नागिरी" },
    disease: { en: "Tea Mosquito Bug", mr: "टी मॉस्किटो बग" },
    urgency: { en: "Medium", mr: "मध्यम" },
    image: "https://images.unsplash.com/photo-1531266752426-aad472b7bbf4?auto=format&fit=crop&q=80&w=400",
    symptoms: {
      en: "Dark brown patches on tender shoots, flower stalks, and immature nuts.",
      mr: "कोवळी पालवी, फुलांचे देठ आणि कच्च्या काजूंवर गडद तपकिरी डाग."
    },
    prevention: {
      en: "Remove alternate host plants (like neem, guava). Monitor during flushing and flowering stages.",
      mr: "पर्यायी यजमान वनस्पती (उदा. कडुलिंब, पेरू) काढून टाका. पालवी आणि मोहोर येताना लक्ष ठेवा."
    },
    treatment: {
      en: "Spray Karanj (करंज) oil or Beauveria bassiana thoroughly on the canopy.",
      mr: "वेलींवर करंज तेल किंवा ब्युव्हेरिया बासियाना (Beauveria bassiana) फवारणी करा."
    },
    date: { en: "3 Days Ago", mr: "३ दिवसांपूर्वी" }
  },
  {
    id: "a5",
    crop: { en: "Tomato", mr: "टोमॅटो" },
    region: { en: "Nashik", mr: "नाशिक" },
    disease: { en: "Early Blight", mr: "लवकर येणारा करपा" },
    urgency: { en: "Medium", mr: "मध्यम" },
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=400",
    symptoms: {
      en: "Brown spots with concentric rings (target board effect) primarily on older leaves.",
      mr: "मुख्यतः जुन्या पानांवर वर्तुळाकार (टार्गेट बोर्डसारखे) तपकिरी डाग."
    },
    prevention: {
      en: "Crop rotation with non-solanaceous crops. Stake plants to improve airflow and reduce soil contact.",
      mr: "पिकांची फेरपालट करा. झाडांना आधार द्या जेणेकरून मातीशी संपर्क कमी होईल."
    },
    treatment: {
      en: "Spray fermented buttermilk or organic copper-based solutions (Bordeaux mixture).",
      mr: "आंबवलेले ताक किंवा सेंद्रिय बोर्डो मिश्रण (Bordeaux mixture) फवारा."
    },
    date: { en: "Today", mr: "आज" }
  }
];

export function Advisory() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900 mb-2">{language === 'en' ? 'Pest & Disease Advisory' : 'कीड आणि रोग सल्ला'}</h1>
          <p className="text-stone-500 max-w-2xl">{language === 'en' ? 'Organic treatment protocols for local crops.' : 'स्थानिक पिकांसाठी सेंद्रिय उपचार पद्धती.'}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-800 text-white rounded-lg shadow-sm font-medium hover:bg-emerald-900 transition">
          <Camera size={18} />
          {language === 'en' ? 'Scan Plant (AI)' : 'वनस्पती स्कॅन करा'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-stone-200">
        {["all", "Nashik", "Ratnagiri", "Saved"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
              activeTab === tab 
                ? "border-emerald-600 text-emerald-800" 
                : "border-transparent text-stone-500 hover:text-stone-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Alerts
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {advisoryData.map((advisory) => (
          <Dialog.Root key={advisory.id}>
            <Dialog.Trigger asChild>
              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-left w-full bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm flex flex-col sm:flex-row hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer"
              >
                <div className="w-full sm:w-48 h-48 sm:h-auto bg-stone-200 relative shrink-0">
                  <img src={advisory.image} alt={advisory.disease.en} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className={`px-2 py-1 text-xs font-bold text-white rounded shadow-sm ${
                      advisory.urgency.en === "High" ? "bg-red-600" : "bg-orange-500"
                    }`}>
                      {language === 'en' ? advisory.urgency.en : advisory.urgency.mr} {language === 'en' ? 'Risk' : 'धोका'}
                    </span>
                    <span className="px-2 py-1 bg-stone-900/70 text-white text-xs font-medium rounded backdrop-blur-sm">
                      {language === 'en' ? advisory.region.en : advisory.region.mr}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-stone-900">{language === 'en' ? advisory.disease.en : advisory.disease.mr}</h3>
                      <p className="text-sm font-medium text-emerald-700">{language === 'en' ? advisory.crop.en : advisory.crop.mr}</p>
                    </div>
                    <div className="text-stone-400 hover:text-emerald-600 transition">
                      <Bell size={20} />
                    </div>
                  </div>

                  <div className="space-y-4 flex-1">
                    <div className="flex gap-2 mt-4">
                      <Info className="text-stone-400 shrink-0 mt-0.5" size={16} />
                      <p className="text-sm text-stone-600 line-clamp-2">{language === 'en' ? advisory.symptoms.en : advisory.symptoms.mr}</p>
                    </div>

                    <div className="bg-stone-50 rounded-lg p-3 border border-stone-100 space-y-3">
                      <div className="flex gap-2">
                        <ShieldCheck className="text-emerald-600 shrink-0 mt-0.5" size={16} />
                        <div>
                          <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide mb-1">{language === 'en' ? 'Prevention' : 'प्रतिबंध'}</h4>
                          <p className="text-sm text-stone-600 line-clamp-1">{language === 'en' ? advisory.prevention.en : advisory.prevention.mr}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-stone-100 flex justify-between items-center">
                    <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                      <AlertTriangle size={14} className="text-orange-400" />
                      {language === 'en' ? 'Alert issued' : 'सूचना जारी:'} {language === 'en' ? advisory.date.en : advisory.date.mr}
                    </span>
                    <span className="text-sm font-bold text-emerald-700">
                      {language === 'en' ? 'Read More' : 'अधिक वाचा'}
                    </span>
                  </div>
                </div>
              </motion.button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 animate-in fade-in" />
              <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-2xl translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white shadow-2xl z-50 outline-none flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-200">
                <div className="h-64 w-full relative shrink-0">
                  <img src={advisory.image} alt={advisory.disease.en} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
                  <Dialog.Close asChild>
                    <button className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors">
                      <X size={20} />
                    </button>
                  </Dialog.Close>
                  <div className="absolute bottom-4 left-6">
                    <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded shadow-sm mb-2 inline-block">
                      {language === 'en' ? advisory.urgency.en : advisory.urgency.mr} {language === 'en' ? 'Risk Alert' : 'धोका सूचना'}
                    </span>
                    <h2 className="text-3xl font-bold text-white mb-1">{language === 'en' ? advisory.disease.en : advisory.disease.mr}</h2>
                    <p className="text-emerald-300 font-medium">{language === 'en' ? advisory.crop.en : advisory.crop.mr} • {language === 'en' ? advisory.region.en : advisory.region.mr}</p>
                  </div>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-6 bg-stone-50">
                  <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex gap-4">
                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center shrink-0">
                      <Info size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-800 uppercase tracking-wide mb-2">{language === 'en' ? 'Symptoms' : 'लक्षणे'}</h4>
                      <p className="text-stone-600 leading-relaxed">{language === 'en' ? advisory.symptoms.en : advisory.symptoms.mr}</p>
                    </div>
                  </div>

                  <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100 shadow-sm flex gap-4">
                    <div className="w-12 h-12 bg-white text-emerald-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-emerald-900 uppercase tracking-wide mb-2">{language === 'en' ? 'Organic Prevention' : 'सेंद्रिय प्रतिबंध'}</h4>
                      <p className="text-emerald-800 leading-relaxed font-medium">{language === 'en' ? advisory.prevention.en : advisory.prevention.mr}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm flex gap-4">
                    <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                      <Beaker size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-blue-900 uppercase tracking-wide mb-2">{language === 'en' ? 'Organic Treatment Protocol' : 'सेंद्रिय उपचार पद्धती'}</h4>
                      <p className="text-blue-800 leading-relaxed font-bold">{language === 'en' ? advisory.treatment.en : advisory.treatment.mr}</p>
                    </div>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        ))}
      </div>

    </div>
  );
}
