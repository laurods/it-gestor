import { connectToDatabase } from '../../util/mongodb';

export default async (req, res) => {
 
    try {
      //const email = req.query;
      const { db } = await connectToDatabase();
      const response = await db.collection('users').find({}).toArray();
      res.status(200).json(response.ops[0]);
    } catch {
      print(e);
    }
  
}
  /*
  if (req.method === 'POST') {
    try {
      const user = req.body;
      const { db } = await connectToDatabase();
      const response = await db.collection('users').insertOne(user);
      res.status(200).json(response.ops[0]);
    } catch {
      print(e);
    }
  }else if (req.method === 'GET') {
    try {
      //const email = req.query;
      const { db } = await connectToDatabase();
      const response = await db.collection('users').findOne({});
      res.status(200).json(response.ops[0]);
    } catch {
      print(e);
    }
  } else {
    //  block of code to be executed if the condition1 is false and condition2 is false
  }


};
*/