import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ObjectData, objectDatabase } from '../utils/objectData';
import { Button } from './ui/button';
import { toast } from 'sonner';
import ModelQRCodes from './ModelQRCodes';

// Define the configuration interface
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

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedModel, setSelectedModel] = useState<string>('iphone');
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
  const [isLoading, setIsLoading] = useState(false);
  const [showQRCodes, setShowQRCodes] = useState(false);

  // Updated model options with categories
  const modelOptions = [
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
  const groupedModels = modelOptions.reduce((acc, model) => {
    if (!acc[model.category]) {
      acc[model.category] = [];
    }
    acc[model.category].push(model);
    return acc;
  }, {} as Record<string, typeof modelOptions>);

  // Sort categories
  const sortedCategories = Object.keys(groupedModels).sort();

  useEffect(() => {
    // Load the Google Model Viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const loadModelConfig = async () => {
      if (!selectedModel) return;

      setIsLoading(true);
      try {
        const docRef = doc(db, 'modelConfigs', selectedModel);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setModelConfig(docSnap.data() as ModelConfig);
        } else {
          setModelConfig({
            cameraOrbit: "0deg 75deg 105%",
            cameraTarget: "0m 0m 0m",
            fieldOfView: "30deg",
            exposure: "1",
            shadowIntensity: "1",
            autoRotate: true,
            rotationPerSecond: "30deg",
            environmentImage: "neutral"
          });
        }
      } catch (error) {
        console.error('Error loading model config:', error);
        toast.error('Failed to load model configuration');
      } finally {
        setIsLoading(false);
      }
    };

    loadModelConfig();
  }, [selectedModel]);

  const handleLogin = () => {
    if (password === 'pratik@1445') {
      setIsAuthenticated(true);
      toast.success('Admin access granted');
    } else {
      toast.error('Invalid password');
    }
  };

  const handleSaveConfig = async () => {
    if (!selectedModel) return;

    setIsLoading(true);
    try {
      await setDoc(doc(db, 'modelConfigs', selectedModel), modelConfig);
      toast.success('Model configuration saved successfully');
    } catch (error) {
      console.error('Error saving config:', error);
      toast.error('Failed to save configuration');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl">
        <div className="w-96 rounded-xl bg-white/5 p-6 backdrop-blur-lg">
          <h2 className="mb-4 text-xl font-bold text-white">Admin Access</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="mb-4 w-full rounded-lg bg-white/10 px-4 py-2 text-white placeholder-white/50 backdrop-blur-lg"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleLogin}>Login</Button>
          </div>
        </div>
      </div>
    );
  }

  if (showQRCodes) {
    return <ModelQRCodes onClose={() => setShowQRCodes(false)} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowQRCodes(true)}
            className="text-white/70 hover:text-white"
          >
            Show QR Codes
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-white/70 hover:text-white"
          >
            Close
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 overflow-y-auto border-r border-white/10 bg-black/30">
          <div className="p-4">
            <h3 className="mb-4 text-lg font-bold text-white">Select Model</h3>
            {sortedCategories.map((category) => (
              <div key={category} className="mb-4">
                <h4 className="mb-2 text-sm font-semibold text-white/70">{category}</h4>
                <div className="space-y-1">
                  {groupedModels[category].map((model) => (
                    <div
                      key={model.value}
                      className={`cursor-pointer rounded-lg p-2 transition-colors ${
                        selectedModel === model.value
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-white/70 hover:bg-white/10'
                      }`}
                      onClick={() => setSelectedModel(model.value)}
                    >
                      {model.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Preview and Controls */}
        {selectedModel && (
          <div className="flex flex-1">
            {/* 3D Viewer */}
            <div className="flex-1 bg-black/30">
              <model-viewer
                src={`/models/${
                  selectedModel === 'iphone' ? 'iphone/iphone_5s.glb' : 
                  selectedModel === 'laptop' ? 'laptop/lowpoly_laptop_closed.glb' : 
                  selectedModel === 'ancientcity' ? 'ancientcity/ancientcity.glb' :
                  selectedModel.startsWith('PORSCHE-') || selectedModel === 'ERTIGA' || selectedModel === 'SWIFT' || selectedModel === 'CRETA' ? `cars/${selectedModel}.glb` :
                  `${selectedModel}.glb`
                }`}
                camera-orbit={modelConfig.cameraOrbit}
                camera-target={modelConfig.cameraTarget}
                field-of-view={modelConfig.fieldOfView}
                exposure={modelConfig.exposure}
                shadow-intensity={modelConfig.shadowIntensity}
                auto-rotate={modelConfig.autoRotate}
                rotation-per-second={modelConfig.rotationPerSecond}
                environment-image={modelConfig.environmentImage}
                camera-controls
                auto-rotate-delay={0}
                interaction-prompt="none"
                touch-action="pan-y"
                interaction-prompt-style="basic"
                interaction-policy="always-allow"
                min-camera-orbit="auto auto 5%"
                max-camera-orbit="auto auto 200%"
                min-field-of-view="10deg"
                max-field-of-view="90deg"
                orbit-sensitivity={1}
                style={{ width: '100%', height: '100%' }}
              ></model-viewer>
            </div>

            {/* Controls Panel */}
            <div className="w-80 overflow-y-auto border-l border-white/10 bg-black/50">
              <div className="p-4 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Configuration</h3>
                  <Button 
                    onClick={handleSaveConfig} 
                    className="bg-scanner-primary hover:bg-scanner-primary/80"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>

                {/* Camera Orbit Control */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Camera Orbit</label>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      value={parseFloat(modelConfig.cameraOrbit?.split(' ')[0] || '0')}
                      onChange={(e) => {
                        const parts = modelConfig.cameraOrbit?.split(' ') || ['0deg', '75deg', '105%'];
                        parts[0] = `${e.target.value}deg`;
                        setModelConfig({ ...modelConfig, cameraOrbit: parts.join(' ') });
                      }}
                      className="w-full rounded bg-white/10 px-3 py-1 text-white"
                      placeholder="Theta (deg)"
                      disabled={isLoading}
                    />
                    <input
                      type="number"
                      value={parseFloat(modelConfig.cameraOrbit?.split(' ')[1] || '75')}
                      onChange={(e) => {
                        const parts = modelConfig.cameraOrbit?.split(' ') || ['0deg', '75deg', '105%'];
                        parts[1] = `${e.target.value}deg`;
                        setModelConfig({ ...modelConfig, cameraOrbit: parts.join(' ') });
                      }}
                      className="w-full rounded bg-white/10 px-3 py-1 text-white"
                      placeholder="Phi (deg)"
                      disabled={isLoading}
                    />
                    <input
                      type="number"
                      value={parseFloat(modelConfig.cameraOrbit?.split(' ')[2] || '105')}
                      onChange={(e) => {
                        const parts = modelConfig.cameraOrbit?.split(' ') || ['0deg', '75deg', '105%'];
                        parts[2] = `${e.target.value}%`;
                        setModelConfig({ ...modelConfig, cameraOrbit: parts.join(' ') });
                      }}
                      className="w-full rounded bg-white/10 px-3 py-1 text-white"
                      placeholder="Radius (%)"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Camera Target Control */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Camera Target</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['X', 'Y', 'Z'].map((axis, i) => (
                      <input
                        key={axis}
                        type="number"
                        value={parseFloat(modelConfig.cameraTarget?.split(' ')[i] || '0')}
                        onChange={(e) => {
                          const parts = modelConfig.cameraTarget?.split(' ') || ['0m', '0m', '0m'];
                          parts[i] = `${e.target.value}m`;
                          setModelConfig({ ...modelConfig, cameraTarget: parts.join(' ') });
                        }}
                        className="w-full rounded bg-white/10 px-3 py-1 text-white"
                        placeholder={`${axis} (m)`}
                        disabled={isLoading}
                      />
                    ))}
                  </div>
                </div>

                {/* Field of View Control */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Field of View</label>
                  <input
                    type="range"
                    value={parseFloat(modelConfig.fieldOfView?.replace('deg', '') || '30')}
                    onChange={(e) => setModelConfig({ ...modelConfig, fieldOfView: `${e.target.value}deg` })}
                    className="w-full"
                    min="10"
                    max="90"
                    step="1"
                    disabled={isLoading}
                  />
                  <div className="text-sm text-white/50 text-right">{modelConfig.fieldOfView}</div>
                </div>

                {/* Exposure Control */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Exposure</label>
                  <input
                    type="range"
                    value={parseFloat(modelConfig.exposure || "1")}
                    onChange={(e) => setModelConfig({ ...modelConfig, exposure: e.target.value })}
                    className="w-full"
                    min="0"
                    max="2"
                    step="0.1"
                    disabled={isLoading}
                  />
                  <div className="text-sm text-white/50 text-right">{modelConfig.exposure}</div>
                </div>

                {/* Shadow Intensity Control */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Shadow Intensity</label>
                  <input
                    type="range"
                    value={parseFloat(modelConfig.shadowIntensity || "1")}
                    onChange={(e) => setModelConfig({ ...modelConfig, shadowIntensity: e.target.value })}
                    className="w-full"
                    min="0"
                    max="1"
                    step="0.1"
                    disabled={isLoading}
                  />
                  <div className="text-sm text-white/50 text-right">{modelConfig.shadowIntensity}</div>
                </div>

                {/* Rotation Speed Control */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Rotation Speed</label>
                  <input
                    type="range"
                    value={parseFloat(modelConfig.rotationPerSecond?.replace('deg', '') || '30')}
                    onChange={(e) => setModelConfig({ ...modelConfig, rotationPerSecond: `${e.target.value}deg` })}
                    className="w-full"
                    min="0"
                    max="90"
                    step="1"
                    disabled={isLoading || !modelConfig.autoRotate}
                  />
                  <div className="text-sm text-white/50 text-right">{modelConfig.rotationPerSecond}/s</div>
                </div>

                {/* Environment Image Control */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Environment</label>
                  <select
                    value={modelConfig.environmentImage}
                    onChange={(e) => setModelConfig({ ...modelConfig, environmentImage: e.target.value })}
                    className="w-full rounded bg-white/10 px-3 py-1 text-white"
                    disabled={isLoading}
                  >
                    <option value="neutral">Neutral</option>
                    <option value="legacy">Legacy</option>
                    <option value="sunset">Sunset</option>
                    <option value="dawn">Dawn</option>
                    <option value="night">Night</option>
                  </select>
                </div>

                {/* Auto-Rotate Toggle */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={modelConfig.autoRotate}
                    onChange={(e) => setModelConfig({ ...modelConfig, autoRotate: e.target.checked })}
                    className="rounded bg-white/10"
                    disabled={isLoading}
                  />
                  <label className="text-sm font-medium text-white/70">Auto-Rotate</label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;