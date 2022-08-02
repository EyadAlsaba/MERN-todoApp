import mongoose from 'mongoose';

const connectMongoose = async () => mongoose.connect(`${process.env.MONGO_URI}://localhost:3000/`);

// (async () => {
//   await connectMongoose();
//   console.log('connected')
// })();

export default connectMongoose 