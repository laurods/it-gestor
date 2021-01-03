import React from 'react';
import {NextPageContext} from 'next';
import { myGet } from '../pages/api/myGet';

export default function User() {
  
  return (
   
      <div className="container">
      Hello people 
      
      </div>
  
  );
}

User.getInitialProps = async (ctx) => {
  
  //const json = await myGet('https://it-gestor.vercel.app/api/user/findAll', ctx);
  return;
}
