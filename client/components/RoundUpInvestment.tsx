import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  Coins, 
  Calculator, 
  Sparkles, 
  Loader2, 
  TrendingUp,
  DollarSign,
  Target
} from "lucide-react";
import { calculateRoundUp, formatCurrency, getMotivationalMessage } from "@/lib/roundUpUtils";

interface RoundUpTransaction {
  amount: number;
  originalAmount: number;
  date: string;
}

interface RoundUpInvestmentProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  onTransactionProcessed?: (transaction: RoundUpTransaction) => void;
  className?: string;
}

export default function RoundUpInvestment({
  enabled,
  onToggle,
  onTransactionProcessed,
  className = ""
}: RoundUpInvestmentProps) {
  const [transactionAmount, setTransactionAmount] = useState('');
  const [roundUpAmount, setRoundUpAmount] = useState(0);
  const [roundedAmount, setRoundedAmount] = useState(0);
  const [processingRoundUp, setProcessingRoundUp] = useState(false);
  const [roundUpHistory, setRoundUpHistory] = useState<RoundUpTransaction[]>([
    { amount: 7, originalAmount: 43, date: '2 hours ago' },
    { amount: 3, originalAmount: 27, date: '1 day ago' },
    { amount: 8, originalAmount: 52, date: '2 days ago' },
    { amount: 5, originalAmount: 35, date: '3 days ago' }
  ]);

  // Calculate round-up amount when transaction amount changes
  useEffect(() => {
    if (transactionAmount && !isNaN(Number(transactionAmount))) {
      const amount = Number(transactionAmount);
      const calculation = calculateRoundUp(amount);
      
      setRoundedAmount(calculation.roundedAmount);
      setRoundUpAmount(calculation.roundUpAmount);
    } else {
      setRoundedAmount(0);
      setRoundUpAmount(0);
    }
  }, [transactionAmount]);

  const handleRoundUpToggle = () => {
    onToggle(!enabled);
  };

  const simulateTransaction = async () => {
    if (!transactionAmount || isNaN(Number(transactionAmount)) || Number(transactionAmount) <= 0) {
      alert('Please enter a valid transaction amount');
      return;
    }

    if (!enabled) {
      alert('Please enable round-up investment first');
      return;
    }

    setProcessingRoundUp(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create new round-up transaction
      const newRoundUp: RoundUpTransaction = {
        amount: roundUpAmount,
        originalAmount: Number(transactionAmount),
        date: 'Just now'
      };
      
      // Add to round-up history
      setRoundUpHistory(prev => [newRoundUp, ...prev.slice(0, 3)]);
      
      // Notify parent component
      if (onTransactionProcessed) {
        onTransactionProcessed(newRoundUp);
      }
      
      // Clear the input
      setTransactionAmount('');
      setRoundUpAmount(0);
      setRoundedAmount(0);

      console.log(`Round-up investment processed: ₹${roundUpAmount} from transaction of ₹${transactionAmount}`);
    } catch (error) {
      console.error('Error processing round-up:', error);
      alert('Failed to process round-up investment. Please try again.');
    } finally {
      setProcessingRoundUp(false);
    }
  };

  const totalRoundUpInvested = roundUpHistory.reduce((sum, item) => sum + item.amount, 0);
  const totalTransactions = roundUpHistory.length;
  const averageRoundUp = totalTransactions > 0 ? totalRoundUpInvested / totalTransactions : 0;

  return (
    <Card className={`bg-gradient-to-r from-green-50 to-blue-50 border-green-200 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center text-green-800">
          <Coins className="w-6 h-6 mr-2" />
          Round-up Investment
          {enabled && <Sparkles className="w-4 h-4 ml-2 text-yellow-500" />}
        </CardTitle>
        <CardDescription className="text-green-700">
          Automatically invest spare change from your daily transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Round-up Settings and Stats */}
          <div className="space-y-4">
            {/* Enable/Disable Toggle */}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
              <div>
                <Label htmlFor="roundup-toggle" className="text-sm font-medium">Enable Round-up</Label>
                <p className="text-xs text-gray-500">Round up transactions to nearest ₹10</p>
              </div>
              <Switch
                id="roundup-toggle"
                checked={enabled}
                onCheckedChange={handleRoundUpToggle}
              />
            </div>

            {/* Status Message */}
            {enabled && (
              <div className="p-4 bg-green-100 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">Round-up Active!</span>
                </div>
                <p className="text-sm text-green-700">
                  Your transactions will be automatically rounded up to the nearest ₹10 and the difference will be invested in your portfolio.
                </p>
              </div>
            )}

            {/* Round-up Statistics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border text-center">
                <div className="text-2xl font-bold text-green-600">{formatCurrency(totalRoundUpInvested)}</div>
                <div className="text-xs text-gray-500">Total Round-up Invested</div>
              </div>
              <div className="p-4 bg-white rounded-lg border text-center">
                <div className="text-2xl font-bold text-blue-600">{totalTransactions}</div>
                <div className="text-xs text-gray-500">Round-up Transactions</div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-medium mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Round-up Insights
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Round-up:</span>
                  <span className="font-medium">₹{averageRoundUp.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Largest Round-up:</span>
                  <span className="font-medium">₹{Math.max(...roundUpHistory.map(r => r.amount))}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Month:</span>
                  <span className="font-medium text-green-600">₹{totalRoundUpInvested}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Simulator */}
          <div className="space-y-4">
            {/* Calculator */}
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-medium mb-3 flex items-center">
                <Calculator className="w-4 h-4 mr-2" />
                Try Round-up Calculator
              </h4>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="transaction-amount" className="text-sm">Transaction Amount (₹)</Label>
                  <Input
                    id="transaction-amount"
                    type="number"
                    placeholder="Enter amount (e.g., 43)"
                    value={transactionAmount}
                    onChange={(e) => setTransactionAmount(e.target.value)}
                    className="mt-1"
                    disabled={!enabled}
                  />
                </div>

                {transactionAmount && roundUpAmount > 0 && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Original Amount:</span>
                  <span className="font-bold">{formatCurrency(Number(transactionAmount))}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Rounded to:</span>
                  <span className="font-bold text-blue-600">{formatCurrency(roundedAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Round-up Amount:</span>
                  <span className="font-bold text-green-600">{formatCurrency(roundUpAmount)}</span>
                </div>
                {roundUpAmount > 0 && (
                  <div className="mt-2 p-2 bg-green-50 rounded text-center">
                    <p className="text-xs text-green-700">{getMotivationalMessage(roundUpAmount)}</p>
                  </div>
                )}
                  </div>
                )}

                <Button 
                  onClick={simulateTransaction}
                  disabled={!enabled || !transactionAmount || processingRoundUp}
                  className="w-full"
                >
                  {processingRoundUp ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Coins className="w-4 h-4 mr-2" />
                      Simulate Transaction
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Recent Round-ups */}
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-medium mb-3 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Recent Round-ups
              </h4>
              <div className="space-y-2">
                {roundUpHistory.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                                               <span className="text-sm">{formatCurrency(item.originalAmount)} → {formatCurrency(item.originalAmount + item.amount)}</span>
                    </div>
                    <div className="text-right">
                                             <span className="text-sm font-medium text-green-600">+{formatCurrency(item.amount)}</span>
                      <div className="text-xs text-gray-500">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress towards goal */}
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-medium mb-3">Monthly Goal Progress</h4>
              <div className="space-y-2">
                                 <div className="flex justify-between text-sm">
                   <span>Round-up Goal: {formatCurrency(500)}</span>
                   <span>{formatCurrency(totalRoundUpInvested)}/{formatCurrency(500)}</span>
                 </div>
                <Progress value={(totalRoundUpInvested / 500) * 100} className="h-2" />
                <p className="text-xs text-gray-500">
                                     {totalRoundUpInvested >= 500 
                     ? "🎉 Goal achieved! Keep up the great work!" 
                     : `${formatCurrency(500 - totalRoundUpInvested)} more to reach your goal`
                   }
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
