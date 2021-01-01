import { connectToDatabase } from '../../../util/mongodb';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const user = req.body;
      const email = user.email;
      const cnpjEmitente = user.cnpjEmitente;
      const { db } = await connectToDatabase();
      const response = await db.collection('users').updateOne(
        { "email" : {email} },
        { $set: {"email" : {email}, "cnpjEmitente" : {cnpjEmitente} } },
        { upsert: true }
      );
      res.status(200).json(response);
    } catch {
      print(e);
    }
  }
  
};
