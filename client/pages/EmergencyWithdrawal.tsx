import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { 
  TrendingUp, 
  AlertTriangle,
  DollarSign,
  CheckCircle,
  ArrowLeft,
  Shield,
  Clock,
  Zap,
  Banknote,
  CreditCard,
  Smartphone,
  Bell
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import WithdrawalHistory from "@/components/WithdrawalHistory";
import NotificationPanel from "@/components/NotificationPanel";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function EmergencyWithdrawal() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [withdrawalMethod, setWithdrawalMethod] = useState('bank');
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolderName: ''
  });
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reason, setReason] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const availableBalance = 2687;
  const emergencyFundBalance = 1200;
  const maxWithdrawal = Math.min(availableBalance, emergencyFundBalance);

  const quickAmounts = [500, 1000, 1500, 2000];

  const withdrawalReasons = [
    { value: 'medical', label: 'Medical Emergency', icon: '🏥' },
    { value: 'education', label: 'Education Fees', icon: '📚' },
    { value: 'vehicle', label: 'Vehicle Repair', icon: '🚗' },
    { value: 'home', label: 'Home Repair', icon: '🏠' },
    { value: 'other', label: 'Other Emergency', icon: '⚠️' }
  ];

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount.toString());
  };

  const handleWithdrawal = async () => {
    setProcessing(true);
    
    // Validate withdrawal details
    if (withdrawalMethod === 'bank' && (!bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.accountHolderName)) {
      alert('Please fill in all bank details');
      setProcessing(false);
      return;
    }
    
    if (withdrawalMethod === 'upi' && !upiId) {
      alert('Please enter your UPI ID');
      setProcessing(false);
      return;
    }
    
    // Simulate withdrawal processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setProcessing(false);
    setSuccess(true);
    
    // Redirect to dashboard after 5 seconds
    setTimeout(() => {
      navigate('/dashboard');
    }, 5000);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/dashboard');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Withdrawal Successful!</h2>
            <p className="text-gray-600 mb-4">
              ₹{amount} has been processed for withdrawal
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-green-700">
                Your funds will be transferred within 2-4 hours. You'll receive an SMS confirmation once the transfer is complete.
              </p>
            </div>
            <Button onClick={() => navigate('/dashboard')} className="w-full">
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Emergency Withdrawal</h1>
                <p className="text-gray-600">Quick access to your funds when you need them most</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? 'Hide History' : 'View History'}
            </Button>
          </div>
        </div>

        {/* Emergency Alert */}
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Emergency Withdrawal:</strong> This feature is designed for genuine emergencies. 
            Funds will be transferred within 2-4 hours with no penalties.
          </AlertDescription>
        </Alert>

        {/* Withdrawal History */}
        {showHistory && (
          <div className="mb-6">
            <WithdrawalHistory clerkId="demo-user" />
          </div>
        )}

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'
            }`}>
              1
            </div>
            <span className="ml-2 text-sm font-medium">Reason & Amount</span>
          </div>
          <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'
            }`}>
              2
            </div>
            <span className="ml-2 text-sm font-medium">Transfer Method</span>
          </div>
        </div>

        {/* Step 1: Reason and Amount */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Emergency Details</CardTitle>
              <CardDescription>Tell us about your emergency and withdrawal amount</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Available Balance */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-blue-700">Available for Emergency Withdrawal</p>
                    <p className="text-2xl font-bold text-blue-900">₹{maxWithdrawal.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-700">Emergency Fund</p>
                    <p className="text-lg font-semibold text-blue-900">₹{emergencyFundBalance.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Emergency Reason */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Emergency Type</Label>
                <RadioGroup value={reason} onValueChange={setReason}>
                  <div className="grid grid-cols-1 gap-3">
                    {withdrawalReasons.map((reasonOption) => (
                      <div key={reasonOption.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value={reasonOption.value} id={reasonOption.value} />
                        <Label htmlFor={reasonOption.value} className="flex items-center space-x-3 cursor-pointer">
                          <span className="text-xl">{reasonOption.icon}</span>
                          <span className="font-medium">{reasonOption.label}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Amount Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Withdrawal Amount</Label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {quickAmounts.map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      variant={amount === quickAmount.toString() ? 'default' : 'outline'}
                      onClick={() => handleAmountSelect(quickAmount)}
                      className="h-12"
                      disabled={quickAmount > maxWithdrawal}
                    >
                      ₹{quickAmount}
                    </Button>
                  ))}
                </div>
                <div>
                  <Label htmlFor="custom-amount">Or enter custom amount</Label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <Input
                      id="custom-amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="1000"
                      min="100"
                      max={maxWithdrawal}
                      className="pl-8"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum withdrawal: ₹{maxWithdrawal.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Processing Time Info */}
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium text-yellow-900">Processing Time</span>
                </div>
                <p className="text-sm text-yellow-800">
                  Emergency withdrawals are processed within 2-4 hours during business hours. 
                  You'll receive SMS confirmation once the transfer is complete.
                </p>
              </div>

              <Button 
                onClick={() => setStep(2)}
                disabled={!amount || !reason || Number(amount) > maxWithdrawal || Number(amount) < 100}
                className="w-full"
              >
                Continue to Transfer Method
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Transfer Method */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Transfer Method</CardTitle>
              <CardDescription>Choose how you want to receive your funds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Transfer Method Selection */}
              <RadioGroup value={withdrawalMethod} onValueChange={setWithdrawalMethod}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex items-center space-x-3 cursor-pointer">
                      <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                        <Banknote className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Bank Transfer</div>
                        <div className="text-sm text-gray-500">Direct transfer to your bank account</div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center space-x-3 cursor-pointer">
                      <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">UPI Transfer</div>
                        <div className="text-sm text-gray-500">Instant transfer via UPI</div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {/* Transfer Details */}
              {withdrawalMethod === 'bank' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input
                      id="account-number"
                      value={bankDetails.accountNumber}
                      onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                      placeholder="1234567890"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ifsc-code">IFSC Code</Label>
                    <Input
                      id="ifsc-code"
                      value={bankDetails.ifscCode}
                      onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value})}
                      placeholder="SBIN0001234"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="account-holder">Account Holder Name</Label>
                    <Input
                      id="account-holder"
                      value={bankDetails.accountHolderName}
                      onChange={(e) => setBankDetails({...bankDetails, accountHolderName: e.target.value})}
                      placeholder="John Doe"
                      className="mt-2"
                    />
                  </div>
                </div>
              )}

              {withdrawalMethod === 'upi' && (
                <div>
                  <Label htmlFor="upi-id">UPI ID</Label>
                  <Input
                    id="upi-id"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="mt-2"
                  />
                </div>
              )}

              {/* Withdrawal Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Withdrawal Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Withdrawal Amount</span>
                    <span>₹{amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee</span>
                    <span>₹0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transfer Method</span>
                    <span className="capitalize">{withdrawalMethod}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Total Amount</span>
                    <span>₹{amount}</span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">Secure Transfer</p>
                  <p className="text-xs text-green-700">
                    Your withdrawal request is secure and will be processed through our verified banking partners.
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleWithdrawal}
                  disabled={processing}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  {processing ? 'Processing...' : `Withdraw ₹${amount}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
