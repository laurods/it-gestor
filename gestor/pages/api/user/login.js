import { connectToDatabase } from '../../../util/mongodb';
import { compare } from 'bcrypt';

export default async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body;
    let password = req.password;   
    try {
        const { db } = await connectToDatabase();
        const response = await db.collection('users').findOne({ "email" : "pedro@gmail.com" });
        res.status(200).json(response.ops[0]);
        /*        
        const user = res.status(200).json(response.ops[0]);
        compare(password, user.password, function(err, result) {
            if(!err && result){
                res.json({message: 'OK'});
            }else{
                res.json({message: 'ups, something went wrong!'});
            }
        }); 
        */         
      } catch {
        print(e);
     }
  } else {
    //  block of code to be executed if the condition1 is false and condition2 is false
  }


};
