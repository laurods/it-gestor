import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { connectToDatabase } from '../../util/mongodb';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
    <div>
<TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.xprod}
        </TableCell>
        <TableCell align="right">{row.custoUn}</TableCell>        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detalhes
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Ipi</TableCell>
                    <TableCell>Icms</TableCell>
                    <TableCell align="right">Vlr. Produto</TableCell>
                    <TableCell align="right">Custo Total ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>                  
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.ipi}
                      </TableCell>
                      <TableCell>{row.vDifcaIcms}</TableCell>
                      <TableCell align="right">{row.vprod}</TableCell>
                      <TableCell align="right">
                        {row.custoTotal}
                      </TableCell>
                    </TableRow>
                
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
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

export default function CollapsibleTable(products) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Descrição</TableCell>
            <TableCell align="right">Custo Un</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
