import { RequestHandler } from "express";
import { Portfolio } from "../models/Portfolio";
import { Investment } from "../models/Investment";
import { User } from "../models/User";

// Get user portfolio
export const getUserPortfolio: RequestHandler = async (req, res) => {
  try {
    const { clerkId } = req.params;

    if (!clerkId) {
      return res.status(400).json({ 
        error: "ClerkId is required" 
      });
    }

    const portfolio = await Portfolio.findOne({ clerkId });
    
    if (!portfolio) {
      return res.status(404).json({ 
        error: "Portfolio not found" 
      });
    }

    res.json({
      portfolio: {
        totalInvested: portfolio.totalInvested,
        currentValue: portfolio.currentValue,
        totalReturns: portfolio.totalReturns,
        returnsPercentage: portfolio.returnsPercentage,
        holdings: portfolio.holdings,
        allocation: {
          equity: portfolio.equityAllocation,
          debt: portfolio.debtAllocation,
          gold: portfolio.goldAllocation,
          emergencyFund: portfolio.emergencyFundAllocation
        },
        emergencyFund: {
          current: portfolio.emergencyFundCurrent,
          goal: portfolio.emergencyFundGoal,
          progress: portfolio.emergencyFundProgress
        },
        performance: {
          dayChange: portfolio.dayChange,
          dayChangePercentage: portfolio.dayChangePercentage,
          monthChange: portfolio.monthChange,
          monthChangePercentage: portfolio.monthChangePercentage,
          yearChange: portfolio.yearChange,
          yearChangePercentage: portfolio.yearChangePercentage
        },
        lastUpdated: portfolio.lastUpdated
      }
    });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    res.status(500).json({ 
      error: "Internal server error" 
    });
  }
};

// Get portfolio performance history
export const getPortfolioHistory: RequestHandler = async (req, res) => {
  try {
    const { clerkId } = req.params;
    const { period = '1Y' } = req.query;

    if (!clerkId) {
      return res.status(400).json({ 
        error: "ClerkId is required" 
      });
    }

    // Mock historical data - in real app, store daily snapshots
    const mockData = generateMockHistoricalData(period as string);

    res.json({
      history: mockData,
      period
    });
  } catch (error) {
    console.error("Error fetching portfolio history:", error);
    res.status(500).json({ 
      error: "Internal server error" 
    });
  }
};

// Refresh portfolio values (manual refresh)
export const refreshPortfolio: RequestHandler = async (req, res) => {
  try {
    const { clerkId } = req.params;

    if (!clerkId) {
      return res.status(400).json({ 
        error: "ClerkId is required" 
      });
    }

    // Recalculate portfolio from investments
    await recalculatePortfolio(clerkId);

    const portfolio = await Portfolio.findOne({ clerkId });

    res.json({
      message: "Portfolio refreshed successfully",
      portfolio: {
        totalInvested: portfolio?.totalInvested || 0,
        currentValue: portfolio?.currentValue || 0,
        totalReturns: portfolio?.totalReturns || 0,
        returnsPercentage: portfolio?.returnsPercentage || 0,
        lastUpdated: portfolio?.lastUpdated
      }
    });
  } catch (error) {
    console.error("Error refreshing portfolio:", error);
    res.status(500).json({ 
      error: "Internal server error" 
    });
  }
};

// Emergency fund withdrawal
export const emergencyWithdrawal: RequestHandler = async (req, res) => {
  try {
    const { clerkId } = req.params;
    const { amount, reason } = req.body;

    if (!clerkId || !amount || !reason) {
      return res.status(400).json({ 
        error: "Missing required fields" 
      });
    }

    if (amount < 10) {
      return res.status(400).json({ 
        error: "Minimum withdrawal amount is ₹10" 
      });
    }

    const portfolio = await Portfolio.findOne({ clerkId });
    const user = await User.findOne({ clerkId });

    if (!portfolio || !user) {
      return res.status(404).json({ 
        error: "Portfolio or user not found" 
      });
    }

    if (portfolio.emergencyFundCurrent < amount) {
      return res.status(400).json({ 
        error: "Insufficient emergency fund balance" 
      });
    }

    // Create withdrawal investment record
    const withdrawal = new Investment({
      userId: user._id.toString(),
      clerkId,
      investmentType: 'emergency_fund',
      fundName: 'Emergency Fund',
      fundCode: 'EMERGFUND',
      transactionType: 'sell',
      amount: amount,
      units: amount, // 1:1 for emergency fund
      pricePerUnit: 1,
      source: 'manual',
      status: 'completed',
      brokerageCharges: 0, // No charges for emergency withdrawal
      taxes: 0,
      netAmount: amount,
      transactionDate: new Date(),
      settlementDate: new Date() // Immediate settlement for emergency
    });

    await withdrawal.save();

    // Update portfolio
    portfolio.emergencyFundCurrent -= amount;
    portfolio.emergencyFundProgress = (portfolio.emergencyFundCurrent / portfolio.emergencyFundGoal) * 100;
    portfolio.currentValue -= amount;
    portfolio.totalReturns = portfolio.currentValue - portfolio.totalInvested;
    portfolio.returnsPercentage = portfolio.totalInvested > 0 
      ? (portfolio.totalReturns / portfolio.totalInvested) * 100 
      : 0;
    portfolio.lastUpdated = new Date();

    await portfolio.save();

    // Update user current value
    user.currentValue -= amount;
    await user.save();

    res.json({
      message: "Emergency withdrawal processed successfully",
      withdrawal: {
        id: withdrawal._id,
        amount,
        reason,
        transactionDate: withdrawal.transactionDate,
        status: withdrawal.status
      },
      emergencyFund: {
        current: portfolio.emergencyFundCurrent,
        goal: portfolio.emergencyFundGoal,
        progress: portfolio.emergencyFundProgress
      }
    });
  } catch (error) {
    console.error("Error processing emergency withdrawal:", error);
    res.status(500).json({ 
      error: "Internal server error" 
    });
  }
};

