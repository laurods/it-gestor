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
    
    let group = cars.reduce((r, a) => {
      console.log("a", a);
      console.log('r', r);
      r[a.make] = [...r[a.make] || [], a];
      return r;
     }, {});
     console.log("group", group);
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