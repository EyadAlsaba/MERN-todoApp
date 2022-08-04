import connectMongoose from "@/lib/connectMongo";
import { ClientProfile } from "@/database/userModel";
import { getSession } from "next-auth/react";
export default async function findClient(req, res) {
  try {
    await connectMongoose();
    const session = await getSession({ req });
    console.log('session findClient', session)
    if (session) {
      const client = ClientProfile.findOne({ 'client_email': session.user.email }, (error, docs) => {
        if (docs) {
          res.status(200).json(docs);
        } else {
          res.status(104).json({ msg: 'there is no such document in db' })
        }
      })
      return;
    }


  } catch (error) {
    console.error(error)
  }
}