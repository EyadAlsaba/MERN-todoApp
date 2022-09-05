import connectMongoose from "@/lib/connectMongo";
import { ClientProfile } from "@/database/userModel";

export default async function getClientLists(clientEmail) {
  await connectMongoose();
  const docs = await ClientProfile.findOne({ client_email: clientEmail }, { client_lists: 1 }).exec();
  if (docs) {
    return JSON.stringify(docs)
  } else {
    throw new Error(`getClientLists function failed finding docs in,${__filename}, `)
  }
}
