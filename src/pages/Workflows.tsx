import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ItemCatalog from '@/components/shared/ItemCatalogRefactored';

const Workflows = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        <ItemCatalog
          defaultProtocol="workflow"
          title="Task Pattern Catalog"
          description="Browse working patterns, reusable Skills, reference operations loops, and roadmap watchlist items for A2A, MCP, and multi-agent task lifecycle design."
          url="https://a2acatalog.com/workflows"
        />
      </div>

      <Footer />
    </div>
  );
};

export default Workflows;
