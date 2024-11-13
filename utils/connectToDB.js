import mongoose from 'mongoose';

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 20000,
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('MongoDB connection failed');
  }
};
