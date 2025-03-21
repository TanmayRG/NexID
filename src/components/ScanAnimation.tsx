import React, { useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface ScanAnimationProps {
  isScanning: boolean;
  onScanComplete: () => void;
}

const ScanAnimation: React.FC<ScanAnimationProps> = ({ isScanning, onScanComplete }) => {
  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        onScanComplete();
      }, 3000);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isScanning, onScanComplete]);

  if (!isScanning) return null;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center bg-black/20">
      <div className="relative w-[80%] aspect-video flex items-center justify-center">
        <DotLottieReact
          src="https://lottie.host/ef251db9-2022-4237-9ac4-619d2f0b761d/lPtwv1Etcb.lottie"
          loop
          autoplay
          className="w-full h-full scale-150"
        />
      </div>
      
      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 glass px-6 py-2 rounded-full text-sm font-mono">
        <div className="flex items-center gap-3">
          <div className="scanner-dot animate-pulse-highlight"></div>
          <span className="text-scanner-primary">Scanning...</span>
        </div>
      </div>
    </div>
  );
};

export default ScanAnimation;
