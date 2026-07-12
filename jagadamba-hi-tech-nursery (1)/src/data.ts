/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SugarcaneVariety, VegetableVariety, FertilizerEntry, GrowingStage } from './types';

// Import image assets using ESM imports for Vite to bundle them correctly
// @ts-ignore
import polyhouse from './assets/images/polyhouse_interior_1783851073254.jpg';
// @ts-ignore
import sugarcane from './assets/images/sugarcane_seedlings_1783851093321.jpg';
// @ts-ignore
import vegetables from './assets/images/vegetable_seedlings_1783851110859.jpg';
// @ts-ignore
import logo from './assets/images/jagadamba_logo_1783852288981.jpg';
// @ts-ignore
import owner from './assets/images/owner_photo_1783852310916.jpg';

export const IMAGES = {
  polyhouse,
  sugarcane,
  vegetables,
  logo,
  owner,
};

export const SUGARCANE_VARIETIES: SugarcaneVariety[] = [
  {
    id: 'co-86032',
    name: 'Co. 86032 (Nira / नीरा)',
    marathiName: 'को. ८६०३२ (नीरा)',
    description: 'महाराष्ट्रात सर्वात जास्त लोकप्रिय आणि सर्वाधिक उत्पादन देणारी जात. दुष्काळाला तोंड देणारी आणि उत्तम खोडवा देणारी जात.',
    features: [
      'उत्कृष्ट साखर उतारा (High Sugar Recovery)',
      'जाड आणि वजनदार कांडी (Thick and heavy stalks)',
      'उत्तम खोडवा देणारी जात (Excellent ratoon crop yield)'
    ],
    duration: '12 - 14 Months',
    yieldPotential: '80 - 100 Tons/Acre'
  },
  {
    id: 'co-0265',
    name: 'Co.M. 0265 (Phule 265 / फुले २६५)',
    marathiName: 'को.एम. ०२६५ (फुले २६५)',
    description: 'चोपण व क्षारयुक्त जमिनीत तसेच पाण्याच्या ताणास अत्यंत सहनशील. जाड कांडी व भरघोस उत्पादनासाठी प्रसिद्ध जात.',
    features: [
      'भारी जमिनीत देखील उत्कृष्ट उत्पादन (Excellent yield in heavy/saline soil)',
      'रोग प्रतिकारक शक्ती जास्त (High pest & disease resistance)',
      'अधिक वजनाची कांड्या (Thicker stalks with higher single cane weight)',
      'उत्तम फुटवा फुटण्याची क्षमता (Profuse tillering capacity)'
    ],
    duration: '12 - 14 Months',
    yieldPotential: '85 - 110 Tons/Acre'
  },
  {
    id: 'co-10001',
    name: 'Co. 10001 (Early / लवकर येणारी)',
    marathiName: 'को. १०००१ (लवकर येणारी)',
    description: 'अतिशय लवकर पक्व होणारी आणि सुक्रोजचे भरपूर प्रमाण असणारी लोकप्रिय जात. कमी पाण्यामध्ये व हलक्या जमिनीत देखील चांगले उत्पादन देते.',
    features: [
      'अतिशय जलद वाढ (Vigorous early growth)',
      'लवकर पक्व होणारी जात (Early maturity in 10-12 months)',
      'जास्त साखर उतारा (High sugar recovery percentage)'
    ],
    duration: '10 - 12 Months',
    yieldPotential: '75 - 90 Tons/Acre'
  }
];

