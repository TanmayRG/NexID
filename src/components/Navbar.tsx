
import React from 'react';
import { motion } from 'framer-motion';
import { ScanSearch } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 w-full bg-black/10 backdrop-blur-md border-b border-white/10 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <ScanSearch className="w-7 h-7 text-scanner-primary" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-scanner-accent rounded-full animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-scanner-primary via-scanner-accent to-scanner-secondary">
            N E X I D
          </h1>
        </motion.div>
        
        <motion.nav 
          className="flex gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {['Home', 'MADE BY :', 'PRATIK|TANMAY|DIVYA'].map((item, index) => (
            <a 
              key={item} 
              href="#" 
              className={cn(
                "relative text-sm font-medium text-white/80 hover:text-white transition-colors",
                index === 0 && "after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-scanner-primary"
              )}
            >
              {item}
            </a>
          ))}
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
