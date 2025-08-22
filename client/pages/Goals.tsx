import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import NotificationPanel from "@/components/NotificationPanel";
import { 
  TrendingUp, 
  Target, 
  Trophy,
  Plus,
  ArrowUpRight,
  Calendar,
  Zap,
  Star,
  Gift,
  CheckCircle,
  Clock,
  DollarSign,
  Bell
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Goals() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('goals');
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    timeframe: '',
    category: ''
  });
  const [showNotifications, setShowNotifications] = useState(false);

  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'Emergency Fund',
      targetAmount: 5000,
      currentAmount: 1200,
      timeframe: '3 months',
      category: 'emergency',
      progress: 24,
      icon: '🛡️'
    },
    {
      id: 2,
      name: 'Vacation Fund',
      targetAmount: 15000,
      currentAmount: 4500,
      timeframe: '6 months',
      category: 'travel',
      progress: 30,
      icon: '✈️'
    },
    {
      id: 3,
      name: 'Education Fund',
      targetAmount: 25000,
      currentAmount: 8000,
      timeframe: '12 months',
      category: 'education',
      progress: 32,
      icon: '📚'
    }
  ]);

  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: 'Invest ₹100 today',
      description: 'Maintain your investment streak',
      reward: 25,
      type: 'daily',
      completed: false,
      expiresIn: '2 hours'
    },
    {
      id: 2,
      title: 'Complete 7-day streak',
      description: 'Invest for 7 consecutive days',
      reward: 100,
      type: 'weekly',
      completed: false,
      expiresIn: '5 days'
    },
    {
      id: 3,
      title: 'Reach ₹5000 invested',
      description: 'Achieve your first milestone',
      reward: 200,
      type: 'milestone',
      completed: false,
      expiresIn: '30 days'
    },
    {
      id: 4,
      title: 'Invest ₹50 yesterday',
      description: 'Daily investment challenge',
      reward: 15,
      type: 'daily',
      completed: true,
      expiresIn: 'Completed'
    }
  ]);

  const rewards = [
    { id: 1, name: '₹25 Bonus', description: 'Daily challenge reward', date: '2024-01-15', status: 'claimed' },
    { id: 2, name: '₹100 Bonus', description: 'Weekly streak reward', date: '2024-01-10', status: 'claimed' },
    { id: 3, name: '₹50 Bonus', description: 'Milestone achievement', date: '2024-01-05', status: 'claimed' }
  ];

  const handleAddGoal = () => {
    console.log('Adding new goal:', newGoal);
    
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.timeframe || !newGoal.category) {
      alert('Please fill in all fields');
      return;
    }
    
    const newGoalObj = {
      id: goals.length + 1,
      name: newGoal.name,
      targetAmount: parseInt(newGoal.targetAmount),
      currentAmount: 0,
      timeframe: newGoal.timeframe,
      category: newGoal.category,
      progress: 0,
      icon: getGoalIcon(newGoal.category)
    };
    
    setGoals(prevGoals => [...prevGoals, newGoalObj]);
    setNewGoal({ name: '', targetAmount: '', timeframe: '', category: '' });
    
    alert('Goal added successfully!');
  };
  
  const getGoalIcon = (category: string) => {
    switch (category) {
      case 'emergency':
        return '🛡️';
      case 'travel':
        return '✈️';
      case 'education':
        return '📚';
      case 'home':
        return '🏠';
      case 'vehicle':
        return '🚗';
      default:
        return '🎯';
    }
  };

  const handleCompleteChallenge = (challengeId: number) => {
    console.log('Completing challenge:', challengeId);
    
    // Update the challenge status
    setChallenges(prevChallenges => 
      prevChallenges.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, completed: true }
          : challenge
      )
    );
    
    // Show success message (you can replace this with a toast notification)
    alert(`Challenge completed! You've earned ₹${challenges.find(c => c.id === challengeId)?.reward} bonus!`);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Goals & Challenges</h1>
          <p className="text-gray-600">Set financial goals and complete challenges to earn rewards</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{goals.length}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +1 this month
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹13,700</div>
              <p className="text-xs text-muted-foreground">
                Across all goals
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Challenges Completed</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rewards Earned</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹390</div>
              <p className="text-xs text-muted-foreground">
                Total bonus earned
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-lg mb-6">
          <Button
            variant={activeTab === 'goals' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('goals')}
            className="flex-1"
          >
            <Target className="w-4 h-4 mr-2" />
            Goals
          </Button>
          <Button
            variant={activeTab === 'challenges' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('challenges')}
            className="flex-1"
          >
            <Zap className="w-4 h-4 mr-2" />
            Challenges
          </Button>
          <Button
            variant={activeTab === 'rewards' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('rewards')}
            className="flex-1"
          >
            <Gift className="w-4 h-4 mr-2" />
            Rewards
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === 'goals' && (
          <div className="space-y-6">
            {/* Add New Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Goal
                </CardTitle>
                <CardDescription>Create a new financial goal to work towards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="goal-name">Goal Name</Label>
                    <Input
                      id="goal-name"
                      value={newGoal.name}
                      onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                      placeholder="e.g., Emergency Fund"
                    />
                  </div>
                  <div>
                    <Label htmlFor="target-amount">Target Amount (₹)</Label>
                    <Input
                      id="target-amount"
                      type="number"
                      value={newGoal.targetAmount}
                      onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                      placeholder="5000"
                      min="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeframe">Timeframe</Label>
                    <Select value={newGoal.timeframe} onValueChange={(value) => setNewGoal({...newGoal, timeframe: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-month">1 Month</SelectItem>
                        <SelectItem value="3-months">3 Months</SelectItem>
                        <SelectItem value="6-months">6 Months</SelectItem>
                        <SelectItem value="12-months">12 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={newGoal.category} onValueChange={(value) => setNewGoal({...newGoal, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">Emergency Fund</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="vehicle">Vehicle</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button 
                  onClick={handleAddGoal}
                  className="mt-4"
                  disabled={!newGoal.name || !newGoal.targetAmount || !newGoal.timeframe || !newGoal.category}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Goal
                </Button>
              </CardContent>
            </Card>

            {/* Goals List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => (
                <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{goal.icon}</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {goal.timeframe}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{goal.name}</CardTitle>
                    <CardDescription>
                      Target: ₹{goal.targetAmount.toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>₹{goal.currentAmount.toLocaleString()}</span>
                        <span>₹{goal.targetAmount.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        ₹{(goal.targetAmount - goal.currentAmount).toLocaleString()} remaining
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Daily Challenge Highlight */}
            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-8 h-8" />
                    <div>
                      <h3 className="text-lg font-semibold">Today's Challenge</h3>
                      <p className="text-purple-100">Invest ₹100 today to maintain your streak!</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">₹25</div>
                    <div className="text-sm text-purple-100">Reward</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Challenges List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {challenges.map((challenge) => (
                <Card key={challenge.id} className={`${challenge.completed ? 'bg-green-50 border-green-200' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {challenge.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-blue-600" />
                        )}
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          challenge.type === 'daily' ? 'bg-blue-100 text-blue-800' :
                          challenge.type === 'weekly' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {challenge.type}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">₹{challenge.reward}</div>
                        <div className="text-xs text-gray-500">Reward</div>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Expires: {challenge.expiresIn}
                      </div>
                      {!challenge.completed && (
                        <Button 
                          onClick={() => handleCompleteChallenge(challenge.id)}
                          size="sm"
                        >
                          Complete
                        </Button>
                      )}
                      {challenge.completed && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm">Completed</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="space-y-6">
            {/* Rewards Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="w-5 h-5 mr-2" />
                  Rewards Summary
                </CardTitle>
                <CardDescription>Your earned rewards and bonuses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">₹390</div>
                    <div className="text-sm text-gray-500">Total Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-gray-500">Challenges Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">₹25</div>
                    <div className="text-sm text-gray-500">Available to Claim</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rewards History */}
            <Card>
              <CardHeader>
                <CardTitle>Rewards History</CardTitle>
                <CardDescription>Your recent rewards and bonuses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rewards.map((reward) => (
                    <div key={reward.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Gift className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{reward.name}</p>
                          <p className="text-sm text-gray-500">{reward.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{reward.date}</p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          reward.status === 'claimed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {reward.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
