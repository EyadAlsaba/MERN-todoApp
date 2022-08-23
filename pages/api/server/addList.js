import connectMongoose from "@/lib/connectMongo"
import { ClientProfile } from "@/database/userModel"

/* 
  * The $addToSet operator adds a value to an array unless the value is already present.
  * in which case $addToSet does nothing to that array.
  
  * $ne selects the documents where the value of the field is NOT equal to the specified value.
  *  This includes documents that do not contain the field.
  
  * Syntax: { field: { $ne: value } }
  * CONDITIONS = { client_email: clientEmail, 'client_lists.list_title': { $ne: list_title } }
  
  * Syntax: { $addToSet: { <field1>: <value1>, ... } }
  * UPDATE = { $addToSet: { client_lists: { list_title } } }
  
  * Model.findOneAndUpdate(conditions, update, options, callback) // executes
*/

export default async function handler(req, res) {
  try {
    await connectMongoose();
    const { clientEmail, list_title } = req.body;
    ClientProfile.findOneAndUpdate(
      { client_email: clientEmail, 'client_lists.list_title': { $ne: list_title } },
      { "$push": { client_lists: { list_title } } },
      { new: true },
      function (err, doc) {
        if (err) {
          console.error(err)
        } else if (doc === null) {
          res.status(500).json({ success: false, msg: 'this request is failed because the title is already exist' })
        }
        res.status(200).redirect('/lists')
      })
  } catch (error) {
    res.status(500).json({ error, __filename })
  }
};

