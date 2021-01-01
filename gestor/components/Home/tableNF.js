import React, { useState } from 'react';
import axios from 'axios';
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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save'

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
    const { products, cnpjDestinatario, onShowDashboard } = props;
    const [allProducts, setAllProducts] = useState(products);
    const [searchText, setSearchText] = useState('');
    const [isFiltered, setIsFiltered] = useState(false);
    const [allFilteredProducts, setAllFilteredProducts] = useState('');

    const handleCustoFrete = () =>{
      const valor = document.getElementById('valor-frete').value;
      const productsWithFreight = products.map((product) => {
        return{
        nnf: product.nnf,
        cnpjEmitente: product.cnpjEmitente,
        emitente: product.emitente,
        cnpjDestinatario: product.cnpjDestinatario,
        destinatario: product.destinatario,
        cean: product.cean,
        ceantrib: product.ceantrib,
        xprod: product.xprod,
        ucom: product.ucom,
        qcom: product.qcom,
        picms: product.picms,
        perDifcaIcms: product.perDifcaIcms,
        vprod: product.vprod,
        ipi: product.ipi,
        icmsst: product.icmsst,
        vDifcaIcms:product.vDifcaIcms,        
        ifrete:product.ifrete,
        vfrete: 1*(parseFloat(product.ifrete) * parseFloat(valor)).toFixed(2),
        custoUn:1*((product.custoTotal + ((parseFloat(product.ifrete) * parseFloat(valor))))/parseFloat(product.qcom)).toFixed(2),
        custoTotal:1*(product.custoTotal + ((parseFloat(product.ifrete) * parseFloat(valor)))).toFixed(2),
        }        
      })     
      setAllProducts(productsWithFreight);
     
    };

    const onSearchTextChange = (({ target }) => {     
      const value = target.value;
      setSearchText(value);
      searchProduct(value);
    });

    const searchProduct = (value) =>{
      let filteredProducts = allProducts
      .filter((product) => 
      product.xprod.toLowerCase().includes(value.toLowerCase()) ||
      product.ceantrib.includes(value));
      if(value ===''){
        setIsFiltered(false);
      }else{
        setIsFiltered(true);
      }
      setAllFilteredProducts(filteredProducts)
    }

    const saveProductsByNF = async () => {
      const productByNF = allProducts.reduce((acc, value) =>{
        if(!acc[value.nnf]){
          acc[value.nnf] = [];
        }
        acc[value.nnf].push(value);
        return acc;
      }, {});
      
      const response = await axios
      .post(`https://it-gestor.vercel.app/api/nf/insertOne`, productByNF)
      .then((res) => {
        //console.log(res);
        //console.log(res.data); 
      })
      .catch((error) => {
        console.log(error.res.data);
        console.log(error.res.status);
        console.log(error.res.headers);
      });
      
    }

    const saveProducts = async () => {
      
      const response = await axios
      .post(`https://it-gestor.vercel.app/api/product/insertMany`, allProducts)
      .then((res) => {
        //console.log(res);
        //console.log(res.data); 
      })
      .catch((error) => {
        console.log(error.res.data);
        console.log(error.res.status);
        console.log(error.res.headers);
      });
      
    }

    const saveLogin = async () => {
      const user = {
        email: document.getElementById('email').value,
        cnpjDestinatario,
      }
      if(user.email==''){
        alert('O Email é Obrigatório para salvar os produtos');
        return;
      }
      
      const response = await axios
      .post(`https://it-gestor.vercel.app/api/user/insertOne`, user)
      .then((res) => {
        //console.log(res);
        //console.log(res.data); 
      })
      .catch((error) => {
        console.log(error.res.data);
        console.log(error.res.status);
        console.log(error.res.headers);
      });
      
    }

    const saveLoginAndProducts = () => {     
      saveLogin();
      saveProducts();
      saveProductsByNF();
      console.log('salvo com sucesso');
      //onShowDashboard();
    }

    


    return (
        <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>         
            <SearchBar 
            searchText = {searchText}
            onSearchTextChange = {onSearchTextChange} 
            />         
          </Grid>
          
          <Grid item xs={2}>
          <TextField
            variant="outlined"            
            required
            fullWidth
            id="email"
            label="Informe seu e-mail"
            name="email"
            autoComplete="email"
          />  
          </Grid>

          <Grid item xs={2}>
          <TextField
          id="valor-frete"
          label="Valor do Frete" 
          size="normal"
          required
          fullWidth
          defaultValue="0.00"
          variant="outlined"                              
          />
          </Grid>

          <Grid item xs={2}>
          <Button
          variant="contained"
          color="default"
          size="large"
          onClick={handleCustoFrete}
          
          >
          Atualizar Custos
          </Button>
          </Grid>

          

          <Grid item xs={2}>
          <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={()=>{saveLoginAndProducts()}}
          startIcon={<SaveIcon />}
          
          >
          Salvar Produtos
          </Button>
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
                         {isFiltered?
                         allFilteredProducts.map((row) => (
                           <TableRowProduct key={row.id} row={row} />
                       )):
                       allProducts.map((row) => (
                        <TableRowProduct key={row.id} row={row} />
                      ))
                      }
                      </TableBody>
                  </Table>
                  </TableContainer>
            </Paper>
          </Grid>
              
        </Grid>
      </div>
    );
}