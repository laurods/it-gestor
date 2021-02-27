import { connectToDatabase } from '../../../util/mongodb';
import { compare } from 'bcrypt';

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'POST') {
    try{
      const user = req.body.userData;
    const password = user.password
    const { db } = await connectToDatabase();
    const response = await db.collection('users').find({'email': user.email}).toArray();
    const email = response[0].email;
    const userPassword = response[0].password;
    console.log(response);
     if(!response){
      return res.status(400).json({message:'User not found'})
     } 

      if (!await compare(password, userPassword)){
       res.status(400).json({message:'User or Password Invalid'})
      } 
      res.status(200).json({
        message: 'Welcome back to the app!',
        email,
      })
    res.status(200).end()
    return


    }catch(error){
      return res.status(200).json({message:'User not found'})
    }
    
    
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}

module.exports = allowCors(handler)