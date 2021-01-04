import React from 'react';
import {NextPageContext} from 'next';
import { myGet } from '../pages/api/myGet';

export default function User({people}) {

  return <div>Hello People{JSON.stringify(people)}</div>  
      

}

User.getInitialProps = async (ctx) => {
  const cookie = ctx.req.headers.cookie;
  const resp = await fetch('https://it-gestor.vercel.app/api/user/findAll', {
    headers: {
      cookie: cookie
    }
  });
  const json = await resp.json();
  return{people: json};
}
