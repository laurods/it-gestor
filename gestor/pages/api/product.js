import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {       
    if(req.method === "POST") {
    try{    
        const products = req.body;       
        const { db } = await connectToDatabase();
        const response = await db.collection('products').insertMany(products);
        res.status(200).json(response.ops[0]);
    } catch{
        print (e);
    }
 }
}