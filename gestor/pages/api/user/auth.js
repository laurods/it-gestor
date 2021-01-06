import { verify } from 'jsonwebtoken';

export const authenticated = (fn) => async (req, res) => {
    verify(req.cookies.auth, '4a56384b-61de-4446-bcec-49515bb71a0f', async function(err, decoded) {
      if(!err && decoded){
        return await fn(req, res);
      }
     res.status(401).json({error: 'error', message: 'Sorry you are not authenticated'});

    });
  }
/*
  function getAppCookies(req) {
    const parsedItems = {};
    if (req.headers.cookie) {
      const cookiesItems = req.headers.cookie.split('; ');
      cookiesItems.forEach(cookies => {
        const parsedItem = cookies.split('=');
        parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
      });
    }
    return parsedItems;
  }

*/
  
export default authenticated(async function getUser (req, res) {
  if (req.method === 'GET') {

    try {             
      const { db } = await connectToDatabase();
      const response = await db.collection('users').find().toArray();
      res.status(200).json(response);      
    } catch {
      print(e);
    }
  } else {
    //  block of code to be executed if the condition1 is false and condition2 is false
  }


});
