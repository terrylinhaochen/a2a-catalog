import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ItemCatalog from '@/components/shared/ItemCatalogRefactored';

const Tools = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        <ItemCatalog
          defaultProtocol="mcp"
          title="MCP Tools Catalog"
          description="Discover and integrate MCP (Model Context Protocol) tools for seamless AI interoperability. Browse the most comprehensive collection of MCP servers and tools from the community."
          url="https://a2acatalog.com/tools"
        />
      </div>

      <Footer />
    </div>
  );
};

export default Tools;