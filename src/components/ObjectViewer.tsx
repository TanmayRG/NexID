import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { RotateCcw, X, Sparkles } from 'lucide-react';
import { ObjectData } from '../utils/objectData';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ObjectViewerProps {
  object: ObjectData;
  onClose: () => void;
}

interface ModelConfig {
  cameraOrbit?: string;
  cameraTarget?: string;
  fieldOfView?: string;
  exposure?: string;
  shadowIntensity?: string;
  autoRotate?: boolean;
  rotationPerSecond?: string;
  environmentImage?: string;
}

export function ObjectViewer({ object, onClose }: ObjectViewerProps) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [modelConfig, setModelConfig] = useState<ModelConfig>({
    cameraOrbit: "0deg 75deg 105%",
    cameraTarget: "0m 0m 0m",
    fieldOfView: "30deg",
    exposure: "1",
    shadowIntensity: "1",
    autoRotate: true,
    rotationPerSecond: "30deg",
    environmentImage: "neutral"
  });

  useEffect(() => {
    const loadModelConfig = async () => {
      try {
        const docRef = doc(db, 'modelConfigs', object.id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const config = docSnap.data() as ModelConfig;
          setModelConfig(config);
          setAutoRotate(config.autoRotate ?? true);
        }
      } catch (error) {
        console.error('Error loading model config:', error);
      }
    };

    loadModelConfig();
  }, [object.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xl">
      <div className="relative h-[90vh] w-[90vw] md:h-[90vh] md:w-[90vw] rounded-2xl bg-white/5 backdrop-blur-lg overflow-hidden">
        {/* Header with buttons */}
        <div className="absolute right-2 top-2 md:right-4 md:top-4 z-10 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setAutoRotate(!autoRotate)}
            className="rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <RotateCcw className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>

        {/* Main content layout */}
        <div className="flex h-full flex-col lg:flex-row">
          {/* 3D Model viewer */}
          <div className="flex-1 h-[60vh] lg:h-full">
            <model-viewer
              src={object.modelPath}
              camera-orbit={modelConfig.cameraOrbit}
              camera-target={modelConfig.cameraTarget}
              field-of-view={modelConfig.fieldOfView}
              exposure={modelConfig.exposure}
              shadow-intensity={modelConfig.shadowIntensity}
              auto-rotate={autoRotate}
              rotation-per-second={modelConfig.rotationPerSecond}
              environment-image={modelConfig.environmentImage}
              camera-controls
              auto-rotate-delay={0}
              interaction-prompt="none"
              touch-action="pan-y"
              interaction-prompt-style="basic"
              interaction-policy="always-allow"
              min-camera-orbit="auto auto 5%"
              max-camera-orbit="auto auto 2000%"
              min-field-of-view="10deg"
              max-field-of-view="90deg"
              orbit-sensitivity={1}
              interpolation-decay={200}
              style={{ width: '100%', height: '100%' }}
            ></model-viewer>
          </div>

          {/* Info panel */}
          <div className="w-full lg:w-1/3 h-[30vh] lg:h-full bg-black/40 p-4 md:p-6 flex flex-col justify-between backdrop-blur-md overflow-y-auto">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2 font-['Bebas_Neue']">
                <Sparkles className="h-5 w-5 md:h-6 md:w-6" />
                {object.name}
              </h2>
              <p className="text-sm md:text-base text-gray-200 mb-4 md:mb-6 font-['Bebas_Neue'] tracking-wide">{object.description}</p>
              
              <div className="space-y-3 md:space-y-4">
                {Object.entries(object.details).map(([key, value]) => (
                  <div key={key} className="border-b border-white/10 pb-2">
                    <div className="text-xs md:text-sm text-gray-400 font-['Bebas_Neue'] tracking-wide">{key}</div>
                    <div className="text-sm md:text-base text-white font-['Bebas_Neue'] tracking-wide">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-2 md:pt-4 text-xs md:text-sm text-gray-400 font-['Bebas_Neue'] tracking-wide">
              Confidence: {Math.round(object.confidence * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ObjectViewer;