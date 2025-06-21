
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ItemCatalog from '@/components/shared/ItemCatalog';

const Agents = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <ItemCatalog
        defaultProtocol="agent"
        title="AI Agent Catalog"
        description="Discover and integrate A2A-compliant AI agents for your applications"
        url="https://a2acatalog.com/agents"
      />

      <Footer />
    </div>
  );
};

export default Agents;
