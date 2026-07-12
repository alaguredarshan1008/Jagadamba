/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, MapPin, Truck, Leaf, ShieldCheck, Sprout, Award, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { IMAGES, SUGARCANE_VARIETIES, VEGETABLE_VARIETIES } from '../data';

interface HomeViewProps {
  onNavigateToBooking: (cropType?: 'sugarcane' | 'vegetable', varietyId?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigateToBooking }) => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Immersive Polyhouse Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[360px] md:min-h-[460px] flex items-center">
        {/* Background image generated with polyhouse_interior */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.polyhouse}
            alt="Jagadamba Polyhouse Interior"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/greenhouse/1200/500';
            }}
          />
          {/* Elegant deep green agricultural gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/70 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl p-6 sm:p-10 md:p-14 text-white space-y-6">
          <span className="bg-amber-400 text-emerald-950 font-black text-xs uppercase px-3.5 py-1 rounded-full tracking-wider inline-block">
            कृषि क्रांतीचे विश्वसनीय केंद्र
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
            दर्जेदार रोपे,<br />
            भरघोस पिकाची हमी!
          </h2>
          <p className="text-emerald-100/90 text-sm md:text-base leading-relaxed font-medium">
            जगदंब हायटेक नर्सरी बेडकिहाळ येथे कोकोपीट आणि आधुनिक पॉलीहाऊस तंत्रज्ञानाच्या सहाय्याने निरोगी, मजबूत मुळांची आणि रोगमुक्त उसाची तसेच सर्व प्रकारची भाजीपाल्याची रोपे तयार केली जातात.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigateToBooking('sugarcane')}
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-1.5 active:scale-95 text-sm"
            >
              <span>ऊस रोप बुक करा</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onNavigateToBooking('vegetable')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition-all border border-white/20 flex items-center gap-1.5 active:scale-95 text-sm"
            >
              <span>भाजीपाला बुकिंग</span>
            </button>
          </div>
        </div>
      </div>

      {/* Core Advantages Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          {
            icon: <Award className="text-amber-500" size={24} />,
            title: '100% शुद्ध खात्रीशीर वाण',
            desc: 'कारखान्यासाठी मान्यताप्राप्त दर्जेदार बेणे प्लॉट मधून निवडलेले अधिकृत डोळे वापरून तयार केलेली उसाची रोपे.'
          },
          {
            icon: <Sprout className="text-emerald-500" size={24} />,
            title: 'जोमदार मुळांचे रोप (Root Plug)',
            desc: 'पॉलीहाऊसमधील विशेष हवामानात तयार झाल्यामुळे शेतात लावताच रोपे वेगाने वाढतात व मरत नाहीत.'
          },
          {
            icon: <Truck className="text-blue-500" size={24} />,
            title: 'वाहतूक सोय (Direct Transport)',
            desc: 'तुमच्या घरापर्यंत किंवा थेट शेताच्या बांधापर्यंत रोपे सुरक्षितपणे पोहोचवण्यासाठी विश्वसनीय वाहनांची सोय.'
          }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <div className="p-3 bg-gray-50 rounded-xl w-max">{item.icon}</div>
            <h4 className="font-extrabold text-emerald-950 text-base">{item.title}</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Interactive Catalog Section */}
      <div className="space-y-6">
        <div className="text-center md:text-left space-y-1">
          <h3 className="text-2xl font-black text-emerald-950">आमची उत्पादने (Nursery Catalog)</h3>
          <p className="text-xs text-gray-500 font-medium">खात्रीशीर उत्पादनांची यादी खालीलप्रमाणे आहे. तुमच्या गरजेनुसार त्वरित ऑर्डर बुक करा.</p>
        </div>

        {/* Category 1: Sugarcane Varieties */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-800">
            <Leaf size={18} className="text-emerald-600 shrink-0" />
            <h4 className="font-extrabold text-base uppercase tracking-wider">१. उसाची सुधारित रोपे (Premium Sugarcane Varieties)</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SUGARCANE_VARIETIES.map((variety) => (
              <div key={variety.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:border-emerald-200 transition-all flex flex-col justify-between">
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h5 className="font-black text-emerald-950 text-base">{variety.marathiName}</h5>
                      <span className="text-xs text-gray-400 font-semibold font-mono">{variety.name}</span>
                    </div>
                    <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-emerald-100">
                      कालावधी: {variety.duration}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    {variety.description}
                  </p>
                  <div className="pt-2">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1.5">मुख्य वैशिष्ट्ये:</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 text-xs text-gray-600">
                      {variety.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-1">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center text-xs">
                  <div className="flex gap-4">
                    <div>
                      <span className="text-gray-400 font-semibold block">उत्पादन क्षमता</span>
                      <strong className="text-emerald-800 text-[11px] sm:text-xs font-black">{variety.yieldPotential}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold block">अंदाजे दर (Price)</span>
                      <strong className="text-emerald-800 text-[11px] sm:text-xs font-black">₹2.20/रोप</strong>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigateToBooking('sugarcane', variety.id)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2 px-4 rounded-lg transition-colors flex items-center gap-1.5 active:scale-95 text-xs shrink-0"
                  >
                    <span>बुक करा</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category 2: Vegetable & Flower Seedlings */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 text-amber-800">
            <Sprout size={18} className="text-amber-600 shrink-0" />
            <h4 className="font-extrabold text-base uppercase tracking-wider">२. भाजीपाला व फुलांची निरोगी रोपे (Vegetables & Flowers)</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {VEGETABLE_VARIETIES.map((variety) => (
              <div key={variety.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:border-amber-200 transition-all flex flex-col justify-between">
                <div>
                  <div className="h-44 bg-gray-100 overflow-hidden relative">
                    <img
                      src={variety.image}
                      alt={variety.name}
                      className="w-full h-full object-cover hover:scale-105 transition-all"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/vegetable/300/200';
                      }}
                    />
                    <span className="absolute top-3 right-3 bg-amber-400 text-emerald-950 font-black text-xs px-2.5 py-1 rounded-full shadow-md">
                      ₹{variety.pricePerTray} प्रति ट्रे
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <div>
                      <h5 className="font-extrabold text-emerald-950 text-sm">{variety.marathiName}</h5>
                      <span className="text-[10px] text-gray-400 font-mono italic">{variety.scientificName}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">
                      {variety.description}
                    </p>
                    <div className="pt-2 text-xs space-y-1 text-gray-600">
                      {variety.features.slice(0, 2).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-1">
                          <span className="text-amber-500 font-bold">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-gray-400 font-semibold block">१ ट्रे मध्ये रोपे:</span>
                    <strong className="text-gray-700 font-bold">{variety.seedlingsPerTray} रोपे (Cells)</strong>
                  </div>
                  <button
                    onClick={() => onNavigateToBooking('vegetable', variety.id)}
                    className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black py-1.5 px-3.5 rounded-lg transition-colors flex items-center gap-1 active:scale-95"
                  >
                    <span>बुकिंग</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ServicesView: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Intro */}
      <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 space-y-3">
        <h3 className="text-xl sm:text-2xl font-black text-emerald-950">हायटेक रोपवाटिकेच्या सेवा</h3>
        <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed font-medium">
          पारंपारिक गादीवाफ्यावरील लागवडीपेक्षा हायटेक ट्रे रोपे वापरल्यास शेतकऱ्यांचा श्रम, वेळ आणि पैशांची मोठी बचत होते. जगदंब नर्सरी शेतकऱ्यांसाठी खालील विशेष सेवा पुरवते.
        </p>
      </div>

      {/* Comparisons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <ShieldCheck size={20} />
            </span>
            <h4 className="font-extrabold text-emerald-950 text-base">ट्रे रोपांचे फायदे (Tray Seedlings vs Normal)</h4>
          </div>

          <div className="space-y-3.5 text-xs text-gray-600 font-medium">
            <div className="flex items-start gap-2 border-b border-gray-50 pb-2">
              <span className="text-emerald-500 font-bold text-sm">✓</span>
              <div>
                <strong className="text-gray-800">100% उगवण क्षमता:</strong>
                <p className="text-gray-500 mt-0.5">ट्रे मध्ये बियाणे निरोगी कोकोपीटमध्ये वाढल्याने उगवण खात्रीशीर होते, नांग्या पडत नाहीत.</p>
              </div>
            </div>
            <div className="flex items-start gap-2 border-b border-gray-50 pb-2">
              <span className="text-emerald-500 font-bold text-sm">✓</span>
              <div>
                <strong className="text-gray-800">सशक्त मुळांचे जाळे (Root Plug):</strong>
                <p className="text-gray-500 mt-0.5">मुळांचा विकास गोलाकार ट्रे कक्षामध्ये चांगला होतो. त्यामुळे शेतात लावताना मुळांना धक्का लागत नाही.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold text-sm">✓</span>
              <div>
                <strong className="text-gray-800">पिकाचे समान वय:</strong>
                <p className="text-gray-500 mt-0.5">सर्व रोपे सारख्याच वयाची असल्यामुळे संपूर्ण शेतातील उसाचे किंवा भाजीपाल्याचे पीक एकसमान वाढते.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transportation Details */}
        <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Truck size={20} />
            </span>
            <h4 className="font-extrabold text-emerald-950 text-base">सुरक्षित वाहतूक व्यवस्था (Safe Transport)</h4>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed font-medium">
            नर्सरी मधील नाजूक रोपे शेतात जाईपर्यंत खराब होऊ नयेत म्हणून आम्ही विशेष वाहतुकीची सेवा देतो.
          </p>

          <div className="space-y-3.5 text-xs text-gray-600 font-medium bg-gray-50 p-4 rounded-xl">
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">▶</span>
              <div>
                <strong className="text-gray-800">हवेशीर गाड्यांची रचना:</strong>
                <p className="text-gray-400 mt-0.5">रोपांना हवा मिळण्यासाठी आणि कडक उन्हाचा त्रास होऊ नये म्हणून विशेष रचना असणाऱ्या गाड्यांचा वापर केला जातो.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">▶</span>
              <div>
                <strong className="text-gray-800">किमान खर्चात वाहतूक:</strong>
                <p className="text-gray-400 mt-0.5">अनेक शेतकऱ्यांचे मिळून माल असल्यास एकत्र वाहतूक करून खर्चात कपात केली जाते.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactView: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-sm">
        <h3 className="text-xl sm:text-2xl font-black">थेट संपर्क व पत्ता</h3>
        <p className="text-xs text-emerald-200 mt-1">शेतकरी बांधवांसाठी संपर्क आणि सल्ला चोवीस तास उपलब्ध आहे. आम्हाला कधीही कॉल करा.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Call card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h4 className="font-extrabold text-emerald-950 text-base border-b border-gray-100 pb-2 flex items-center gap-2">
            <Phone size={18} className="text-emerald-600" />
            <span>थेट कॉल करा (Dial Numbers)</span>
          </h4>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 shadow-sm text-emerald-800 font-black text-xs sm:text-sm">
                  SD
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">नर्सरी प्रमुख</span>
                  <strong className="text-sm font-black text-gray-900">सुशांत देसाई (Sushant Desai)</strong>
                </div>
              </div>
              <a
                href="tel:8722273224"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-sm active:scale-95 shrink-0"
              >
                <Phone size={12} />
                <span>कॉल करा</span>
              </a>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 shadow-sm text-emerald-800 font-black text-xs sm:text-sm">
                  KD
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">सह-संचालक</span>
                  <strong className="text-sm font-black text-gray-900">कल्पना देसाई (Kalpana Desai)</strong>
                </div>
              </div>
              <a
                href="tel:7406719095"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-sm active:scale-95 shrink-0"
              >
                <Phone size={12} />
                <span>कॉल करा</span>
              </a>
            </div>
          </div>
        </div>

        {/* Map card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h4 className="font-extrabold text-emerald-950 text-base border-b border-gray-100 pb-2 flex items-center gap-2">
              <MapPin size={18} className="text-emerald-600" />
              <span>पत्ता आणि गुगल मॅप (Nursery Map Location)</span>
            </h4>
            
            <p className="text-xs text-gray-500 leading-relaxed mt-3 font-medium">
              आमची हायटेक नर्सरी मु. पो. बेडकिहाळ येथील फॅक्टरी रोडवर सुभेदार मळ्याजवळ निपाणी तालुक्यात आहे. नकाशाच्या सहाय्याने तुम्ही थेट नर्सरी पर्यंत पोहोचू शकता.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <a
              href="https://maps.app.goo.gl/3UCxzVeNvPjfRi4MA"
              target="_blank"
              rel="noreferrer"
              className="w-full bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md text-xs"
            >
              <ExternalLink size={14} />
              <span>गुगल मॅपवर थेट मार्ग उघडा (Open Maps Directions)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
