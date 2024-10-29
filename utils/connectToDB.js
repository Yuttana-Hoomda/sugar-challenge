import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log("Mongo is already connected!");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'SC-DB',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000,
    });
    isConnected = true;
    console.log('Connected to MongoDB');

  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('MongoDB connection failed');
  }
};
