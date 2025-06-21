
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ItemCatalog from '@/components/shared/ItemCatalog';

const Agents = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <ItemCatalog
        defaultProtocol="agent"
        title="A2A Agent Catalog - Discover AI Agents with Agent-to-Agent Protocol"
        description="Discover and integrate A2A-compliant AI agents for seamless interoperability. Browse AI agents supporting the Agent-to-Agent protocol from AutoGen, LangGraph, CrewAI, LlamaIndex, Semantic Kernel, and more frameworks."
        url="https://a2acatalog.com/agents"
      />

      <Footer />
    </div>
  );
};

export default Agents;