// Get investment recommendations
export const getRecommendations: RequestHandler = async (req, res) => {
  try {
    const { clerkId } = req.params;

    if (!clerkId) {
      return res.status(400).json({ 
        error: "ClerkId is required" 
      });
    }

    const user = await User.findOne({ clerkId });
    const portfolio = await Portfolio.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ 
        error: "User not found" 
      });
    }

    const recommendations = generateRecommendations(user, portfolio);

    res.json({
      recommendations
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ 
      error: "Internal server error" 
    });
  }
};

// Helper functions
async function recalculatePortfolio(clerkId: string): Promise<void> {
  const investments = await Investment.find({ 
    clerkId, 
    status: 'completed' 
  });

  const portfolio = await Portfolio.findOne({ clerkId });
  if (!portfolio) return;

  // Group investments by fund
  const holdings = new Map();
  let totalInvested = 0;
  let currentValue = 0;
  let emergencyFundTotal = 0;

  for (const investment of investments) {
    const key = investment.fundCode;
    
    if (investment.investmentType === 'emergency_fund') {
      if (investment.transactionType === 'buy') {
        emergencyFundTotal += investment.amount;
      } else if (investment.transactionType === 'sell') {
        emergencyFundTotal -= investment.amount;
      }
      continue;
    }

    if (!holdings.has(key)) {
      holdings.set(key, {
        fundName: investment.fundName,
        fundCode: investment.fundCode,
        investmentType: investment.investmentType,
        totalUnits: 0,
        totalInvested: 0,
        currentPrice: getMockCurrentPrice(investment.fundCode)
      });
    }

    const holding = holdings.get(key);
    
    if (investment.transactionType === 'buy') {
      holding.totalUnits += investment.units;
      holding.totalInvested += investment.amount;
      totalInvested += investment.amount;
    } else if (investment.transactionType === 'sell') {
      holding.totalUnits -= investment.units;
      holding.totalInvested -= investment.amount;
      totalInvested -= investment.amount;
    }
  }

  // Calculate current values and returns
  const holdingsArray = Array.from(holdings.values()).map(holding => {
    holding.averagePrice = holding.totalInvested / holding.totalUnits;
    holding.currentValue = holding.totalUnits * holding.currentPrice;
    holding.returns = holding.currentValue - holding.totalInvested;
    holding.returnsPercentage = (holding.returns / holding.totalInvested) * 100;
    holding.lastUpdated = new Date();
    
    currentValue += holding.currentValue;
    return holding;
  });

  // Add emergency fund to total
  currentValue += emergencyFundTotal;
  totalInvested += emergencyFundTotal;

  // Update portfolio
  portfolio.holdings = holdingsArray;
  portfolio.totalInvested = totalInvested;
  portfolio.currentValue = currentValue;
  portfolio.totalReturns = currentValue - totalInvested;
  portfolio.returnsPercentage = totalInvested > 0 ? (portfolio.totalReturns / totalInvested) * 100 : 0;
  portfolio.emergencyFundCurrent = emergencyFundTotal;
  portfolio.emergencyFundProgress = (emergencyFundTotal / portfolio.emergencyFundGoal) * 100;
  portfolio.lastUpdated = new Date();

  await portfolio.save();

  // Update user stats
  const user = await User.findOne({ clerkId });
  if (user) {
    user.totalInvested = totalInvested;
    user.currentValue = currentValue;
    await user.save();
  }
}

function getMockCurrentPrice(fundCode: string): number {
  // Mock price with slight variations
  const basePrices: { [key: string]: number } = {
    'NIFTY50': 125.50,
    'BANKNIFTY': 245.75,
    'LIQUIDFUND': 1000.00,
    'GOLDETF': 45.25
  };
  
  const basePrice = basePrices[fundCode] || 100.00;
  const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
  return basePrice * (1 + variation);
}

function generateMockHistoricalData(period: string) {
  const dataPoints = period === '1M' ? 30 : period === '6M' ? 180 : 365;
  const data = [];
  let value = 1000;

  for (let i = 0; i < dataPoints; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (dataPoints - i));
    
    // Add some random growth
    value += (Math.random() - 0.4) * 50; // Slight upward bias
    value = Math.max(value, 100); // Don't go below 100
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value * 100) / 100
    });
  }

  return data;
}

function generateRecommendations(user: any, portfolio: any) {
  const recommendations = [];

  // Emergency fund recommendation
  if (!portfolio || portfolio.emergencyFundProgress < 50) {
    recommendations.push({
      type: 'emergency_fund',
      title: 'Build Emergency Fund',
      description: 'Consider increasing your emergency fund to cover 3-6 months of expenses',
      priority: 'high',
      suggestedAmount: 2000
    });
  }

  // SIP recommendation
  if (!user.autoInvestEnabled || user.dailySipAmount < 50) {
    recommendations.push({
      type: 'sip',
      title: 'Start Daily SIP',
      description: 'Enable automatic daily investments to build wealth consistently',
      priority: 'medium',
      suggestedAmount: 50
    });
  }

  // Round-up recommendation
  if (!user.roundUpEnabled) {
    recommendations.push({
      type: 'roundup',
      title: 'Enable Round-up Investments',
      description: 'Automatically invest spare change from your transactions',
      priority: 'low',
      suggestedAmount: 0
    });
  }

  return recommendations;
}
