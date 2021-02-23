import { connectToDatabase } from '../../../util/mongodb';

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'POST') {
    const user = req.body.userData;
    const { db } = await connectToDatabase();
    const response = await db.collection('users').find({'email': user.email}).toArray();
    const email = response[0].email;
    //const password = response[0].password;
    /*
        compare(user.password, password, function(err, result) {
          if(!err && result){
            res.status(200).json({
              message: 'Welcome back to the app!',
              email,
            });
            res.status(200).end()
            return
              
          }else{
            res.status(200).json({
              message: 'ups, something went wrong!',
              email:null
            });
            res.status(200).end()
            return
          }
      }); 
    */
    res.status(200).json({
      message: 'Welcome back to the app!',
      email,
    });
    res.status(200).end()
    return
    
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}

module.exports = allowCors(handler)