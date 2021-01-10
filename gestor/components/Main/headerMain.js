import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function HeaderMain(props) {
    const { email } = this.props;
    console.log(email);
    return (
      <div>
     <Grid container spacing={3}>
        <Grid item xs={1}>
            
            </Grid>  
            <Grid item xs={5}>
          
            </Grid>
            <Grid item xs={3}>
            <header>Email: </header> 
            </Grid>
        </Grid>      
        
      </div>
    );
    
  }