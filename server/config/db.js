import mongoose from 'mongoose';
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

const uri = process.env.MONGO_URI;

const connectDB  = async () => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDb conected successfully!');
    } catch (error) {
        console.error('Database connection failed', error.message);
        process.exit(1);
    }
};

export default connectDB;