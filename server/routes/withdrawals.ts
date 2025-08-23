import { Request, Response } from 'express';
import { User } from '../models/User';
import { Investment } from '../models/Investment';
import { Portfolio } from '../models/Portfolio';

// Create emergency withdrawal
export const createEmergencyWithdrawal = async (req: Request, res: Response) => {
  try {
    const { clerkId } = req.params;
    const { 
      amount, 
      reason, 
      withdrawalMethod, 
      bankDetails, 
      upiId 
    } = req.body;

    // Validate required fields
    if (!amount || !reason || !withdrawalMethod) {
      return res.status(400).json({
        success: false,
        message: 'Amount, reason, and withdrawal method are required'
      });
    }

    // Get user and portfolio
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const portfolio = await Portfolio.findOne({ clerkId });
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    // Validate withdrawal amount
    const availableBalance = Math.min(portfolio.currentValue, portfolio.emergencyFundCurrent);
    if (amount > availableBalance) {
      return res.status(400).json({
        success: false,
        message: `Insufficient funds. Maximum withdrawal amount: ₹${availableBalance}`
      });
    }

    if (amount < 100) {
      return res.status(400).json({
        success: false,
        message: 'Minimum withdrawal amount is ₹100'
      });
    }

    // Create withdrawal record
    const withdrawal = new Investment({
      userId: user._id,
      clerkId,
      investmentType: 'emergency_fund',
      fundName: 'Emergency Withdrawal',
      fundCode: 'EMG_WD',
      transactionType: 'sell',
      amount: amount,
      units: amount / 100, // Assuming 1 unit = ₹100
      pricePerUnit: 100,
      source: 'emergency_withdrawal',
      status: 'pending',
      transactionId: `WD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      brokerageCharges: 0,
      taxes: 0,
      netAmount: amount,
      transactionDate: new Date(),
      metadata: {
        reason,
        withdrawalMethod,
        bankDetails: withdrawalMethod === 'bank' ? bankDetails : null,
        upiId: withdrawalMethod === 'upi' ? upiId : null
      }
    });

    await withdrawal.save();

    // Update portfolio
    portfolio.emergencyFundCurrent -= amount;
    portfolio.currentValue -= amount;
    portfolio.totalInvested -= amount;
    
    // Recalculate percentages
    if (portfolio.currentValue > 0) {
      portfolio.emergencyFundProgress = (portfolio.emergencyFundCurrent / portfolio.emergencyFundGoal) * 100;
    } else {
      portfolio.emergencyFundProgress = 0;
    }

    await portfolio.save();

    // Update user stats
    user.totalInvested -= amount;
    user.currentValue -= amount;
    await user.save();

    // Simulate processing delay (in real implementation, this would trigger actual bank transfer)
    setTimeout(async () => {
      withdrawal.status = 'completed';
      withdrawal.settlementDate = new Date();
      await withdrawal.save();
      
      // Here you would integrate with actual payment gateway/banking API
      console.log(`Emergency withdrawal processed: ₹${amount} for user ${clerkId}`);
    }, 2000);

    res.status(201).json({
      success: true,
      message: 'Emergency withdrawal request created successfully',
      data: {
        withdrawalId: withdrawal._id,
        amount,
        status: 'pending',
        estimatedProcessingTime: '2-4 hours',
        transactionId: withdrawal.transactionId
      }
    });

  } catch (error) {
    console.error('Emergency withdrawal error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get withdrawal history
export const getWithdrawalHistory = async (req: Request, res: Response) => {
  try {
    const { clerkId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const withdrawals = await Investment.find({
      clerkId,
      source: 'emergency_withdrawal'
    })
    .sort({ transactionDate: -1 })
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit));

    const total = await Investment.countDocuments({
      clerkId,
      source: 'emergency_withdrawal'
    });

    res.status(200).json({
      success: true,
      data: {
        withdrawals,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(total / Number(limit)),
          totalItems: total,
          itemsPerPage: Number(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get withdrawal history error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get withdrawal status
export const getWithdrawalStatus = async (req: Request, res: Response) => {
  try {
    const { withdrawalId } = req.params;

    const withdrawal = await Investment.findById(withdrawalId);
    if (!withdrawal) {
      return res.status(404).json({
        success: false,
        message: 'Withdrawal not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        withdrawalId: withdrawal._id,
        amount: withdrawal.amount,
        status: withdrawal.status,
        transactionDate: withdrawal.transactionDate,
        settlementDate: withdrawal.settlementDate,
        transactionId: withdrawal.transactionId,
        reason: withdrawal.metadata?.reason,
        withdrawalMethod: withdrawal.metadata?.withdrawalMethod
      }
    });

  } catch (error) {
    console.error('Get withdrawal status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Cancel pending withdrawal
export const cancelWithdrawal = async (req: Request, res: Response) => {
  try {
    const { withdrawalId } = req.params;
    const { clerkId } = req.body;

    const withdrawal = await Investment.findById(withdrawalId);
    if (!withdrawal) {
      return res.status(404).json({
        success: false,
        message: 'Withdrawal not found'
      });
    }

    if (withdrawal.clerkId !== clerkId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to cancel this withdrawal'
      });
    }

    if (withdrawal.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending withdrawals can be cancelled'
      });
    }

    // Cancel withdrawal
    withdrawal.status = 'cancelled';
    await withdrawal.save();

    // Restore portfolio balance
    const portfolio = await Portfolio.findOne({ clerkId });
    if (portfolio) {
      portfolio.emergencyFundCurrent += withdrawal.amount;
      portfolio.currentValue += withdrawal.amount;
      portfolio.totalInvested += withdrawal.amount;
      portfolio.emergencyFundProgress = (portfolio.emergencyFundCurrent / portfolio.emergencyFundGoal) * 100;
      await portfolio.save();
    }

    // Restore user stats
    const user = await User.findOne({ clerkId });
    if (user) {
      user.totalInvested += withdrawal.amount;
      user.currentValue += withdrawal.amount;
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Withdrawal cancelled successfully',
      data: {
        withdrawalId: withdrawal._id,
        status: 'cancelled'
      }
    });

  } catch (error) {
    console.error('Cancel withdrawal error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
