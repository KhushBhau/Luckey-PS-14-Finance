import { RequestHandler } from "express";
import { Investment } from "../models/Investment";
import { User } from "../models/User";
import { Portfolio } from "../models/Portfolio";

// Create a new investment
export const createInvestment: RequestHandler = async (req, res) => {
  try {
    const { 
      clerkId, 
      investmentType, 
      fundName, 
      fundCode, 
      amount, 
      source = 'manual' 
    } = req.body;

    if (!clerkId || !investmentType || !fundName || !fundCode || !amount) {
      return res.status(400).json({ 
        error: "Missing required fields" 
      });
    }

    if (amount < 10) {
      return res.status(400).json({ 
        error: "Minimum investment amount is ₹10" 
      });
    }

    // Find user
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ 
        error: "User not found" 
      });
    }

    // Mock price calculation (in real app, fetch from market data API)
    const pricePerUnit = getMockPrice(fundCode);
    const units = amount / pricePerUnit;
    const brokerageCharges = Math.max(amount * 0.001, 1); // 0.1% or min ₹1
    const taxes = amount * 0.001; // 0.1% tax
    const netAmount = amount - brokerageCharges - taxes;

    // Create investment record
    const investment = new Investment({
      userId: user._id.toString(),
      clerkId,
      investmentType,
      fundName,
      fundCode,
      transactionType: 'buy',
      amount,
      units,
      pricePerUnit,
      source,
      status: 'completed', // In real app, this would be 'pending' initially
      brokerageCharges,
      taxes,
      netAmount,
      transactionDate: new Date(),
      settlementDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // T+2 settlement
    });

    await investment.save();

    // Update user stats
    user.totalInvested += amount;
    user.currentValue += netAmount;
    user.lastInvestmentDate = new Date();
    
    // Update investment streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (user.lastInvestmentDate && user.lastInvestmentDate >= yesterday) {
      user.investmentStreak += 1;
    } else {
      user.investmentStreak = 1;
    }

    await user.save();

    // Update portfolio
    await updatePortfolio(user._id.toString(), clerkId);

    res.status(201).json({
      message: "Investment created successfully",
      investment: {
        id: investment._id,
        investmentType: investment.investmentType,
        fundName: investment.fundName,
        amount: investment.amount,
        units: investment.units,
        pricePerUnit: investment.pricePerUnit,
        source: investment.source,
        status: investment.status,
        transactionDate: investment.transactionDate
      }
    });
  } catch (error) {
    console.error("Error creating investment:", error);
    res.status(500).json({ 
      error: "Internal server error" 
    });
  }
};

