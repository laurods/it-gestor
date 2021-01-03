import { connectToDatabase } from '../../../util/mongodb';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {       
      const user = req.body;
      const { db } = await connectToDatabase();
      const response = await db.collection('users').insertOne(user);
      res.status(200).json(response);      
    } catch {
      print(e);
    }
  } else {
    //  block of code to be executed if the condition1 is false and condition2 is false
  }


};
