import connectMongoose from "@/lib/connectMongo"
import { ClientProfile } from "@/database/userModel"
import { ObjectId } from "mongodb";

export default async function updateTask(req, res) {
  try {
    await connectMongoose();
    const record = await ClientProfile.findOne(
      { "client_lists.tasks._id": new ObjectId(req.body.taskId) },
      { "client_lists.tasks": 1 }).exec();
    console.log(record)

    let nestedDoc = record.client_lists[req.body.listIndex].tasks[req.body.taskIndex]
    nestedDoc.note = req.body.note;
    nestedDoc.date = req.body.date;
    nestedDoc.priority = req.body.priority;

    record.save();
    res.status(200).end();
  } catch (error) {
    res.status(500).json({ ...error, __filename })
  }
}
