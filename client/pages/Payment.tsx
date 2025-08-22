import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import NotificationPanel from "@/components/NotificationPanel";
import { 
  TrendingUp, 
  CreditCard,
  DollarSign,
  CheckCircle,
  ArrowLeft,
  Shield,
  Lock,
  Zap,
  Bell
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Payment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const quickAmounts = [100, 500, 1000, 2000, 5000];

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount.toString());
  };

  const handlePayment = async () => {
    setProcessing(true);
    
    // Validate payment details based on method
    if (paymentMethod === 'upi' && !upiId) {
      alert('Please enter your UPI ID');
      setProcessing(false);
      return;
    }
    
    if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name)) {
      alert('Please fill in all card details');
      setProcessing(false);
      return;
    }
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProcessing(false);
    setSuccess(true);
    
    // Redirect to dashboard after 3 seconds
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">
              ₹{amount} has been added to your investment account
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-green-700">
                Your money will be invested according to your preferences within 24 hours.
              </p>
            </div>
            <Button onClick={() => navigate('/dashboard')} className="w-full">
              Continue to Dashboard
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Money</h1>
          <p className="text-gray-600">Add funds to your investment account</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'
            }`}>
              1
            </div>
            <span className="ml-2 text-sm font-medium">Amount</span>
          </div>
          <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'
            }`}>
              2
            </div>
            <span className="ml-2 text-sm font-medium">Payment</span>
          </div>
        </div>

        {/* Step 1: Amount Selection */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Amount</CardTitle>
              <CardDescription>Choose how much you want to invest</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quick Amount Buttons */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Quick Select</Label>
                <div className="grid grid-cols-3 gap-3">
                  {quickAmounts.map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      variant={amount === quickAmount.toString() ? 'default' : 'outline'}
                      onClick={() => handleAmountSelect(quickAmount)}
                      className="h-12"
                    >
                      ₹{quickAmount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
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
                    min="10"
                    className="pl-8"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Minimum amount: ₹10
                </p>
              </div>

              {/* Investment Info */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Investment Benefits</span>
                </div>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Your money will be invested in diversified funds</li>
                  <li>• Start earning returns from day one</li>
                  <li>• No hidden charges or fees</li>
                  <li>• Withdraw anytime without penalties</li>
                </ul>
              </div>

              <Button 
                onClick={() => setStep(2)}
                disabled={!amount || Number(amount) < 10}
                className="w-full"
              >
                Continue to Payment
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Payment Method */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Choose your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment Method Selection */}
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center space-x-3 cursor-pointer">
                      <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-sm">UPI</span>
                      </div>
                      <div>
                        <div className="font-medium">UPI Payment</div>
                        <div className="text-sm text-gray-500">Pay using UPI ID or QR code</div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center space-x-3 cursor-pointer">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Credit/Debit Card</div>
                        <div className="text-sm text-gray-500">Pay using card details</div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Label htmlFor="netbanking" className="flex items-center space-x-3 cursor-pointer">
                      <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Net Banking</div>
                        <div className="text-sm text-gray-500">Pay using your bank account</div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {/* Payment Details */}
              {paymentMethod === 'upi' && (
                <div className="space-y-4">
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
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-2">Or scan QR code</p>
                    <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                      <span className="text-gray-500 text-xs">QR Code</span>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                      id="card-number"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                      placeholder="1234 5678 9012 3456"
                      className="mt-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                        placeholder="MM/YY"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        placeholder="123"
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="card-name">Cardholder Name</Label>
                    <Input
                      id="card-name"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                      placeholder="John Doe"
                      className="mt-2"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div>
                  <Label htmlFor="bank">Select Bank</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sbi">State Bank of India</SelectItem>
                      <SelectItem value="hdfc">HDFC Bank</SelectItem>
                      <SelectItem value="icici">ICICI Bank</SelectItem>
                      <SelectItem value="axis">Axis Bank</SelectItem>
                      <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Payment Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Payment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Amount to Invest</span>
                    <span>₹{amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee</span>
                    <span>₹0</span>
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
                  <p className="text-sm font-medium text-green-800">Secure Payment</p>
                  <p className="text-xs text-green-700">
                    Your payment information is encrypted and secure. We use industry-standard security protocols.
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
                  onClick={handlePayment}
                  disabled={processing}
                  className="flex-1"
                >
                  {processing ? 'Processing...' : `Pay ₹${amount}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
