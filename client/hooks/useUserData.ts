import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { apiRequest, API_ENDPOINTS } from '@/lib/api';

export interface UserData {
  clerkId: string;
  totalInvested: number;
  currentValue: number;
  investmentStreak: number;
  lastInvestmentDate: string;
  emergencyFundGoal: number;
  emergencyFundCurrent: number;
  roundUpEnabled: boolean;
  sipEnabled: boolean;
  dailySipAmount: number;
  totalBonuses: number;
  totalChallenges: number;
  completedChallenges: number;
}

export const useUserData = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const data = await apiRequest(API_ENDPOINTS.USER_DASHBOARD(user.id));
      setUserData(data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user data');
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserData = async (updates: Partial<UserData>) => {
    if (!user?.id) return;
    
    try {
      await apiRequest(API_ENDPOINTS.USERS(user.id), {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      
      // Refresh user data
      await fetchUserData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user data');
      console.error('Error updating user data:', err);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserData();
    }
  }, [user?.id]);

  return {
    userData,
    loading,
    error,
    fetchUserData,
    updateUserData,
  };
};
