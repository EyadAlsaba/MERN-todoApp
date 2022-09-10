import connectMongoose from "@/lib/connectMongo"
import { ClientProfile } from "@/database/userModel"
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    await connectMongoose();
    ClientProfile.findOneAndUpdate(
      { "client_lists": { "$elemMatch": { _id: new ObjectId(req.body.listId[1]) } } },
      { "$push": { "client_lists.$.tasks": { title: req.body.taskTitle } } },
      { new: true },
      function (err, docs) {
        if (err) {
          res.status(500).json({ ...err, msg: `failed to add new task to project / ${req.body.listId}`, __filename })
        } else {
          res.status(200).json(docs)
        }
      });
  } catch (error) {
    res.status(500).json({ ...error, __filename })
  }
}
