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
    const user = req.body.userData;
    const password = user.password
    const { db } = await connectToDatabase();
    const response = await db.collection('users').findOne({'email': user.email}).toArray();
    const email = response[0].email;
    const userPassword = response[0].password; 
        
      if (!await compare(password, userPassword)){
       res.status(400).send({message:'User or Password Invalid'})
      } 
      res.status(200).json({
        message: 'Welcome back to the app!',
        email,
      })
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