export const VEGETABLE_VARIETIES: VegetableVariety[] = [
  {
    id: 'chili',
    name: 'Chili Seedlings',
    marathiName: 'मिरची रोपे',
    scientificName: 'Capsicum annuum',
    description: 'उत्कृष्ट वाण (उदा. तेजस्विनी, सितारा, लवंगी) अत्यंत जोमदार वाढणारी आणि कीड-रोग प्रतिकारक रोपे.',
    pricePerTray: 104, // 104 seedlings * ₹1.00 = ₹104 per tray
    seedlingsPerTray: 104,
    features: [
      'जोमदार मुळांचा विकास (Deep robust root plug)',
      'अतिशय कमी प्रमाणात नापीक होणे (High transplant survival rate)',
      'भरघोस तोडा आणि लवकर फळधारणा (Early heavy picking)'
    ],
    image: IMAGES.vegetables
  },
  {
    id: 'brinjal',
    name: 'Eggplant / Brinjal Seedlings',
    marathiName: 'वांगी रोपे',
    scientificName: 'Solanum melongena',
    description: 'काटेरी, गुळगुळीत आणि स्थानिक वाणांची रोगमुक्त गादीवाफ्यावरील/कोकोपीटमधील निरोगी रोपे.',
    pricePerTray: 104, // 104 seedlings * ₹1.00 = ₹104 per tray
    seedlingsPerTray: 104,
    features: [
      'मर रोगास पूर्ण प्रतिकारक (Highly resistant to bacterial wilt)',
      'एकसमान निरोगी वाढ (Uniform and healthy vegetative growth)',
      'फांद्यांचे प्रमाण जास्त (More lateral branches)'
    ],
    image: 'https://picsum.photos/seed/brinjal/400/300'
  },
  {
    id: 'marigold',
    name: 'Marigold Seedlings',
    marathiName: 'झेंडू रोपे',
    scientificName: 'Tagetes erecta',
    description: 'कलकत्ता ऑरेंज, यलो आणि इतर सणांसाठी लागणाऱ्या सुधारित वाणांची भरपूर फुलांची खात्री देणारी रोपे.',
    pricePerTray: 104, // 104 seedlings * ₹1.00 = ₹104 per tray
    seedlingsPerTray: 104,
    features: [
      'लवकर कळ्या येणे (Early flowering initiates)',
      'घट्ट आणि मोठी फुले मिळतात (Compact, large size flowers)',
      'बाजारात चांगली किंमत मिळवून देणारी रोपे (High market demand)'
    ],
    image: 'https://picsum.photos/seed/marigold/400/300'
  },
  {
    id: 'cabbage',
    name: 'Cabbage Seedlings',
    marathiName: 'कोबीज रोपे',
    scientificName: 'Brassica oleracea var. capitata',
    description: 'थंड आणि मध्यम हवामानात गोल, घट्ट आणि एकसमान आकाराचे गड्डा देणारी हायब्रीड रोपे.',
    pricePerTray: 104, // 104 seedlings * ₹1.00 = ₹104 per tray
    seedlingsPerTray: 104,
    features: [
      'टणक आणि दर्जेदार गड्डा (Dense and solid head development)',
      'लागवडीनंतर केवळ ६०-७० दिवसांत तयार (Harvest ready in 60-70 days)',
      'वाहतुकीसाठी उत्तम व टवटवीत राहणारे (Excellent shelf-life and transportability)'
    ],
    image: 'https://picsum.photos/seed/cabbage/400/300'
  },
  {
    id: 'cauliflower',
    name: 'Cauliflower Seedlings',
    marathiName: 'फ्लॉवर रोपे',
    scientificName: 'Brassica oleracea var. botrytis',
    description: 'शुभ्र पांढरा आणि कीडमुक्त फुलाचा गड्डा देणारी, उत्तम पाने झाकलेली विशेष हायब्रीड रोपे.',
    pricePerTray: 104, // 104 seedlings * ₹1.00 = ₹104 per tray
    seedlingsPerTray: 104,
    features: [
      'गड्डा पानांनी पूर्ण झाकलेला राहतो (Self-blanching leaf habit)',
      'उत्कृष्ट शुभ्र रंग आणि चव (Snow white curds with rich taste)',
      'रोगप्रतिकारक शक्ती अधिक (Resistant to black rot)'
    ],
    image: 'https://picsum.photos/seed/cauliflower/400/300'
  },
  {
    id: 'watermelon',
    name: 'Watermelon Seedlings',
    marathiName: 'टरबूज / कलिंगड रोपे',
    scientificName: 'Citrullus lanatus',
    description: 'गोड, दाट लाल आणि आकर्षक काळ्या सालीच्या भारी वजनाच्या फळांची खात्रीशीर रोपे (उदा. किरण, सरस्वती).',
    pricePerTray: 50, // 50 seedlings * ₹1.00 = ₹50 per tray
    seedlingsPerTray: 50,
    features: [
      'शक्त मुळांची जोडणी (Extremely strong graft/seedling root plug)',
      'वेल लवकर पसरतो आणि पानांचे आवरण मोठे होते (Rapid vine expansion)',
      'फळाला गोडवा आणि चकाकी मिळते (Produces high Brix sweet fruits)'
    ],
    image: 'https://picsum.photos/seed/watermelon/400/300'
  }
];

