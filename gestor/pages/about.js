import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { verify } from 'jsonwebtoken';

const authenticated = fn => async (req, res) => {
  verify(req.headers.authorization, '4a56384b-61de-4446-bcec-49515bb71a0f', async function(err, decoded) {
    if(!err && decoded){
      return await fn(req, res);
    }

    res.status(500).json({message: 'Sorry you are not authenticated'});
  });
}

export default authenticated(function About() { 
  
  
 
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Button variant="contained" color="primary">
          Go to the main page
        </Button>       
      </Box>
    </Container>
  );
});