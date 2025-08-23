import mongoose, { Document, Schema } from 'mongoose';

export interface IInvestment extends Document {
  userId: string;
  clerkId: string;
  
  // Investment Details
  investmentType: 'equity_etf' | 'debt_fund' | 'gold_etf' | 'index_fund' | 'emergency_fund';
  fundName: string;
  fundCode: string;
  
  // Transaction Details
  transactionType: 'buy' | 'sell' | 'dividend';
  amount: number;
  units: number;
  pricePerUnit: number;
  
  // Source of Investment
  source: 'manual' | 'sip' | 'roundup' | 'streak_bonus' | 'village_partner';
  
  // Status
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  
  // Metadata
  transactionId?: string;
  brokerageCharges: number;
  taxes: number;
  netAmount: number;
  
  // Dates
  transactionDate: Date;
  settlementDate?: Date;
  
  // Metadata for additional information
  metadata?: {
    reason?: string;
    withdrawalMethod?: string;
    bankDetails?: {
      accountNumber: string;
      ifscCode: string;
      accountHolderName: string;
    };
    upiId?: string;
    [key: string]: any;
  };
  
  createdAt: Date;
  updatedAt: Date;
}

const InvestmentSchema = new Schema<IInvestment>({
  userId: {
    type: String,
    required: true
  },
  clerkId: {
    type: String,
    required: true
  },
  
  // Investment Details
  investmentType: {
    type: String,
    enum: ['equity_etf', 'debt_fund', 'gold_etf', 'index_fund', 'emergency_fund'],
    required: true
  },
  fundName: {
    type: String,
    required: true
  },
  fundCode: {
    type: String,
    required: true
  },
  
  // Transaction Details
  transactionType: {
    type: String,
    enum: ['buy', 'sell', 'dividend'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  units: {
    type: Number,
    required: true,
    min: 0
  },
  pricePerUnit: {
    type: Number,
    required: true,
    min: 0
  },
  
  // Source of Investment
  source: {
    type: String,
    enum: ['manual', 'sip', 'roundup', 'streak_bonus', 'village_partner'],
    required: true
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  
  // Metadata
  transactionId: String,
  brokerageCharges: {
    type: Number,
    default: 0,
    min: 0
  },
  taxes: {
    type: Number,
    default: 0,
    min: 0
  },
  netAmount: {
    type: Number,
    required: true
  },
  
  // Dates
  transactionDate: {
    type: Date,
    default: Date.now
  },
  settlementDate: Date,
  
  // Metadata
  metadata: {
    type: Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
InvestmentSchema.index({ userId: 1, transactionDate: -1 });
InvestmentSchema.index({ clerkId: 1 });
InvestmentSchema.index({ investmentType: 1 });
InvestmentSchema.index({ source: 1 });
InvestmentSchema.index({ status: 1 });

export const Investment = mongoose.model<IInvestment>('Investment', InvestmentSchema);
