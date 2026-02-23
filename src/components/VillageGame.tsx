import React, { useState, useEffect } from 'react';
import { House as HouseComponent } from './House';
import { DonationModal } from './DonationModal';
import { House, VillageState } from '../types/village';
import backgroundImage from '../assets/background.png';

const initialHouses: House[] = [
  // More spread out natural positions
  { id: 1, x: 10, y: 0, type: 'house-1', donated: false },
  { id: 2, x: 40, y: 10, type: 'house-2', donated: false },
  { id: 3, x: 60, y: 10, type: 'house-3', donated: false },
  { id: 4, x: 72, y: 32, type: 'house-4', donated: false },
  { id: 5, x: 80, y: 24, type: 'house-1', donated: false },
  
  // Left side - more spread
  { id: 6, x: 3, y: 17, type: 'house-2', donated: false },
  { id: 7, x: 20, y: 12, type: 'house-3', donated: false },
  { id: 8, x: 12, y: 31, type: 'house-4', donated: false },
  { id: 9, x: 32, y: 61, type: 'house-1', donated: false },
  { id: 10, x: 5, y: 75, type: 'house-2', donated: false },
  
  // Right side - more spread  
  { id: 11, x: 79, y: 0, type: 'house-3', donated: false },
  { id: 12, x: 88, y: 15, type: 'house-4', donated: false },
  { id: 13, x: 69, y: 0, type: 'house-1', donated: false },
  { id: 14, x: 92, y: 60, type: 'house-2', donated: false },
  { id: 15, x: 85, y: 75, type: 'house-3', donated: false },
  
  // Bottom spread
  { id: 16, x: 18, y: 80, type: 'house-4', donated: false },
  { id: 17, x: 40, y: 88, type: 'house-1', donated: false },
  { id: 18, x: 59, y: 80, type: 'house-2', donated: false },
  { id: 19, x: 72, y: 80, type: 'house-3', donated: false },
  { id: 20, x: 48, y: 75, type: 'house-4', donated: false },
];

export const VillageGame: React.FC = () => {
  const [villageState, setVillageState] = useState<VillageState>({
    houses: initialHouses,
    selectedHouse: null,
    showDonationModal: false,
    totalDonated: 0,
  });

  const handleHouseClick = (house: House) => {
    if (house.donated) return;
    
    setVillageState(prev => ({
      ...prev,
      selectedHouse: house,
      showDonationModal: true,
    }));
  };

  const handleDonationSuccess = (donorName: string, amount: number) => {
    if (!villageState.selectedHouse) return;

    setVillageState(prev => ({
      ...prev,
      houses: prev.houses.map(house => 
        house.id === prev.selectedHouse?.id 
          ? { ...house, donated: true, donorName }
          : house
      ),
      selectedHouse: null,
      showDonationModal: false,
      totalDonated: prev.totalDonated + amount,
    }));
  };

  const handleCloseModal = () => {
    setVillageState(prev => ({
      ...prev,
      selectedHouse: null,
      showDonationModal: false,
    }));
  };

  const donatedHouses = villageState.houses.filter(h => h.donated).length;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Header */}
      <div className="relative z-10 text-center py-2 px-4">
        <div className="bg-gradient-to-b from-amber-700 to-amber-900 rounded-xl px-4 py-2 inline-block shadow-lg border-2 border-amber-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-800/50 to-amber-600/50 rounded-xl"></div>
          <div className="relative z-10">
            <h1 className="text-xl md:text-2xl font-bold text-white mb-1 drop-shadow-lg tracking-wide">
              ILM
            </h1>
            <h2 className="text-base md:text-lg font-bold text-amber-100 drop-shadow-md">
              WATER FOR LIFE
            </h2>
            <p className="text-xs text-amber-200 drop-shadow-sm">
              Help bring clean water to families in need
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 text-center py-2">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl px-5 py-2 inline-block shadow-lg">
          <p className="text-base font-bold text-primary">
            {donatedHouses} of 20 families helped • £{villageState.totalDonated} raised
          </p>
        </div>
      </div>

      {/* Village Scene */}
      <div className="relative z-10 w-full h-[80vh] max-w-[1700px] mx-auto">
        {/* Houses */}
        {villageState.houses.map((house) => (
          <HouseComponent
            key={house.id}
            house={house}
            onClick={() => handleHouseClick(house)}
          />
        ))}
      </div>

      {/* Donation Modal */}
      {villageState.showDonationModal && villageState.selectedHouse && (
        <DonationModal
          house={villageState.selectedHouse}
          onSuccess={handleDonationSuccess}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};