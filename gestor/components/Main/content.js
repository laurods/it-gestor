import React from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Upload from '../Upload';
import CreateNF from '../../util/createNF';

export default function ContentMain({email}) { 
    const handleUpload =  (file) => {
        const url = URL.createObjectURL(file[0]);
        axios.get(url, { responseType: 'document' }).then((response) => CreateNF(response.data, email));
    }
   /*
  const createNF = (data) => {
    const nf = data;
    console.log(nf);
   }
   */ 
    return (
      <div>
     <Grid container spacing={3}>
            <Grid item xs={2}>
             <span>CNPJ</span>            
            </Grid>  
            <Grid item xs={3}>
                <Upload onUpload={handleUpload} />
            </Grid>
            <Grid item xs={5}>
            <span>PRODUTOS </span> 
            </Grid>
            <Grid item xs={2}>
            <span>NFS </span> 
            </Grid>
        </Grid>      
        
      </div>
    );
    
  }