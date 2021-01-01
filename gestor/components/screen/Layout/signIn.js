import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(() => ({
  paper: {   
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const getCnpj = () => {
    const email = document.getElementById('login-email').value;
    console.log(email)
    if(email !== ''){
      const response = await axios
    .post(`https://it-gestor.vercel.app/api/user/`, email)
    .then((res) => {
      //console.log(res);
      console.log(res.data); 
    })
    .catch((error) => {
      console.log(error.res.data);
      console.log(error.res.status);
      console.log(error.res.headers);
    });
      
    }else{
      alert('Digite um e-mail');
    }
    
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}> 
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login-email"
            label="Informe seu e-mail"
            name="login-email"
            autoComplete="email"
            type="email"
            autoFocus
          />         
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => getCnpj()}            
          >
            ACESSAR 
          </Button>
      </div>     
    </Container>
  );
}