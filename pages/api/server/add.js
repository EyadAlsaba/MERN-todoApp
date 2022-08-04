import connectMongoose from '@/lib/connectMongo';
import { ClientProfile } from '@/database/userModel.js';
import { getSession } from 'next-auth/react';

// # WHEN I MAKE A POST REQUEST TO THIS FILE, I POST A NEW CLIENT INSTANCE IN THE DATABASE
export default async function addClient(req, res) {

  const SAMPLE_LIST = {
    list_title: `sample`,
    tasks: [{
      title: `sample task`,
      note: ``,
      date: ``,
      priority: ``
    }]
  };

  if (req.method === 'POST') {
    try {
      const { email } = req.body;
      await connectMongoose();

      const existAlready = await ClientProfile.findOne({ client_email: email })

      if (existAlready == null) {
        const client = await ClientProfile.create({ client_email: `${email}`, client_lists: [SAMPLE_LIST] });
        res.status(201).json(client)
      } else {
        res.status(104).json({ msg: 'this instance is already registered', existAlready })
      }

    } catch (error) {
      res.json(error)
    }

  } else {
    res.status(401).json({ Status: '401 Unauthorized', Message: 'Not Authenticated' })
  }

  res.end();
}

