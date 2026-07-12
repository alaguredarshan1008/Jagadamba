/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Calculator, Leaf, ClipboardList, Info, AlertTriangle, Droplet, Sprout, Share2, Download } from 'lucide-react';
import { FERTILIZER_SCHEDULE, GROWING_STAGES, GENERAL_GUIDELINES_MARATHI } from '../data';

export const SugarcaneGuide: React.FC = () => {
  const [plantingDate, setPlantingDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [areaSize, setAreaSize] = useState<number>(1);
  const [activeSubTab, setActiveSubTab] = useState<'calculator' | 'stages' | 'pests'>('calculator');

  // Calculate dates based on planting date
  const calculateDate = (daysStr: string) => {
    // Parse start days
    const match = daysStr.match(/^(\d+)/);
    if (!match || !plantingDate) return 'N/A';
    const days = parseInt(match[1], 10);
    const date = new Date(plantingDate);
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('mr-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Generate WhatsApp Share Message for fertilization schedule
  const generateShareText = () => {
    let text = `*जगदंब हायटेक नर्सरी - वैयक्तिक खत वेळापत्रक (Fertilizer Schedule)*\n`;
    text += `क्षेत्र: *${areaSize} एकर* | लागवड तारीख: *${new Date(plantingDate).toLocaleDateString('mr-IN')}*\n`;
    text += `===============================\n\n`;

    FERTILIZER_SCHEDULE.forEach((entry, idx) => {
      text += `${idx + 1}) *${entry.daysRange}* (${calculateDate(entry.daysRange)})\n`;
      text += `अवस्था: *${entry.stage}*\n`;
      text += `खते:\n`;
      entry.fertilizers.forEach((f) => {
        const dosageNum = parseFloat(f.dosage.replace(/[^\d.]/g, ''));
        const unitLabel = f.dosage.replace(/[\d.]/g, '').trim();
        let calculatedDosage = f.dosage;
        if (!isNaN(dosageNum)) {
          calculatedDosage = `${(dosageNum * areaSize).toFixed(1)} ${unitLabel}`;
        }
        text += ` - ${f.name}: *${calculatedDosage}* (${f.unit})\n`;
      });
      text += `पद्धत: ${entry.applicationMethod}\n\n`;
    });

    text += `*टीप:* वरील वेळापत्रक जमिनीच्या सुपीकतेनुसार थोडे बदलू शकते. अधिक माहितीसाठी संपर्क करा: सुशांत देसाई - 8722273224`;
    return encodeURIComponent(text);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Intro Banner */}
      <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="bg-emerald-600 text-white p-4 rounded-xl shadow-md">
          <Leaf size={40} className="animate-pulse" />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-black text-emerald-950">
            ऊस लागवड तंत्रज्ञान आणि खत व्यवस्थापन
          </h3>
          <p className="text-emerald-800 text-sm mt-1 font-medium">
            शास्त्रीय पद्धतीने उसाचे संगोपन करून भरघोस उत्पादन मिळवा. खालील साधनांचा वापर करून आपले वैयक्तिक वेळापत्रक तयार करा.
          </p>
        </div>
      </div>

      {/* Sub-navigation buttons */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveSubTab('calculator')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all ${
            activeSubTab === 'calculator'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <Calculator size={16} />
          <span>खत वेळापत्रक कॅल्क्युलेटर (Fertilizer Planner)</span>
        </button>
        <button
          onClick={() => setActiveSubTab('stages')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all ${
            activeSubTab === 'stages'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <Sprout size={16} />
          <span>वाढीच्या अवस्था (Growing Stages)</span>
        </button>
        <button
          onClick={() => setActiveSubTab('pests')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all ${
            activeSubTab === 'pests'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <AlertTriangle size={16} />
          <span>महत्वाच्या टिप्स व रोग नियंत्रण (Pests & Tips)</span>
        </button>
      </div>

      {/* SUBTAB 1: CALCULATOR */}
      {activeSubTab === 'calculator' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-extrabold text-emerald-950 text-base flex items-center gap-2">
                <Calculator className="text-emerald-600" size={18} />
                <span>आपली माहिती प्रविष्ट करा (Enter Details)</span>
              </h4>
              <p className="text-xs text-gray-500">
                तुमच्या लागवडीची तारीख आणि क्षेत्र निवडा. त्यानुसार आम्ही योग्य खताचे प्रमाण आणि तारीख आपोआप मोजून देऊ.
              </p>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  १. लागवड किंवा बेणे टोकण तारीख (Plantation Date)
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={plantingDate}
                    onChange={(e) => setPlantingDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  २. एकूण उसाचे क्षेत्र एकरमध्ये (Plantation Area - Acres)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0.25"
                    max="100"
                    step="0.25"
                    value={areaSize}
                    onChange={(e) => setAreaSize(Math.max(0.25, parseFloat(e.target.value) || 1))}
                    className="w-24 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-center focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  />
                  <span className="text-sm font-bold text-gray-600">एकर (Acres)</span>
                  <div className="flex gap-1 ml-auto">
                    {[1, 2, 3, 5].map((val) => (
                      <button
                        key={val}
                        onClick={() => setAreaSize(val)}
                        className={`px-3 py-1 text-xs font-bold rounded border ${
                          areaSize === val
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {val} AC
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-950 text-emerald-100 p-6 rounded-xl border border-emerald-800 flex flex-col justify-between">
              <div>
                <h5 className="font-bold text-white text-sm uppercase tracking-wider text-amber-400">
                  खत नियोजनाचे फायदे
                </h5>
                <ul className="mt-3 space-y-2 text-xs">
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-extrabold">✓</span>
                    <span>योग्य खत मात्रा योग्य वेळेत मिळाल्याने उसाचे वजन १५ ते २०% वाढते.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-extrabold">✓</span>
                    <span>अवाजवी खतांचा खर्च टळतो व आर्थिक बचत होते.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-extrabold">✓</span>
                    <span>ठिबक व माती परीक्षणानुसार खते दिल्यास जमिनीचा पोत बिघडत नाही.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-emerald-800/50 flex flex-col sm:flex-row gap-2">
                <a
                  href={`https://wa.me/?text=${generateShareText()}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-center py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Share2 size={14} />
                  <span>व्हाट्सअपवर शेअर करा</span>
                </a>
                <button
                  onClick={() => window.print()}
                  className="bg-white/10 hover:bg-white/20 text-white py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                >
                  <Download size={14} />
                  <span>प्रिंट करा (Print PDF)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Calculated Schedule */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-gray-900 text-lg">
              तुमचे सानुकूल खत वेळापत्रक ({areaSize} एकरसाठी)
            </h4>

            <div className="grid grid-cols-1 gap-6">
              {FERTILIZER_SCHEDULE.map((entry, idx) => {
                return (
                  <div
                    key={entry.id}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row"
                  >
                    {/* Left Timeframe strip */}
                    <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white p-4 md:w-56 shrink-0 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] bg-emerald-500/50 text-emerald-100 font-black uppercase px-2 py-0.5 rounded tracking-wider">
                          हप्ता क्रमांक {idx + 1}
                        </span>
                        <div className="font-extrabold text-lg mt-1">{entry.daysRange}</div>
                      </div>
                      <div className="mt-4 md:mt-0 pt-3 border-t border-emerald-500/30">
                        <span className="text-[10px] text-emerald-200 block">अंदाजे लागू करण्याची तारीख:</span>
                        <span className="text-sm font-bold text-amber-300 flex items-center gap-1 mt-0.5">
                          <Calendar size={14} />
                          {calculateDate(entry.daysRange)}
                        </span>
                      </div>
                    </div>

                    {/* Right content details */}
                    <div className="p-5 flex-1 space-y-4">
                      <div>
                        <h5 className="font-extrabold text-emerald-950 text-base">{entry.stage}</h5>
                        <p className="text-xs text-gray-500 mt-0.5 italic">{entry.purpose}</p>
                      </div>

                      {/* Nutrient Table */}
                      <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-100 text-gray-600 font-bold border-b border-gray-200">
                              <th className="p-2.5">खताचे नाव (Fertilizer Name)</th>
                              <th className="p-2.5 text-right">डोस ({areaSize} एकरसाठी)</th>
                              <th className="p-2.5 text-right hidden sm:table-cell">प्रमाण प्रकार</th>
                            </tr>
                          </thead>
                          <tbody>
                            {entry.fertilizers.map((f, fIdx) => {
                              // Regex to parse numeric value and units
                              const dosageNum = parseFloat(f.dosage.replace(/[^\d.]/g, ''));
                              const unitLabel = f.dosage.replace(/[\d.]/g, '').trim();
                              let finalDosage = f.dosage;

                              if (!isNaN(dosageNum)) {
                                finalDosage = `${(dosageNum * areaSize).toFixed(1)} ${unitLabel}`;
                              }

                              return (
                                <tr key={fIdx} className="border-b border-gray-100 last:border-0">
                                  <td className="p-2.5 font-semibold text-gray-800">{f.name}</td>
                                  <td className="p-2.5 text-right font-black text-emerald-700">{finalDosage}</td>
                                  <td className="p-2.5 text-right text-gray-500 hidden sm:table-cell">{f.unit}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      <div className="text-xs flex items-start gap-1.5 bg-amber-50 text-amber-900 p-3 rounded-lg border border-amber-100">
                        <Info size={14} className="shrink-0 text-amber-600 mt-0.5" />
                        <div>
                          <strong className="font-bold">देण्याची पद्धत: </strong>
                          <span>{entry.applicationMethod}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: GROWING STAGES */}
      {activeSubTab === 'stages' && (
        <div className="space-y-6">
          <h4 className="font-extrabold text-gray-900 text-lg">
            उसाची जीवनचक्रे आणि वाढीच्या पायऱ्या
          </h4>

          <div className="relative border-l-2 border-emerald-200 pl-6 ml-4 space-y-8">
            {GROWING_STAGES.map((stage) => (
              <div key={stage.id} className="relative group">
                {/* Timeline node */}
                <span className="absolute -left-10 top-0.5 bg-emerald-600 text-white rounded-full p-1.5 border-4 border-white shadow-md group-hover:bg-amber-500 transition-colors">
                  <Sprout size={14} />
                </span>

                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h5 className="font-extrabold text-emerald-950 text-base">
                      {stage.marathiStageName}
                    </h5>
                    <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-1 rounded-full w-max">
                      {stage.duration} ({stage.stageName})
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {stage.marathiDescription}
                  </p>
                  <p className="text-xs text-gray-400 italic">
                    {stage.description}
                  </p>

                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-xs font-black text-gray-700 block mb-1.5">
                      महत्वाच्या कृती (Key Practices at this stage):
                    </span>
                    <ul className="space-y-1 text-xs text-gray-600">
                      {stage.keyPractices.map((practice, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{practice}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: PESTS & GENERAL TIPS */}
      {activeSubTab === 'pests' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* General guides */}
          <div className="space-y-6">
            <h4 className="font-extrabold text-gray-900 text-lg">
              सर्वसाधारण पीक नियोजन मार्गदर्शक तत्वे
            </h4>

            {Object.values(GENERAL_GUIDELINES_MARATHI).map((guide, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                    {idx === 0 && <Sprout size={18} />}
                    {idx === 1 && <Droplet size={18} />}
                    {idx === 2 && <ClipboardList size={18} />}
                  </span>
                  <h5 className="font-extrabold text-emerald-950 text-sm">{guide.title}</h5>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{guide.desc}</p>
              </div>
            ))}
          </div>

          {/* Diagnostic Warnings */}
          <div className="space-y-6">
            <h4 className="font-extrabold text-gray-900 text-lg">
              महत्त्वाच्या धोक्याची चिन्हे व कीड नियंत्रण
            </h4>

            <div className="bg-rose-50 rounded-xl p-5 border border-rose-100 space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-rose-600" size={20} />
                <h5 className="font-bold text-rose-950 text-sm">
                  हुमणी अळी प्रादुर्भाव (White Grub Warning)
                </h5>
              </div>
              <p className="text-xs text-rose-900 leading-relaxed">
                ऑगस्ट ते ऑक्टोबर दरम्यान ऊस पिकात हुमणी अळीचा प्रादुर्भाव वेगाने वाढतो. यामुळे उसाची मुळे कुरतडली जातात आणि ऊस सुकू लागतो.
              </p>
              <div className="bg-white/60 p-3 rounded-lg text-xs text-rose-950 border border-rose-200">
                <strong className="block font-black text-rose-900 mb-1">नियंत्रण उपाय:</strong>
                <ul className="list-disc pl-4 space-y-1">
                  <li>उन्हाळ्यात जमिनीची खोल नांगरट करावी.</li>
                  <li>शेणखतातून मेटारायझियम अॅनिसोप्ली (५ किलो प्रति एकर) जैविक बुरशी द्यावी.</li>
                  <li>नदीकाठच्या शेतात प्रकाश सापळे (Light Traps) लावावेत.</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-5 border border-amber-100 space-y-4">
              <div className="flex items-center gap-2">
                <Droplet className="text-amber-600" size={20} />
                <h5 className="font-bold text-amber-950 text-sm">
                  पाण्याचा ताण पडल्यास काय करावे?
                </h5>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                उन्हाळ्यात पाण्याची तीव्र कमतरता जाणवल्यास, कांड्यांची वाढ खुंटते आणि उत्पादनात घट होते.
              </p>
              <div className="bg-white/60 p-3 rounded-lg text-xs text-amber-950 border border-amber-200">
                <strong className="block font-black text-amber-950 mb-1">बचावात्मक कृती:</strong>
                <ul className="list-disc pl-4 space-y-1">
                  <li>दुपारच्या कडक उन्हात ठिबक सिंचनाचा नियमित वापर करा.</li>
                  <li>सरीमध्ये उसाचे पाचट (Mulching) पसरावे जेणेकरून बाष्पीभवन कमी होईल.</li>
                  <li>पोटॅशियम नायट्रेट (१३:०:४५ - १.५%) ची फवारणी करून पानांमधील पाणी टिकवावे.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
