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
          description="Browse verified working MCP surfaces: the official registry, GitHub MCP server, official SDKs, OpenAI remote MCP support, CrewAI MCP integration, and reference servers clearly marked as educational."
          url="https://a2acatalog.com/tools"
        />
      </div>

      <Footer />
    </div>
  );
};

export default Tools;
