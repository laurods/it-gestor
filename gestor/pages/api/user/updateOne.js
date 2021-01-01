import { connectToDatabase } from '../../../util/mongodb';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const user = req.body;
      const email = user.email;
      const cnpjDestinatario = user.cnpjDestinatario;
      const { db } = await connectToDatabase();
      const response = await db.collection('users').updateOne(
        { "email" : email },
        { $set: {"email" : email, "cnpjEmitente" : cnpjDestinatario } },
        { upsert: true }
      );
      res.status(200).json(response);
    } catch {
      print(e);
    }
  }
  
};
