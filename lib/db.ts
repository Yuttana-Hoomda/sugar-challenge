import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGO_URL;

const connect = async () => {
    try {
        mongoose.connect(MONGODB_URL!, {
            dbName: 'SC-DB',
        });
        console.log("mongoDb connected")
    } catch (err: any) {
        console.log('Error: ', err)
        throw new Error("Error: ", err)
    }
};

export default connect;