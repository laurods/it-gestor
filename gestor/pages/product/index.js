import React from 'react';
import { connectToDatabase } from '../../util/mongodb';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

export default function Index({ products }) {
  return (
    <div>
      <Container maxWidth="sm">
      <Box my={4}>
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
      </Box>
    </Container>
   
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
