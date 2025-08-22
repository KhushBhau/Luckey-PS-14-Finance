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
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

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
          <span className="text-xl font-bold text-gray-900">PaisaGrow</span>
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
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100">
            Start with just ₹10
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Investing Made
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              {" "}Simple
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start your investment journey with micro-investments. Build wealth gradually with 
            safe, low-risk options designed for everyone, especially first-time investors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignUpButton mode="modal">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8"
              >
                Start Investing Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </SignUpButton>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
              onClick={() => {
                // TODO: Implement demo video functionality
                console.log('Watch Demo clicked');
              }}
            >
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">₹10</div>
            <div className="text-gray-600">Minimum Investment</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">8-12%</div>
            <div className="text-gray-600">Expected Returns</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
            <div className="text-gray-600">Active Investors</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PaisaGrow?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've built the perfect platform for first-time investors with features 
              designed to make investing safe, simple, and rewarding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Coins className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Micro Investments</CardTitle>
                <CardDescription>
                  Start investing with as little as ₹10. Build your portfolio gradually with small, consistent investments.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Smart Dashboard</CardTitle>
                <CardDescription>
                  Track your investments with beautiful visualizations. See your growth and understand where your money goes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Safe & Secure</CardTitle>
                <CardDescription>
                  Your investments are protected with bank-grade security. We invest in low-risk ETFs and index funds.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <PiggyBank className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Round-up Feature</CardTitle>
                <CardDescription>
                  Automatically invest spare change from your transactions. Round up to the nearest ₹10 and invest the difference.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle>Goal-based Investing</CardTitle>
                <CardDescription>
                  Set investment goals and emergency funds. We'll help you achieve your financial targets step by step.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-pink-600" />
                </div>
                <CardTitle>Village Partners</CardTitle>
                <CardDescription>
                  Connect with trusted village partners who help rural communities access investment opportunities.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Getting started is simple. Follow these 3 easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Sign Up & Choose Level</h3>
              <p className="text-gray-600">
                Create your account and tell us your investment experience: Beginner, Intermediate, or Expert.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Start Small</h3>
              <p className="text-gray-600">
                Begin with just ₹10. Enable auto-invest features like round-ups and daily SIP to grow your portfolio.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Watch It Grow</h3>
              <p className="text-gray-600">
                Track your investments on our beautiful dashboard. Watch your money grow with safe, steady returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of Indians who are building wealth with small, smart investments.
          </p>
          <SignUpButton mode="modal">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </SignUpButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">PaisaGrow</span>
          </div>
          <p className="text-gray-400 mb-4">
            Making investing accessible for everyone, one rupee at a time.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
