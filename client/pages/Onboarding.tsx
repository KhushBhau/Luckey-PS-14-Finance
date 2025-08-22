import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Users, Target, BarChart3 } from "lucide-react";
import { useState } from "react";

export default function Onboarding() {
  const navigate = useNavigate();
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PaisaGrow</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Your Investment Journey!
          </h1>
          <p className="text-lg text-gray-600">
            Let's set up your profile to provide personalized investment recommendations
          </p>
        </div>

        <Card className="p-6">
          <CardHeader className="text-center">
            <CardTitle>Investment Experience Level</CardTitle>
            <CardDescription>
              Help us understand your investment knowledge to provide the best recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card 
                className={`cursor-pointer hover:shadow-lg transition-shadow border-2 ${
                  selectedExperience === 'beginner' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'hover:border-blue-200'
                }`}
                onClick={() => setSelectedExperience('beginner')}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Beginner</CardTitle>
                  <CardDescription>
                    New to investing. Want safe, simple options with guidance.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card 
                className={`cursor-pointer hover:shadow-lg transition-shadow border-2 ${
                  selectedExperience === 'intermediate' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'hover:border-blue-200'
                }`}
                onClick={() => setSelectedExperience('intermediate')}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Intermediate</CardTitle>
                  <CardDescription>
                    Some investment experience. Want to explore different options.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card 
                className={`cursor-pointer hover:shadow-lg transition-shadow border-2 ${
                  selectedExperience === 'expert' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'hover:border-blue-200'
                }`}
                onClick={() => setSelectedExperience('expert')}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Expert</CardTitle>
                  <CardDescription>
                    Experienced investor. Want to pick specific stocks and strategies.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Button 
                onClick={() => {
                  if (selectedExperience) {
                    console.log('Selected experience level:', selectedExperience);
                    navigate('/dashboard');
                  }
                }}
                disabled={!selectedExperience}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Setup
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
