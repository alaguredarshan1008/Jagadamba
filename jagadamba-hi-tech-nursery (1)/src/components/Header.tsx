/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, MapPin, Truck, Leaf, ShieldCheck, Sun } from 'lucide-react';
import { IMAGES } from '../data';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-gradient-to-r from-emerald-900 via-green-950 to-emerald-950 text-white shadow-xl relative overflow-hidden">
      {/* Decorative leaf background pattern */}
      <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-20 -translate-y-10">
        <Leaf size={320} className="text-white" />
      </div>

      {/* Top Notification Bar with direct actions */}
      <div className="bg-emerald-800 text-xs text-emerald-100 py-2 px-4 flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-emerald-700/50">
        <div className="flex items-center gap-1">
          <ShieldCheck size={14} className="text-amber-400" />
          <span className="font-medium">नातं विश्वासाचं.... शेतकऱ्यांच्या हिताचं....</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:8722273224" className="flex items-center gap-1 hover:text-amber-300 transition-colors">
            <Phone size={12} />
            <span>कॉल करा: +91 8722273224</span>
          </a>
          <span className="hidden sm:inline">|</span>
          <div className="flex items-center gap-1">
            <Truck size={12} className="text-amber-400" />
            <span>वाहतूक सोय उपलब्ध (Transport Available)</span>
          </div>
        </div>
      </div>

      {/* Main Brand Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 sm:gap-6 text-center md:text-left flex-col sm:flex-row">
          <div className="bg-white p-1 rounded-full shadow-inner border-4 border-emerald-700 overflow-hidden w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0">
            <img
              src={IMAGES.logo}
              alt="Jagadamb Logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // fallback if image fails to load
                (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/nursery/150/150';
              }}
            />
          </div>
          <div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2 justify-center sm:justify-start">
              <span className="bg-amber-400 text-emerald-950 font-bold text-[10px] uppercase px-2 py-0.5 rounded tracking-wider">
                हायटेक रोपवाटिका
              </span>
              <span className="text-emerald-300 font-mono text-xs tracking-widest uppercase">
                Established since 2016
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mt-1">
              ॥ जगदंब ॥ हायटेक नर्सरी
            </h1>
            <h2 className="text-lg sm:text-xl font-bold text-amber-300">
              Jagadamba Hi-tech Nursery
            </h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-xs text-emerald-200 mt-2">
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-amber-400" />
                मु. पो. बेडकिहाळ, ता. निपाणी
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="text-emerald-100 font-semibold">
                सुशांत देसाई : +91 87222 73224 / 74067 19207
              </span>
            </div>
          </div>
        </div>

        {/* Quick Contact Actions card */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex flex-col items-center sm:items-stretch gap-2 w-full max-w-xs shrink-0 shadow-lg">
          <span className="text-[10px] text-emerald-200 uppercase tracking-widest text-center font-bold">
            त्वरित बुकिंग व माहितीसाठी
          </span>
          <div className="flex flex-col gap-2">
            <a
              href="tel:8722273224"
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Phone size={16} />
              <span>कॉल करा (Sushant Desai)</span>
            </a>
            <a
              href="https://wa.me/918722273224?text=नमस्कार%20जगदंब%20हायटेक%20नर्सरी,%20मला%20रोप%20बुकिंगबद्दल%20माहिती%20हवी%20आहे."
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all border border-emerald-400/20 active:scale-95"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.012 2C6.48 2 2.004 6.48 2.004 12c0 1.764.468 3.42 1.284 4.884l-1.368 5.016 5.136-1.344c1.404.768 2.988 1.188 4.656 1.188 5.532 0 10.008-4.48 10.008-10s-4.476-10-10.008-10zm5.724 14.196c-.24.672-1.2 1.224-1.656 1.26-.456.036-.9.18-2.916-.624-2.424-.96-3.972-3.408-4.092-3.576-.12-.168-1.008-1.344-1.008-2.556 0-1.212.612-1.812.84-2.052.228-.24.48-.3.636-.3.156 0 .312 0 .444.012.132.012.312-.048.492.384.18.432.612 1.5.672 1.62.06.12.096.264.012.432-.084.168-.18.276-.3.42l-.456.54c-.132.144-.276.3-.12.576.156.264.696 1.14 1.488 1.848.792.708 1.464.924 1.74 1.056.276.132.432.108.588-.072.156-.18.672-.78.852-1.044.18-.264.36-.216.6-.132.24.084 1.5.708 1.764.84.264.132.444.192.504.3.06.108.06.624-.18 1.296z" />
              </svg>
              <span>व्हॉट्सॲप मेसेज (WhatsApp)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-emerald-950/80 backdrop-blur-sm border-t border-emerald-800/30">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto no-scrollbar py-2 gap-1.5 sm:gap-2">
            {[
              { id: 'home', label: '🏡 मुख्यपृष्ठ', sub: 'Home' },
              { id: 'booking', label: '📝 रोप बुकिंग', sub: 'Book Now' },
              { id: 'guide', label: '🌾 ऊस तंत्रज्ञान', sub: 'Sugarcane Guide' },
              { id: 'services', label: '🚚 सेवा आणि वाहतूक', sub: 'Services' },
              { id: 'contact', label: '📞 संपर्क माहिती', sub: 'Contact' },
              { id: 'admin', label: '📊 प्रशासन कक्ष', sub: 'Admin Desk', badge: true }
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center px-4 py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-all shrink-0 relative ${
                    isSelected
                      ? 'bg-amber-400 text-emerald-950 shadow-md transform -translate-y-0.5'
                      : 'text-emerald-100 hover:bg-white/5 hover:text-white'
                  }`}
                  style={{ minWidth: '110px' }}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[9px] font-medium tracking-wide ${isSelected ? 'text-emerald-900/80' : 'text-emerald-300/70'}`}>
                    {tab.sub}
                  </span>
                  {tab.badge && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-extrabold text-[8px] px-1.5 py-0.5 rounded-full border border-emerald-950 animate-pulse">
                      Admin
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
