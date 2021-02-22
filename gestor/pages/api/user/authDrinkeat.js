export default async (req, res) => { 
  // Allow Origins
  res.header("Access-Control-Allow-Origin", "*");
  // Allow Methods
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  // Allow Headers
  res.header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Authorization");
  // Handle preflight, it must return 200
  if (req.method === 'POST') {  
    res.status(200).json({message: 'Welcome back to the app!'});
    
  } else {
    rees.status(200).json({message: 'Error'});
  }


};
