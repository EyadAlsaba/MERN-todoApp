import mongoose from 'mongoose';

const connectMongoose = async () => mongoose.connect(`${process.env.MONGO_URI}`);

export default connectMongoose 