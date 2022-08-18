import connectMongoose from "@/lib/connectMongo"
import { ClientProject } from "@/database/userModel"

export default async function handler(req, res) {
  try {
    await connectMongoose();
    const addTask = await ClientProject.create(req.body);
  } catch (error) {
    res.status(500).json({ ...error, __filename })
  }
}