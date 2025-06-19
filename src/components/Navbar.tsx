
import React from 'react';
import { Plus, Github, Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A2A</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Agent Catalog</span>
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="/agents" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Browse
              </a>
              <a href="/categories" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Categories
              </a>
              <a href="/docs" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Documentation
              </a>
              <a href="/about" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                About
              </a>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <a href="/submit">
              <Button className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                <Plus className="w-4 h-4" />
                <span>Submit Agent</span>
              </Button>
            </a>
            
            <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2">
              <Github className="w-4 h-4" />
              <span>Sign In</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/agents" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">
                Browse
              </a>
              <a href="/categories" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">
                Categories
              </a>
              <a href="/docs" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">
                Documentation
              </a>
              <a href="/about" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">
                About
              </a>
              <div className="px-3 py-2 space-y-2">
                <a href="/submit">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Submit Agent
                  </Button>
                </a>
                <Button variant="outline" className="w-full">
                  <Github className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
