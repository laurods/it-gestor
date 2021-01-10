import React from 'react';
import useSWR from 'swr'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Upload from '../Upload';
import CreateNF from '../../util/createNF';
import ApiAxios from '../../util/apiAxios';


export default function ContentMain({email}) { 
    const handleUpload =  (file) => {
        const url = URL.createObjectURL(file[0]);
        axios.get(url, { responseType: 'document' }).then((response) => CreateNF(response.data, email));
    }
    const { data, error } = useSWR(`/api/product/${email}`, ApiAxios);
    return (
      <div>
        {data?<p>Tem dados</p>:<p>Não tem dados</p>}
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