import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';


export default function About() { 
  const cars = [{
    make: "audi",
    model: "r8",
    year: "2012"
    },
    {
    make: "audi",
    model: "rs5",
    year: "2013"
    },
    {
    make: "ford",
    model: "mustang",
    year: "2012"
    },
    {
    make: "ford",
    model: "fusion",
    year: "2015"
    },
    {
    make: "kia",
    model: "optima",
    year: "2012"
    }];

   const carByMake = cars.reduce((acc, value) =>{
     if(!acc[value.make]){
       acc[value.make] = [];
     }
     acc[value.make].push(value);
     return acc;
   }, {});
 
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
}