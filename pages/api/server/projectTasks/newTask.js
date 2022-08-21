import connectMongoose from "@/lib/connectMongo"
import { ClientProfile } from "@/database/userModel"

/* 
  * use findOneAndUpdate with $push operator to add new task to the list
  *{ $push: { <field1>: <value1>, ... } }
 
  * The $addToSet operator adds a value to an array unless the value is already present.
  * in which case $addToSet does nothing to that array.
  
  * $ne selects the documents where the value of the field is NOT equal to the specified value.
  *  This includes documents that do not contain the field.
  
  * Syntax: { field: { $ne: value } }
  * CONDITIONS = { client_email: clientEmail, 'client_lists.list_title': { $ne: list_title } }
  
  * Syntax: { $addToSet: { <field1>: <value1>, ... } }
  * UPDATE = { $addToSet: { client_lists: { list_title } } }
  
  * Model.findOneAndUpdate(conditions, update, options, callback) // executes
  * {client_email:"elias.saab.90@gmail.com","client_lists":{$elemMatch:{_id:ObjectId('63021f4a4de95b36c4d34448')}}}
*/
export default async function handler(req, res) {
  console.log("request body =>", req.body);
  try {
    await connectMongoose();
    const addTask = ClientProfile.findOneAndUpdate(
      { 'client_email': req.body.client_email, 'client_lists': { '$elemMatch': { _id: new ObjectId(req.body.listId) } } },
      { '$push': { 'client_lists.tasks': { title: req.body.taskTitle } } },
      { new: true },
      function (err, docs) {
        if (err) {
          console.log(err)
        } else {
          console.log(docs)
          res.status(200).redirect(`/project/${req.body.listId}`)
        }
      });
  } catch (error) {
    res.status(500).json({ ...error, __filename })
  }
}
