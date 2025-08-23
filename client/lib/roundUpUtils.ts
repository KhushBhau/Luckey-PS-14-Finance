/**
 * Round-up investment utility functions
 */

export interface RoundUpCalculation {
  originalAmount: number;
  roundedAmount: number;
  roundUpAmount: number;
}

/**
 * Calculate round-up amount for a given transaction amount
 * Rounds up to the nearest ₹10
 */
export function calculateRoundUp(transactionAmount: number): RoundUpCalculation {
  const roundedAmount = Math.ceil(transactionAmount / 10) * 10;
  const roundUpAmount = roundedAmount - transactionAmount;
  
  return {
    originalAmount: transactionAmount,
    roundedAmount,
    roundUpAmount
  };
}

/**
 * Calculate total round-up amount for multiple transactions
 */
export function calculateTotalRoundUp(transactions: number[]): number {
  return transactions.reduce((total, amount) => {
    const { roundUpAmount } = calculateRoundUp(amount);
    return total + roundUpAmount;
  }, 0);
}

/**
 * Generate example transactions for demonstration
 */
export function generateExampleTransactions(count: number = 10): number[] {
  const examples = [
    43, 127, 89, 156, 234, 67, 189, 145, 278, 92,
    134, 267, 78, 345, 123, 456, 89, 234, 167, 289
  ];
  
  return examples.slice(0, count);
}

/**
 * Calculate potential growth over time with compound interest
 */
export function calculatePotentialGrowth(
  monthlyInvestment: number, 
  years: number, 
  annualReturnRate: number = 0.10
): number {
  const monthlyRate = annualReturnRate / 12;
  const months = years * 12;
  
  // Future value of a series of payments (monthly investments)
  const futureValue = monthlyInvestment * 
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  
  return Math.round(futureValue);
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Get round-up statistics from transaction history
 */
export interface RoundUpStats {
  totalInvested: number;
  totalTransactions: number;
  averageRoundUp: number;
  largestRoundUp: number;
  smallestRoundUp: number;
}

export function calculateRoundUpStats(transactions: number[]): RoundUpStats {
  if (transactions.length === 0) {
    return {
      totalInvested: 0,
      totalTransactions: 0,
      averageRoundUp: 0,
      largestRoundUp: 0,
      smallestRoundUp: 0
    };
  }

  const roundUps = transactions.map(amount => calculateRoundUp(amount).roundUpAmount);
  const totalInvested = roundUps.reduce((sum, amount) => sum + amount, 0);
  
  return {
    totalInvested,
    totalTransactions: transactions.length,
    averageRoundUp: totalInvested / transactions.length,
    largestRoundUp: Math.max(...roundUps),
    smallestRoundUp: Math.min(...roundUps)
  };
}

/**
 * Validate if a transaction amount is eligible for round-up
 */
export function isEligibleForRoundUp(amount: number): boolean {
  return amount > 0 && amount < 10000; // Reasonable limits
}

/**
 * Get motivational message based on round-up amount
 */
export function getMotivationalMessage(roundUpAmount: number): string {
  if (roundUpAmount >= 10) {
    return "🎉 Great! That's a significant round-up!";
  } else if (roundUpAmount >= 5) {
    return "👍 Nice! Every little bit counts!";
  } else if (roundUpAmount >= 1) {
    return "💪 Small steps lead to big results!";
  } else {
    return "✨ Even small amounts add up over time!";
  }
}
