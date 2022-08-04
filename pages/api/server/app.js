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
        res.json(docs)
      } else {
        res.json({ error, msg: `no docs in ${__filename}` })
      }
    })

  } catch (error) {
    res.json({ error: `${__filename}` });
  }
}

/*
        const { email } = session.user;
        console.log('docs =>', docs)
        docs.forEach((doc) => {
          if (doc['client_email'] == email) {
             ClientProfile.create({ client_email: `${email}`, client_lists: [SAMPLE_LIST] });
          }
        })

*/