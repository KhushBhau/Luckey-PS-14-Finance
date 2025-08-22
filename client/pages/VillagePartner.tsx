import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import NotificationPanel from "@/components/NotificationPanel";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus,
  FileText,
  BarChart3,
  Bell,
  Settings
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function VillagePartner() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [newVillager, setNewVillager] = useState({
    name: '',
    phone: '',
    amount: '',
    notes: ''
  });
  const [showNotifications, setShowNotifications] = useState(false);

  const [villagers, setVillagers] = useState([
    { id: 1, name: 'Ram Kumar', phone: '+91 98765 43210', totalInvested: 2500, currentValue: 2750, status: 'active' },
    { id: 2, name: 'Sita Devi', phone: '+91 98765 43211', totalInvested: 1800, currentValue: 1980, status: 'active' },
    { id: 3, name: 'Lakshman Singh', phone: '+91 98765 43212', totalInvested: 3200, currentValue: 3520, status: 'active' },
    { id: 4, name: 'Gita Patel', phone: '+91 98765 43213', totalInvested: 1500, currentValue: 1650, status: 'pending' }
  ]);

  const handleAddVillager = () => {
    console.log('Adding new villager:', newVillager);
    
    if (!newVillager.name || !newVillager.phone || !newVillager.amount) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newVillagerObj = {
      id: villagers.length + 1,
      name: newVillager.name,
      phone: newVillager.phone,
      totalInvested: parseInt(newVillager.amount),
      currentValue: parseInt(newVillager.amount),
      status: 'active' as const
    };
    
    setVillagers(prevVillagers => [...prevVillagers, newVillagerObj]);
    setNewVillager({ name: '', phone: '', amount: '', notes: '' });
    
    alert('Villager added successfully!');
  };

  const totalManaged = villagers.reduce((sum, v) => sum + v.totalInvested, 0);
  const totalCurrentValue = villagers.reduce((sum, v) => sum + v.currentValue, 0);
  const totalGains = totalCurrentValue - totalManaged;

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
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/portfolio')}
            >
              Portfolio
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Village Partner Dashboard</h1>
          <p className="text-gray-600">Manage investments for your village community</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Villagers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{villagers.length}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +1 this week
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Managed</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalManaged.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +₹{totalGains.toLocaleString()} gains
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
              <div className="text-2xl font-bold">₹{totalCurrentValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +10% overall
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commission Earned</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{(totalGains * 0.05).toFixed(0)}</div>
              <p className="text-xs text-muted-foreground">
                5% of total gains
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-lg mb-6">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('overview')}
            className="flex-1"
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'villagers' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('villagers')}
            className="flex-1"
          >
            Villagers
          </Button>
          <Button
            variant={activeTab === 'add' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('add')}
            className="flex-1"
          >
            Add Villager
          </Button>
          <Button
            variant={activeTab === 'reports' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('reports')}
            className="flex-1"
          >
            Reports
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest transactions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <UserPlus className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">New villager added</p>
                        <p className="text-sm text-gray-500">Gita Patel - ₹1,500</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Portfolio update</p>
                        <p className="text-sm text-gray-500">All villagers +₹270 gains</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Chart</CardTitle>
                <CardDescription>Community investment growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Community growth chart</p>
                    <p className="text-sm text-gray-400">Showing collective investment performance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'villagers' && (
          <Card>
            <CardHeader>
              <CardTitle>Villager Management</CardTitle>
              <CardDescription>Manage investments for your village community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {villagers.map((villager) => (
                  <div key={villager.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {villager.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{villager.name}</h3>
                        <p className="text-sm text-gray-500">{villager.phone}</p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          villager.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {villager.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{villager.currentValue.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">
                        Invested: ₹{villager.totalInvested.toLocaleString()}
                      </p>
                      <p className="text-xs text-green-600">
                        +₹{(villager.currentValue - villager.totalInvested).toLocaleString()} gains
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'add' && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Villager</CardTitle>
              <CardDescription>Register a new villager for investment management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newVillager.name}
                      onChange={(e) => setNewVillager({...newVillager, name: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newVillager.phone}
                      onChange={(e) => setNewVillager({...newVillager, phone: e.target.value})}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="amount">Initial Investment Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newVillager.amount}
                    onChange={(e) => setNewVillager({...newVillager, amount: e.target.value})}
                    placeholder="1000"
                    min="10"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={newVillager.notes}
                    onChange={(e) => setNewVillager({...newVillager, notes: e.target.value})}
                    placeholder="Any additional information about the villager"
                    rows={3}
                  />
                </div>
                <Button 
                  onClick={handleAddVillager}
                  className="w-full"
                  disabled={!newVillager.name || !newVillager.phone || !newVillager.amount}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Villager
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'reports' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Report</CardTitle>
                <CardDescription>Investment summary for this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>New Villagers</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Investments</span>
                    <span className="font-semibold">₹9,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Gains</span>
                    <span className="font-semibold text-green-600">₹900</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Your Commission</span>
                    <span className="font-semibold text-blue-600">₹45</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Download Reports</CardTitle>
                <CardDescription>Generate and download detailed reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Monthly Summary Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Individual Villager Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Commission Statement
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
