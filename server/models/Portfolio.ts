import mongoose, { Document, Schema } from 'mongoose';

export interface IPortfolioHolding {
  fundName: string;
  fundCode: string;
  investmentType: 'equity_etf' | 'debt_fund' | 'gold_etf' | 'index_fund' | 'emergency_fund';
  totalUnits: number;
  averagePrice: number;
  totalInvested: number;
  currentValue: number;
  currentPrice: number;
  returns: number;
  returnsPercentage: number;
  lastUpdated: Date;
}

export interface IPortfolio extends Document {
  userId: string;
  clerkId: string;
  
  // Overall Portfolio Stats
  totalInvested: number;
  currentValue: number;
  totalReturns: number;
  returnsPercentage: number;
  
  // Holdings
  holdings: IPortfolioHolding[];
  
  // Allocation
  equityAllocation: number;
  debtAllocation: number;
  goldAllocation: number;
  emergencyFundAllocation: number;
  
  // Emergency Fund
  emergencyFundCurrent: number;
  emergencyFundGoal: number;
  emergencyFundProgress: number;
  
  // Performance Tracking
  dayChange: number;
  dayChangePercentage: number;
  monthChange: number;
  monthChangePercentage: number;
  yearChange: number;
  yearChangePercentage: number;
  
  // Last Update
  lastUpdated: Date;
  
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioHoldingSchema = new Schema<IPortfolioHolding>({
  fundName: {
    type: String,
    required: true
  },
  fundCode: {
    type: String,
    required: true
  },
  investmentType: {
    type: String,
    enum: ['equity_etf', 'debt_fund', 'gold_etf', 'index_fund', 'emergency_fund'],
    required: true
  },
  totalUnits: {
    type: Number,
    required: true,
    min: 0
  },
  averagePrice: {
    type: Number,
    required: true,
    min: 0
  },
  totalInvested: {
    type: Number,
    required: true,
    min: 0
  },
  currentValue: {
    type: Number,
    required: true,
    min: 0
  },
  currentPrice: {
    type: Number,
    required: true,
    min: 0
  },
  returns: {
    type: Number,
    required: true
  },
  returnsPercentage: {
    type: Number,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const PortfolioSchema = new Schema<IPortfolio>({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  
  // Overall Portfolio Stats
  totalInvested: {
    type: Number,
    default: 0,
    min: 0
  },
  currentValue: {
    type: Number,
    default: 0,
    min: 0
  },
  totalReturns: {
    type: Number,
    default: 0
  },
  returnsPercentage: {
    type: Number,
    default: 0
  },
  
  // Holdings
  holdings: [PortfolioHoldingSchema],
  
  // Allocation
  equityAllocation: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  debtAllocation: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  goldAllocation: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  emergencyFundAllocation: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  
  // Emergency Fund
  emergencyFundCurrent: {
    type: Number,
    default: 0,
    min: 0
  },
  emergencyFundGoal: {
    type: Number,
    default: 5000,
    min: 0
  },
  emergencyFundProgress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  
  // Performance Tracking
  dayChange: {
    type: Number,
    default: 0
  },
  dayChangePercentage: {
    type: Number,
    default: 0
  },
  monthChange: {
    type: Number,
    default: 0
  },
  monthChangePercentage: {
    type: Number,
    default: 0
  },
  yearChange: {
    type: Number,
    default: 0
  },
  yearChangePercentage: {
    type: Number,
    default: 0
  },
  
  // Last Update
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
PortfolioSchema.index({ userId: 1 });
PortfolioSchema.index({ clerkId: 1 });

export const Portfolio = mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
