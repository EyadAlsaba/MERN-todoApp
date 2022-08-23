import connectMongoose from "@/lib/connectMongo"
import { ClientProfile } from "@/database/userModel"
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    await connectMongoose();
    ClientProfile.findOneAndUpdate(
      { "client_lists.tasks": { "$elemMatch": { _id: new ObjectId(req.body.taskId) } } },
      { "$pull": { "client_lists.$.tasks": { _id: new ObjectId(req.body.taskId) } } },
      { new: true, upsert: false },
      function (err, docs) {
        if (err) {
          console.error(`this error occur while you trying to delete task with id => ${req.body.taskId} `, err);
          res.status(500).json(err)
        } else {
          res.status(204).end()
        }
      })
  } catch (error) {
    res.status(500).json({ ...error, __filename })
  }
};