import connectMongoose from "@/lib/connectMongo";
import { ClientProfile } from "@/database/userModel";
import { ObjectId } from "mongodb";

export default async function deleteList(req, res) {
  try {
    await connectMongoose();
    ClientProfile.findOneAndUpdate(
      { client_lists: { $elemMatch: { _id: req.body.projectId } } },
      { $pull: { client_lists: { _id: req.body.projectId } } },
      { new: true },
      function (err, doc) {
        if (err) {
          console.log(err);
          res.status(500).json({ err, msg: 'failed at delete list' })
        } else {
          res.status(204).end()
        }
      })

  } catch (error) {
    res.status(500).json({ error, msg: 'delete is failed' })
  }
}
