import connectMongoose from "@/lib/connectMongo"
import { ClientProfile } from "@/database/userModel"
import { ObjectId } from "mongodb";

export default async function updateTask(req, res) {
  console.log(req.body)
  try {
    await connectMongoose();
    ClientProfile.findOneAndReplace()
  } catch (error) {
    res.status(500).json({ ...error, __filename })
  }
}

  //{"client_lists.tasks._id":ObjectId('630753fc72c125aab783757e')}
//, "tasks.$.date": req.body.date, "tasks.$.priority": req.body.priority
/*
      { "client_lists.tasks": { $elemMatch: { _id: new ObjectId(req.body.taskId) } } },
      { $set: { "tasks.$.note": req.body.note } },
      { new: true, upsert: false },
      function (err, docs) {
        if (err) {
          console.log('error 15', err);
          res.status(500).json({ err, __filename })
        } else {
          console.log(docs)
          res.status(200).json({ success: true })
        }
      })

       ClientProfile.findOne({ "client_lists.tasks._id": new ObjectId(req.body.taskId) }, { "client_lists.tasks.$": 1 }, function (err, doc) {
      if (err) {
        console.log('error 11', err);
        res.status(500).json({ err, __filename })
      } else {
        doc.client_lists[0].tasks.note = req.body.note;
        doc.save()
        res.status(200).json(doc)
      }
    })
*/