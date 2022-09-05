import connectMongoose from '@/lib/connectMongo.js'
import { ClientProfile } from '@/database/userModel.js';
import { ObjectId } from 'mongodb';

export default async function findListTasks(listId) {
  await connectMongoose();
  const docs = await ClientProfile.findOne(
    { "client_lists._id": new ObjectId(listId) },
    { "client_lists.tasks.$": 1 }).exec();
  if (docs) {
    return JSON.stringify(docs);
  } else {
    throw new Error(`findListTasks not able to get task, error occur in, ${__filename}`)
  }
};
