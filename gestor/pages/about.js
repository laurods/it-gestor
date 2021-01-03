import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { connectToDatabase } from '../util/mongodb';


export default function About({users}) { 
 
  return (
    <Container maxWidth="sm">
      {users}
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
};

export async function getServerSideProps() {
  
  const { db } = await connectToDatabase();
  const users = await db.collection('users').find().toArray();

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
  
}