import React from 'react';
import Grid from '@material-ui/core/Grid';
import Upload from '../Upload';

export default function ContentMain({email}) {
   state = {
    uploadedFiles: [],
   }
    const handleUpload = (files) => {
        const uploadedFiles = files.map((file) => ({
            file,            
            name: file.name,
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null,
          }));
          this.setState({
            uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles),
          });
          uploadedFiles.forEach(this.processXML);
    }
    
    /* Inicio processXML*/  
  processXML = (file) => {
      console.log(file.preview);
      /*
    axios
      .get(file.preview, { responseType: 'document' })
      .then((response) => this.createNF(response.data));
      */
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