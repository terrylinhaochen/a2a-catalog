
import React from 'react';
import { useAgents } from '@/hooks/useAgents';
import { useMcpServers } from '@/hooks/useMcpServers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Categories = () => {
  const { categories, loading: agentsLoading, agents } = useAgents();
  const { mcpServers, loading: mcpLoading } = useMcpServers();

  const loading = agentsLoading || mcpLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate MCP counts for each category
  const categoriesWithCounts = categories.map(category => {
    const mcpCount = mcpServers.filter(mcp => 
      mcp.categories?.includes(category.name)
    ).length;
    
    return {
      ...category,
      mcpCount
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore by Category
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover AI agents and MCP servers organized by their primary capabilities and use cases. 
            Click on any category to explore the available solutions.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesWithCounts.map((category) => (
            <Link 
              key={category.id} 
              to={`/?category=${encodeURIComponent(category.name)}`}
              className="block"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <div className="text-2xl">{category.icon}</div>
                  </div>
                  <CardDescription className="text-sm">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-start">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {category.count || 0} agents
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {category.mcpCount || 0} MCPs
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Categories;
