
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ItemCatalog from '@/components/shared/ItemCatalogRefactored';

const McpServers = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <ItemCatalog
        defaultProtocol="mcp"
        title="MCP Server Catalog"
        description="Browse working MCP servers, SDKs, host integrations, and reference implementations. Roadmap concepts are kept out of this working-tools list."
        url="https://a2acatalog.com/mcps"
      />

      <Footer />
    </div>
  );
};

export default McpServers;
