import React from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchBar from '../../components/screen/Layout/searchbar';
import { connectToDatabase } from '../../util/mongodb';
import TableRowProduct from '../../components/screen/Layout/tableRowProduct';
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  paper: {   
    textAlign: 'center',    
  },
}));

export default function CenteredGrid({ products }) {
  const classes = useStyles();
  const router = useRouter();
  const { cnpj } = router.query; 

  const productByNF = products.reduce((acc, value) =>{
    if(!acc[value.nnf]){
      acc[value.nnf] = [];
    }
    acc[value.nnf].push(value);
    return acc;
  }, {});
  
  const nfByProducts = Object.keys(productByNF);
  console.log(typeof nfByProducts);
  console.log(nfByProducts); 
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>         
          <SearchBar />         
        </Grid>
        <Grid item xs={2}>
          {!!nfByProducts.length &&
          <div>
            <Table aria-label="collapsible table">
            <TableHead>
                <TableRow>
                <TableCell>NFs</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {nfByProducts.map((nf) =>                            
                <TableRow>
                  <TableCell>{nf}</TableCell>                  
                </TableRow>
                )
              }              
            </TableBody>
            </Table>
          </div>

          }
        
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
          <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Descrição</TableCell>
                        <TableCell align="right">Custo Un</TableCell>
                        <TableCell align="right">Cod. Barras</TableCell>         
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {products.map((row) => (
                        <TableRowProduct key={row.id} row={row} />
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={2}>
        <Paper className={classes.paper}>
        CNPJ: {cnpj} 
        </Paper>  
        </Grid>       
      </Grid>
    </div>
  );
}

export async function getServerSideProps() {
  const { cnpj } = router.query;
  const { db } = await connectToDatabase(cnpj);
  
  const products = await db.collection('products').find({'cnpjDestinatario': cnpj}).toArray();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
