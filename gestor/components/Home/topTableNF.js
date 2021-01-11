import React from 'react';
import Grid from '@material-ui/core/Grid';



export default function TopTableNF() { 
 
    return (
      <div>  
     <Grid container spacing={3}>
            <Grid item xs={2}>
             <span>Whats: (54) 9.9957-2366</span>            
            </Grid>  
            <Grid item xs={3}>
            <span>3</span>    
            </Grid>
            <Grid item xs={5}>
            <span>5Planos </span> 
            </Grid>
            <Grid item xs={2}>
            <span>2Sair </span> 
            </Grid>
        </Grid>      
        
      </div>
    );
    
  }