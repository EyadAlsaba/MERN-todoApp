import connectMongoose from '@/lib/connectMongo.js'
import { ClientProject } from '@/database/userModel.js';

export default async function findTasks(req, res) {
  // console.log(req.query)
  try {
    const connected = await connectMongoose();
    const clients = ClientProject.find({ ownedBy: req.query.getTasksList }, function (error, docs) {
      if (docs) {
        res.status(200).json({ docs });
      } else {
        res.status(500).json({ error, docs: docs, msg: `no docs in ${__filename}` })
      }
    })

  } catch (error) {
    res.status(500).json({ ...error, file: `${__filename}` });
  }
}
