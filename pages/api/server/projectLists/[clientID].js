import connectMongoose from "@/lib/connectMongo";
import { ClientProfile } from "@/database/userModel";

export default async function getClientLists(req, res) {
  try {
    await connectMongoose();
    ClientProfile.findOne({ client_email: req.query.clientID },
      { client_lists: 1 },
      function (err, docs) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(docs.client_lists)
        }
      })
  } catch (error) {
    res.status(500).json({
      ...error,
      msg: `error occur while you trying to fetch client lists`,
      docs,
      __filename
    });
  }
}
