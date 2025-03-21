import React, { useState } from 'react';
import { Button } from './ui/button';
import AdminPanel from './AdminPanel';

const AdminButton: React.FC = () => {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        className="fixed bottom-4 right-4 bg-white/5 backdrop-blur-lg hover:bg-white/10"
        onClick={() => setShowPanel(true)}
      >
        Admin Panel
      </Button>

      {showPanel && <AdminPanel onClose={() => setShowPanel(false)} />}
    </>
  );
};

export default AdminButton; 