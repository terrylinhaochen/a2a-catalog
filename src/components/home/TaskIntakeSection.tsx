import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

interface TaskIntakeSectionProps {
  onFindSkills: (query: string) => void;
}

const TaskIntakeSection = ({ onFindSkills }: TaskIntakeSectionProps) => {
  const [description, setDescription] = useState('');

  const handleFindSkills = () => {
    const query = description.trim() || 'skills';
    onFindSkills(query);
    document.getElementById('featured-catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-950 leading-tight mb-4">
              Tell us what you need.
              <span className="block text-gray-600">Our agents will take it from here.</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Use this as a lightweight catalog intake: search for matching skills now, or start from workflow patterns when you want to shape an agent submission.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg bg-gray-50 p-4 sm:p-6">
            <Tabs defaultValue="find" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white border border-gray-200">
                <TabsTrigger value="find">Find Skills</TabsTrigger>
                <TabsTrigger value="upload">Upload Agents</TabsTrigger>
              </TabsList>

              <TabsContent value="find" className="mt-5 space-y-4">
                <Textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Describe a task, protocol problem, or agent workflow you are trying to build"
                  className="min-h-28 bg-white"
                />
                <Button onClick={handleFindSkills} className="bg-gray-950 hover:bg-gray-800">
                  Find Skills
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </TabsContent>

              <TabsContent value="upload" className="mt-5">
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <Upload className="w-6 h-6 text-gray-700 mb-4" />
                  <p className="text-gray-700 mb-5 leading-relaxed">
                    Build your agent workflow with AI-powered automation, with thousands of capabilities available instantly.
                  </p>
                  <Button asChild className="bg-gray-950 hover:bg-gray-800">
                    <Link to="/workflows?category=Skills">
                      Submit your agent workflow
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskIntakeSection;
