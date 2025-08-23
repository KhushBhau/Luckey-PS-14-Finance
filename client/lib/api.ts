/**
 * API configuration and utility functions
 */

// Base API URL - adjust based on your environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Make an API request with proper error handling
 */
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  // User endpoints
  USERS: (clerkId: string) => `/api/users/${clerkId}`,
  USER_DASHBOARD: (clerkId: string) => `/api/users/${clerkId}/dashboard`,
  
  // Portfolio endpoints
  PORTFOLIO: (clerkId: string) => `/api/portfolio/${clerkId}`,
  PORTFOLIO_HISTORY: (clerkId: string) => `/api/portfolio/${clerkId}/history`,
  PORTFOLIO_REFRESH: (clerkId: string) => `/api/portfolio/${clerkId}/refresh`,
  PORTFOLIO_RECOMMENDATIONS: (clerkId: string) => `/api/portfolio/${clerkId}/recommendations`,
  
  // Investment endpoints
  INVESTMENTS: '/api/investments',
  USER_INVESTMENTS: (clerkId: string) => `/api/investments/${clerkId}`,
  ROUNDUP_INVESTMENT: '/api/investments/roundup',
  SIP_INVESTMENT: '/api/investments/sip',
  
  // Withdrawal endpoints
  EMERGENCY_WITHDRAWAL: (clerkId: string) => `/api/withdrawals/${clerkId}/emergency`,
  WITHDRAWAL_HISTORY: (clerkId: string) => `/api/withdrawals/${clerkId}/history`,
  WITHDRAWAL_STATUS: (withdrawalId: string) => `/api/withdrawals/${withdrawalId}/status`,
  CANCEL_WITHDRAWAL: (withdrawalId: string) => `/api/withdrawals/${withdrawalId}/cancel`,
} as const;
