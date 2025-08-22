import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  RefreshCw,
  Calendar,
  DollarSign
} from "lucide-react";

interface Withdrawal {
  _id: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled' | 'failed';
  transactionDate: string;
  settlementDate?: string;
  transactionId: string;
  metadata?: {
    reason?: string;
    withdrawalMethod?: string;
  };
}

interface WithdrawalHistoryProps {
  clerkId: string;
}

export default function WithdrawalHistory({ clerkId }: WithdrawalHistoryProps) {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/withdrawals/${clerkId}/history`);
      const data = await response.json();
      
      if (data.success) {
        setWithdrawals(data.data.withdrawals);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch withdrawal history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, [clerkId]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Cancelled</Badge>;
      case 'failed':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getReasonIcon = (reason?: string) => {
    switch (reason) {
      case 'medical':
        return '🏥';
      case 'education':
        return '📚';
      case 'vehicle':
        return '🚗';
      case 'home':
        return '🏠';
      default:
        return '⚠️';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal History</CardTitle>
          <CardDescription>Your recent emergency withdrawals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-500">Loading...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal History</CardTitle>
          <CardDescription>Your recent emergency withdrawals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-600">{error}</p>
            <Button onClick={fetchWithdrawals} variant="outline" className="mt-4">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Withdrawal History</CardTitle>
            <CardDescription>Your recent emergency withdrawals</CardDescription>
          </div>
          <Button onClick={fetchWithdrawals} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {withdrawals.length === 0 ? (
          <div className="text-center py-8">
            <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No withdrawal history found</p>
            <p className="text-sm text-gray-400">Your emergency withdrawals will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {withdrawals.map((withdrawal) => (
              <div key={withdrawal._id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(withdrawal.status)}
                    <div>
                      <p className="font-medium">₹{withdrawal.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">
                        {withdrawal.metadata?.reason ? (
                          <span className="flex items-center">
                            <span className="mr-1">{getReasonIcon(withdrawal.metadata.reason)}</span>
                            {withdrawal.metadata.reason.charAt(0).toUpperCase() + withdrawal.metadata.reason.slice(1)} Emergency
                          </span>
                        ) : (
                          'Emergency Withdrawal'
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(withdrawal.status)}
                    <p className="text-xs text-gray-500 mt-1">
                      {withdrawal.transactionId}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">
                      {formatDate(withdrawal.transactionDate)}
                    </span>
                  </div>
                  {withdrawal.metadata?.withdrawalMethod && (
                    <div className="text-gray-600">
                      <span className="capitalize">{withdrawal.metadata.withdrawalMethod}</span>
                    </div>
                  )}
                </div>
                
                {withdrawal.settlementDate && (
                  <div className="mt-2 text-xs text-gray-500">
                    Settled: {formatDate(withdrawal.settlementDate)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
