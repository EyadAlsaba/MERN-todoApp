import connectMongoose from '@/lib/connectMongo.js'
import { ClientProfile } from '@/database/userModel.js';

export default async function findTasks(req, res) {
  try {
    const connected = await connectMongoose();
    const taskQuery = ClientProfile.findOne({ "client_lists._id": req.query.getTasksList }, (error, docs) => {
      if (docs) {
        res.status(200).json({ docs });
      } else {
        res.status(500).json({ error, docs, msg: `no docs in ${__filename}` });
      }
    })
  } catch (error) {
    res.status(500).json({ ...error, file: `${__filename}` });
  }
}

/*
 *    const clients = ClientProfile.find({ "client_lists" }, function (error, docs) {
      if (docs) {
        res.status(200).json({ docs });
      } else {
        res.status(500).json({ error, docs, msg: `no docs in ${__filename}` })
      }
    })
  *    const taskQuery = await ClientProfile.find();
    taskQuery.where('client_lists')
      .where('_id')
      .equal('63021d3d4de95b36c4d34434')
      .exec(function (error, docs) {
        if (docs) {
          res.status(200).json({ docs });
        } else {
          res.status(500).json({ error, docs, msg: `no docs in ${__filename}` })
        }
      })
*/