export const FERTILIZER_SCHEDULE: FertilizerEntry[] = [
  {
    id: 'f1',
    daysRange: '0 - 15 Days (लागवडीवेळी)',
    stage: 'Base Fertilization (पायाभूत खत मात्रा)',
    fertilizers: [
      { name: 'Singe Super Phosphate (SSP / सुपर फॉस्फेट)', dosage: '३ पोती (150 Kg)', unit: 'प्रति एकर' },
      { name: 'NPK 10:26:26 (१०:२६:२६)', dosage: '२ पोती (100 Kg)', unit: 'प्रति एकर' },
      { name: 'Neem Cake (लिंबोळी पेंड)', dosage: '२ पोती (100 Kg)', unit: 'प्रति एकर' },
      { name: 'Micronutrients (सुक्ष्म अन्नद्रव्ये)', dosage: '१० किलो', unit: 'प्रति एकर' }
    ],
    applicationMethod: 'चर पाडून किंवा सरीच्या तळाशी मातीआड करणे (Soil application below seedling/bud level)',
    purpose: 'मुळांची जलद आणि मजबूत वाढ होण्यासाठी, तसेच फुटवे फुटण्यास अन्नद्रव्यांची कमतरता भासू नये म्हणून.'
  },
  {
    id: 'f2',
    daysRange: '30 - 45 Days (पहिले खत)',
    stage: 'Early Tillering Stage (फुटवे येण्याची सुरुवात)',
    fertilizers: [
      { name: 'Urea (युरिया)', dosage: '१ पोते (50 Kg)', unit: 'प्रति एकर' },
      { name: 'Ammonium Sulphate (अमोनियम सल्फेट)', dosage: '१ पोते (50 Kg)', unit: 'प्रति एकर' },
      { name: 'Sulphur (सल्फर ९०%)', dosage: '३ किलो', unit: 'प्रति एकर' }
    ],
    applicationMethod: 'ओलाव्यात रोपांच्या बुंध्याशेजारी देऊन हलकी माती देणे (Side dressing near root zone followed by irrigation)',
    purpose: 'नायट्रोजन पुरवून हिरवेगारपणा आणणे and फुटव्यांची संख्या भरघोस वाढवणे.'
  },
  {
    id: 'f3',
    daysRange: '60 - 75 Days (दुसरे खत)',
    stage: 'Vigorous Tillering Stage (मोठे फुटवे येणे)',
    fertilizers: [
      { name: 'NPK 19:19:19 (१९:१९:१९)', dosage: '५ किलो (ठिबकद्वारे)', unit: 'किंवा १५० लिटर पाण्यातून प्रति एकर' },
      { name: 'Urea (युरिया)', dosage: '१ पोते (50 Kg)', unit: 'प्रति एकर' },
      { name: 'Magnesium Sulphate (मॅग्नेशियम सल्फेट)', dosage: '१० किलो', unit: 'प्रति एकर' }
    ],
    applicationMethod: 'ठिबक सिंचनातून ड्रिपद्वारे किंवा सरीमध्ये देऊन पाणी देणे (Drip fertigation or soil application with immediate irrigation)',
    purpose: 'उसाची कांडी धरण्याची ताकद वाढवणे, प्रकाशसंश्लेषण वाढवणे व पाने रुंद करणे.'
  },
  {
    id: 'f4',
    daysRange: '95 - 110 Days (मोठी भरणी खत मात्रा)',
    stage: 'Grand Growth & Earthing Up (मोठी भरणी)',
    fertilizers: [
      { name: 'Urea (युरिया)', dosage: '२ पोती (100 Kg)', unit: 'प्रति एकर' },
      { name: 'Single Super Phosphate (SSP)', dosage: '२ पोती (100 Kg)', unit: 'प्रति एकर' },
      { name: 'Muriate of Potash (MOP / पोटॅश)', dosage: '१.५ पोते (75 Kg)', unit: 'प्रति एकर' },
      { name: 'Ferrous + Zinc Sulphate (लोह आणि जस्त)', dosage: '५ + ५ किलो', unit: 'प्रति एकर' }
    ],
    applicationMethod: 'बैलाच्या किंवा अवजाराच्या सहाय्याने मोठी भरणी (माती चढवणे) करून देणे (Heavy dose applied during deep earthing up)',
    purpose: 'उसाचे वजन वाढवण्यासाठी, खोड मजबूत करण्यासाठी आणि पाऊस-वाऱ्यामुळे ऊस लोळू नये म्हणून टेकू देण्यासाठी.'
  },
  {
    id: 'f5',
    daysRange: '130 - 150 Days (कांडी वाढीची अवस्था)',
    stage: 'Cane Elongation Stage (कांडी सुटणे व लांबी वाढणे)',
    fertilizers: [
      { name: 'NPK 12:61:0 (१२:६१:०)', dosage: '५ किलो (ठिबकद्वारे)', unit: 'प्रति एकर' },
      { name: 'Potassium Nitrate (१३:०:४५)', dosage: '५ किलो (ठिबकद्वारे)', unit: 'प्रति एकर' }
    ],
    applicationMethod: 'फक्त ठिबक सिंचनाव्दारे किंवा पानांवरून फवारणी (Through drip irrigation or foliar spray)',
    purpose: 'कांडीची लांबी झपाट्याने वाढवणे, उसाची साल जाड व चमकदार करणे.'
  },
  {
    id: 'f6',
    daysRange: '180 - 240 Days (पक्वता पूर्व)',
    stage: 'Pre-Maturity Sugar Synthesis (साखर भरण्याची प्रक्रिया)',
    fertilizers: [
      { name: 'Sulfate of Potash (SOP / ००:००:५०)', dosage: '८ ते १० किलो (हप्त्या हप्त्याने)', unit: 'प्रति एकर ठिबकद्वारे' }
    ],
    applicationMethod: 'ठिबकद्वारे सिंचनासोबत देणे (Drip fertigation)',
    purpose: 'कांड्यांमध्ये साखर आणि रसाचे प्रमाण वेगाने वाढवणे, उसाची गोडवा व पर्यायाने एकूण वजन वाढवणे.'
  }
];

