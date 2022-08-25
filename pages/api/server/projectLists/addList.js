import connectMongoose from "@/lib/connectMongo"
import { ClientProfile } from "@/database/userModel"

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
          res.status(500).json({ success: false, msg: 'title is already exist' })
        }
        res.status(200).redirect('/lists')
      })
  } catch (error) {
    res.status(500).json({ ...error, __filename })
  }
};

