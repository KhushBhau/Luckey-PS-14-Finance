import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, PieChart, ArrowUpRight, ArrowDownRight, RefreshCw, Loader2 } from "lucide-react";
// Temporarily comment out new hooks to isolate white screen issue
// import { usePortfolio } from "@/hooks/usePortfolio";
// import { formatCurrency, formatCurrencyChange, formatPercentage } from "@/lib/formatters";

export default function Portfolio() {
  const navigate = useNavigate();
  // Temporarily comment out new hooks
  // const { portfolioData: portfolio, loading, error, refreshPortfolio } = usePortfolio();

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
            {/* Temporarily comment out refresh button
            <Button 
              variant="outline" 
              onClick={refreshPortfolio}
              disabled={loading}
              className="flex items-center space-x-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Refresh
            </Button>
            */}
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Overview</h1>
          <p className="text-gray-600">Detailed breakdown of your investments and performance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Distribution */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Portfolio Distribution</CardTitle>
              <CardDescription>
                How your money is allocated across different investment types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Portfolio allocation chart will be implemented here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Holdings Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Holdings Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">Equity ETFs</p>
                    <p className="text-sm text-gray-500">65% allocation</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹1,744</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      +8.2%
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium">Debt Funds</p>
                    <p className="text-sm text-gray-500">25% allocation</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹672</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      +5.1%
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium">Gold ETF</p>
                    <p className="text-sm text-gray-500">10% allocation</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹271</p>
                    <p className="text-xs text-red-600 flex items-center">
                      <ArrowDownRight className="w-3 h-3 mr-1" />
                      -2.1%
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Holdings */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Detailed Holdings</CardTitle>
            <CardDescription>
              Complete list of your investments with current values
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-3 px-4">Investment</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-right py-3 px-4">Invested</th>
                    <th className="text-right py-3 px-4">Current Value</th>
                    <th className="text-right py-3 px-4">Returns</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Nifty 50 ETF</td>
                    <td className="py-3 px-4 text-gray-600">Equity ETF</td>
                    <td className="py-3 px-4 text-right">₹1,200</td>
                    <td className="py-3 px-4 text-right">₹1,298</td>
                    <td className="py-3 px-4 text-right text-green-600">+₹98 (8.2%)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Bank Nifty ETF</td>
                    <td className="py-3 px-4 text-gray-600">Equity ETF</td>
                    <td className="py-3 px-4 text-right">₹400</td>
                    <td className="py-3 px-4 text-right">₹446</td>
                    <td className="py-3 px-4 text-right text-green-600">+₹46 (11.5%)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Liquid Fund</td>
                    <td className="py-3 px-4 text-gray-600">Debt Fund</td>
                    <td className="py-3 px-4 text-right">₹600</td>
                    <td className="py-3 px-4 text-right">₹631</td>
                    <td className="py-3 px-4 text-right text-green-600">+₹31 (5.2%)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Gold ETF</td>
                    <td className="py-3 px-4 text-gray-600">Commodity</td>
                    <td className="py-3 px-4 text-right">₹250</td>
                    <td className="py-3 px-4 text-right">₹245</td>
                    <td className="py-3 px-4 text-right text-red-600">-₹5 (-2.0%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
