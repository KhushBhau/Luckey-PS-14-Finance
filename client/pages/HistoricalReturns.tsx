import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, BarChart3, ArrowUpRight } from "lucide-react";

export default function HistoricalReturns() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Sikka</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Historical Returns</h1>
          <p className="text-gray-600">Track record of our investment performance to build your confidence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">1 Year Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">12.5%</div>
              <p className="text-sm text-gray-500 flex items-center">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                Consistent growth
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">3 Year Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">11.8%</div>
              <p className="text-sm text-gray-500 flex items-center">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                CAGR
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">5 Year Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">10.9%</div>
              <p className="text-sm text-gray-500 flex items-center">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                CAGR
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Performance Chart</CardTitle>
            <CardDescription>
              Historical performance of our curated portfolio over the years
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Historical Returns Chart</p>
                <p className="text-sm text-gray-400">Interactive chart showing year-over-year performance will be implemented here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
