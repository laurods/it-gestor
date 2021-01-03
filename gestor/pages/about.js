import React from 'react';
import {NextPageContext} from 'next';
import { myGet } from './api/myGet';

export default function About() {
  
  return (
   
      <div className="container">
      Hello people 
      
      </div>
  
  );
}

About.getInitialProps = async (ctx) => {
  
  //const json = await myGet('https://it-gestor.vercel.app/api/user/findAll', ctx);
  //return {people:json}
}
