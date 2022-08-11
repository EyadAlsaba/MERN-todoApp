import connectMongoose from '@/lib/connectMongo';
import { ClientProfile, ClientLists, ClientProject } from '@/database/userModel.js';

// # WHEN I MAKE A POST REQUEST TO THIS ROUTE, I POST A NEW CLIENT INSTANCE IN THE DATABASE
export default async function addClient(req, res) {

  const SAMPLE_PROJECT = {
    clientId: req.body.email,
    ownedBy: `sample`,
    title: `sample task`,
    note: ``,
    date: ``,
    priority: ``,
    completed: false
  };

  const SAMPLE_LIST = {
    clientId: req.body.email,
    list_title: `sample`,
    tasks: [SAMPLE_PROJECT]
  };

  if (req.method === 'POST') {
    try {
      const { email } = req.body;
      await connectMongoose();

      const existAlready = await ClientProfile.findOne({ client_email: email })

      if (existAlready == null) {
        const client = await ClientProfile.create({ client_email: `${email}`, client_lists: [SAMPLE_LIST] });
        const sampleList = await ClientLists.create({ clientId: `${email}`, list_title: 'sample', tasks: [SAMPLE_PROJECT] });
        const sampleTask = await ClientProject.create(SAMPLE_PROJECT);

        res.status(201).json(client)
      } else {
        res.status(104).json({ msg: 'this instance is already registered', existAlready })
      }

    } catch (error) {
      res.send(error)
    }

  } else {
    res.status(500).send({ Status: '500 request is not POST' })
  }

  res.end();
}

