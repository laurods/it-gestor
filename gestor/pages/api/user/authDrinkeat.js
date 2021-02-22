import { connectToDatabase } from '../../../util/mongodb';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';

export default async (req, res) => { 
  // Allow Origins
  res.header("Access-Control-Allow-Origin", "*");
  // Allow Methods
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  // Allow Headers
  res.header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Authorization");
  // Handle preflight, it must return 200
  if (req.method === 'POST') {
    const user = req.body.user
    const email = user.email;
    let password = user.password;
    try {
        const { db } = await connectToDatabase();
        const response = await db.collection('users').find({'email': email}).toArray();      
        const userPassword = response[0].password;
        res.status(200).json(response);
        /*
        compare(password, userPassword, function(err, result) {
            if(!err && result){
            
                const claims = {sub: response[0]._id, userEmail: response[0].email}
                const jwt = sign(claims, '4a56384b-61de-4446-bcec-49515bb71a0f', { expiresIn: '1h' });
                
                res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                  httpOnly: true,
                  secure: true,
                  sameSite: 'strict',
                  maxAge: 3600,
                  path: '/'
                }))
                
                //res.json({message: 'Welcome back to the app!', jwt:jwt});            
                //res.status(200).json(response);
                
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
