import connectMongoose from "@/lib/connectMongo"
import { ClientLists } from "@/database/userModel"

export default async function handler(req, res) {
  try {
    await connectMongoose();
    const { clientId, list_title } = req.body;
    const newList = await ClientLists.create({ clientId, list_title })
    res.status(200).redirect('/lists')
  } catch (error) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return res.status(400).json({
        success: false,
        msg: 'Pls choose unique name to create new list'
      })
    }
    res.status(500).json({ ...error, __filename })
  }
}