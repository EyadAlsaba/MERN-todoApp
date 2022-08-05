import connectMongoose from '@/lib/connectMongo.js'
import { ClientProfile, ClientProject } from '@/database/userModel.js';
import { getSession } from 'next-auth/react';

/* 
  # REQUESTING THIS ROUTE WITH GET REQ SEND US BACK ALL THE CLIENTS PROFILES
*/

export default async function clientsRecords(req, res) {
  try {
    const connected = await connectMongoose();
    const session = await getSession({ req });

    const clients = ClientProfile.find({}, function (error, docs) {

      if (docs) {
        res.status(200).json(docs);
      } else {
        res.status(500).send({ error, msg: `no docs in ${__filename}` })
      }
    })

  } catch (error) {
    res.status(500).send({ error: `${__filename}` });
  }

}

/**
  try {
    const connected = await connectMongoose();
    const session = await getSession({ req });

    const clients = ClientProfile.find({}, function (error, docs) {

      if (docs) {
        res.status(200).json(docs);
      } else {
        res.status(500).send({ error, msg: `no docs in ${__filename}` })
      }
    })

  } catch (error) {
    res.status(500).send({ error: `${__filename}` });
  }

*/