

import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log("Mongo is already connected!");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'sugar-challenge',
      useNewUrlParser: true, // Can be removed in newer Mongoose versions
      useUnifiedTopology: true, // Can be removed in newer Mongoose versions
      serverSelectionTimeoutMS: 20000, // Adjust timeout if needed
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('MongoDB connection failed');
  }
};
