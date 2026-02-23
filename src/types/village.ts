export interface House {
  id: number;
  x: number;
  y: number;
  type: 'house-1' | 'house-2' | 'house-3' | 'house-4';
  donated: boolean;
  donorName?: string;
}

export interface DonationType {
  id: 'water-pump' | 'monthly';
  title: string;
  price: number;
  description: string;
  buttonText: string;
  isSubscription: boolean;
}

export interface VillageState {
  houses: House[];
  selectedHouse: House | null;
  showDonationModal: boolean;
  totalDonated: number;
}