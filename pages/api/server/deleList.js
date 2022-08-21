import connectMongoose from "@/lib/connectMongo";
import { ClientProfile } from "@/database/userModel";

/*
 * The $pull operator removes from an existing array all instances of a value 
 * or values that match a specified condition.
 * { $pull: { <field1>: <value|condition> } }
 * { $pull: { client_lists: { _id: req.body._id } } }
*/

export default async function deleteList(req, res) {
  try {
    await connectMongoose();
    const deletedList = ClientProfile.findOneAndUpdate(
      { client_email: req.body.email },
      { $pull: { client_lists: { _id: req.body._id } } },
      { new: true },
      function (err, doc) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).redirect('/lists')
        }
      })

  } catch (error) {
    res.status(500).json({ error, msg: 'delete is failed' })
  }
}
