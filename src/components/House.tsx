import React from 'react';
import { House as HouseType } from '../types/village';
import house1Image from '../assets/house-1.png';
import house2Image from '../assets/house-2.png';
import house3Image from '../assets/house-3.png';
import house4Image from '../assets/house-4.png';
import donorSignImage from '../assets/donor-name-sign.png';

interface HouseProps {
  house: HouseType;
  onClick: () => void;
}

const houseImages = {
  'house-1': house1Image,
  'house-2': house2Image,
  'house-3': house3Image,
  'house-4': house4Image,
};

export const House: React.FC<HouseProps> = ({ house, onClick }) => {
  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
        house.donated 
          ? 'house-donated' 
          : 'house-interactive'
      }`}
      style={{ 
        left: `${house.x}%`, 
        top: `${house.y}%`,
      }}
      onClick={onClick}
    >
      {/* House Image */}
      <img 
        src={houseImages[house.type]} 
        alt={`House ${house.id}`}
        className="w-24 h-24 transition-all duration-300 hover:scale-110 drop-shadow-lg"
      />
      
      {/* Donor Sign */}
      {house.donated && house.donorName && (
        <div className="absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3">
          <div className="relative">
            <img 
              src={donorSignImage} 
              alt="Donor Sign"
              className="w-8 h-6 md:w-10 md:h-8"
            />
            <div 
              className="absolute inset-0 flex items-center justify-center text-[6px] md:text-[8px] font-bold text-primary"
              style={{ 
                fontSize: 'clamp(4px, 1.5vw, 8px)',
                lineHeight: '1.2',
                padding: '1px'
              }}
            >
              <span className="text-center break-words max-w-full">
                {house.donorName.length > 12 
                  ? house.donorName.substring(0, 12) + '...' 
                  : house.donorName
                }
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};