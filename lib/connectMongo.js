import mongoose from 'mongoose';
const option = {
  family: 4,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  dbName: 'todoapp'
}
const connectMongoose = async () => mongoose.connect(`${process.env.MONGO_URI}`, option);

export default connectMongoose 