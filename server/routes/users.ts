import { RequestHandler } from "express";
import { User } from "../models/User";
import { Portfolio } from "../models/Portfolio";

// Create or update user profile from Clerk webhook
export const createUser: RequestHandler = async (req, res) => {
  try {
    const { clerkId, email, firstName, lastName } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ 
        error: "ClerkId and email are required" 
      });
    }

    // Check if user already exists
    let user = await User.findOne({ clerkId });

    if (user) {
      // Update existing user
      user = await User.findOneAndUpdate(
        { clerkId },
        { email, firstName, lastName },
        { new: true }
      );
    } else {
      // Create new user
      user = new User({
        clerkId,
        email,
        firstName,
        lastName,
        experienceLevel: 'beginner',
        isVillagePartner: false,
        riskTolerance: 'low',
        autoInvestEnabled: false,
        roundUpEnabled: false,
        dailySipAmount: 0,
        emergencyFundGoal: 5000,
        totalInvested: 0,
        currentValue: 0,
        investmentStreak: 0
      });

      await user.save();

      // Create initial portfolio
      const portfolio = new Portfolio({
        userId: user._id.toString(),
        clerkId: user.clerkId,
        totalInvested: 0,
        currentValue: 0,
        totalReturns: 0,
        returnsPercentage: 0,
        holdings: [],
        equityAllocation: 0,
        debtAllocation: 0,
        goldAllocation: 0,
        emergencyFundAllocation: 0,
        emergencyFundCurrent: 0,
        emergencyFundGoal: 5000,
        emergencyFundProgress: 0
      });

      await portfolio.save();
    }

    res.status(201).json({
      message: "User created/updated successfully",
      user: {
        id: user._id,
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        experienceLevel: user.experienceLevel
      }
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ 
      error: "Internal server error" 
    });
  }
};

// Get user profile
export const getUserProfile: RequestHandler = async (req, res) => {
  try {
    const { clerkId } = req.params;

    if (!clerkId) {
      return res.status(400).json({ 
        error: "ClerkId is required" 
      });
    }

    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ 
        error: "User not found" 
      });
    }

    res.json({
      user: {
        id: user._id,
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        experienceLevel: user.experienceLevel,
        isVillagePartner: user.isVillagePartner,
        riskTolerance: user.riskTolerance,
        autoInvestEnabled: user.autoInvestEnabled,
        roundUpEnabled: user.roundUpEnabled,
        dailySipAmount: user.dailySipAmount,
        emergencyFundGoal: user.emergencyFundGoal,
        totalInvested: user.totalInvested,
        currentValue: user.currentValue,
        investmentStreak: user.investmentStreak,
        lastInvestmentDate: user.lastInvestmentDate
      }
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ 
      error: "Internal server error" 
    });
  }
};

// Update user profile
export const updateUserProfile: RequestHandler = async (req, res) => {
  try {
    const { clerkId } = req.params;
    const updates = req.body;

    if (!clerkId) {
      return res.status(400).json({ 
        error: "ClerkId is required" 
      });
    }

    // Remove fields that shouldn't be updated directly
    delete updates.clerkId;
    delete updates._id;
    delete updates.totalInvested;
    delete updates.currentValue;
    delete updates.investmentStreak;

    const user = await User.findOneAndUpdate(
      { clerkId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ 
        error: "User not found" 
      });
    }

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        experienceLevel: user.experienceLevel,
        isVillagePartner: user.isVillagePartner,
        riskTolerance: user.riskTolerance,
        autoInvestEnabled: user.autoInvestEnabled,
        roundUpEnabled: user.roundUpEnabled,
        dailySipAmount: user.dailySipAmount,
        emergencyFundGoal: user.emergencyFundGoal
      }
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ 
      error: "Internal server error" 
    });
  }
};

// Get user dashboard data
export const getUserDashboard: RequestHandler = async (req, res) => {
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

    res.json({
      dashboard: {
        totalInvested: user.totalInvested,
        currentValue: user.currentValue,
        totalReturns: portfolio?.totalReturns || 0,
        returnsPercentage: portfolio?.returnsPercentage || 0,
        emergencyFundCurrent: portfolio?.emergencyFundCurrent || 0,
        emergencyFundGoal: user.emergencyFundGoal,
        emergencyFundProgress: portfolio?.emergencyFundProgress || 0,
        investmentStreak: user.investmentStreak,
        dayChange: portfolio?.dayChange || 0,
        dayChangePercentage: portfolio?.dayChangePercentage || 0
      }
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ 
      error: "Internal server error" 
    });
  }
};
