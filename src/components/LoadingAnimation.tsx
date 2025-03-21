import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-xl">
      <div className="w-96 h-96">
        <DotLottieReact
          src="https://lottie.host/0acd6174-921d-4009-9c1f-2f5d1344fd7d/ALGMUma1xd.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default LoadingAnimation; 