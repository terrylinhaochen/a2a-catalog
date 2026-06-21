
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ItemCatalog from '@/components/shared/ItemCatalogRefactored';

const Agents = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        <ItemCatalog
          defaultProtocol="agent"
          title="A2A Agent Catalog"
          description="Browse the current working A2A protocol release, SDKs, active samples, and framework patterns with explicit status labels for working, reference, or adapter-based entries."
          url="https://a2acatalog.com/agents"
        />
      </div>

      <Footer />
    </div>
  );
};

export default Agents;
