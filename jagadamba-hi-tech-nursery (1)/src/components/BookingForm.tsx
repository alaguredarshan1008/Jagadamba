/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingCart, FileText, CheckCircle2, User, Phone, MapPin, Calendar, Truck, ArrowRight, X } from 'lucide-react';
import { SUGARCANE_VARIETIES, VEGETABLE_VARIETIES } from '../data';
import { Booking, CropType, BookingStatus } from '../types';

interface BookingFormProps {
  onBookingAdded: (booking: Booking) => void;
  initialCropType?: CropType;
  initialVarietyId?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  onBookingAdded,
  initialCropType = 'sugarcane',
  initialVarietyId
}) => {
  // State for Form fields
  const [cropType, setCropType] = useState<CropType>(initialCropType);
  const [sugarcaneVariety, setSugarcaneVariety] = useState(
    initialCropType === 'sugarcane' && initialVarietyId ? initialVarietyId : SUGARCANE_VARIETIES[0].id
  );
  const [vegetableVariety, setVegetableVariety] = useState(
    initialCropType === 'vegetable' && initialVarietyId ? initialVarietyId : VEGETABLE_VARIETIES[0].id
  );

  // Sync state if props change (e.g. user navigates multiple times)
  React.useEffect(() => {
    if (initialCropType) {
      setCropType(initialCropType);
    }
    if (initialVarietyId) {
      if (initialCropType === 'sugarcane') {
        setSugarcaneVariety(initialVarietyId);
      } else {
        setVegetableVariety(initialVarietyId);
      }
    }
  }, [initialCropType, initialVarietyId]);

  const [farmerName, setFarmerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [village, setVillage] = useState('');
  const [quantity, setQuantity] = useState<number>(10);
  const [plantationDate, setPlantationDate] = useState('');
  const [transportRequired, setTransportRequired] = useState(false);
  const [notes, setNotes] = useState('');

  // Receipt Modal State
  const [receiptBooking, setReceiptBooking] = useState<Booking | null>(null);

  // Derive selected crop details for calculation
  const getSelectedCropDetails = () => {
    if (cropType === 'sugarcane') {
      const variety = SUGARCANE_VARIETIES.find((v) => v.id === sugarcaneVariety);
      return {
        name: variety?.name || 'Sugarcane Seedlings',
        marathiName: variety?.marathiName || 'उसाची रोपे',
        pricePerTray: 150, // 100 seedlings * 1.50 = 150
        seedlingsPerTray: 100,
        pricePerSeedling: 1.50,
      };
    } else {
      const variety = VEGETABLE_VARIETIES.find((v) => v.id === vegetableVariety);
      const seedlingsPerTray = variety?.seedlingsPerTray || 104;
      return {
        name: variety?.name || 'Vegetable Seedlings',
        marathiName: variety?.marathiName || 'भाजीपाला रोप',
        pricePerTray: seedlingsPerTray * 1.00, // ₹1.00 per seedling
        seedlingsPerTray: seedlingsPerTray,
        pricePerSeedling: 1.00,
      };
    }
  };

  const cropDetails = getSelectedCropDetails();
  const calculatedSeedlings = quantity * cropDetails.seedlingsPerTray;
  const calculatedTotalCost = quantity * cropDetails.pricePerTray;

  // Form Submit Handler
  const handleSubmit = (e: React.FormEvent, viaWhatsApp = false) => {
    e.preventDefault();

    if (!farmerName || !contactNumber || !village || !plantationDate) {
      alert('कृपया सर्व आवश्यक माहिती भरा! (Please fill all required fields)');
      return;
    }

    // Prepare Booking payload
    const bookingId = 'JHN-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking: Booking = {
      id: bookingId,
      farmerName,
      contactNumber,
      village,
      cropType,
      sugarcaneVariety: cropType === 'sugarcane' ? SUGARCANE_VARIETIES.find((v) => v.id === sugarcaneVariety)?.marathiName : undefined,
      vegetableVariety: cropType === 'vegetable' ? VEGETABLE_VARIETIES.find((v) => v.id === vegetableVariety)?.marathiName : undefined,
      quantity,
      totalSeedlings: calculatedSeedlings,
      plantationDate,
      transportRequired,
      status: 'pending' as BookingStatus,
      bookingDate: new Date().toISOString().split('T')[0],
      notes: notes || undefined,
    };

    // Save to database
    onBookingAdded(newBooking);

    if (viaWhatsApp) {
      // Trigger WhatsApp API Redirect
      const formattedMessage = generateWhatsAppMessage(newBooking);
      const url = `https://wa.me/918722273224?text=${encodeURIComponent(formattedMessage)}`;
      window.open(url, '_blank');
    }

    // Show receipt modal
    setReceiptBooking(newBooking);

    // Reset Form fields for next order, retaining contact details for convenience
    setNotes('');
  };

  // Generate WhatsApp Message text for submission
  const generateWhatsAppMessage = (b: Booking) => {
    const varietyName = b.cropType === 'sugarcane' ? b.sugarcaneVariety : b.vegetableVariety;
    const isWatermelon = b.vegetableVariety?.includes('टरबूज') || b.vegetableVariety?.includes('कलिंगड') || b.vegetableVariety?.includes('Watermelon');
    const trayPrice = b.cropType === 'sugarcane' ? 150 : (isWatermelon ? 50 : 104);
    const totalCost = b.quantity * trayPrice;

    return `*॥ जगदंब हायटेक नर्सरी रोप बुकिंग पावती *
-----------------------------------------
बुकिंग ID: *${b.id}*
शेतकऱ्याचे नाव: *${b.farmerName}*
मोबाईल नंबर: *${b.contactNumber}*
गाव/पत्ता: *${b.village}*

*बुकिंग तपशील:*
-----------------------------------------
- पिकाचा प्रकार: *${b.cropType === 'sugarcane' ? 'ऊस रोप' : 'भाजीपाला रोप'}*
- रोपाची जात: *${varietyName}*
- ट्रे संख्या: *${b.quantity} ट्रे*
- अंदाजे एकूण रोपे: *${b.totalSeedlings} रोपे*
- हवी असणारी तारीख: *${new Date(b.plantationDate).toLocaleDateString('mr-IN')}*
- वाहतूक हवी आहे का?: *${b.transportRequired ? 'होय (Yes)' : 'नाही (No)'}*
- एकूण अंदाजे रक्कम: *₹${totalCost}*
${b.notes ? `- अतिरिक्त नोंद: ${b.notes}` : ''}

*टीप:* बुकिंग यशस्वीरित्या नोंदवले गेले आहे. रोपवाटिकेमधून लवकरच आपल्याशी संपर्क केला जाईल.
जगदंब हायटेक नर्सरी, बेडकिहाळ.`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-emerald-800 text-white p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-md relative overflow-hidden">
        {/* Background visual highlight */}
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-10 -translate-y-10" />
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-black flex items-center gap-2">
            <ShoppingCart size={24} className="text-amber-400" />
            <span>रोप बुकिंग फॉर्म (Order Placement Desk)</span>
          </h3>
          <p className="text-xs text-emerald-200">
            आपली उसाची आणि भाजीपाल्याची उच्च दर्जाची रोपे आत्ताच बुक करा. कोणतीही आगाऊ रक्कम देण्याची गरज नाही.
          </p>
        </div>
        <div className="shrink-0 flex gap-2">
          <span className="bg-emerald-950 text-amber-400 font-bold text-xs px-3 py-1 rounded-full border border-emerald-700">
            ₹0 बुकिंग फी (Pay on Delivery)
          </span>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e, false)} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0">
        
        {/* Left Side: Farmer details & selections */}
        <div className="p-6 md:p-8 md:col-span-8 space-y-6">
          <h4 className="font-extrabold text-emerald-950 text-base border-b border-gray-100 pb-3 flex items-center gap-2">
            <User size={18} className="text-emerald-600" />
            <span>शेतकरी व बुकिंग तपशील (Farmer & Order Details)</span>
          </h4>

          {/* Grid layout for inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                १. शेतकऱ्याचे संपूर्ण नाव (Farmer Name) *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  placeholder="उदा. सुधीर विठ्ठल देसाई"
                  className="w-full pl-3 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none placeholder:text-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                २. मोबाईल नंबर (WhatsApp / Mobile) *
              </label>
              <input
                type="tel"
                required
                maxLength={10}
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="उदा. 9876543210"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none placeholder:text-gray-300"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                ३. गाव आणि तालुका (Village & Taluka Address) *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="उदा. मु.पो. बेडकिहाळ, ता. निपाणी"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none placeholder:text-gray-300"
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Seedling Variety Selection */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                ४. पिकाचा प्रकार निवडा (Choose Seedling Category)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCropType('sugarcane')}
                  className={`py-3 px-4 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    cropType === 'sugarcane'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  🌾 उसाची रोपे (Sugarcane)
                </button>
                <button
                  type="button"
                  onClick={() => setCropType('vegetable')}
                  className={`py-3 px-4 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    cropType === 'vegetable'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  🍆 भाजीपाला व फुले (Vegetables)
                </button>
              </div>
            </div>

            {cropType === 'sugarcane' ? (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  उसाची जात निवडा (Select Sugarcane Variety)
                </label>
                <select
                  value={sugarcaneVariety}
                  onChange={(e) => setSugarcaneVariety(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                >
                  {SUGARCANE_VARIETIES.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.marathiName} ({v.name}) - ₹१.५०/रोप (₹१५०/ट्रे)
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  भाजीपाल्याचे रोप / फुलाचे प्रकार निवडा (Select Vegetable/Flower Category)
                </label>
                <select
                  value={vegetableVariety}
                  onChange={(e) => setVegetableVariety(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                >
                  {VEGETABLE_VARIETIES.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.marathiName} - ₹{v.pricePerTray} प्रति ट्रे ({v.seedlingsPerTray} रोपे - ₹१.००/रोप)
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <hr className="border-gray-100" />

          {/* Quantity and Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                ५. ट्रे संख्या (Quantity of Trays) *
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 5))}
                  className="px-3.5 py-2.5 bg-gray-100 border border-gray-200 border-r-0 rounded-l-lg hover:bg-gray-200 text-sm font-extrabold"
                >
                  -५
                </button>
                <input
                  type="number"
                  required
                  min="1"
                  max="5000"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2.5 border border-gray-200 text-sm font-bold text-center focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 5)}
                  className="px-3.5 py-2.5 bg-gray-100 border border-gray-200 border-l-0 rounded-r-lg hover:bg-gray-200 text-sm font-extrabold"
                >
                  +५
                </button>
              </div>
              <span className="text-[10px] text-gray-400 mt-1 block">
                नर्सरीमध्ये लागवडीसाठी किमान ५-१० ट्रे बुक करणे सोयीचे ठरते.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                ६. रोपे मिळण्याची अंदाजे तारीख (Required Date) *
              </label>
              <input
                type="date"
                required
                value={plantationDate}
                onChange={(e) => setPlantationDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Transport checkbox */}
          <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100/50 flex items-start gap-3">
            <input
              type="checkbox"
              id="transport"
              checked={transportRequired}
              onChange={(e) => setTransportRequired(e.target.checked)}
              className="mt-1 h-4.5 w-4.5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="transport" className="text-xs font-bold text-emerald-950 cursor-pointer select-none">
              <span className="flex items-center gap-1">
                <Truck size={14} className="text-emerald-700" />
                <span>वाहतूक सोय हवी आहे (I need Transport service)</span>
              </span>
              <p className="font-normal text-[10.5px] text-emerald-800 mt-0.5">
                नर्सरीद्वारे शेतकऱ्याच्या शेतापर्यंत रोपे वाहून नेण्यासाठी योग्य दरात टेम्पोची किंवा ट्रॅक्टरची सोय केली जाईल. (वाहतूक भाडे अंतरावर अवलंबून असेल)
              </p>
            </label>
          </div>

          {/* Extra Notes */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              अतिरिक्त नोंद / संदेश (Additional Notes)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="उदा. मला रोपे सकाळी लवकर हवी आहेत, किंवा विशिष्ट वाणाची विनंती..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none placeholder:text-gray-300 resize-none"
            />
          </div>
        </div>

        {/* Right Side: Cost Breakdown & Action Buttons */}
        <div className="bg-gray-50 p-6 md:p-8 md:col-span-4 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col justify-between">
          <div className="space-y-6">
            <h4 className="font-extrabold text-emerald-950 text-sm border-b border-gray-200 pb-3 uppercase tracking-wider">
              बुकिंग बिल सारांश (Price Calc)
            </h4>

            {/* Calculations List */}
            <div className="space-y-3.5 text-xs text-gray-600">
              <div className="flex justify-between items-center">
                <span>रोप प्रकार:</span>
                <span className="font-extrabold text-gray-900">{cropType === 'sugarcane' ? 'ऊस रोपे' : 'भाजीपाला'}</span>
              </div>
              <div className="flex justify-between items-start">
                <span>वाण / जात:</span>
                <span className="font-extrabold text-gray-900 text-right max-w-[150px]">{cropDetails.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>ट्रे संख्या:</span>
                <span className="font-bold text-gray-900">{quantity} ट्रे</span>
              </div>
              <div className="flex justify-between items-center">
                <span>प्रति ट्रे रोपे:</span>
                <span className="font-semibold text-gray-600">{cropDetails.seedlingsPerTray} रोपे</span>
              </div>
              <div className="flex justify-between items-center">
                <span>प्रति ट्रे अंदाजे दर:</span>
                <span className="font-semibold text-gray-600">₹{cropDetails.pricePerTray}</span>
              </div>
              
              <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between items-center text-sm font-extrabold">
                <span className="text-emerald-900">एकूण रोपे संख्या:</span>
                <span className="text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded text-xs">{calculatedSeedlings.toLocaleString()} रोपे</span>
              </div>

              <div className="border-t border-gray-200 pt-3 flex justify-between items-end">
                <span className="font-extrabold text-gray-800 text-sm">एकूण अंदाजे रक्कम:</span>
                <div className="text-right">
                  <span className="text-xl font-black text-emerald-800 block">₹{calculatedTotalCost.toLocaleString()}</span>
                  <span className="text-[10px] text-gray-400 block font-normal">(रोप मिळताना रोख देणे)</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 text-[10.5px] text-amber-900 leading-relaxed">
              <strong>📝 नोंदणी नियम: </strong>
              बुकिंग पूर्ण केल्यानंतर तुमच्या मोबाईलवर पावती तयार होईल. बुकिंगची नोंदणी होताच आमचे प्रतिनिधी तुम्हाला कॉल करून रोपांची उपलब्धता निश्चित करतील.
            </div>
          </div>

          {/* Booking Button Channels */}
          <div className="space-y-2 mt-6">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.012 2C6.48 2 2.004 6.48 2.004 12c0 1.764.468 3.42 1.284 4.884l-1.368 5.016 5.136-1.344c1.404.768 2.988 1.188 4.656 1.188 5.532 0 10.008-4.48 10.008-10s-4.476-10-10.008-10zm5.724 14.196c-.24.672-1.2 1.224-1.656 1.26-.456.036-.9.18-2.916-.624-2.424-.96-3.972-3.408-4.092-3.576-.12-.168-1.008-1.344-1.008-2.556 0-1.212.612-1.812.84-2.052.228-.24.48-.3.636-.3.156 0 .312 0 .444.012.132.012.312-.048.492.384.18.432.612 1.5.672 1.62.06.12.096.264.012.432-.084.168-.18.276-.3.42l-.456.54c-.132.144-.276.3-.12.576.156.264.696 1.14 1.488 1.848.792.708 1.464.924 1.74 1.056.276.132.432.108.588-.072.156-.18.672-.78.852-1.044.18-.264.36-.216.6-.132.24.084 1.5.708 1.764.84.264.132.444.192.504.3.06.108.06.624-.18 1.296z" />
              </svg>
              <span>व्हॉट्सॲप बुकिंग (WhatsApp Order)</span>
            </button>

            <button
              type="submit"
              className="w-full bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <span>थेट फॉर्म जमा करा (Direct Submit)</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </form>

      {/* Booking Receipt Modal */}
      {receiptBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-emerald-100 animate-scale-in">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-800 to-green-950 text-white p-5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-amber-400" size={24} />
                <div>
                  <h4 className="font-extrabold text-base">बुकिंग यशस्वीरीत्या नोंदवले!</h4>
                  <p className="text-[10px] text-emerald-200">Booking Successfully Logged</p>
                </div>
              </div>
              <button
                onClick={() => setReceiptBooking(null)}
                className="text-white/80 hover:text-white bg-white/10 p-1.5 rounded-full hover:bg-white/20 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6" id="printable-receipt">
              <div className="text-center space-y-1">
                <h5 className="font-black text-emerald-950 text-xl">॥ जगदंब हायटेक नर्सरी ॥</h5>
                <p className="text-xs text-gray-500 font-medium">मु.पो. बेडकिहाळ, ता. निपाणी | मोबाईल: 8722273224</p>
                <span className="inline-block bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full mt-2">
                  बुकिंग पावती (Booking Receipt)
                </span>
              </div>

              {/* Receipt Grid */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                <div>
                  <span className="text-gray-400 font-medium block">बुकिंग आयडी (ID)</span>
                  <strong className="text-emerald-950 font-black text-sm">{receiptBooking.id}</strong>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 font-medium block">नोंदणी तारीख</span>
                  <strong className="text-gray-800 font-bold">{new Date(receiptBooking.bookingDate).toLocaleDateString('mr-IN')}</strong>
                </div>

                <hr className="col-span-2 border-dashed border-gray-200" />

                <div>
                  <span className="text-gray-400 font-medium block">शेतकऱ्याचे नाव</span>
                  <strong className="text-gray-800 font-bold">{receiptBooking.farmerName}</strong>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 font-medium block">मोबाईल नंबर</span>
                  <strong className="text-gray-800 font-bold">{receiptBooking.contactNumber}</strong>
                </div>

                <div className="col-span-2">
                  <span className="text-gray-400 font-medium block">पत्ता / गाव</span>
                  <strong className="text-gray-800 font-bold">{receiptBooking.village}</strong>
                </div>

                <hr className="col-span-2 border-dashed border-gray-200" />

                <div>
                  <span className="text-gray-400 font-medium block">पिकाचे नाव व जात</span>
                  <strong className="text-emerald-800 font-black">
                    {receiptBooking.cropType === 'sugarcane' ? receiptBooking.sugarcaneVariety : receiptBooking.vegetableVariety}
                  </strong>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 font-medium block">प्रमाण</span>
                  <strong className="text-gray-800 font-bold">
                    {receiptBooking.quantity} ट्रे ({receiptBooking.totalSeedlings} रोपे)
                  </strong>
                </div>

                <div>
                  <span className="text-gray-400 font-medium block">अंदाजे डिलिव्हरी तारीख</span>
                  <strong className="text-gray-800 font-bold">
                    {new Date(receiptBooking.plantationDate).toLocaleDateString('mr-IN')}
                  </strong>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 font-medium block">वाहतूक सोय</span>
                  <strong className="text-gray-800 font-bold">
                    {receiptBooking.transportRequired ? 'होय हवी आहे (Yes)' : 'स्वतः नेणार (No)'}
                  </strong>
                </div>
              </div>

              {/* Total Billing */}
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 flex justify-between items-center">
                <div>
                  <strong className="text-emerald-950 font-bold text-xs block">एकूण अंदाजे देय रक्कम</strong>
                  <span className="text-[10px] text-emerald-700 font-medium">लागवडीवेळी रोपे उचलताना भरणे</span>
                </div>
                <span className="text-2xl font-black text-emerald-800">
                  ₹{(() => {
                    const isWatermelon = receiptBooking.vegetableVariety?.includes('टरबूज') || receiptBooking.vegetableVariety?.includes('कलिंगड') || receiptBooking.vegetableVariety?.includes('Watermelon');
                    const pricePerTray = receiptBooking.cropType === 'sugarcane' ? 150 : (isWatermelon ? 50 : 104);
                    return (receiptBooking.quantity * pricePerTray).toLocaleString();
                  })()}
                </span>
              </div>

              {/* Notice text */}
              <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                * जगदंब नर्सरी आपली ऑर्डर सुसाध्य ठेवण्यासाठी कटिबद्ध आहे. कृपया ही पावती सुरक्षित ठेवा किंवा स्क्रीनशॉट काढा. काही अडचण असल्यास +91 8722273224 वर त्वरित कॉल करा.
              </p>
            </div>

            {/* Modal Footer actions */}
            <div className="bg-gray-50 p-4 border-t border-gray-200 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  const message = generateWhatsAppMessage(receiptBooking);
                  window.open(`https://wa.me/918722273224?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.012 2C6.48 2 2.004 6.48 2.004 12c0 1.764.468 3.42 1.284 4.884l-1.368 5.016 5.136-1.344c1.404.768 2.988 1.188 4.656 1.188 5.532 0 10.008-4.48 10.008-10s-4.476-10-10.008-10zm5.724 14.196c-.24.672-1.2 1.224-1.656 1.26-.456.036-.9.18-2.916-.624-2.424-.96-3.972-3.408-4.092-3.576-.12-.168-1.008-1.344-1.008-2.556 0-1.212.612-1.812.84-2.052.228-.24.48-.3.636-.3.156 0 .312 0 .444.012.132.012.312-.048.492.384.18.432.612 1.5.672 1.62.06.12.096.264.012.432-.084.168-.18.276-.3.42l-.456.54c-.132.144-.276.3-.12.576.156.264.696 1.14 1.488 1.848.792.708 1.464.924 1.74 1.056.276.132.432.108.588-.072.156-.18.672-.78.852-1.044.18-.264.36-.216.6-.132.24.084 1.5.708 1.764.84.264.132.444.192.504.3.06.108.06.624-.18 1.296z" />
                </svg>
                <span>व्हॉट्सअपवर पावती पाठवा</span>
              </button>
              <button
                onClick={() => setReceiptBooking(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs py-3 px-6 rounded-xl transition-colors"
              >
                बंद करा (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
