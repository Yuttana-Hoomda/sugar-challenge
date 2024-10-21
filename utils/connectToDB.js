import mongoose from 'mongoose';
import cron from 'node-cron';

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

    // Schedule task to run every day at midnight (00:00)
    cron.schedule('39 17 * * *', async () => {
      try {
        const collectionName = 'dailysugars'; // Replace with your actual collection name
        await mongoose.connection.collection(collectionName).deleteMany({});
        console.log(`All documents deleted from ${collectionName} at midnight.`);
      } catch (err) {
        console.error('Error deleting documents:', err);
      }
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('MongoDB connection failed');
  }
};
