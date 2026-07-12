/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeView, ServicesView, ContactView } from './components/MainViews';
import { BookingForm } from './components/BookingForm';
import { AdminPanel } from './components/AdminPanel';
import { SugarcaneGuide } from './components/SugarcaneGuide';
import { Footer } from './components/Footer';
import { Booking, CropType, BookingStatus } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [preselectedCropType, setPreselectedCropType] = useState<CropType>('sugarcane');
  const [preselectedVarietyId, setPreselectedVarietyId] = useState<string>('');
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load bookings from LocalStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('jagadamba_bookings');
    if (stored) {
      try {
        setBookings(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing stored bookings:', e);
      }
    }
  }, []);

  // Save bookings to LocalStorage when changed
  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('jagadamba_bookings', JSON.stringify(newBookings));
  };

  // Handler: New booking placed
  const handleBookingAdded = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    saveBookings(updated);
  };

  // Handler: Admin updates booking status
  const handleStatusChange = (id: string, newStatus: BookingStatus) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
    saveBookings(updated);
  };

  // Handler: Admin deletes a booking
  const handleDeleteBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    saveBookings(updated);
  };

  // Handler: Reset/clear bookings
  const handleResetBookings = () => {
    saveBookings([]);
  };

  // Handler: Prepopulate realistic Marathi farmer demo bookings
  const handleLoadDemoBookings = () => {
    const today = new Date();
    const addDays = (days: number) => {
      const d = new Date(today);
      d.setDate(today.getDate() + days);
      return d.toISOString().split('T')[0];
    };

    const demo: Booking[] = [
      {
        id: 'JHN-860321',
        farmerName: 'बाळकृष्ण संभाजी पाटील',
        contactNumber: '9822314561',
        village: 'बेडकिहाळ, ता. निपाणी',
        cropType: 'sugarcane',
        sugarcaneVariety: 'को. ८६०३२ (नीरा)',
        quantity: 40,
        totalSeedlings: 4000,
        plantationDate: addDays(15),
        transportRequired: true,
        status: 'confirmed',
        bookingDate: addDays(-3),
        notes: 'रोपे सकाळी लवकर ६ वाजता शेतात मिळावीत.'
      },
      {
        id: 'JHN-026522',
        farmerName: 'सुधीर तानाजी देसाई',
        contactNumber: '9423187224',
        village: 'अक्कोल, ता. निपाणी',
        cropType: 'sugarcane',
        sugarcaneVariety: 'को.एम. ०२६५ (फुले २६५)',
        quantity: 65,
        totalSeedlings: 6500,
        plantationDate: addDays(8),
        transportRequired: false,
        status: 'pending',
        bookingDate: addDays(-1),
        notes: 'स्वतः ट्रॅक्टर घेऊन रोप उचलणार आहे.'
      },
      {
        id: 'JHN-990134',
        farmerName: 'अण्णासाहेब बाबूराव मोहिते',
        contactNumber: '7765123488',
        village: 'कोगनोळी, ता. निपाणी',
        cropType: 'vegetable',
        vegetableVariety: 'मिरची रोपे',
        quantity: 15,
        totalSeedlings: 1560,
        plantationDate: addDays(5),
        transportRequired: true,
        status: 'ready_for_delivery',
        bookingDate: addDays(-4),
        notes: 'तेजस्विनी वाणाची उत्कृष्ट रोपे असावीत.'
      },
      {
        id: 'JHN-100015',
        farmerName: 'महादेव रामचंद्र खोत',
        contactNumber: '8805643211',
        village: 'हुपरी, ता. हातकणंगले',
        cropType: 'sugarcane',
        sugarcaneVariety: 'को. १०००१ (लवकर येणारी)',
        quantity: 30,
        totalSeedlings: 3000,
        plantationDate: addDays(22),
        transportRequired: true,
        status: 'pending',
        bookingDate: today.toISOString().split('T')[0]
      },
      {
        id: 'JHN-505088',
        farmerName: 'पांडुरंग विष्णू सावंत',
        contactNumber: '9158671234',
        village: 'ममदापूर, ता. चिकोडी',
        cropType: 'vegetable',
        vegetableVariety: 'टरबूज / कलिंगड रोपे',
        quantity: 25,
        totalSeedlings: 1250,
        plantationDate: addDays(-2),
        transportRequired: true,
        status: 'delivered',
        bookingDate: addDays(-10),
        notes: 'डिलिव्हरी यशस्वी झाली, रोपे उत्कृष्ट दर्जाची होती.'
      }
    ];

    saveBookings(demo);
  };

  // Navigates to booking tab with prepopulated selections
  const handleCatalogBookingRedirect = (cropType?: 'sugarcane' | 'vegetable', varietyId?: string) => {
    if (cropType) {
      setPreselectedCropType(cropType);
    }
    if (varietyId) {
      setPreselectedVarietyId(varietyId);
    }
    setActiveTab('booking');
    // Scroll to top of the screen smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Universal Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Responsive Body Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {activeTab === 'home' && (
          <HomeView onNavigateToBooking={handleCatalogBookingRedirect} />
        )}

        {activeTab === 'booking' && (
          <BookingForm
            onBookingAdded={handleBookingAdded}
            initialCropType={preselectedCropType}
            initialVarietyId={preselectedVarietyId}
          />
        )}

        {activeTab === 'guide' && (
          <SugarcaneGuide />
        )}

        {activeTab === 'services' && (
          <ServicesView />
        )}

        {activeTab === 'contact' && (
          <ContactView />
        )}

        {activeTab === 'admin' && (
          <AdminPanel
            bookings={bookings}
            onStatusChange={handleStatusChange}
            onDeleteBooking={handleDeleteBooking}
            onResetBookings={handleResetBookings}
            onLoadDemoBookings={handleLoadDemoBookings}
          />
        )}

      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
