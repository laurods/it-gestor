import { connectToDatabase } from "../util/mongodb";


export default function Products ( { products}){
 return (
     <div>
           <h2>Produtos</h2>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Custo Un</th>             
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.xprod}</td>
                <td>R${product.custoUn}</td>                
                <td>
                  <button>Adicionar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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