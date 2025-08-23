/**
 * Utility functions for formatting values consistently across the application
 */

/**
 * Format a number as Indian Rupees (₹)
 */
export const formatCurrency = (amount: number): string => {
  if (amount === 0) return '₹0';
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format a number as Indian Rupees with change indicator
 */
export const formatCurrencyChange = (amount: number, showSign: boolean = true): string => {
  if (amount === 0) return '₹0';
  
  const sign = showSign && amount > 0 ? '+' : '';
  const formatted = formatCurrency(Math.abs(amount));
  
  return `${sign}${formatted}`;
};

/**
 * Format percentage with sign
 */
export const formatPercentage = (percentage: number, showSign: boolean = true): string => {
  if (percentage === 0) return '0%';
  
  const sign = showSign && percentage > 0 ? '+' : '';
  return `${sign}${percentage.toFixed(1)}%`;
};

/**
 * Format large numbers with K, L, Cr suffixes
 */
export const formatCompactCurrency = (amount: number): string => {
  if (amount === 0) return '₹0';
  
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  
  return formatCurrency(amount);
};

/**
 * Format date in a readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);
  const diffInDays = diffInHours / 24;
  
  if (diffInDays >= 1) {
    return `${Math.floor(diffInDays)} day${Math.floor(diffInDays) > 1 ? 's' : ''} ago`;
  } else if (diffInHours >= 1) {
    return `${Math.floor(diffInHours)} hour${Math.floor(diffInHours) > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
};
