import React from 'react';
import Grid from '@material-ui/core/Grid';
import Upload from '../Upload';

export default function ContentMain({email}) { 
    const handleUpload =  (file) => {
        const url = URL.createObjectURL(file[0]);
    }
    
    /* Inicio processXML/  
  processXML = (file) => {
     
      /*
    axios
      .get(file.preview, { responseType: 'document' })
      .then((response) => this.createNF(response.data));
      
  };
  /* Fim processXML*/
    
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