import connectMongoose from '@/lib/connectMongo.js'
import { ClientProfile } from '@/database/userModel.js';
import { ObjectId } from 'mongodb';

export default async function findTasks(req, res) {
  try {
    const connected = await connectMongoose();
    const taskQuery = ClientProfile.findOne({ "client_lists._id": new ObjectId(req.query.getTasksList) },
      { "client_lists.tasks.$": 1 },
      (error, docs) => {
        if (docs) {
          res.status(200).json(docs.client_lists);
        } else {
          res.status(500).json({ error, docs, msg: `no docs in ${__filename}` });
        }
      })
  } catch (error) {
    res.status(500).json({ ...error, file: `${__filename}` });
  }
}
