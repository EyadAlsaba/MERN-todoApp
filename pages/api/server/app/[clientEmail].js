import connectMongoose from '@/lib/connectMongo.js'
import { ClientProfile } from '@/database/userModel.js';

export default async function clientsRecords(req, res) {
  try {
    await connectMongoose();
    ClientProfile.findOne({ client_email: req.query.clientEmail }, function (error, docs) {
      if (error) {
        res.status(500).json(error)
      } else {
        res.status(200).json(docs)
      }
    })
  } catch (error) {
    res.status(500).json({ ...error, msg: `attempt to create client profile might be failed, look into your app, ${__filename}` });
  }
}
