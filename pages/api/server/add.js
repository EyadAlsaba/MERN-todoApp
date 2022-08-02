
import { ClientProfile } from '@/database/userModel.js';

export default async function addClient(req, res) {
  try {
    const user = await getSession({ req });
    const connected = await connectMongoose();
    const client = ClientProfile.create({ client_email: `${req.user.email}`, client_lists: [{}] });
    res.status(200).json({ client })
    // const test = await ClientProfile.create(req.body);
    // res.status(200).json({ test })
  } catch (error) {
    res.json(error)
  }
}