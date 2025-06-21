
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ItemCatalog from '@/components/shared/ItemCatalog';

const McpServers = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <ItemCatalog
        defaultProtocol="mcp"
        title="MCP Server Catalog"
        description="Discover and integrate Model Context Protocol servers for enhanced AI capabilities"
        url="https://a2acatalog.com/mcps"
      />

      <Footer />
    </div>
  );
};

export default McpServers;
