import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SignInButton, SignUpButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { 
  TrendingUp, 
  Shield, 
  Users, 
  Smartphone, 
  PiggyBank, 
  Target,
  BarChart3,
  Coins,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function Index() {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  // Add loading state to prevent premature navigation
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isSignedIn) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Sikka</span>
        </div>
        <div className="flex items-center space-x-4">
          <SignInButton mode="modal">
            <Button variant="outline">Sign In</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              Start Investing
            </Button>
          </SignUpButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Start Your Investment Journey
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Today
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of smart investors who are building wealth through our innovative platform. 
            Start with just ₹10 and watch your money grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignUpButton mode="modal">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </SignUpButton>
            <Button variant="outline" size="lg" onClick={() => navigate('/dashboard')}>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Sikka?</h2>
          <p className="text-gray-600">Simple, secure, and smart investing for everyone</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <PiggyBank className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-xl mb-2">Start Small</CardTitle>
            <CardDescription>
              Start investing with as little as ₹10. Build your portfolio gradually with small, consistent investments.
            </CardDescription>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle className="text-xl mb-2">Secure & Safe</CardTitle>
            <CardDescription>
              Your investments are protected with bank-level security and regulatory compliance.
            </CardDescription>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <CardTitle className="text-xl mb-2">Smart Insights</CardTitle>
            <CardDescription>
              Get personalized investment recommendations and track your portfolio performance in real-time.
            </CardDescription>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Investing?</h2>
          <p className="text-xl mb-8 opacity-90">
            Begin with just ₹10. Enable auto-invest features like round-ups and daily SIP to grow your portfolio.
          </p>
          <SignUpButton mode="modal">
            <Button size="lg" variant="secondary" className="text-blue-600">
              Start Investing Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </SignUpButton>
        </div>
      </section>
    </div>
  );
}
