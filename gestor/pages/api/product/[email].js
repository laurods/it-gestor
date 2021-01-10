import { connectToDatabase } from '../../../util/mongodb';

export default async (req, res) => {
    if (req.method === 'GET') {
        try {
          const email = req.query.email;       
          const { db } = await connectToDatabase();
          const products = await db.collection('products').find({'email': email}).toArray();
          res.status(200).json(products);      
        } catch {
          print(e);
        }
      } else {
        //  block of code to be executed if the condition1 is false and condition2 is false
      }
    
};
