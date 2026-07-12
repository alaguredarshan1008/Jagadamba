/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Phone, Mail, Award, Truck, ShieldCheck, Heart } from 'lucide-react';
import { IMAGES } from '../data';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-950 text-white border-t-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        
        {/* Column 1: Nursery Brief and Slogan */}
        <div className="space-y-4 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-xl font-black text-amber-300">॥ जगदंब हायटेक नर्सरी ॥</h4>
            <span className="text-xs tracking-wider text-emerald-300 font-bold block">JAGADAMBA HI-TECH NURSERY</span>
          </div>
          <p className="text-xs text-emerald-100/80 leading-relaxed font-medium">
            आमच्याकडे उत्तम प्रतीची ऊस रोपे (Co. 86032, 0265, 10001, 8005) तसेच मिरची, वांगी, झेंडू, कोबीज, फ्लॉवर, कलिंगड इत्यादी भाजीपाला रोपे अत्यंत निरोगी व जोमदार स्वरूपात मिळतील.
          </p>
          <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl inline-flex flex-col items-center md:items-start gap-1 w-full max-w-sm">
            <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest block">नर्सरीचे ब्रीदवाक्य</span>
            <span className="text-sm font-bold text-emerald-50">"नातं विश्वासाचं.... शेतकऱ्यांच्या हिताचं...."</span>
          </div>
        </div>

        {/* Column 2: Address and Map Location Details */}
        <div className="space-y-4">
          <h4 className="text-base font-black text-white border-b border-white/10 pb-2 uppercase tracking-wider flex items-center gap-2 justify-center md:justify-start">
            <MapPin size={16} className="text-amber-400" />
            <span>पत्ता व नकाशा (Address & Location)</span>
          </h4>
          <div className="space-y-3 text-xs text-emerald-100">
            <div className="space-y-1">
              <span className="text-amber-400 font-bold block">मराठी पत्ता:</span>
              <p className="leading-relaxed">
                मु. पो. बेडकिहाळ, (सुभेदार मळा जवळ, फॅक्टरी रोड), तालुका: निपाणी, जिल्हा: बेळगाव. पिन: ५९१२१४
              </p>
            </div>
            
            <div className="space-y-1">
              <span className="text-emerald-300 font-bold block">ಕನ್ನಡ ವಿಳಾಸ (Kannada):</span>
              <p className="leading-relaxed font-normal opacity-90">
                ಮು. ಪೋ. ಬೆಡಕಿಹಾಳ, (ಸುಭೇದಾರ್ ಮಳಾ ಹತ್ತಿರ, ಫ್ಯಾಕ್ಟರಿ ರೋಡ್), ತಾಲೂಕ: ನಿಪ್ಪಾಣಿ, ಜಿಲ್ಲಾ: ಬೆಳಗಾವಿ.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.app.goo.gl/3UCxzVeNvPjfRi4MA"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold px-4 py-2 rounded-lg transition-all shadow-md active:scale-95"
              >
                <MapPin size={14} />
                <span>गुगल मॅपवर नर्सरी शोधा (Google Map Location)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Column 3: Contact & Transportation Facilities */}
        <div className="space-y-4">
          <h4 className="text-base font-black text-white border-b border-white/10 pb-2 uppercase tracking-wider flex items-center gap-2 justify-center md:justify-start">
            <Phone size={16} className="text-amber-400" />
            <span>संपर्क अधिकारी (Contacts)</span>
          </h4>
          <div className="space-y-3.5 text-xs text-emerald-100">
            <div className="bg-emerald-900/50 p-3.5 rounded-xl border border-emerald-800 space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-emerald-950 flex items-center justify-center border border-emerald-700/50 shrink-0 text-amber-400 font-black text-xs">
                  SD
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-emerald-300 uppercase tracking-widest block font-bold">रोपवाटिका मालक</span>
                  <strong className="text-sm font-black text-white block mt-0.5">सुशांत देसाई (Sushant Desai)</strong>
                  <a href="tel:8722273224" className="hover:text-amber-300 flex items-center gap-1.5 mt-1 font-bold">
                    📞 +91 87222 73224
                  </a>
                </div>
              </div>

              <div className="border-t border-emerald-800/50 pt-3 flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-emerald-950 flex items-center justify-center border border-emerald-700/50 shrink-0 text-amber-400 font-black text-xs">
                  KD
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-emerald-300 uppercase tracking-widest block font-bold">सह-संचालक</span>
                  <strong className="text-sm font-black text-white block mt-0.5">कल्पना देसाई (Kalpana Desai)</strong>
                  <a href="tel:7406719207" className="hover:text-amber-300 flex items-center gap-1.5 mt-1 font-bold">
                    📞 +91 74067 19207
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-emerald-300">
              <Truck size={14} />
              <span className="font-bold">वाहतूक सोय संपूर्ण महाराष्ट्र व कर्नाटकात उपलब्ध!</span>
            </div>

            <p className="text-[10.5px] text-emerald-400/85 italic leading-relaxed">
              * आमच्या रोपवाटीके मधून खरेदी केलेल्या प्रत्येक भाजीपाला व उसाच्या रोपाच्या आरोग्याची व शुद्ध वाणाची आम्ही पूर्ण खात्री देतो.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="bg-emerald-950/95 py-6 border-t border-emerald-900/60 text-center text-[11px] text-emerald-300/80">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-1">
            <ShieldCheck size={14} className="text-amber-400" />
            <span>© {new Date().getFullYear()} जगदंब हायटेक नर्सरी. सर्व हक्क राखीव. (Bedkihal)</span>
          </div>
          <div className="flex items-center gap-1 font-medium">
            <span>शेतकऱ्यांच्या सेवेसाठी सदैव तत्पर</span>
            <Heart size={10} className="text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
