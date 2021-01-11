import React from 'react';
import Grid from '@material-ui/core/Grid';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



export default function TopTableNF() { 
 
    return (
      <div>  
     <Grid container spacing={3}>                       
            <Grid item xs={3}>
            <WhatsAppIcon />
             (54) 9.9957-2366             
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
                Cadastre-se para salvar os produtos. É rápido e grátis!
            </Typography>
            </Grid>

            <Grid item xs={2}>
            <Button variant="contained" disabled  href="/">
                Cadastrar
            </Button> 
            </Grid>

            <Grid item xs={1}>
            <Button variant="contained" href="/">
                Sair
            </Button> 
            </Grid>
        </Grid>      
        
      </div>
    );
    
  }