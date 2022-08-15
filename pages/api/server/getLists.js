import connectMongoose from '@/lib/connectMongo.js'
import { ClientLists } from '@/database/userModel.js';



export default async function findList(req, res) {
  try {
    const connected = await connectMongoose();
    const clients = ClientLists.find({}, function (error, docs) {
      if (docs) {
        res.status(200).json(docs);
      } else {
        res.status(500).send({ error, docsData: docs, msg: `no docs in ${__filename}` })
      }
    })

  } catch (error) {
    res.status(500).json({ ...error, msg: `error occur in ${__filename}` });
  }
}