export const GROWING_STAGES: GrowingStage[] = [
  {
    id: 'stage-1',
    stageName: '1. Sprouting & Rooting',
    marathiStageName: '१. उगवण व प्राथमिक मूळ फुटणे अवस्था',
    duration: '0 - 35 Days',
    description: 'This is when the sugarcane bud sprouts, and the primary shoot rises. The root system also begins to establish from the base of the node.',
    marathiDescription: 'या अवस्थेत ट्रे मधील उसाचे डोळे उगवून वर येतात. रोप जमिनीत लावल्यानंतर मुळे सभोवताली पसरण्यास सुरुवात करतात व रोप जमिनीत स्थिर होते.',
    keyPractices: [
      'सरीमध्ये पुरेशी ओल असावी (Ensure proper moisture in the soil)',
      'खतांचा पायाभूत डोस द्यावा (Apply Basal fertilizer dose near roots)',
      'खराब किंवा न उगवलेली रोपे बदलून नांग्या भराव्यात (Fill gaps using extra seedlings immediately)'
    ]
  },
  {
    id: 'stage-2',
    stageName: '2. Tillering Phase',
    marathiStageName: '२. फुटवे येण्याची अवस्था',
    duration: '36 - 100 Days',
    description: 'The plant produces multiple underground branches called tillers. This stage is extremely critical because the number of tillers directly determines the final cane count per acre.',
    marathiDescription: 'या अवस्थेत मुख्य उसाच्या बाजूने जमिनीत नवीन फुटवे फुटतात. फुटव्यांचे प्रमाण जितके चांगले, तितके प्रति एकर उसाचे एकूण वजन आणि कांड्यांची संख्या वाढते.',
    keyPractices: [
      'नियमित हलके पाणी व आंतरमशागत करावी (Regular light watering and weed removal)',
      'नत्र व सल्फर खतांचा डोस वेळेत द्यावा (Timely Nitrogen and Sulphur side dressing)',
      'कोंब पोखरणाऱ्या अळीवर लक्ष ठेवून फवारणी करावी (Control early shoot borer pest)'
    ]
  },
  {
    id: 'stage-3',
    stageName: '3. Grand Growth & Cane Elongation',
    marathiStageName: '३. जोमदार वाढ आणि कांडी सुटण्याची अवस्था',
    duration: '101 - 270 Days',
    description: 'The sugarcane enters rapid vegetative elongation. Nodes and internodes start forming rapidly. Leaf canopy expands fully to maximize sunlight absorption.',
    marathiDescription: 'या अवस्थेत ऊस वेगाने उंच वाढू लागतो. कांड्यांची रचना तयार होऊन त्यांची लांबी वाढते. पानांचा घेर पूर्ण वाढतो आणि उसाची जाडी वाढू लागते.',
    keyPractices: [
      'मोठी भरणी (माती चढवणे) अत्यंत आवश्यक आहे (Compulsory earthing up to prevent cane bending)',
      'पाण्याचा नियमित व योग्य पुरवठा करणे, ठिबक सिंचन उत्तम (Maintain consistent water supply, drip is best)',
      'पोटॅश आणि सूक्ष्मद्रव्यांचा डोस मातीत मिसळावा (Incorporate Potash and Micronutrients into the soil ridges)'
    ]
  },
  {
    id: 'stage-4',
    stageName: '4. Maturity & Sugar Accumulation',
    marathiStageName: '४. पक्वता आणि साखर जमा होणे अवस्था',
    duration: '271 - 360+ Days',
    description: 'Vegetative growth slows down, and the plant starts converting starches into sucrose, storing it in the cane stalks. Water content in canes reduces, and sweetness increases.',
    marathiDescription: 'या काळात उसाची लांबीची वाढ मंदावते आणि कांड्यांमध्ये साखर भरण्याचे काम वेगाने होते. रसाचा गोडवा वाढतो आणि ऊस काढणीसाठी सज्ज होतो.',
    keyPractices: [
      'काढणीपूर्वी २०-२५ दिवस पाणी हळूहळू कमी करावे व शेवटी बंद करावे (Reduce water gradually 20-25 days prior to harvest to increase sugar concentration)',
      'खोडकिडा व पांढरी माशी नियंत्रण करावे (Check for late-stage pests)',
      'योग्य त्या वजनासह वेळेत साखर कारखान्याकडे ऊस पाठवणे नियोजन करावे (Plan timely harvesting and transport with sugarcane factory)'
    ]
  }
];

