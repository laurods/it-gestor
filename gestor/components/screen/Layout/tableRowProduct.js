import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';



const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
          
    },
  },
  
});



export default function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (    
    <React.Fragment> 
            <TableRow className={classes.root}>
                <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.xprod}</TableCell>
                <TableCell align="right">{row.custoUn}</TableCell>
                <TableCell align="right">{row.ceantrib}</TableCell>        
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>             
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                        <TableRow>
                            <TableCell>NF</TableCell>
                            <TableCell>Quant</TableCell>
                            <TableCell>Embalagem</TableCell>
                            <TableCell align="right">Vlr. Produtos</TableCell>
                            <TableCell align="right">Ipi</TableCell>
                            <TableCell align="right">ST</TableCell>
                            <TableCell align="right">Custo Total</TableCell>
                            
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        
                            <TableRow key={row.id}>
                            <TableCell component="th" scope="row">{row.nnf}</TableCell>
                            <TableCell>{row.qcom}</TableCell>
                            <TableCell>{row.ucom}</TableCell>
                            <TableCell align="right">{row.vprod}</TableCell>
                            <TableCell align="right">{row.ipi}</TableCell>
                            <TableCell align="right">{row.vDifcaIcms}</TableCell>
                            <TableCell align="right">{row.custoTotal}</TableCell>
                            <TableCell align="right">
                                <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<EditIcon />}
                                >
                                Alterar
                                </Button>
                            
                            </TableCell>
                            </TableRow>
                        
                        </TableBody>
                    </Table>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
  );
}
