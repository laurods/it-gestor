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

  form: {
    width: '100%', // Fix IE 11 issue.
   
  },
  submit: {
   
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const getCnpj = () => {
    cnpj = document.getElementById('login-email').value;
    console.log(cnpf);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>       
        <form className={classes.form} noValidate>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login-email"
            label="Informe seu e-mail"
            name="login-email"
            autoComplete="email"
            autoFocus
          />         
          <Link href="#">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => getCnpj()}
            className={classes.submit}
          >
            ACESSAR 
          </Button>

          </Link>       
        </form>
      </div>     
    </Container>
  );
}