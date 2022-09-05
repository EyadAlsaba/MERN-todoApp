import connectMongoose from '@/lib/connectMongo';
import { ClientProfile } from '@/database/userModel.js';

// # WHEN I MAKE A POST REQUEST TO THIS ROUTE, I POST A NEW CLIENT INSTANCE IN THE DATABASE
export default async function addClient(req, res) {
  const SAMPLE_LIST = {
    list_title: `sample`,
    tasks: [{ title: `sample task` }]
  };

  if (req.method === 'POST') {
    try {
      const { email } = req.body;
      await connectMongoose();
      const existAlready = await ClientProfile.findOne({ client_email: email })

      if (!existAlready) {
        const client = await ClientProfile.create({ client_email: `${email}`, client_lists: [SAMPLE_LIST] });
        res.status(201).json(client)
      } else {
        res.status(204).end()
      }
    } catch (error) {
      res.status(500).send({ ...error, msg: `failed to create new client profile` })
    }
  } else {
    res.status(500).send({ Status: '500 request method is not POST' })
  }
  res.end();
}

