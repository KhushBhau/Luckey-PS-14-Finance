import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    // Skip MongoDB connection if no valid URI is provided
    if (!mongoURI || mongoURI.includes('username:password@cluster') || mongoURI.includes('your_cluster_here')) {
      console.log('⚠️  MongoDB not configured - running without database (demo mode)');
      console.log('   To connect to MongoDB, set a valid MONGODB_URI environment variable');
      return;
    }

    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.log('⚠️  Continuing without database (demo mode)');
    // Don't exit the process, let the app run without DB
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
