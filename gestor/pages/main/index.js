import React from 'react';
import { useRouter } from 'next/router';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function Main() {
  const router = useRouter();  

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Pesquise por:
        </Typography>
        <Button variant="contained" size="large">
          Produtos
        </Button>
        <Button variant="contained" size="large">
          Notas
        </Button>
        <Button variant="contained" size="large">
          Fornecedores
        </Button>          
      </Box>
    </Container>
  );
}