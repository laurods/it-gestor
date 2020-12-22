import { connectToDatabase } from "../util/mongodb";


export default function Products ( { products}){
 return (
     <div>
         <h1> Lista de Produtos</h1>

         <ul>
            {products.map((product) =>(
                <li>
                    <span>{product.xprod}</span>
                    <span>{product.custoUn}</span>
                    <span>{product.nnf}</span>
                </li>
                
            ))}
         </ul>
     </div>
 );
}

export async function getServerSideProps(){
    const { db } = await connectToDatabase();

    const products = await db
    .collection("products")
    .find({})
    .toArray();

    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        },
    }
}