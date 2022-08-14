import connectMongoose from "@/lib/connectMongo"
import { ClientLists } from "@/database/userModel"

export default async function handler(req, res) {
  try {
    await connectMongoose();
    const { clientId, list_title } = req.body;
    const newList = await ClientLists.create({ clientId, list_title })
    res.status(200).redirect('/lists')
  } catch (error) {
    res.status(500).json({ ...error, msg: 'failed add new list', __filename })
  }
}