import { connectToDatabase } from '../../../util/mongodb';

export const authenticated = fn => async (req, res) => {
    verify(req.cookies.auth, '4a56384b-61de-4446-bcec-49515bb71a0f', async function(err, decoded) {
      if(!err && decoded){
        return await fn(req, res);
      }
  
      res.status(401).json({message: 'Sorry you are not authenticated'});
    });
  }
  

export default authenticated(async (req, res) => {
  if (req.method === 'GET') {
    try {             
      const { db } = await connectToDatabase();
      const response = await db.collection('users').find();
      res.status(200).json(response);      
    } catch {
      print(e);
    }
  } else {
    //  block of code to be executed if the condition1 is false and condition2 is false
  }


});
