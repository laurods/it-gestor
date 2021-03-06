import GlobalStyle from '../styles/global';
import { connectToDatabase } from '../util/mongodb';


export default function Products({ products }) {
  return (
    <div>
        
      <div className="container">
        <main>
          <div className="card">
            <h2 className="subtitle">Principal</h2>
          </div>
          <div className="card">
            <h2 className="subtitle">Produtos</h2>
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
        </main>

        <GlobalStyle />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const products = await db.collection('products').find({}).toArray();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
