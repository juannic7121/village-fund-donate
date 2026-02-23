import React, { useState } from 'react';
import { X } from 'lucide-react';
import { House, DonationType } from '../types/village';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

interface DonationModalProps {
  house: House;
  onSuccess: (donorName: string, amount: number) => void;
  onClose: () => void;
}

const donationTypes: DonationType[] = [
  {
    id: 'water-pump',
    title: '£150 WATER PUMP',
    price: 15000, // in pence
    description: 'Fund a complete water pump for this family',
    buttonText: 'DONATE £150',
    isSubscription: false,
  },
  {
    id: 'monthly',
    title: 'MONTHLY DONATION',
    price: 1000, // £10 monthly in pence
    description: 'Support with a monthly contribution',
    buttonText: 'DONATE MONTHLY',
    isSubscription: true,
  },
];

export const DonationModal: React.FC<DonationModalProps> = ({ 
  house, 
  onSuccess, 
  onClose 
}) => {
  const [selectedDonation, setSelectedDonation] = useState<DonationType | null>(null);
  const [donorName, setDonorName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDonationSelect = (donation: DonationType) => {
    setSelectedDonation(donation);
  };

  const handleSubmit = async () => {
    if (!selectedDonation || !donorName.trim()) {
      toast.error('Please enter your name and select a donation option');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate Stripe payment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`Thank you ${donorName}! Your donation is helping provide clean water.`);
      onSuccess(donorName.trim(), selectedDonation.price / 100);
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="modal-overlay" onClick={onClose} />
      
      {/* Modal */}
      <div className="modal-content">
        <div className="bg-card rounded-3xl border-4 border-primary overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                DONATE FOR WATER
              </h2>
              <p className="text-lg text-primary-foreground/90">
                Help House #{house.id} get clean water
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Well Illustration */}
            <div className="text-center">
              <div className="w-24 h-24 mx-auto bg-village-water rounded-full flex items-center justify-center shadow-lg">
                <div className="text-4xl">💧</div>
              </div>
              <h3 className="text-xl font-bold text-primary mt-4 mb-2">
                CHOOSE YOUR IMPACT:
              </h3>
            </div>

            {/* Donation Options */}
            <div className="space-y-4">
              {donationTypes.map((donation) => (
                <button
                  key={donation.id}
                  onClick={() => handleDonationSelect(donation)}
                  className={`w-full p-4 rounded-2xl border-3 font-bold text-lg transition-all ${
                    selectedDonation?.id === donation.id
                      ? 'border-accent bg-accent/20 scale-105'
                      : 'border-primary/30 hover:border-primary/60 hover:bg-primary/5'
                  } ${
                    donation.id === 'water-pump' 
                      ? 'village-button donation' 
                      : 'village-button monthly'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="text-white">{donation.title}</div>
                      <div className="text-sm text-white/80">{donation.description}</div>
                    </div>
                    <div className="text-2xl">
                      {donation.id === 'water-pump' ? '💧' : '💰'}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="donorName" className="text-lg font-bold text-primary">
                Your Name (for the sign):
              </Label>
              <Input
                id="donorName"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Enter your name or family name"
                className="text-lg p-3 rounded-xl border-2 border-primary/30 focus:border-primary"
                maxLength={20}
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!selectedDonation || !donorName.trim() || isProcessing}
              className="w-full py-4 text-xl font-bold rounded-2xl village-button donation"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                selectedDonation?.buttonText || 'SELECT DONATION'
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};