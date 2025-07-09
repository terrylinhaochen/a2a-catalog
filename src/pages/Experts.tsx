import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ItemCatalog from '@/components/shared/ItemCatalog';

const Experts = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <ItemCatalog
        defaultProtocol="workflow"
        title="Expert Skills Catalog"
        description="Discover and hire skilled experts for your projects. Browse freelancers, consultants, and specialists with verified skills and experience ratings."
        url="https://a2acatalog.com/experts"
      />

      <Footer />
    </div>
  );
};

export default Experts;