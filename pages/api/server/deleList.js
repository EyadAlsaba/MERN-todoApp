import connectMongoose from "@/lib/connectMongo";
import { ClientLists } from "@/database/userModel";

export default async function deleteList(req, res) {
  try {
    await connectMongoose();
    const deletedList = ClientLists.findByIdAndRemove(req.body, function (err, data) {
      if (err) {
        console.error(err)
      }
      res.status(200).redirect('/lists')
    })
  } catch (error) {
    res.status(500).json({ ...error, msg: 'delete is failed' })
  }
}