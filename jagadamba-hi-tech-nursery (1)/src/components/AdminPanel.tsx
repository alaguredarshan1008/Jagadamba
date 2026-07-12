/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ClipboardList, Users, TrendingUp, Truck, Trash2, Search, RotateCcw, AlertCircle, Sparkles, Filter, CheckCircle } from 'lucide-react';
import { Booking, BookingStatus } from '../types';

interface AdminPanelProps {
  bookings: Booking[];
  onStatusChange: (id: string, newStatus: BookingStatus) => void;
  onDeleteBooking: (id: string) => void;
  onResetBookings: () => void;
  onLoadDemoBookings: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  bookings,
  onStatusChange,
  onDeleteBooking,
  onResetBookings,
  onLoadDemoBookings
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'sugarcane' | 'vegetable'>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Calculate statistics
  const totalBookings = bookings.length;
  const activeBookings = bookings.filter((b) => b.status !== 'cancelled').length;
  const totalTrays = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.quantity, 0);
  const totalSeedlings = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.totalSeedlings, 0);
  
  // Dynamic estimated value calculation:
  // Sugarcane has 100 seedlings per tray @ ₹1.50 = ₹150 per tray
  // Watermelon has 50 seedlings per tray @ ₹1.00 = ₹50 per tray
  // Others have 104 seedlings per tray @ ₹1.00 = ₹104 per tray
  const totalEstimatedValue = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => {
      if (b.cropType === 'sugarcane') {
        return sum + (b.quantity * 154);
      } else {
        const isWatermelon = b.vegetableVariety?.includes('टरबूज') || b.vegetableVariety?.includes('कलिंगड') || b.vegetableVariety?.includes('Watermelon');
        const pricePerTray = isWatermelon ? 50 : 104;
        return sum + (b.quantity * pricePerTray);
      }
    }, 0);
  const totalTransportRequests = bookings.filter((b) => b.transportRequired && b.status !== 'cancelled').length;

  // Filter bookings list
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.contactNumber.includes(searchTerm) ||
      b.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === 'all' || b.cropType === filterType;

    const matchesStatus =
      filterStatus === 'all' || b.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Convert status keys to friendly Marathi labels
  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="bg-amber-100 text-amber-800 text-[11px] font-black px-2.5 py-1 rounded-full border border-amber-200">
            ⏳ प्रलंबित (Pending)
          </span>
        );
      case 'confirmed':
        return (
          <span className="bg-blue-100 text-blue-800 text-[11px] font-black px-2.5 py-1 rounded-full border border-blue-200">
            ✓ निश्चित (Confirmed)
          </span>
        );
      case 'ready_for_delivery':
        return (
          <span className="bg-purple-100 text-purple-800 text-[11px] font-black px-2.5 py-1 rounded-full border border-purple-200">
            📦 तयार (Ready)
          </span>
        );
      case 'delivered':
        return (
          <span className="bg-emerald-100 text-emerald-800 text-[11px] font-black px-2.5 py-1 rounded-full border border-emerald-200">
            🤝 सुपूर्द (Delivered)
          </span>
        );
      case 'cancelled':
        return (
          <span className="bg-rose-100 text-rose-800 text-[11px] font-black px-2.5 py-1 rounded-full border border-rose-200">
            ✕ रद्द (Cancelled)
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Overview Cards Panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2 flex flex-col justify-between">
          <div className="flex justify-between items-center text-emerald-700">
            <span className="text-xs font-bold text-gray-500">एकूण बुकिंग (Bookings)</span>
            <ClipboardList size={18} />
          </div>
          <div className="space-y-0.5">
            <h5 className="text-2xl font-black text-gray-950">{totalBookings}</h5>
            <span className="text-[10px] text-gray-400 block font-medium">सक्रिय: {activeBookings} ऑर्डर्स</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2 flex flex-col justify-between">
          <div className="flex justify-between items-center text-blue-700">
            <span className="text-xs font-bold text-gray-500">एकूण ट्रे (Total Trays)</span>
            <Sparkles size={18} />
          </div>
          <div className="space-y-0.5">
            <h5 className="text-2xl font-black text-gray-950">{totalTrays.toLocaleString()}</h5>
            <span className="text-[10px] text-gray-400 block font-medium">सुमारे {totalSeedlings.toLocaleString()} रोपे</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2 flex flex-col justify-between">
          <div className="flex justify-between items-center text-amber-600">
            <span className="text-xs font-bold text-gray-500">अंदाजे रक्कम (Revenue)</span>
            <TrendingUp size={18} />
          </div>
          <div className="space-y-0.5">
            <h5 className="text-2xl font-black text-emerald-800">₹{totalEstimatedValue.toLocaleString()}</h5>
            <span className="text-[10px] text-gray-400 block font-medium">ऊस: ₹१.५०/रोप, भाजीपाला: ₹१.००/रोप</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2 flex flex-col justify-between">
          <div className="flex justify-between items-center text-purple-700">
            <span className="text-xs font-bold text-gray-500">वाहतूक विनंती (Transport)</span>
            <Truck size={18} />
          </div>
          <div className="space-y-0.5">
            <h5 className="text-2xl font-black text-gray-950">{totalTransportRequests}</h5>
            <span className="text-[10px] text-gray-400 block font-medium">वाहन आवश्यक शेतकरी</span>
          </div>
        </div>
      </div>

      {/* Admin Operations Console */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
          <div>
            <h4 className="font-extrabold text-emerald-950 text-base">नोंदणी यादी व्यवस्थापन (Order Registry)</h4>
            <p className="text-xs text-gray-500 mt-0.5">नर्सरी मधील सर्व उसाच्या आणि भाजीपाल्याच्या बुकिंगची प्रगती व वाहतुकीचे नियोजन येथून करा.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {bookings.length === 0 && (
              <button
                onClick={onLoadDemoBookings}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 border border-emerald-200 transition-colors"
              >
                <Sparkles size={14} className="text-amber-500 animate-spin" />
                <span>डेमो डेटा लोड करा (Demo Bookings)</span>
              </button>
            )}
            <button
              onClick={() => {
                if (confirm('सर्व बुकिंग डेटा हटवायचा आहे का? (Are you sure to reset all bookings?)')) {
                  onResetBookings();
                }
              }}
              className="bg-rose-50 hover:bg-rose-100 text-rose-800 font-extrabold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 border border-rose-200 transition-colors"
            >
              <RotateCcw size={14} />
              <span>डेटा रिसेट करा</span>
            </button>
          </div>
        </div>

        {/* Searching and Filtering controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="absolute left-3 top-3.5 text-gray-400" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="नाव, मोबाईल, गाव किंवा आयडीने शोधा..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="sm:col-span-3 flex items-center gap-2">
            <Filter size={14} className="text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none"
            >
              <option value="all">सर्व पिके (All Crops)</option>
              <option value="sugarcane">फक्त ऊस (Sugarcane)</option>
              <option value="vegetable">फक्त भाजीपाला (Vegetables)</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none"
            >
              <option value="all">सर्व स्थिती (All Status)</option>
              <option value="pending">⏳ प्रलंबित (Pending)</option>
              <option value="confirmed">✓ निश्चित (Confirmed)</option>
              <option value="ready_for_delivery">📦 तयार (Ready)</option>
              <option value="delivered">🤝 सुपूर्द (Delivered)</option>
              <option value="cancelled">✕ रद्द (Cancelled)</option>
            </select>
          </div>
        </div>

        {/* Desktop Table View */}
        {filteredBookings.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-gray-100 hidden md:block">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-600 font-bold border-b border-gray-200">
                  <th className="p-4">बुकिंग आयडी (ID)</th>
                  <th className="p-4">शेतकरी तपशील</th>
                  <th className="p-4">पीक व जात</th>
                  <th className="p-4">ट्रे संख्या</th>
                  <th className="p-4">डिलिव्हरी तारीख</th>
                  <th className="p-4">वाहतूक</th>
                  <th className="p-4">स्थिती बदल (Status)</th>
                  <th className="p-4 text-center">क्रिया</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {filteredBookings.map((b) => {
                  const cropLabel = b.cropType === 'sugarcane' ? b.sugarcaneVariety : b.vegetableVariety;
                  return (
                    <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-bold text-gray-900">{b.id}</td>
                      <td className="p-4">
                        <div className="font-extrabold text-gray-900 text-[13px]">{b.farmerName}</div>
                        <div className="text-[11px] text-gray-500 mt-0.5">{b.contactNumber} • {b.village}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${b.cropType === 'sugarcane' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
                          {b.cropType === 'sugarcane' ? '🌾 ऊस' : '🍆 भाजीपाला'}
                        </span>
                        <div className="font-black text-gray-800 mt-1">{cropLabel}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-black text-gray-900">{b.quantity} ट्रे</div>
                        <div className="text-[10px] text-gray-400">({b.totalSeedlings} रोपे)</div>
                      </td>
                      <td className="p-4 font-bold text-gray-800">
                        {new Date(b.plantationDate).toLocaleDateString('mr-IN', { day: 'numeric', month: 'short' })}
                      </td>
                      <td className="p-4">
                        {b.transportRequired ? (
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 w-max">
                            <Truck size={12} />
                            होय
                          </span>
                        ) : (
                          <span className="text-gray-400">नाही</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="space-y-1.5">
                          <div>{getStatusBadge(b.status)}</div>
                          <select
                            value={b.status}
                            onChange={(e) => onStatusChange(b.id, e.target.value as BookingStatus)}
                            className="bg-white border border-gray-200 rounded px-1.5 py-0.5 text-[10px] font-bold outline-none cursor-pointer focus:ring-1 focus:ring-emerald-500"
                          >
                            <option value="pending">प्रलंबित</option>
                            <option value="confirmed">निश्चित</option>
                            <option value="ready_for_delivery">तयार</option>
                            <option value="delivered">सुपूर्द</option>
                            <option value="cancelled">रद्द</option>
                          </select>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => {
                            if (confirm('हे बुकिंग डिलीट करायचे का? (Delete this booking?)')) {
                              onDeleteBooking(b.id);
                            }
                          }}
                          className="text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-colors border border-transparent hover:border-rose-100"
                          title="बुकिंग डिलीट करा"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-50 border border-dashed border-gray-200 p-8 rounded-xl text-center space-y-2">
            <AlertCircle className="mx-auto text-gray-400" size={32} />
            <h5 className="font-bold text-gray-800 text-sm">शोध परिणामांमध्ये कोणताही बुकिंग रेकॉर्ड आढळला नाही.</h5>
            <p className="text-xs text-gray-500">शोध संज्ञा बदला किंवा वरील बटणावर क्लिक करून डेमो बुकिंग्स लोड करा.</p>
          </div>
        )}

        {/* Mobile View: Stacked cards */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {filteredBookings.map((b) => {
            const cropLabel = b.cropType === 'sugarcane' ? b.sugarcaneVariety : b.vegetableVariety;
            return (
              <div
                key={b.id}
                className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">ID: {b.id}</span>
                    <h5 className="font-extrabold text-gray-900 text-base">{b.farmerName}</h5>
                  </div>
                  <div>{getStatusBadge(b.status)}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400">मोबाईल व गाव:</span>
                    <strong className="block text-gray-800">{b.contactNumber}</strong>
                    <span className="text-gray-500 block">{b.village}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">वाण / प्रकार:</span>
                    <strong className="block text-emerald-800 font-black">{cropLabel}</strong>
                    <span className="text-gray-500 block">{b.cropType === 'sugarcane' ? 'ऊस रोप' : 'भाजीपाला'}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-gray-400">ट्रे संख्या:</span>
                    <strong className="block text-gray-900 text-sm font-black">{b.quantity} ट्रे ({b.totalSeedlings} रोपे)</strong>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-gray-400">डिलिव्हरी तारीख:</span>
                    <strong className="block text-gray-900 font-bold">
                      {new Date(b.plantationDate).toLocaleDateString('mr-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </strong>
                  </div>
                </div>

                {b.notes && (
                  <div className="bg-amber-50 p-2.5 rounded text-[11px] text-amber-900 border border-amber-100 italic">
                    <strong>नोंद:</strong> {b.notes}
                  </div>
                )}

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-gray-500 font-bold">अवस्था बदला:</span>
                    <select
                      value={b.status}
                      onChange={(e) => onStatusChange(b.id, e.target.value as BookingStatus)}
                      className="bg-gray-50 border border-gray-200 rounded px-2 py-1 text-[11px] font-bold outline-none cursor-pointer focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="pending">प्रलंबित</option>
                      <option value="confirmed">निश्चित</option>
                      <option value="ready_for_delivery">तयार</option>
                      <option value="delivered">सुपूर्द</option>
                      <option value="cancelled">रद्द</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm('हे बुकिंग डिलीट करायचे का?')) {
                        onDeleteBooking(b.id);
                      }
                    }}
                    className="text-rose-600 bg-rose-50 hover:bg-rose-100 p-2 rounded-lg transition-colors border border-rose-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
