import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchBar from '../screen/Layout/searchbar';
import TableRowProduct from '../screen/Layout/tableRowProduct';

const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
    paper: {   
      textAlign: 'center',    
    },
  }));
export default function TableNF(props) {
    const classes = useStyles();
    const { products } = props;

    return (
        <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>         
            <SearchBar />         
          </Grid>
          
          <Grid item xs={12}>
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
              
        </Grid>
      </div>
    );
}