import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  
  // Investment Profile
  experienceLevel: 'beginner' | 'intermediate' | 'expert';
  isVillagePartner: boolean;
  riskTolerance: 'low' | 'medium' | 'high';
  
  // Preferences
  autoInvestEnabled: boolean;
  roundUpEnabled: boolean;
  dailySipAmount: number;
  emergencyFundGoal: number;
  
  // Stats
  totalInvested: number;
  currentValue: number;
  investmentStreak: number;
  lastInvestmentDate?: Date;
  
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: String,
  lastName: String,
  phoneNumber: String,
  
  // Investment Profile
  experienceLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'expert'],
    default: 'beginner'
  },
  isVillagePartner: {
    type: Boolean,
    default: false
  },
  riskTolerance: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  },
  
  // Preferences
  autoInvestEnabled: {
    type: Boolean,
    default: false
  },
  roundUpEnabled: {
    type: Boolean,
    default: false
  },
  dailySipAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  emergencyFundGoal: {
    type: Number,
    default: 5000,
    min: 0
  },
  
  // Stats
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
  investmentStreak: {
    type: Number,
    default: 0,
    min: 0
  },
  lastInvestmentDate: Date
}, {
  timestamps: true
});

// Index for efficient queries
UserSchema.index({ isVillagePartner: 1 });

export const User = mongoose.model<IUser>('User', UserSchema);
