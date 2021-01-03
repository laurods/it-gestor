import { connectToDatabase } from '../../../util/mongodb';
import { compare } from 'bcrypt';

export default async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;
    let password = req.body.password;   
    try {
        const { db } = await connectToDatabase();
        const response = await db.collection('users').find({'email': email}).toArray();
        userPassword = res.json(response[0].password); 
        compare(password, userPassword, function(err, result) {
            if(!err && result){
                res.json({message: 'OK'});
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
