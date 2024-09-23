import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

export const connectToDB = async () => {
  if (isConnected) {
    console.log('Already connected to the database');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('Connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database', error);
    throw new Error('Failed to connect to the database');
  }
};