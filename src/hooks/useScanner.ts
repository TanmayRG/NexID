
import { useState, useCallback } from 'react';
import { ObjectData, findObjectById, getRandomObject } from '../utils/objectData';

export function useScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedObject, setDetectedObject] = useState<ObjectData | null>(null);
  const [scanHistory, setScanHistory] = useState<ObjectData[]>([]);

  const startScan = useCallback(() => {
    setIsScanning(true);
  }, []);

  const cancelScan = useCallback(() => {
    setIsScanning(false);
  }, []);

  const handleObjectDetected = useCallback((objectId: string) => {
    const object = findObjectById(objectId) || getRandomObject();
    setDetectedObject(object);
    setIsScanning(false);
    
    // Add to history
    setScanHistory(prev => {
      // Avoid duplicates in history
      const exists = prev.some(item => item.id === object.id);
      if (exists) return prev;
      return [object, ...prev].slice(0, 5); // Keep only the 5 most recent scans
    });
  }, []);

  const clearDetectedObject = useCallback(() => {
    setDetectedObject(null);
  }, []);

  return {
    isScanning,
    detectedObject,
    scanHistory,
    startScan,
    cancelScan,
    handleObjectDetected,
    clearDetectedObject
  };
}