// Get user investments
export const getUserInvestments: RequestHandler = async (req, res) => {
  try {
    const { clerkId } = req.params;
    const { page = 1, limit = 20, type, source } = req.query;

    if (!clerkId) {
      return res.status(400).json({ 
        error: "ClerkId is required" 
      });
    }

    // Build filter
    const filter: any = { clerkId };
    if (type) filter.investmentType = type;
    if (source) filter.source = source;

    const investments = await Investment
      .find(filter)
      .sort({ transactionDate: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Investment.countDocuments(filter);

    res.json({
      investments: investments.map(inv => ({
        id: inv._id,
        investmentType: inv.investmentType,
        fundName: inv.fundName,
        fundCode: inv.fundCode,
        transactionType: inv.transactionType,
        amount: inv.amount,
        units: inv.units,
        pricePerUnit: inv.pricePerUnit,
        source: inv.source,
        status: inv.status,
        transactionDate: inv.transactionDate
      })),
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error("Error fetching investments:", error);
    res.status(500).json({ 
      error: "Internal server error" 
    });
  }
};

// Process round-up investment
export const processRoundUp: RequestHandler = async (req, res) => {
  try {
    const { clerkId, transactionAmount } = req.body;

    if (!clerkId || !transactionAmount) {
      return res.status(400).json({ 
        error: "Missing required fields" 
      });
    }

    // Calculate round-up amount
    const roundedAmount = Math.ceil(transactionAmount / 10) * 10;
    const roundUpAmount = roundedAmount - transactionAmount;

    if (roundUpAmount < 1) {
      return res.status(400).json({ 
        error: "Round-up amount too small" 
      });
    }

    // Check if user has round-up enabled
    const user = await User.findOne({ clerkId });
    if (!user || !user.roundUpEnabled) {
      return res.status(400).json({ 
        error: "Round-up not enabled for user" 
      });
    }

    // Create round-up investment (invest in balanced portfolio)
    const fundCode = getDefaultFundForRoundUp(user.experienceLevel);
    const fundName = getFundName(fundCode);
    const investmentType = getInvestmentType(fundCode);

    const req_body = {
      clerkId,
      investmentType,
      fundName,
      fundCode,
      amount: roundUpAmount,
      source: 'roundup'
    };

    // Reuse createInvestment logic
    req.body = req_body;
    return createInvestment(req, res, () => {});
  } catch (error) {
    console.error("Error processing round-up:", error);
    res.status(500).json({ 
      error: "Internal server error" 
    });
  }
};

// Process daily SIP
export const processDailySIP: RequestHandler = async (req, res) => {
  try {
    const { clerkId } = req.body;

    if (!clerkId) {
      return res.status(400).json({ 
        error: "ClerkId is required" 
      });
    }

    const user = await User.findOne({ clerkId });
    if (!user || !user.autoInvestEnabled || user.dailySipAmount < 1) {
      return res.status(400).json({ 
        error: "Daily SIP not enabled or amount too small" 
      });
    }

    // Get recommended fund based on user experience
    const fundCode = getRecommendedFund(user.experienceLevel, user.riskTolerance);
    const fundName = getFundName(fundCode);
    const investmentType = getInvestmentType(fundCode);

    const req_body = {
      clerkId,
      investmentType,
      fundName,
      fundCode,
      amount: user.dailySipAmount,
      source: 'sip'
    };

    // Reuse createInvestment logic
    req.body = req_body;
    return createInvestment(req, res, () => {});
  } catch (error) {
    console.error("Error processing daily SIP:", error);
    res.status(500).json({ 
      error: "Internal server error" 
    });
  }
};

// Helper functions (Mock implementations)
function getMockPrice(fundCode: string): number {
  const prices: { [key: string]: number } = {
    'NIFTY50': 125.50,
    'BANKNIFTY': 245.75,
    'LIQUIDFUND': 1000.00,
    'GOLDETF': 45.25,
    'EMERGFUND': 10.00
  };
  return prices[fundCode] || 100.00;
}

function getDefaultFundForRoundUp(experienceLevel: string): string {
  switch (experienceLevel) {
    case 'beginner': return 'LIQUIDFUND';
    case 'intermediate': return 'NIFTY50';
    case 'expert': return 'BANKNIFTY';
    default: return 'LIQUIDFUND';
  }
}

function getRecommendedFund(experienceLevel: string, riskTolerance: string): string {
  if (experienceLevel === 'beginner' || riskTolerance === 'low') {
    return 'LIQUIDFUND';
  } else if (experienceLevel === 'intermediate' || riskTolerance === 'medium') {
    return 'NIFTY50';
  } else {
    return 'BANKNIFTY';
  }
}

function getFundName(fundCode: string): string {
  const names: { [key: string]: string } = {
    'NIFTY50': 'Nifty 50 ETF',
    'BANKNIFTY': 'Bank Nifty ETF',
    'LIQUIDFUND': 'Liquid Fund',
    'GOLDETF': 'Gold ETF',
    'EMERGFUND': 'Emergency Fund'
  };
  return names[fundCode] || 'Unknown Fund';
}

function getInvestmentType(fundCode: string): string {
  const types: { [key: string]: string } = {
    'NIFTY50': 'equity_etf',
    'BANKNIFTY': 'equity_etf',
    'LIQUIDFUND': 'debt_fund',
    'GOLDETF': 'gold_etf',
    'EMERGFUND': 'emergency_fund'
  };
  return types[fundCode] || 'equity_etf';
}

async function updatePortfolio(userId: string, clerkId: string): Promise<void> {
  // Mock portfolio update - in real app, calculate from all investments
  const portfolio = await Portfolio.findOne({ clerkId });
  if (portfolio) {
    // Recalculate portfolio values
    const user = await User.findOne({ clerkId });
    if (user) {
      portfolio.totalInvested = user.totalInvested;
      portfolio.currentValue = user.currentValue;
      portfolio.totalReturns = user.currentValue - user.totalInvested;
      portfolio.returnsPercentage = user.totalInvested > 0 
        ? (portfolio.totalReturns / user.totalInvested) * 100 
        : 0;
      portfolio.lastUpdated = new Date();
      await portfolio.save();
    }
  }
}
