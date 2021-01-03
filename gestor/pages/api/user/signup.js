import { connectToDatabase } from '../../../util/mongodb';
import { hash } from 'bcrypt';
import { has } from 'lodash';

export default async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    let password = data.password;
    hash(password, 10, async function(err, hash) {
      // Store hash in your password DB.
    try {       
      const user = {
        name: data.email,
        password: hash
      };
      const { db } = await connectToDatabase();
      const response = await db.collection('users').insertOne(user);
      res.status(200).json(response.ops[0]);      
    } catch {
      print(e);
    }
  });
  } else {
    //  block of code to be executed if the condition1 is false and condition2 is false
  }


};
