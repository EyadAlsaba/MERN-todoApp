import connectMongoose from '@/lib/connectMongo.js'
import { ClientProfile } from '@/database/userModel.js';
import { ObjectId } from 'mongodb';

export default async function fetchListTasks(req, res) {
  await connectMongoose();
  const docs = await ClientProfile.findOne(
    { "client_lists._id": new ObjectId(req.query.listId) },
    { "client_lists.tasks.$": 1 }).exec();
  if (docs) {
    res.status(200).json(docs);
  } else {
    res.status(500).json({ msg: `fetchListTasks failed fetching tasks, error occur in, ${__filename}` })
  }
};