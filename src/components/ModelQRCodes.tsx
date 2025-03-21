import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface ModelQRCodesProps {
  onClose: () => void;
}

const ModelQRCodes: React.FC<ModelQRCodesProps> = ({ onClose }) => {
  const models = [
    // Car Models
    { value: 'PORSCHE-911-CARRERA', label: 'Porsche 911 Carrera', category: 'Cars' },
    { value: 'PORSCHE-911-TURBO', label: 'Porsche 911 Turbo', category: 'Cars' },
    { value: 'ERTIGA', label: 'Suzuki Ertiga', category: 'Cars' },
    { value: 'SWIFT', label: 'Suzuki Swift', category: 'Cars' },
    { value: 'CRETA', label: 'Hyundai Creta', category: 'Cars' },
    // Electronics
    { value: 'iphone', label: 'iPhone', category: 'Electronics' },
    { value: 'laptop', label: 'Laptop', category: 'Electronics' },
    // Medical & Scientific
    { value: 'humanskull', label: 'Human Skull', category: 'Medical' },
    { value: 'animalskull', label: 'Animal Skull', category: 'Medical' },
    { value: 'prosthetichand', label: 'Prosthetic Hand', category: 'Medical' },
    { value: 'dna', label: 'DNA Structure', category: 'Scientific' },
    { value: 'atoms', label: 'Atomic Structure', category: 'Scientific' },
    // Engineering
    { value: 'engineblock', label: 'Engine Block', category: 'Engineering' },
    { value: 'uav', label: 'UAV Drone', category: 'Engineering' },
    { value: 'uav2', label: 'Advanced UAV', category: 'Engineering' },
    // Historical & Art
    { value: 'fossil', label: 'Fossil Specimen', category: 'Historical' },
    { value: 'sclupture', label: 'Modern Sculpture', category: 'Art' },
    { value: 'egyptscluptures', label: 'Egyptian Sculptures', category: 'Historical' },
    { value: 'greek', label: 'Greek Artifact', category: 'Historical' },
    { value: 'ancientcity', label: 'Ancient City', category: 'Historical' },
    { value: 'aquincum_city__budapest', label: 'Aquincum City', category: 'Historical' },
    // Furniture
    { value: 'sofa', label: 'Modern Sofa', category: 'Furniture' }
  ];

  // Group models by category
  const groupedModels = models.reduce((acc, model) => {
    if (!acc[model.category]) {
      acc[model.category] = [];
    }
    acc[model.category].push(model);
    return acc;
  }, {} as Record<string, typeof models>);

  // Sort categories
  const sortedCategories = Object.keys(groupedModels).sort();

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">Model QR Codes</h2>
        <button
          onClick={onClose}
          className="rounded-lg bg-white/10 px-4 py-2 text-white hover:bg-white/20"
        >
          Close
        </button>
      </div>

      {/* QR Codes Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {sortedCategories.map((category) => (
          <div key={category} className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-white">{category}</h3>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {groupedModels[category].map((model) => (
                <div key={model.value} className="flex flex-col items-center space-y-2">
                  <div className="rounded-lg bg-white p-4">
                    <QRCodeSVG
                      value={`model:${model.value}`}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <span className="text-center text-sm font-medium text-white">{model.label}</span>
                  <span className="text-center text-xs text-white/50">Scan to view model</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelQRCodes; 