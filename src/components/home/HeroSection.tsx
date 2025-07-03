
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
        Tell us what you need. Provide some examples, and our agents will take it from here.
      </h1>
      
      {/* Search Section */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Search for any service..."
            className="w-full h-16 text-lg pl-6 pr-16 rounded-2xl bg-white shadow-lg border-0"
          />
          <Button 
            size="lg" 
            className="absolute right-2 top-2 h-12 w-12 rounded-xl bg-gray-900 hover:bg-gray-800 p-0"
          >
            <Search className="w-6 h-6" />
          </Button>
        </div>
        
        {/* Example Service Tags */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Badge variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 px-4 py-2 text-sm rounded-full">
            website development →
          </Badge>
          <Badge variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 px-4 py-2 text-sm rounded-full">
            architecture & interior design →
          </Badge>
          <Badge variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 px-4 py-2 text-sm rounded-full">
            UGC videos →
          </Badge>
          <Badge variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 px-4 py-2 text-sm rounded-full">
            video editing →
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
