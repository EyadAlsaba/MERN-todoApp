import mongoose from 'mongoose';
import connectMongoose from '@/lib/connectMongo.js'
import { getSession } from 'next-auth/react';
import { ClientProfile, ClientProject } from '@/database/userModel.js';

export default async function handler(req, res) {
  try {
    const user = await getSession({ req });
    const connected = await connectMongoose();
    const client = ClientProfile.create({ client_email: `${req.user.email}`, client_lists: [{}] });
    res.status(200).json({ client })
  } catch (error) {
    res.json({ error });
  }
}

/**
 *     const test = ClientProfile.find({}, function (err, docs) {
      if (docs) {
        res.json(docs)
      } else {
        res.json(err)
      }
    })
 */