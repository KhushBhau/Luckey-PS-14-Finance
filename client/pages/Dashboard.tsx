import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  PiggyBank,
  BarChart3,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  Bell,
  Calendar,
  Zap,
  Shield,
  Smartphone
} from "lucide-react";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import NotificationPanel from "@/components/NotificationPanel";

export default function Dashboard() {
  const navigate = useNavigate();
  const [roundUpEnabled, setRoundUpEnabled] = useState(false);
  const [sipEnabled, setSipEnabled] = useState(false);
  const [dailySipAmount, setDailySipAmount] = useState(50);
  const [emergencyFundGoal, setEmergencyFundGoal] = useState(5000);
  const [currentStreak, setCurrentStreak] = useState(23);
  const [todayChallenge, setTodayChallenge] = useState("Invest ₹100 today to maintain your streak!");
  const [portfolioData, setPortfolioData] = useState([
    { month: 'Jan', value: 2000 },
    { month: 'Feb', value: 2200 },
    { month: 'Mar', value: 2400 },
    { month: 'Apr', value: 2600 },
    { month: 'May', value: 2800 },
    { month: 'Jun', value: 2687 }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Debug function to test button clicks
  const handleButtonClick = (action: string) => {
    console.log(`Button clicked: ${action}`);
    // Add any specific logic here
  };

  const handleRoundUpToggle = () => {
    setRoundUpEnabled(!roundUpEnabled);
    console.log('Round-up investment:', !roundUpEnabled ? 'enabled' : 'disabled');
  };

  const handleSipToggle = () => {
    setSipEnabled(!sipEnabled);
    console.log('Daily SIP:', !sipEnabled ? 'enabled' : 'disabled');
  };

  const handleEmergencyWithdrawal = () => {
    console.log('Emergency withdrawal requested');
    navigate('/emergency-withdrawal');
  };

  const handleAddMoney = () => {
    console.log('Add money clicked');
    navigate('/payment');
  };

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
            <Button 
              variant="outline" 
              onClick={() => navigate('/portfolio')}
            >
              Portfolio
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/historical-returns')}
            >
              Historical Returns
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/village-partner')}
            >
              Village Partner
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowNotifications(true)}
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <LanguageSwitcher />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Here's an overview of your investment journey</p>
        </div>

        {/* Daily Challenge Card */}
        <Card className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Zap className="w-8 h-8" />
                <div>
                  <h3 className="text-lg font-semibold">Today's Challenge</h3>
                  <p className="text-purple-100">{todayChallenge}</p>
                </div>
              </div>
              <Button variant="secondary" onClick={() => handleButtonClick('Complete Challenge')}>
                Complete
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹2,450</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +12% this month
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹2,687</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +₹237 gains
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emergency Fund</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,200</div>
              <div className="mt-2">
                <Progress value={24} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Goal: ₹5,000 (24% complete)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Investment Streak</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStreak} days</div>
              <p className="text-xs text-muted-foreground">
                Keep it up! 🔥
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Investment Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>
                Your investment growth over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="w-full h-full flex items-end justify-between px-4 py-2">
                  {portfolioData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-t w-8"
                        style={{ height: `${(data.value / 3000) * 200}px` }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Manage your investments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full justify-start hover:bg-blue-50 hover:border-blue-300 transition-all duration-200" 
                variant="outline"
                onClick={handleAddMoney}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Money
              </Button>
              <Button 
                className="w-full justify-start hover:bg-blue-50 hover:border-blue-300 transition-all duration-200" 
                variant="outline"
                onClick={() => navigate('/goals')}
              >
                <Target className="w-4 h-4 mr-2" />
                Set New Goal
              </Button>
              <Button 
                className="w-full justify-start hover:bg-blue-50 hover:border-blue-300 transition-all duration-200" 
                variant="outline"
                onClick={handleEmergencyWithdrawal}
              >
                <Shield className="w-4 h-4 mr-2" />
                Emergency Withdrawal
              </Button>
              <Button 
                className="w-full justify-start hover:bg-blue-50 hover:border-blue-300 transition-all duration-200" 
                variant="outline"
                onClick={() => navigate('/onboarding')}
              >
                <Settings className="w-4 h-4 mr-2" />
                Update Preferences
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Investment Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Round-up Investment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Round-up Investment
              </CardTitle>
              <CardDescription>
                Automatically invest spare change from your transactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="roundup-toggle">Enable Round-up</Label>
                <Switch
                  id="roundup-toggle"
                  checked={roundUpEnabled}
                  onCheckedChange={handleRoundUpToggle}
                />
              </div>
              {roundUpEnabled && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700">
                    Round-up is active! Your transactions will be rounded up to the nearest ₹10 and the difference will be automatically invested.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Daily SIP */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Daily SIP
              </CardTitle>
              <CardDescription>
                Automatically invest a small amount daily
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="sip-toggle">Enable Daily SIP</Label>
                <Switch
                  id="sip-toggle"
                  checked={sipEnabled}
                  onCheckedChange={handleSipToggle}
                />
              </div>
              {sipEnabled && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="sip-amount">Daily Amount (₹)</Label>
                    <Input
                      id="sip-amount"
                      type="number"
                      value={dailySipAmount}
                      onChange={(e) => setDailySipAmount(Number(e.target.value))}
                      min="1"
                      max="1000"
                      className="mt-1"
                    />
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      Daily SIP of ₹{dailySipAmount} will be invested automatically.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* SMS Notifications */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smartphone className="w-5 h-5 mr-2" />
              SMS Portfolio Updates
            </CardTitle>
            <CardDescription>
              Get daily portfolio updates via SMS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Daily Portfolio Summary</p>
                <p className="text-sm text-gray-500">Receive daily updates on your investments</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest investment transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Round-up Investment</p>
                    <p className="text-sm text-gray-500">Auto-invested from transaction</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">+₹7</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Daily SIP</p>
                    <p className="text-sm text-gray-500">Systematic Investment Plan</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-blue-600">+₹50</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Streak Bonus</p>
                    <p className="text-sm text-gray-500">20-day investment streak reward</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-purple-600">+₹25</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
