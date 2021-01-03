import React from 'react';
import {NextPageContext} from 'next';
import { myGet } from './api/myGets';

export default function About({people}) {
  
  return (
   
      <div className="container">
      Hello people {JSON.stringify(people)}
      
      </div>
  
  );
}

About.getInitialProps = async (ctx) => {
  const json = await myGet('https://it-gestor.vercel.app/api/user/findAll', ctx);
  return {people:json}
}