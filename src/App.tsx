import React, { useState } from 'react';
import { Header } from './components/Header';
import { SpeedWarningTab } from './components/SpeedWarningTab';
import { StrobeSimulator } from './components/StrobeSimulator';
import { EquipmentAnalysis } from './components/EquipmentAnalysis';
import { VendorDirectory } from './components/VendorDirectory';
import { VideoSection } from './components/VideoSection';
import { HighwayInstallationView } from './components/HighwayInstallationView';
import { Footer } from './components/Footer';

export default function App() {
  // 'flash' is placed first ('맨앞에 플래시 탭') and selected by default
  const [activeTab, setActiveTab] = useState<'flash' | 'its-guide'>('flash');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation & Hero Banner with Tab Switcher */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-grow max-w-5xl mx-auto px-4 py-8 w-full">
        {activeTab === 'flash' ? (
          /* Tab 1 (First Tab): Flash Beacon & Speed Warning Lights Recommended & Purchase List */
          <SpeedWarningTab />
        ) : (
          /* Tab 2: ITS 2-Head Blue/Red Warning Light Guide & Simulator */
          <div className="space-y-10">
            {/* 1. Interactive Real-time 2-Lamp Strobe Simulator */}
            <StrobeSimulator />

            {/* 2. Equipment Shape & Specification Analysis */}
            <EquipmentAnalysis />

            {/* 3. Vendor & Fabrication Directory */}
            <VendorDirectory />

            {/* 4. Live Video Demonstration */}
            <VideoSection />

            {/* 5. Highway & School Zone Real Installation Use Cases */}
            <HighwayInstallationView />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
