import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connectToDatabase } from '../../util/mongodb';
import SearchBar from '../../components/screen/Layout/searchbar';
import TableRowProduct from '../../components/screen/Layout/tableRowProduct';

export default function CollapsibleTable({ products }) {
  return (
    <div>
        <Grid container spacing={3}>
            <Grid item xs={12}>
            <Paper>
            <SearchBar />
            </Paper>
            </Grid>
            <Grid item xs={6}>
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
            </Grid>        
        </Grid>
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