
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ItemCatalog from '@/components/shared/ItemCatalogRefactored';

const Agents = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <ItemCatalog
        defaultProtocol="agent"
        title="A2A Agent Catalog"
        description="Discover and integrate A2A-compliant AI agents for seamless interoperability. Browse the most comprehensive collection of AI agents supporting the Agent-to-Agent protocol from AutoGen, LangGraph, CrewAI, LlamaIndex, Semantic Kernel, and more frameworks."
        url="https://a2acatalog.com/agents"
      />

      <Footer />
    </div>
  );
};

export default Agents;
