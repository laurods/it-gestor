import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function ContentMain() { 
    return (
      <div>
     <Grid container spacing={3}>
            <Grid item xs={2}>
             <span>2</span>            
            </Grid>  
            <Grid item xs={5}>
            <span>5</span>
            </Grid>
            <Grid item xs={3}>
            <span>3 </span> 
            </Grid>
            <Grid item xs={2}>
            <span>2 </span> 
            </Grid>
        </Grid>      
        
      </div>
    );
    
  }