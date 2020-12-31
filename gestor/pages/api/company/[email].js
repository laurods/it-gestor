import { connectToDatabase } from '../../../util/mongodb';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const email = req.query;
      res.status(200).json({ email} );
      /*
      const { db } = await connectToDatabase();
      const response = await db.collection('users').findOne({});
      res.status(200).json(response.ops[0]);
      */
    } catch {
      print(e);
    }
  } else {
    //  block of code to be executed if the condition1 is false and condition2 is false
  }


};
