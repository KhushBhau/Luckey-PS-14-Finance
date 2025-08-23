import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Coins, TrendingUp, Calculator, Sparkles, Target, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RoundUpInvestment from "@/components/RoundUpInvestment";

export default function RoundUpDemo() {
  const navigate = useNavigate();
  const [roundUpEnabled, setRoundUpEnabled] = useState(false);

  const examples = [
    { original: 43, rounded: 50, roundUp: 7, description: "Coffee purchase" },
    { original: 127, rounded: 130, roundUp: 3, description: "Grocery shopping" },
    { original: 89, rounded: 90, roundUp: 1, description: "Movie ticket" },
    { original: 156, rounded: 160, roundUp: 4, description: "Restaurant bill" },
    { original: 234, rounded: 240, roundUp: 6, description: "Shopping spree" },
    { original: 67, rounded: 70, roundUp: 3, description: "Gas station" }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      title: "Automatic Investing",
      description: "No manual effort required. Every transaction automatically contributes to your investment portfolio."
    },
    {
      icon: <Calculator className="w-6 h-6 text-blue-600" />,
      title: "Smart Rounding",
      description: "Rounds up to the nearest ₹10, making it painless and barely noticeable in your daily spending."
    },
    {
      icon: <Target className="w-6 h-6 text-purple-600" />,
      title: "Compound Growth",
      description: "Small amounts add up over time with the power of compound interest working in your favor."
    },
    {
      icon: <DollarSign className="w-6 h-6 text-orange-600" />,
      title: "Financial Discipline",
      description: "Builds a habit of saving and investing without changing your lifestyle or spending patterns."
    }
  ];

  const monthlyProjections = [
    { transactions: 30, totalRoundUp: 150, potentialGrowth: 165 },
    { transactions: 60, totalRoundUp: 300, potentialGrowth: 330 },
    { transactions: 90, totalRoundUp: 450, potentialGrowth: 495 },
    { transactions: 120, totalRoundUp: 600, potentialGrowth: 660 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Round-up Investment Demo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Invest Your Spare Change Automatically
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Round-up investment automatically invests the difference when your transactions are rounded up to the nearest ₹10. 
            It's a smart way to build wealth without changing your spending habits.
          </p>
        </div>

        {/* How It Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-green-600" />
              How Round-up Investment Works
            </CardTitle>
            <CardDescription>
              See how small amounts add up to significant investments over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examples.map((example, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">{example.description}</span>
                    <Badge variant="secondary" className="text-xs">
                      +₹{example.roundUp}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Original:</span>
                      <span className="font-medium">₹{example.original}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Rounded:</span>
                      <span className="font-medium text-blue-600">₹{example.rounded}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Invested:</span>
                      <span className="font-medium text-green-600">₹{example.roundUp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {benefits.map((benefit, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Monthly Projections */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Monthly Investment Projections</CardTitle>
            <CardDescription>
              See how your round-up investments could grow over time (assuming 10% annual returns)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Transactions/Month</th>
                    <th className="text-left py-3 px-4">Total Round-up</th>
                    <th className="text-left py-3 px-4">After 1 Year</th>
                    <th className="text-left py-3 px-4">After 5 Years</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyProjections.map((projection, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4 font-medium">{projection.transactions}</td>
                      <td className="py-3 px-4">₹{projection.totalRoundUp}</td>
                      <td className="py-3 px-4 text-green-600">₹{projection.potentialGrowth}</td>
                      <td className="py-3 px-4 text-green-600">₹{(projection.totalRoundUp * 12 * 1.1).toFixed(0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Demo */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Try It Yourself</CardTitle>
            <CardDescription>
              Enable round-up investment and simulate transactions to see how it works
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RoundUpInvestment
              enabled={roundUpEnabled}
              onToggle={setRoundUpEnabled}
              onTransactionProcessed={(transaction) => {
                console.log('Demo transaction processed:', transaction);
              }}
            />
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Investing?</h2>
            <p className="text-green-100 mb-6">
              Join thousands of users who are building wealth through automatic round-up investments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                variant="secondary"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600"
                onClick={() => navigate('/onboarding')}
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
