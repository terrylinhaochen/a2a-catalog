import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ItemCatalog from '@/components/shared/ItemCatalog';

const Workflows = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <ItemCatalog
        defaultProtocol="workflow"
        title="Workflow Catalog"
        description="Discover and download ready-to-use AI workflows for automation and productivity. Browse thousands of workflows from n8n, Zapier, and other automation platforms."
        url="https://a2acatalog.com/workflows"
      />

      <Footer />
    </div>
  );
};

export default Workflows;