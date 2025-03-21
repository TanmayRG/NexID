import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, ScanSearch, AlertCircle } from 'lucide-react';
import ScanAnimation from './ScanAnimation';
import LoadingAnimation from './LoadingAnimation';
import { toast } from 'sonner';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import jsQR from 'jsqr';

interface ScannerProps {
  onObjectDetected: (objectId: string) => void;
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

const Scanner: React.FC<ScannerProps> = ({ onObjectDetected }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [previewConfig, setPreviewConfig] = useState<ModelConfig>({
    cameraOrbit: "0deg 75deg 105%",
    cameraTarget: "0m 0m 0m",
    fieldOfView: "30deg",
    exposure: "1",
    shadowIntensity: "1",
    autoRotate: true,
    rotationPerSecond: "30deg",
    environmentImage: "neutral"
  });

  // Updated possibleObjects array with all available models including cars
  const possibleObjects = [
    // Cars
    "PORSCHE-911-CARRERA",
    "PORSCHE-911-TURBO",
    "ERTIGA",
    "SWIFT",
    "CRETA",
    // Electronics
    "iphone", 
    "laptop",
    // Medical & Scientific 
    "humanskull",
    "animalskull",
    "prosthetichand",
    "dna",
    "atoms",
    // Engineering
    "engineblock",
    "uav",
    "uav2",
    // Historical & Art
    "fossil",
    "sclupture",
    "egyptscluptures",
    "greek",
    "ancientcity",
    "aquincum_city__budapest",
    // Furniture
    "sofa"
  ];

  // Initialize camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 } 
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setPermissionDenied(false);
        toast.success("Camera activated successfully");
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setPermissionDenied(true);
      toast.error("Camera access denied. Please grant permission.");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  // Function to get model path
  const getModelPath = (modelId: string) => {
    console.log('Getting path for model:', modelId); // Debug log
    
    const modelPaths: { [key: string]: string } = {
      // Cars
      'PORSCHE-911-CARRERA': 'cars/PORSCHE-911-CARRERA.glb',
      'PORSCHE-911-TURBO': 'cars/PORSCHE-911-TURBO.glb',
      'ERTIGA': 'cars/ERTIGA.glb',
      'SWIFT': 'cars/SWIFT.glb',
      'CRETA': 'cars/CRETA.glb',
      // Electronics
      'iphone': 'iphone/iphone_5s.glb',
      'laptop': 'laptop/lowpoly_laptop_closed.glb',
      // Medical & Scientific
      'humanskull': 'humanskull.glb',
      'animalskull': 'animalskull.glb',
      'prosthetichand': 'prosthetichand.glb',
      'dna': 'dna.glb',
      'atoms': 'atoms.glb',
      // Engineering
      'engineblock': 'engineblock.glb',
      'uav': 'uav.glb',
      'uav2': 'uav2.glb',
      // Historical & Art
      'fossil': 'fossil.glb',
      'sclupture': 'sclupture.glb',
      'egyptscluptures': 'egyptscluptures.glb',
      'greek': 'greek.glb',
      'ancientcity': 'ancientcity.glb',
      'aquincum_city__budapest': 'aquincum_city__budapest.glb',
      // Furniture
      'sofa': 'sofa.glb'
    };
    
    const path = modelPaths[modelId];
    if (!path) {
      console.error('No path found for model:', modelId);
      return `${modelId}.glb`; // Fallback
    }
    
    console.log('Using model path:', path);
    return path;
  };

  // Function to process QR code
  const processQRCode = (data: string) => {
    if (data.startsWith('model:')) {
      const modelId = data.substring(6); // Remove 'model:' prefix
      console.log('QR Code detected model:', modelId);
      console.log('Available models:', possibleObjects); // Debug log
      if (possibleObjects.includes(modelId)) {
        console.log('Model found in possible objects, setting selected model to:', modelId);
        setSelectedObjectId(modelId);
        setIsScanning(false);
        setIsLoading(true);
        handleScanComplete(); // Immediately process the scan
        return true;
      } else {
        console.error('Model not found in possible objects:', modelId);
      }
    }
    return false;
  };

  // Function to scan for QR codes
  const scanQRCode = () => {
    if (!canvasRef.current || !videoRef.current) return;

    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    // Set canvas size to match video
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;

    // Draw current video frame on canvas
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

    // Get image data from canvas
    const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Try to decode QR code
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    
    if (code) {
      if (processQRCode(code.data)) {
        // QR code successfully processed
        return;
      }
    }

    // Continue scanning if no valid QR code found
    if (isScanning) {
      requestAnimationFrame(scanQRCode);
    }
  };

  // Update handleScan to use QR code scanning
  const handleScan = () => {
    if (!cameraActive) {
      toast.error("Please activate camera first");
      return;
    }
    
    setIsScanning(true);
    scanQRCode();
  };

  // Handle scan completion - simulate object detection
  const handleScanComplete = async () => {
    setIsScanning(false);
    setIsLoading(true);
    
    // Use the selectedObjectId from QR code instead of random selection
    if (!selectedObjectId) {
      console.log('No selectedObjectId available');
      return;
    }
    
    console.log('Loading config for model:', selectedObjectId);
    
    // Load the configuration before triggering detection
    try {
      const docRef = doc(db, 'modelConfigs', selectedObjectId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log('Found config:', docSnap.data());
        setPreviewConfig(docSnap.data() as ModelConfig);
      } else {
        console.log('No config found for model:', selectedObjectId);
      }
    } catch (error) {
      console.error('Error loading model config:', error);
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    if (selectedObjectId) {
      onObjectDetected(selectedObjectId);
      toast.success(`Object detected: ${selectedObjectId}`);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <motion.div 
      className="relative w-full max-w-3xl mx-auto px-4 md:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="aspect-video relative bg-black rounded-xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)]">
        {/* Camera feed */}
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className={`w-full h-full object-cover ${!cameraActive ? 'hidden' : ''}`}
        />
        
        {/* Canvas for capturing frame */}
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Four corner brackets for futuristic UI */}
        <div className="scanner-bracket scanner-bracket-tl"></div>
        <div className="scanner-bracket scanner-bracket-tr"></div>
        <div className="scanner-bracket scanner-bracket-bl"></div>
        <div className="scanner-bracket scanner-bracket-br"></div>
        
        {/* Placeholder when camera is off */}
        {!cameraActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900/95 to-black">
            {/* Animated background effects */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Enhanced grid effect */}
              <div className="absolute inset-0 bg-scanner-grid bg-[size:24px_24px] opacity-30">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-scanner-primary/5 to-transparent animate-scan-line"></div>
              </div>
              
              {/* Enhanced glowing orbs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-[45rem] h-[45rem] bg-scanner-primary/5 rounded-full blur-3xl animate-pulse-slow opacity-20"></div>
                <div className="w-[35rem] h-[35rem] bg-scanner-secondary/5 rounded-full blur-3xl animate-pulse-slower opacity-20"></div>
                <div className="w-[25rem] h-[25rem] bg-scanner-accent/5 rounded-full blur-3xl animate-pulse opacity-20"></div>
              </div>
            </div>

            {/* Main content */}
            <motion.div 
              className="relative z-10 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Enhanced camera icon with animations */}
              <div className="relative mb-8">
                {/* Outer rotating ring */}
                <div className="absolute inset-0 m-auto w-36 h-36 md:w-44 md:h-44">
                  <div className="absolute inset-0 animate-spin-slow">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-scanner-primary"
                        style={{
                          left: '50%',
                          top: '0%',
                          transform: `rotate(${i * 60}deg) translateY(-20px)`,
                          boxShadow: '0 0 10px #00f6ff, 0 0 20px #00f6ff'
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Middle ring */}
                <div className="absolute inset-0 m-auto w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-dashed border-scanner-primary/20 animate-spin-slow"></div>
                
                {/* Inner glowing circle */}
                <div className="absolute inset-0 m-auto w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-r from-scanner-primary/5 to-scanner-secondary/10 blur-sm animate-pulse"></div>
                
                {/* Camera icon container */}
                <motion.div 
                  className="relative z-10 bg-black/50 p-6 rounded-full backdrop-blur-sm border border-scanner-primary/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Camera className="w-16 h-16 md:w-20 md:h-20 text-scanner-primary" />
                  <div className="absolute inset-0 rounded-full bg-scanner-primary/5 animate-pulse blur-sm"></div>
                </motion.div>
              </div>

              {/* Status text */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl md:text-2xl font-bold mb-2 font-['Bebas_Neue'] tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-scanner-primary via-scanner-secondary to-scanner-accent">
                  Camera Inactive
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Activate camera to begin scanning
                </p>
              </motion.div>

              {/* Permission denied warning */}
              {permissionDenied && (
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-red-400 px-6 py-4 rounded-2xl flex items-center gap-4">
                    <div className="relative">
                      <AlertCircle className="w-6 h-6 md:w-7 md:h-7" />
                      <div className="absolute inset-0 bg-red-500/20 rounded-full blur-sm animate-pulse"></div>
                    </div>
                    <div>
                      <p className="text-sm md:text-base font-semibold">Camera Access Denied</p>
                      <p className="text-xs md:text-sm opacity-80">Please check browser settings and permissions</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Corner decorations */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-scanner-primary/20 rounded-tl-3xl">
                <div className="absolute top-0 left-0 w-2 h-2 bg-scanner-primary/50 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-scanner-primary/20 rounded-tr-3xl">
                <div className="absolute top-0 right-0 w-2 h-2 bg-scanner-primary/50 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-scanner-primary/20 rounded-bl-3xl">
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-scanner-primary/50 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-scanner-primary/20 rounded-br-3xl">
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-scanner-primary/50 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Scanning animation overlay */}
        <ScanAnimation isScanning={isScanning} onScanComplete={handleScanComplete} />
        
        {/* Loading animation overlay */}
        {isLoading && selectedObjectId && (
          <>
            {/* Hidden preloaded model viewer */}
            <div className="hidden">
              <model-viewer
                src={`/models/${getModelPath(selectedObjectId)}`}
                camera-orbit={previewConfig.cameraOrbit}
                camera-target={previewConfig.cameraTarget}
                field-of-view={previewConfig.fieldOfView}
                exposure={previewConfig.exposure}
                shadow-intensity={previewConfig.shadowIntensity}
                auto-rotate={previewConfig.autoRotate}
                rotation-per-second={previewConfig.rotationPerSecond}
                environment-image={previewConfig.environmentImage}
                camera-controls
                auto-rotate-delay={0}
                interaction-prompt="none"
                min-camera-orbit="auto auto 5%"
                max-camera-orbit="auto auto 2000%"
                min-field-of-view="10deg"
                max-field-of-view="90deg"
                orbit-sensitivity={1}
                interpolation-decay={200}
                touch-action="pan-y"
              />
            </div>
            <LoadingAnimation onComplete={handleLoadingComplete} />
          </>
        )}
      </div>
      
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-4 md:mt-6 p-2">
        <motion.button
          onClick={cameraActive ? stopCamera : startCamera}
          className={`
            relative group flex items-center justify-center
            min-w-[180px] md:min-w-[200px]
            text-sm md:text-base py-3 px-6 md:py-3.5 md:px-7
            rounded-xl md:rounded-2xl
            font-semibold tracking-wide
            transition-all duration-300 ease-out
            ${cameraActive 
              ? 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white' 
              : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white'
            }
            shadow-lg hover:shadow-xl
            ${cameraActive 
              ? 'shadow-red-500/20 hover:shadow-red-500/30' 
              : 'shadow-emerald-500/20 hover:shadow-emerald-500/30'
            }
            overflow-hidden
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Animated glow effect */}
          <div className={`
            absolute inset-0 
            bg-gradient-to-r 
            ${cameraActive 
              ? 'from-red-200/20 via-rose-100/20 to-red-200/20' 
              : 'from-emerald-200/20 via-teal-100/20 to-emerald-200/20'
            }
            translate-x-[-100%] group-hover:translate-x-[100%]
            transition-transform duration-1000 ease-out
          `} />
          
          {/* Icon with pulse effect */}
          <div className="relative mr-2 md:mr-3">
            <Camera className={`
              w-4 h-4 md:w-5 md:h-5 
              transition-transform duration-300
              group-hover:scale-110
            `} />
            <div className={`
              absolute inset-0 
              rounded-full
              animate-ping 
              ${cameraActive ? 'bg-red-200/30' : 'bg-emerald-200/30'}
              opacity-75
            `} />
          </div>
          
          {/* Button text */}
          <span className="relative">
            {cameraActive ? 'Deactivate Camera' : 'Activate Camera'}
          </span>
        </motion.button>
        
        <motion.button
          onClick={handleScan}
          disabled={!cameraActive || isScanning}
          className={`
            relative group flex items-center justify-center
            min-w-[180px] md:min-w-[200px]
            text-sm md:text-base py-3 px-6 md:py-3.5 md:px-7
            rounded-xl md:rounded-2xl
            font-semibold tracking-wide
            transition-all duration-300 ease-out
            ${!cameraActive || isScanning
              ? 'bg-gray-700/20 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30'
            }
            overflow-hidden
          `}
          whileHover={cameraActive && !isScanning ? { scale: 1.02 } : {}}
          whileTap={cameraActive && !isScanning ? { scale: 0.98 } : {}}
        >
          {/* Animated glow effect */}
          {cameraActive && !isScanning && (
            <div className="
              absolute inset-0 
              bg-gradient-to-r from-blue-200/20 via-indigo-100/20 to-blue-200/20
              translate-x-[-100%] group-hover:translate-x-[100%]
              transition-transform duration-1000 ease-out
            " />
          )}
          
          {/* Icon with pulse effect */}
          <div className="relative mr-2 md:mr-3">
            <ScanSearch className={`
              w-4 h-4 md:w-5 md:h-5
              transition-transform duration-300
              ${cameraActive && !isScanning ? 'group-hover:scale-110' : ''}
            `} />
            {cameraActive && !isScanning && (
              <div className="
                absolute inset-0 
                rounded-full
                animate-ping 
                bg-blue-200/30
                opacity-75
              " />
            )}
          </div>
          
          {/* Button text with loading animation */}
          <span className="relative">
            {isScanning ? (
              <span className="flex items-center">
                Scanning
                <span className="ml-1 flex space-x-1">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0 }}
                  >.</motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.2 }}
                  >.</motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.4 }}
                  >.</motion.span>
                </span>
              </span>
            ) : (
              'Scan Object'
            )}
          </span>
        </motion.button>
      </div>
      
      {/* Add QR code scanning indicator */}
      {isScanning && (
        <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-black/50 px-2 py-1 md:px-3 md:py-1 rounded-lg">
          <p className="text-white text-xs md:text-sm">Scanning for QR codes...</p>
        </div>
      )}
    </motion.div>
  );
};

export default Scanner;
