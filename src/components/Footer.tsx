
import React from 'react';
import { Github, Twitter, Book, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A2A</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Agent Catalog</span>
            </div>
            <p className="text-gray-600 max-w-md mb-4">
              The comprehensive discovery platform for AI agents supporting the Agent-to-Agent protocol. 
              Find, evaluate, and integrate AI agents into your applications.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Book className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><a href="/agents" className="text-gray-600 hover:text-gray-900 transition-colors">Browse Agents</a></li>
              <li><a href="/categories" className="text-gray-600 hover:text-gray-900 transition-colors">Categories</a></li>
              <li><a href="/submit" className="text-gray-600 hover:text-gray-900 transition-colors">Submit Agent</a></li>
              <li><a href="/search" className="text-gray-600 hover:text-gray-900 transition-colors">Advanced Search</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/docs" className="text-gray-600 hover:text-gray-900 transition-colors">Documentation</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About A2A</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">API Reference</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Integration Guide</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} A2A Agent Catalog. Made with <Heart className="w-4 h-4 inline text-red-500" /> for the AI agent community.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
