import connectMongoose from '@/lib/connectMongo.js'
import { ClientProfile } from '@/database/userModel.js';

/* 
  * const session = await getSession({ req }); **
  * ------- ( SESSIONS IN API ROUTES IS NULL || ONLY FRONT-END EXISTENCE ) ------ *
*/

export default async function clientsRecords(req, res) {
  try {
    const connected = await connectMongoose();
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