export const GENERAL_GUIDELINES_MARATHI = {
  soil: {
    title: 'जमीन व हवामान (Soil & Climate)',
    desc: 'उसासाठी मध्यम ते भारी, पाण्याचा उत्तम निचरा होणारी जमीन अत्यंत योग्य असते. जमिनीचा सामू (pH) ६.५ ते ७.५ दरम्यान असावा. कडक सूर्यप्रकाश आणि उबदार हवामान उसाच्या जोमदार वाढीसाठी आवश्यक आहे.'
  },
  watering: {
    title: 'पाणी व्यवस्थापन (Irrigation Management)',
    desc: 'ऊस हे जास्त पाणी पिणारे पीक आहे, परंतु अतिपाणी दिल्यास जमिनीत हवा खेळती राहत नाही व मुळे कुजतात. यासाठी ठिबक सिंचनाचा (Drip Irrigation) वापर करावा. उन्हाळ्यात ६ ते ८ दिवसांनी आणि हिवाळ्यात १० ते १२ दिवसांनी जमिनीच्या प्रकारानुसार पाणी द्यावे.'
  },
  pest: {
    title: 'कीड व रोग नियंत्रण (Pest & Disease Control)',
    desc: 'सुरुवातीच्या काळात खोडकीड (Early Shoot Borer) आणि नंतरच्या काळात हुमणी अळी (White Grub), पांढरी माशी (Whitefly) आणि तांबेरा (Rust) रोग येऊ शकतात. वेळेवर जैविक बुरशीनाशक (उदा. मेटारायझियम) व शिफारसीत कीटकनाशकांची फवारणी करावी.'
  }
};
