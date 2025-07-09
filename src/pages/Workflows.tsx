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
        title="Workflow Automation Catalog"
        description="Discover and implement powerful n8n workflow automations. Browse over 2,000 production-ready workflows with integrations, statistics, and visual diagrams."
        url="https://a2acatalog.com/workflows"
      />

      <Footer />
    </div>
  );
};

export default Workflows;