import React from 'react';
import { motion } from 'framer-motion';
import { useScanner } from '../hooks/useScanner';
import Scanner from '../components/Scanner';
import ObjectViewer from '../components/ObjectViewer';
import Navbar from '../components/Navbar';
import AdminButton from '../components/AdminButton';
import { ScanSearch, Info, History, ChevronRight } from 'lucide-react';

const Index = () => {
  const { 
    detectedObject, 
    scanHistory, 
    handleObjectDetected, 
    clearDetectedObject 
  } = useScanner();

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black text-white pt-20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        {/* Intro section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-15xl md:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-scanner-primary via-scanner-secondary to-scanner-accent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            N e x I D
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            POINT YOUR CAMERA AT ONE OF OUR CODES AND SEE THE MAGIC HAPPEN.
          </motion.p>
        </motion.div>
        
        {/* Scanner section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-full bg-scanner-primary/10 border border-scanner-primary/30">
              <ScanSearch className="w-5 h-5 text-scanner-primary" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">NexID Scanner</h2>
          </div>
          
          <Scanner onObjectDetected={handleObjectDetected} />
        </section>
        
        {/* Recent scans */}
        {scanHistory.length > 0 && (
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-scanner-primary/10 border border-scanner-primary/30">
                  <History className="w-5 h-5 text-scanner-primary" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">Recent Scans</h2>
              </div>
              <button className="text-sm flex items-center text-scanner-primary hover:text-scanner-accent transition-colors">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {scanHistory.map((object) => (
                <motion.div 
                  key={object.id}
                  className="glass-dark p-5 rounded-xl cursor-pointer hover:bg-white/5 transition-all"
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.15)' }}
                  onClick={() => handleObjectDetected(object.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 flex items-center justify-center mb-3 relative">
                      <div className="absolute inset-0 m-auto w-12 h-12 rounded-full border border-scanner-primary/30 animate-pulse-highlight"></div>
                      <img 
                        src={object.thumbnail} 
                        alt={object.name} 
                        className="w-10 h-10 object-contain z-10"
                      />
                    </div>
                    <h3 className="text-sm font-medium">{object.name}</h3>
                    <span className="text-xs text-scanner-primary mt-1 font-medium">
                      {Math.round(object.confidence * 100)}% match
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
        
        {/* How it works section */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-full bg-scanner-primary/10 border border-scanner-primary/30">
              <Info className="w-5 h-5 text-scanner-primary" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">How It Works</h2>
          </div>
          
          <div className="glass-dark p-8 rounded-xl">
            <ol className="space-y-6">
              <li className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-scanner-primary/20 flex items-center justify-center border border-scanner-primary/30">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Activate Camera</h3>
                  <p className="text-gray-400 leading-relaxed">Enable your device's camera to begin the scanning process.</p>
                </div>
              </li>
              <li className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-scanner-primary/20 flex items-center justify-center border border-scanner-primary/30">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Scan Our Code</h3>
                  <p className="text-gray-400 leading-relaxed">Point your camera at our code and press the scan button.</p>
                </div>
              </li>
              <li className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-scanner-primary/20 flex items-center justify-center border border-scanner-primary/30">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">View 3D Model</h3>
                  <p className="text-gray-400 leading-relaxed">After recognition, a detailed 3D model of the object will be displayed with interactive control and its information.</p>
                </div>
              </li>
            </ol>
          </div>
        </motion.section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/5 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">© NexID 2025</p>
          <p className="mt-1 text-xs text-gray-600">Powered by Nexi</p>
        </div>
      </footer>
      
      {/* 3D Object Viewer Modal */}
      {detectedObject && (
        <ObjectViewer object={detectedObject} onClose={clearDetectedObject} />
      )}

      <AdminButton />
    </div>
  );
};

export default Index;
