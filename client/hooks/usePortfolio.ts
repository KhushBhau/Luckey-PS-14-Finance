import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { apiRequest, API_ENDPOINTS } from '@/lib/api';

export interface PortfolioData {
  totalInvested: number;
  currentValue: number;
  totalReturns: number;
  returnsPercentage: number;
  holdings: Array<{
    fundName: string;
    fundCode: string;
    investmentType: string;
    totalUnits: number;
    totalInvested: number;
    currentPrice: number;
    averagePrice: number;
    currentValue: number;
    returns: number;
    returnsPercentage: number;
    lastUpdated: string;
  }>;
  allocation: {
    equity: number;
    debt: number;
    gold: number;
    emergencyFund: number;
  };
  emergencyFund: {
    current: number;
    goal: number;
    progress: number;
  };
  performance: {
    dayChange: number;
    dayChangePercentage: number;
    monthChange: number;
    monthChangePercentage: number;
    yearChange: number;
    yearChangePercentage: number;
  };
  lastUpdated: string;
}

export interface PortfolioHistory {
  date: string;
  value: number;
  invested: number;
  returns: number;
}

export const usePortfolio = () => {
  const { user } = useUser();
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [portfolioHistory, setPortfolioHistory] = useState<PortfolioHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const data = await apiRequest(API_ENDPOINTS.PORTFOLIO(user.id));
      setPortfolioData(data.portfolio);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portfolio data');
      console.error('Error fetching portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPortfolioHistory = async (period: string = '1Y') => {
    if (!user?.id) return;
    
    try {
      const data = await apiRequest(API_ENDPOINTS.PORTFOLIO_HISTORY(user.id) + `?period=${period}`);
      setPortfolioHistory(data.history);
    } catch (err) {
      console.error('Error fetching portfolio history:', err);
    }
  };

  const refreshPortfolio = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      await apiRequest(API_ENDPOINTS.PORTFOLIO_REFRESH(user.id), {
        method: 'POST',
      });
      
      // Fetch updated data
      await fetchPortfolio();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh portfolio');
      console.error('Error refreshing portfolio:', err);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchPortfolio();
      fetchPortfolioHistory();
    }
  }, [user?.id]);

  return {
    portfolioData,
    portfolioHistory,
    loading,
    error,
    fetchPortfolio,
    fetchPortfolioHistory,
    refreshPortfolio,
  };
};
