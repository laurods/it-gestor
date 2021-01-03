import { connectToDatabase } from '../../../util/mongodb';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export default async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;
    let password = req.body.password;   
    try {
        const { db } = await connectToDatabase();
        const response = await db.collection('users').find({'email': email}).toArray();
        const userPassword = response[0].password;

        compare(password, userPassword, function(err, result) {
            if(!err && result){
                const claims = {sub: response[0]._id, userEmail: response[0].email}
                const jwt = sign(claims, '4a56384b-61de-4446-bcec-49515bb71a0f');

                res.json({authTokeb: jwt});
            }else{
                res.json({message: 'ups, something went wrong!'});
            }
        }); 
                 
      } catch {
        print(e);
     }
  } else {
    //  block of code to be executed if the condition1 is false and condition2 is false
  }


};
